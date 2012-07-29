var wordList = ["Papier","Shop", "Tisch", "Stuhl", "Gurt", "Zahl", "Kerze", "Karten", "Java", "Glas", "Band", "Maus", "Katze","Hund", "Hafer", "Stift",  "Schrank", "Regal","Ordner", "Fenster", "Tuch", "Keks", "Frosch", "Milch", "Handy", "Honig", "Kabel", "Spiel", "Freak", "Tasche", "Lampe", "Kasten", "Monitor", "Buch", "Bild"];
var fontList = ["ComicSans", "Arial", "ComicSans", "ComicSans"];

var lastTimeFPS = 0;
var ticksFPS = 0;
var ticks = 0;
var fpsTemp = 0;
var fps = 0;

var lastLetters = [];
var actWords = [];

var gameStatus = 0;

var timer = MilliSecs();
var gameTimer = MilliSecs();
var lastHeadUp = MilliSecs();

var points = 0;
var wordCounter = 0;
var falseWordCounter = 0;
var level = 1;

var lives = 5;
var merker = 1;
var merker2 = 0;
var debug = 0;
var rotate = 45;

var word = function() {
	this.name;
	this.size = 8;
	this.font;
	this.posX = 500;
	this.posY = 200;
	this.grwFactor = 0.1;
	this.status = 1;
};

function startGame() {
	gameStatus = 2;
	points = 0;
	wordCounter = 0;
	falseWordCounter = 0;
	level = 1;
	merker = 1;
	merker2 = 0;
	lives = 5;
	rotate = 45;
	actWords = [];
	lastLetters = [];
	timer = MilliSecs();
	gameTimer = MilliSecs();
	
	createWord();
	createWord();
}

function headUp() {
	rotate = 0;
}

function existWord(word) {
    for(var i=0; i<actWords.length; i++){
        if(word===actWords[i].name)
            return true;
    }
    return false;
}

function createWord() {
	//Nicht zu viele Wörter gleichzeitig im Spielfeld
	if(actWords.length < 15) {
		myWord = new word();
		myWord.name = wordList[Rnd(0, wordList.length-1)];
		//�berpr�fe ob das Wort schon auf dem Spielfeld ist
		if(!existWord(myWord.name)) {
			myWord.font = fontList[Rnd(0, fontList.length-1)];
			myWord.size = Rnd(6,12);
			myWord.posX = Rnd(20, 850);
			myWord.posY = Rnd(50, 400);
			myWord.growFactor = Rnd(0.1, 0.15);
			actWords.push(myWord);					
		}
		else { createWord(); }
	
	}

}

function drawController() {
	for(var i = 0; i < actWords.length; i++) {
		if(actWords[i].status == 1) {
			SetFont(actWords[i].font, actWords[i].size + "pt", true);
			DrawText(actWords[i].name, actWords[i].posX, actWords[i].posY);
		}
		else {
			SetFont(actWords[i].font, actWords[i].size + "pt", true);
			DrawText(actWords[i].name, actWords[i].posX, actWords[i].posY);
		}
	}
}

function newLetter(key) {
	if (String.fromCharCode(key) != lastLetters[lastLetters.length - 1]) {
		lastLetters.push(String.fromCharCode(key));	
		//Es werden nur die x letzten Zeichen gewertet
		if(lastLetters.length > 10) {
			lastLetters.shift();
		}
	}
}

function userController() {
	//Pr�fen ob ein Buchstabe getippt wurde und sichern (es wird in den W�rtern nicht 2x den selben Buchstaben hintereinander geben...)
	var key = KeyPressed();
	if(key >= 65 && key <= 90) {
		//Verzögerung der Eingabe (vorgabe^^)
		setTimeout("newLetter("+key+");", 150);
	}
	//Punkte & Level ausgeben
	SetFont("Arial, Verdana, sans-serif", "12pt", true, true);
	DrawText("Punkte: " + Math.floor(points), 22, 30);
	DrawText("Level: " + level, 333, 30);
	DrawText("Leben: " + lives, 666, 30);
}

function gameController() {
	//ggf. das komplette Canvas drehen
	if(rotate < 45) {
		jbbBase.getCanvas().translate(GraphicsWidth()/2, GraphicsHeight()/2);
		jbbBase.getCanvas().rotate(4 * Math.PI/180);
		jbbBase.getCanvas().translate(-GraphicsWidth()/2, -GraphicsHeight()/2);
		rotate++;
	}
	
	for(var i = 0; i < actWords.length; i++) {

		if(actWords[i].status == 1) {
			// Lasse das Wort gr��er werden
			actWords[i].size = actWords[i].size + actWords[i].growFactor*(level*0.6);
			
			//CheckWord
			var eingabe = lastLetters.join("") + " ";
			var rg = new RegExp(actWords[i].name,'i');
			var Ergebnis = eingabe.search(rg);
			
			if(Ergebnis != -1 && actWords[i].status == 1) {
				actWords[i].status = 2;
				//Punkte vergeben, je fr�her man es geschafft hat desto mehr Punkte gibt es auch
				//Hat man ein falsches Wort genommen gibt es immer 100 Punkte abzug
				if(actWords[i].font == "ComicSans") {
					points += 100 - actWords[i].size;
					wordCounter++;
					//Man kann keine Level mehr absteigen...aber aufsteigen:
					if((Exp(level)*25) < points) level++;
					//Ab lvl.3 bei jedem richtigen Wort eine Chance von 25% auf headUp (für 10 sekunden)
					var rnd = Rnd(1, 4);
					console.log(rnd);
					if(level > 2 && rnd == 3 && rotate == 45 && lastHeadUp+20000 < MilliSecs()) {
						headUp();
						setTimeout("headUp()", 10000);
						lastHeadUp = MilliSecs();
					}
				}
				else {
					points -= 100;
					falseWordCounter++;
				}
				
			//lastLetters leeren...
			lastLetters = [];
			}
			//Wenn das Wort zu gro� wird verschwindet es
			else if(actWords[i].size > 75) {
				//L�sst man ein ComicSans wort durch gibts ein "Leben" abzug - hat an alle verloren ists vorbei
				if(actWords[i].font == "ComicSans") {
					lives--;
					if(lives < 1) gameStatus = 3;
				}
				actWords.splice(i, 1);
				
			}
		}
		else {
			if(actWords[i].size < 8) {
				actWords.splice(i, 1);
			} else {
				actWords[i].size = actWords[i].size - 5;
			}	
		}
		
	}

}




