const KEY_BACKSPACE	= 8;
const KEY_TAB		= 9;
const KEY_ENTER		= 13;
const KEY_SHIFT		= 16;
const KEY_CTRL		= 17;
const KEY_ALT		= 18;
const KEY_PAUSE		= 19;
const KEY_BREAK		= 19;
const KEY_CAPSLOCK	= 20;
const KEY_ESCAPE	= 27;
const KEY_PAGEUP	= 33;
const KEY_SPACE		= 32;
const KEY_PAGEDOWN	= 34;
const KEY_END		= 35;
const KEY_HOME		= 36;
const KEY_LEFT		= 37;
const KEY_UP		= 38;
const KEY_RIGHT		= 39;
const KEY_DOWN		= 40;
const KEY_PRINT		= 44;
const KEY_INSERT	= 45;
const KEY_DELETE	= 46;
const KEY_0			= 48;
const KEY_1			= 49;
const KEY_2			= 50;
const KEY_3			= 51;
const KEY_4			= 52;
const KEY_5			= 53;
const KEY_6			= 54;
const KEY_7			= 55;
const KEY_8			= 56;
const KEY_9			= 57;
const KEY_A			= 65;
const KEY_B			= 66;
const KEY_C			= 67;
const KEY_D			= 68;
const KEY_E			= 69;
const KEY_F			= 70;
const KEY_G			= 71;
const KEY_H			= 72;
const KEY_I			= 73;
const KEY_J			= 74;
const KEY_K			= 75;
const KEY_L			= 76;
const KEY_M			= 77;
const KEY_N			= 78;
const KEY_O			= 79;
const KEY_P			= 80;
const KEY_Q			= 81;
const KEY_R			= 82;
const KEY_S			= 83;
const KEY_T			= 84;
const KEY_U			= 85;
const KEY_V			= 86;
const KEY_W			= 87;
const KEY_X			= 88;
const KEY_Y			= 89;
const KEY_Z			= 90;
const KEY_LWINDOWS	= 91;
const KEY_RWINDOWS	= 92;
const KEY_SELECT	= 93;
const KEY_NUM0		= 96;
const KEY_NUM1		= 97;
const KEY_NUM2		= 98;
const KEY_NUM3		= 99;
const KEY_NUM4		= 100;
const KEY_NUM5		= 101;
const KEY_NUM6		= 102;
const KEY_NUM7		= 103;
const KEY_NUM8		= 104;
const KEY_NUM9		= 105;
const KEY_MULTIPLY	= 106;
const KEY_ADD		= 107;
const KEY_SUBSTRACT	= 109;
const KEY_DECIMAL	= 110;
const KEY_DIVIDE	= 111;
const KEY_F1		= 112;
const KEY_F2		= 113;
const KEY_F3		= 114;
const KEY_F4		= 115;
const KEY_F5		= 116;
const KEY_F6		= 117;
const KEY_F7		= 118;
const KEY_F8		= 119;
const KEY_F9		= 120;
const KEY_F10		= 121;
const KEY_F11		= 122;
const KEY_F12		= 123;
const KEY_NUMLOCK	= 144;
const KEY_SCROLLLOCK= 145;
const KEY_SEMICOLON	= 186;
const KEY_EQUAL		= 187;
const KEY_COMMA		= 188;
const KEY_DASH		= 189;
const KEY_PERIOD	= 190;
const KEY_SLASH		= 191;
const KEY_LBRACKET	= 219;
const KEY_BACKSLASH	= 220;
const KEY_RBRACKET	= 221;
const KEY_QUOTE		= 222;


var tMap = function(){
	this._key = new Array();
	this._val= new Array();
	this._currentListIter = -1;
	
	this.add = function(key, value){
		this._key.push(key); this._val.push(value);
	};
	
	this.get = function(key){
		var found;
		var count = this._key.length;
		for(var i = 0; i < count; i++){
			if(this._key[i] == key){
				found = this._val[i];
				i = count + 1;
			}
		}
		return found;
	};
	
	this.remove = function(key){
		var tmp_key = new Array();
		var tmp_val = new Array();
		for(var i = 0; i < this._key.length; i++){
			if(this._key[i] == key){
				tmp_key.push(this._key[i]);
				tmp_val.push(this._val[i]);
			};
		};
		this._key = tmp_key;
		this._val = tmp_val;
		delete tmp_key;
		delete tmp_val;
	};
	
	this.next = function(){
		if(this._currentListIter < this._key.length){
			this._currentListIter++;
			return this._val[this._currentListIter];
		}else{
			this._currentListIter = -1;
			return null;
		}
	};
	
	this.reset = function(){ this._currentListIter = -1; };
	
	this.clear = function(){
		this._key = new Array();
		this._val = new Array();
		this._currentListIter = -1;
	};
};

var tList = function(){
	this._list = new Array();
	var _currentListIter = -1;
	
	this.addLast = function(val){ this._list.push(val); };
	
	this.addFirst = function(val){ this._list.unshift(val); };
	
	this.remove = function(val){
		var tmp = new Array();
		for(var i = 0; i < this._list.length; i++){
			if(this._list[i] != val){ tmp.push(this._list[i]); }
		}
		this._list = tmp;
		delete tmp;
	};
	
	this.flip = function(){ this._list.reverse(); };
	
	this.next = function(){
		if(_currentListIter < this._list.length){
			_currentListIter++;
			return this._list[_currentListIter];
		}else{
			_currentListIter = -1;
			return null;
		}
	};
	
	this.clear = function(){
		delete this._list;
		this._list = new Array();
	};
	
	this.reset = function(){ _currentListIter = -1; };
};

var tDesktop = function(){
	var de = document.documentElement;
	
	// gibt die Breite des Anzeigebereichs des Browsers zurÃ¼ck
	this.getWidth = function(){ 
		return window.innerWidth; 
	};
	
	// gibt die HÃ¶he des Anzeigebereichs des Browsers zurÃ¼ck
	this.getHeight = function(){ 
		return window.innerHeight;
	};
};

var tImage = function(filename){
	var img			= new Image();
	var animated	= false;
	var cells		= { "width" : 0, "height" : 0, "count" : 0 };
	var ready		= false;
	var midHandle	= false;
	
	img.onload = function(){
		ready			= true;
	};
	if(typeof(filename) != 'undefined'){
		img.src	= filename;
	}
	
	this.load = function(filename){
		img		= new Image();
		img.src	= filename;
	};
	this.loadAnim = function(filename, cellWidth, cellHeight, cellCount){
		cells.width		= cellWidth;
		cells.height	= cellHeight;
		cells.count		= cellCount;
		animated		= true;
		this.load(filename);
	};
	this.getImage = function(){ return img; };
	this.getCells = function(){ return cells; };
	this.isAnimated = function(){ return animated; };
	this.isReady = function(){ return ready; };
	this.onLoaded = function(func){ img.onload = func; };
	this.rectOverlap = function(x, y, rectX, rectY, rectWidth, rectHeight){
		var w = img.width;
		var h = img.height;
		var x2= rectX + rectWidth;
		var y2= rectY + rectHeight;
		var result = false;
		
		if((x > rectX) && (y > rectY) && (x < x2) && (y < y2)){ result = true; }
		if((x2 > x) && (y2 > y) && (x2 < x + w) && (y2 < y + h)){ result = true; }
		
		return result;
	};
	this.getWidth = function(){ return img.width; };
	this.getHeight = function(){ return img.height; };
	this.draw = function(jBBObject, x, y, frame){
		var xx				= x;
		var yy				= y;
		var cx				= 0;
		var cy				= 0;
		var canvasHandle	= jBBObject.getCanvas();
		var c				= cells;
		var i				= img;
		var scale			= jBBObject.getScale();
		
		if((jBBObject.getMidHandle() == true) || (midHandle == true)){
			if(animated == true){
				xx = x + ((c.width * scale.x) / 2);
				yy = y + ((c.height * scale.y) / 2);
				cx = (c.width * scale.x) / 2;
				cy = (c.height * scale.y) / 2;
			}else{
				xx = x + ((i.width * scale.x) / 2);
				yy = y + ((i.height * scale.y) / 2);
				cx = (i.width * scale.x) / 2;
				cy = (i.height * scale.y) / 2;
			}
		}
		
		if(jBBObject.getRotation() >= 0.0){
			canvasHandle.save();
			canvasHandle.translate(xx, yy);
			canvasHandle.rotate(jBBObject.getRotation());
		}
		
		if((frame >= 0) && (this.isAnimated() == true)){	
			var frameX = ((frame) % (i.width / c.width)) * c.width;
			var frameY = c.height * (Math.floor(frame / (Math.floor(i.width / c.width))));
			canvasHandle.drawImage(i, frameX, frameY, c.width, c.height, 0 - cx, 0 - cy, c.width * scale.x, c.height * scale.y);
		}else if(this.isAnimated != true){
			canvasHandle.drawImage(i, 0 - cx, 0 - cy, i.width * scale.x, i.height * scale.y);
		}
		
		if(jBBObject.getRotation() >= 0.0){
			canvasHandle.translate(0 - xx, 0 - yy);
			canvasHandle.restore();
		}
	};
	this.tileImage = function(jBBObject, x, y, frame){
		var iw, ih;
		if(!x) x = 0;
		if(!y) y = 0;
		
		x += jBBObject.viewX();
		y += jBBObject.viewY();
		
		if(frame >= 0){
			iw = cells.width;
			ih = cells.height;
		}else{
			iw = img.width;
			ih = img.height;
		}
		
		var w = jBBObject.graphicsWidth() + x;
		var h = jBBObject.graphicsHeight() + y;
		
		for(var xx = x; xx < w; xx += iw){
			for(var yy = 0; yy < h; yy += ih){
				if(frame >= 0){
					this.draw(jBBObject, xx, yy, frame);
				}else{
					this.draw(jBBObject, xx, yy);
				}
			}
		}
	};
};

var tBobRange = function(){
	var name, first, last, speed, current;
	
	this.create = function(title, firstFrame, lastFrame, frameSpeed){
		name	= title;
		first	= firstFrame;
		last	= lastFrame;
		speed	= frameSpeed;
		current	= first;
	};
	this.getTitle = function(){ return name; };
	this.getFirst = function(){ return first; };
	this.getLast = function(){ return last; };
	this.getCurrent = function(){ return current; };
	this.incCurrent = function(){ 
		current++;
		if(current > last) current = first; 
	};
	this.reset = function(){ current = first; };
	this.setSpeed = function(frameSpeed){ speed = frameSpeed; };
	this.getSpeed = function(){ return speed; };
};

var tBob = function(){
	var img, interval, currentFrame;
	var ranges = new Array();
	var currentRange;
	
	// erstellt einen neuen Bob
	this.create = function(image, firstFrame, lastFrame, frameSpeed){
		img		= image;
		var range = new tBobRange();
		range.create("full", firstFrame, lastFrame, frameSpeed);
		ranges.push(range);
		currentRange = range;
	};
	// startet die aktuelle Bob-Animation
	this.start	= function(){ 
		if(interval) clearInterval(interval);
		interval = setInterval(this.callback, currentRange.getSpeed());
	};
	// stoppt die Bob-Animation
	this.stop	= function(){ clearInterval(interval); };
	// internes Callback
	this.callback = function(){
		currentRange.incCurrent();
	};
	// zeichnet das aktuelle Frame des Bob
	this.draw = function(canvas, x, y, midHandle){
		var xx	= x;
		var yy	= y;
		
		var c	= img.getCells();
		var i	= img.getImage();
		var f	= currentRange.getCurrent();
		
		if(midHandle == true){
			xx = x - (c.width / 2);
			yy = y - (c.height / 2);
		}
		frameX = ((f) % (i.width / c.width)) * c.width;
		frameY = c.height * (Math.floor(f / (Math.floor(i.width / c.width))));
		canvas.drawImage(i, frameX, frameY, c.width, c.height, xx, yy, c.width, c.height);
	};
	// erstellt eine neue Animations-Range
	this.createRange = function(title, firstFrame, lastFrame, frameSpeed){
		var range = new tBobRange();
		range.create(title, firstFrame, lastFrame, frameSpeed);
		ranges.push(range);
	};
	// definiert eine erstellte Range als aktuelle Range
	this.setRange = function(title){
		for(var i = 0; i < ranges.length; i++){
			if(ranges[i].getTitle() == title){
				currentRange = ranges[i];
				i = ranges.length + 1;
			}
		}
	};
	// setzt die komplette Frame-Reihe als aktuelle Range
	this.reset = function(){ this.setRange("full"); };
	// lÃ¶scht eine Range
	this.deleteRange = function(title){
		for(var i = 0; i < ranges.length; i++){
			if(ranges[i].getTitle == title){
				delete ranges[i];
				ranges.splice(i, 1);
			}
		}
	};
	// setzt die Geschwindigkeit der aktuellen Range
	this.setSpeed = function(speed){ currentRange.setSpeed(speed); };
	this.getRange = function(){ return currentRange; };
};

var tColor = function(r, g, b, a){
	if(typeof(r) == 'undefined') r = 0;
	if(typeof(g) == 'undefined') g = 0;
	if(typeof(b) == 'undefined') b = 0;
	if(typeof(a) == 'undefined') a = 0;
	
	var color		= { "red" : 0, "green" : 0, "blue" : 0, "alpha" : 255 };
	var colorString	= this.toString();
	
	this.red 	= function(){ return color.red; };
	this.green	= function(){ return color.green; };
	this.blue	= function(){ return color.blue; };
	this.alpha	= function(){ return color.alpha; };
	this.get	= function(){ return color; };
	this.set		= function(r, g, b, a){
		color.red	= r;
		color.green	= g;
		color.blue	= b;
		color.alpha	= a;
	};
	this.setRed 	= function(r){ color.red	= r; };
	this.setGreen	= function(g){ color.green	= g; };
	this.setBlue	= function(b){ color.blue	= b; };
	this.setAlpha	= function(a){ color.alpha	= a; };
	this.reset		= function(){
		color.red	= 0;
		color.green	= 0;
		color.blue	= 0;
		color.alpha	= 255;
	};
	this.toString	= function(){ 
		colorString = "rgba(" + color.red + "," + color.green + "," + color.blue + ", " + color.alpha + ")";
		return colorString;
	};
	this.getColorString = function(){ return colorString; };
};

var tSound = function(){
	var sound;
	var ready		= false;
	var playCount	= 0;
	
	this.load 		= function(filename, loop){
		sound = document.createElement('audio');
		sound.setAttribute('src', filename);
		sound.load();
		sound.addEventListener("canplay", this.setReady, true);
		if(loop) sound.addEventListener("ended", this.play, true);
	};
	this.setReady	= function(){ ready = true; };
	this.isReady	= function(){ return ready; };
	this.play 		= function(){ 
		sound.currentTime = 0;
		sound.play(); 
		playCount++;
	};
	this.soundLoop = function(value){
		if(value){
			if(loop) sound.addEventListener("ended", this.play, true);
		}else{
			sound.removeEventListener("ended", this.play, true);
		}
		playCount = 0;
	};
	this.getLoopCount = function(){ return playCount; };
	this.pause 		= function(){ sound.pause(); };
	this.stop 		= function(){ 
		sound.pause();
		sound.currentTime = 0;
	};
	this.volume		= function(vol){ sound.volume = vol; };
	this.getDuration= function(){ return sound.duration; };
	this.setPosition= function(secs){ sound.currentTime = secs; };
	this.getPosition= function(){ return sound.currentTime; };
};


// Maustasten:
const MOUSE_NONE	= 0;
const MOUSE_LEFT	= 1;
const MOUSE_MIDDLE	= 4;
const MOUSE_RIGHT	= 2;

var jbbCanvasPosition = { "left" : 0, "top" : 0 };

var tMouse = function(){
	var mousePos	= { "x" : 0, "y" : 0 };
	var mouse		= { "pressed" : 0, "released" : 0 };
	var mouseWheel	= 0.0;
	
	this.init = function(canvas){
		var cnv			= document.getElementById(canvas);
		
		cnv.onmousemove	= this.saveMousePos;
		cnv.onmousedown	= this.saveMouseDown;
		cnv.onmouseup	= this.saveMouseUp;
		
		if(window.addEventListener) window.addEventListener("DOMMouseScroll", this.saveWheel, false);
		window.onmousewheel = document.onmousewheel = this.saveWheel;
	};
	this.saveMousePos = function(ev){
		if(!ev) ev = window.event();
		mousePos.x = ev.clientX - jbbCanvasPosition.left;
		mousePos.y = ev.clientY - jbbCanvasPosition.top;
	};
	this.saveWheel = function(ev){
		var delta = 0;
		if (!ev) ev = window.event;
        if (ev.wheelDelta){
			delta = ev.wheelDelta/120;
			if (window.opera) delta = -delta;
		} else if(ev.detail){
			delta = -ev.detail/3;
		}
		if(delta) mouseWheel = delta;
        if(ev.preventDefault) ev.preventDefault();
        ev.returnValue = false;
	};
	this.saveMouseDown = function(event){
		if (navigator.appName.indexOf("Explorer") != -1){
			mouse.pressed	= event.button;
		}else{
			switch(event.button){
			case 0 : mouse.pressed = MOUSE_LEFT; break;
			case 1 : mouse.pressed = MOUSE_MIDDLE; break;
			case 2 : mouse.pressed = MOUSE_RIGHT; break;
			case 3 : mouse.pressed = MOUSE_LEFT + MOUSE_RIGHT; break; 
			case 5 : mouse.pressed = MOUSE_LEFT + MOUSE_MIDDLE; break;
			case 6 : mouse.pressed = MOUSE_RIGHT + MOUSE_MIDDLE; break;  
			}
		}
		mouse.released	= false;		
	};
	this.saveMouseUp = function(event){
		if (navigator.appName.indexOf("Explorer") != -1){
			mouse.released	= event.button;
		}else{
			switch(event.button){
			case 0 : mouse.released	= MOUSE_LEFT; break;
			case 1 : mouse.released = MOUSE_MIDDLE; break;
			case 2 : mouse.released = MOUSE_RIGHT; break;
			case 3 : mouse.released = MOUSE_LEFT + MOUSE_RIGHT; break; 
			case 5 : mouse.released = MOUSE_LEFT + MOUSE_MIDDLE; break;
			case 6 : mouse.released = MOUSE_RIGHT + MOUSE_MIDDLE; break;  
			}
		}
		mouse.pressed	= false;
	};
	this.hidePointer = function(canvas){ canvas.style.cursor = 'none'; };
	this.showPointer = function(canvas){ canvas.style.cursor = 'auto'; };
	this.mouseDown = function(key){
		if(mouse.pressed == key){ return true; }else{ return false; }
	};
	this.mouseHit = function(key){
		var r			= mouse.released;
		mouse.pressed	= false;
		mouse.released	= false;
		if(r == key){ return true; }else{ return false; }
	};
	this.mouseX = function(){ return mousePos.x; };
	this.mouseY = function(){ return mousePos.y; };
	this.wheel = function(){
		var res = mouseWheel;
		mouseWheel = 0;
		return res;
	};
};

var tKeyboard = function(){
	var pKeys		= new Array(256);										// pressed Keys
	var rKeys		= new Array(256);										// released Keys
	var pressedKey = 0;
	
	this.init = function(){
		document.onkeydown	= this.saveKeyDown;
		document.onkeyup	= this.saveKeyUp;
	};
	this.saveKeyDown = function(ev){
		if(!ev) ev = window.event();
		pKeys[ev.keyCode] = true;
		pressedKey = ev.keyCode;
	};
	this.saveKeyUp = function(ev){
		if(!ev) ev = window.event();
		pKeys[ev.keyCode] = false;
		rKeys[ev.keyCode] = true;
		pressedKey = 0;
	};
	this.keyPressed = function() { return pressedKey; };
	this.keyDown = function(key){ return pKeys[key]; };
	this.keyHit = function(key){
		var k = rKeys[key];
		rKeys[key] = false;
		return k;
	};
};

var jBB = function(){
	var canvas;																// DOM-Element
	var canvasHandle;														// 2D Context
	var dColor		= new tColor(0, 0, 0, 0);								// DrawColor
	var cColor		= new tColor(0, 0, 0, 255);								// ClearColor
	var rColor		= new tColor(0, 0, 0, 255);								// readed Color
	var scale		= { "x" : 1.0, "y" : 1.0 };								// global scale
	var rot			= 0.0;													// global rotation
	var aMidHandle	= false;
	var viewport	= { "x" : 0, "y" : 0, "width" : 0, "height" : 0 };
	
	this.browser = function(){
		return navigator.appName;
	};
	
	this.graphics = function(canvasID, mainLoop, fps){						// initialisiert das Canvas und den MainLoop
		var tFPS = 30;
		if(fps <= 0){ tFPS = 30.0; }else{ tFPS = fps; }
		if(!mainLoop) mainLoop = main;
		if(canvasID.length){
			canvas	= document.getElementById(canvasID);
			if(canvas){
				canvasHandle = canvas.getContext("2d");
				if(canvasHandle){
					setInterval(mainLoop, Math.floor(1000/tFPS));
					canvasHandle.textBaseline = "top";
					this.readSoundAbilities();
					this.clsColor(0, 0, 0);
					viewport.width	= canvas.width;
					viewport.height = canvas.height;
					
					// save position
					jbbCanvasPosition.left = canvas.offsetLeft;
					jbbCanvasPosition.top = canvas.offsetTop;
				}else{
					throw("Es konnte kein 2D Kontext fÃ¼r das Canvas erzeugt werden.");
				}
			}else{
				throw("Die angegebene canvasID existiert nicht.");
			}
		}else{
			throw("Der Parameter canvasID ist nicht optional!");
		}
	};
	
	this.getCanvas = function(){ return canvasHandle; };					// gibt das Handle auf den 2D Context zurÃ¼ck
	this.getCanvasElement = function(){ return canvas; };
	this.centerCanvas = function(){											// zentriert das Canvas im Browser
		var ww = window.innerWidth;
		var wh = window.innerHeight;
		var cw = canvas.width;
		var ch = canvas.height;
		var x = (ww / 2) - (cw / 2);
		var y = (wh / 2) - (ch / 2);
		
		canvas.style.position	= 'absolute';
		canvas.style.left		= x + "px";
		canvas.style.top		= y + "px";
		
		jbbCanvasPosition.left = x;
		jbbCanvasPosition.top = y;
	};
	this.graphicsWidth = function(){ return viewport.width; };				// gibt die Breite des Viewports in Pixel zurÃ¼ck
	this.graphicsHeight = function(){ return viewport.height; };			// gibt die HÃ¶he des Viewports in Pixel zurÃ¼ck
	this.viewX = function(){ return viewport.x; };
	this.viewY = function(){ return viewport.y; };
	this.setScale = function(scaleX, scaleY){								// definiert die aktuelle globale Skalierung
		scale.x = scaleX;
		scale.y = scaleY;
	};
	this.setViewport = function(x, y, width, height){
		viewport.x		= x;
		viewport.y		= y;
		viewport.width	= width;
		viewport.height	= height;
	};
	this.setRotation = function(angle){ rot = angle * Math.PI / 180; };		// sets the global rotation (in radians)
	this.deg2Rad = function(angle){ return angle; };
	this.cls = function(){													// lÃ¶scht das Canvas in der LÃ¶schfarbe cColor
		canvasHandle.fillStyle = cColor.getColorString();
		canvasHandle.fillRect(0, 0, canvas.width, canvas.height);
	};
	this.clsColor = function(red, green, blue){								// legt die LÃ¶schfarbe des Canvas fest
		cColor.set(red, green, blue, 255);
		cColor.toString();
	};
	this.setColor = function(red, green, blue, alpha){						// legt die aktuelle Zeichenfarbe fest
		if(!alpha) alpha = 1.0;
		dColor.set(red, green, blue, alpha);
		dColor.toString();
	};
	this.setShadow = function(offX, offY, blur){
		canvasHandle.shadowColor = dColor.toString();
		canvasHandle.shadowOffsetX = offX;
		canvasHandle.shadowOffsetY = offY;
		canvasHandle.shadowBlur = blur;
	};
	this.setAlpha = function(alpha){ canvasHandle.globalAlpha = alpha; };
	this.setDrawMode = function(drawmode){ canvasHandle.globalCompositeOperation = drawmode; };
	this.drawRect = function(x, y, width, height, drawOutline){				// zeichnet ein Rechteck in das Canvas
		canvasHandle.save();
		canvasHandle.translate(x, y);
		if(rot >= 0.0) canvasHandle.rotate(rot);
		
		if(drawOutline){
			canvasHandle.fillStyle = dColor.toString();
			canvasHandle.fillRect(0, 0, width, height);
		}else{
			canvasHandle.strokeStyle = dColor.toString();
			canvasHandle.strokeRect(0, 0, width, height);
		}
		
		canvasHandle.translate(0 - x, 0 - y);
		canvasHandle.restore();
	};
	this.drawRoundRect = function(x, y, width, height, radius, solid){
		//canvasHandle.save();
		//canvasHandle.translate(x, y);
		//if(rot >= 0.0) canvasHandle.rotate(rot);
		if(!solid) solid = 0;
		
		var sx = x;
		var sy = y;
		var ex = x + width;
		var ey = y + height;
		var r = radius;
		
		var r2d = Math.PI/180;
		if((ex - sx) - (2 * r) < 0){r = ((ex - sx) / 2); }
		if((ey - sy) - (2 * r) < 0){r = ((ey - sy) / 2); }
		canvasHandle.beginPath();
		canvasHandle.moveTo(sx + r, sy);
		canvasHandle.lineTo(ex - r, sy);
		canvasHandle.arc(ex - r, sy + r, r, r2d * 270, r2d * 360, false);
		canvasHandle.lineTo(ex, ey - r);
		canvasHandle.arc(ex - r, ey - r, r, r2d * 0, r2d * 90, false);
		canvasHandle.lineTo(sx + r, ey);
		canvasHandle.arc(sx + r, ey - r, r, r2d * 90, r2d * 180, false);
		canvasHandle.lineTo(sx, sy + r);
		canvasHandle.arc(sx + r, sy + r, r, r2d * 180, r2d * 270, false);
		canvasHandle.closePath();
		
		if(solid == 1){ 
			canvasHandle.fillStyle = dColor.toString(); 
			canvasHandle.fill();
		}else{ 
			canvasHandle.strokeStyle = dColor.toString(); 
			canvasHandle.stroke();
		}
		
		//canvasHandle.translate(0 - x, 0 - y);
		//canvasHandle.restore();
	};
	this.drawLine = function(x1, y1, x2, y2){								// zeichnet eine Linie von x1, y1 nach x2, y2 in der akt. Zeichenfarbe
		canvasHandle.strokeStyle	= dColor.toString();
		canvasHandle.beginPath();
		canvasHandle.moveTo(x1, y1);
		canvasHandle.lineTo(x2, y2);
		canvasHandle.stroke();
	};
	this.drawOval = function(x, y, width, height, solid){					// zeichnet ein Oval in das Canvas
		if(!solid) solid = 0;
		if(solid == 1){ 
			canvasHandle.fillStyle = dColor.toString(); 
		}else{ 
			canvasHandle.strokeStyle	= dColor.toString(); 
		}
		
		var kappa = .5522848;
		ox = (width / 2) * kappa, // control point offset horizontal
		oy = (height / 2) * kappa, // control point offset vertical
		xe = x + width,           // x-end
		ye = y + height,           // y-end
		xm = x + width / 2,       // x-middle
		ym = y + height / 2;       // y-middle
		
		canvasHandle.beginPath();
		canvasHandle.moveTo(x, ym);
		canvasHandle.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
		canvasHandle.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
		canvasHandle.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
		canvasHandle.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
		canvasHandle.closePath();
		
		if(solid == 0){
			canvasHandle.stroke();
		}else{
			canvasHandle.fill();
		}

	};
	this.drawText = function(text, x, y){									// zeichnet einen String in das Canvas
		if(text && x && y){
			canvasHandle.fillStyle = dColor.toString();
			canvasHandle.fillText(text, x, y);
		}
	};
	this.autoMidHandle = function(value){ aMidHandle = value; };
	this.midHandle = function(image, value){ image.midHandle = value; };
	this.getMidHandle = function(){ return aMidHandle; };
	this.getScale = function(){ return scale; };
	this.getRotation = function(){return rot; };
	this.loadImage = function(filename){									// LÃ¤dt ein Bild
		var img = new tImage();
		img.load(filename);
				
		return img;
	};
	this.loadAnimImage = function(filename, cellWidth, cellHeight, cellCount){// lÃ¤dt ein Tileset
		var img = new tImage();
		img.loadAnim(filename, cellWidth, cellHeight, cellCount);
		return img;
	};
	this.desktop = function(){ return new tDesktop(); };					// gibt ein Objekt vom Typ "tDesktop" zurÃ¼ck
	this.milliSecs = function(){ 											// gibt die vergangenen Millisekunden seit Systemstart zurÃ¼ck
		var d = new Date();
		return d.getTime(); 
	};
	this.backBuffer = function(){ return canvasHandle.getImageData(0, 0, canvas.width, canvas.height); };// gibt den Pixelbuffer des Canvas zurÃ¼ck
	this.flushBuffer = function(buffer, x, y){								// beendet Operationen in einem Pixelbuffer
		if(!x) x = 0;
		if(!y) y = 0;
		canvasHandle.putImageData(0, 0, buffer);
	};
	this.writePixel = function(buffer, x, y){								// schreibt einen Pixel in der aktuellen Zeichenfarbe in den Buffer
		var index				= (x * 4) + (y * canvas.width * 4);
		buffer.data[index]		= dColor.red();
		buffer.data[index + 1]	= dColor.green();
		buffer.data[index + 2]	= dColor.blue();
		buffer.data[index + 3]	= dColor.alpha();
	};
	this.readPixel = function(buffer, x, y){								// liest die Farbe des Pixels an x, y
		var index	= (x * 4) + (y * canvas.width * 4);
		rColor.set(index, index + 1, index + 2, index + 3);
		return rColor;
	};
	this.stringWidth = function(text){ return canvasHandle.measureText(text).width; };// gibt die Breite eines Strings in Pixel zurÃ¼ck
	this.loadFont = function(family, filename, isBold, isItalic){			// lÃ¤dt einen Font
		var fnt = '';
		fnt += '@font-face{ font-family : "' + family + '"; ';
		fnt += 'src : url(' + filename + '); ';
		if(isBold) fnt += 'font-weight : bold; ';
		if(isItalic) fnt += 'font-style : italic; ';
		fnt += ' };';
		//src: local(" real FontName "), url( /location/of/font/FontFileName.ttf ) format("truetype"); /* non-IE */  
		var ss1 = document.createElement('style');
		ss1.setAttribute("type", "text/css");
		if (ss1.styleSheet){
			ss1.styleSheet.cssText = fnt;
		}else{
			var tt1 = document.createTextNode(fnt);
			ss1.appendChild(tt1);
		}
		var hh1 = document.getElementsByTagName('head')[0];
		hh1.appendChild(ss1);
	};
	this.setFont = function(family, height, isBold, isItalic){				// deklariert einen geladenen Font als aktiv
		var style = "";
		if((!isBold) && (!isItalic)) style = "normal";
		if(isBold) style += " bold";
		if(isItalic) style += " italic";
		canvasHandle.font = style + " " + height + " " + family;
	};
	this.rand = function(min, max){
		if(min > max){ return(-1); }
		if(min == max){ return( min ); }
		return(min + parseInt(Math.random() * (max - min + 1)));
	};
	this.createBob = function(anim, firstFrame, lastFrame, speed){			// erstellt einen Bob aus einem AnimImage
		var bob = new tBob();
		bob.create(anim, firstFrame, lastFrame, speed);
		return bob;
	};
	this.rectsOverlap = function(r1X, r1Y, r1Width, r1Height, r2X, r2Y, r2Width, r2Height){// prÃ¼ft ob zwei Rechtecke miteinander kollidieren	
		var r1X2 = r1X + r1Width;
		var r1Y2 = r1Y + r1Height;
		var r2X2 = r2X + r2Width;
		var r2Y2 = r2Y + r2Height;
		var result = false;
		if((r1X > r2X) && (r1Y > r2Y) && (r1X < r2X2) && (r1Y < r2Y2)) result = true;
		if((r1X2 > r2X) && (r1Y2 > r2Y) && (r1X2 < r2X2) && (r1Y2 < r2Y2)) result = true;
		return result;
	};
	var soundAbilities = { 'mp3' : '', 'ogg' : '' };						// Gibt zurÃ¼ck welche Soundformate geladen werden kÃ¶nnen
	this.readSoundAbilities = function(){
		var a = document.createElement('audioAbilities'); 
		if(a.canPlayType){
			// Currently canPlayType(type) returns: "", "maybe" or "probably" 
			soundAbilities.mp3 = !!a.canPlayType && "" != a.canPlayType('audio/mpeg');
			soundAbilities.ogg = !!a.canPlayType && "" != a.canPlayType('audio/ogg; codecs="vorbis"');
		}
	};
	this.canMP3 = function(){												// Gibt True zurÃ¼ck wenn der Browser MP3 spielen kann, ansonsten False 
		var result = false;
		if(soundAbilities.mp3 == 'maybe' || soundAbilities.mp3 == 'probably') result = true;
		return result; 
	};
	this.canOGG = function(){												// Gibt True zurÃ¼ck wenn der Browser OGG spielen kann, ansonsten False
		var result = false;
		if(soundAbilities.ogg == 'maybe' || soundAbilities.ogg == 'probably') result = true;
		return result; 
	};
};

/*
 * ========================================================
 * procedual Interface
 * ========================================================
 */
var jbbBase;
var jbbBaseMouse;
var jbbBaseKeyboard;
var waitForResources = false;

function WaitForRes(value){
	waitForResources = value;
}

// read sound abilities
var jbbSoundAbilities = { 'mp3' : '', 'ogg' : '' };
var jbbTestAudio = document.createElement('jbbTestAudio'); 
if(jbbTestAudio.canPlayType){
	// Currently canPlayType(type) returns: "", "maybe" or "probably" 
	jbbSoundAbilities.mp3 = !!jbbTestAudio.canPlayType && "" != jbbTestAudio.canPlayType('audio/mpeg');
	jbbSoundAbilities.ogg = !!jbbTestAudio.canPlayType && "" != jbbTestAudio.canPlayType('audio/ogg; codecs="vorbis"');
}

function BackBuffer(){ return jbbBase.backBuffer(); };
function Cls(){ jbbBase.cls(); };
function ClsColor(r, g, b,a){ jbbBase.clsColor(r, g, b); };
function DrawImage(img, x, y, frame){ img.draw(jbbBase, x, y, frame); };
function TileImage(img, x, y, frame){ img.tileImage(jbbBase, x, y, frame); };
function DrawLine(x1, y1, x2, y2){ jbbBase.drawLine(x1, y1, x2, y2); };
function DrawRect(x, y, width, height, radius, solid){
	if(radius){
		jbbBase.drawRoundRect(x, y, width, height, radius, solid);
	}else{
		jbbBase.drawRect(x, y, width, height);
	}
};
function DrawOval(x, y, width, height, solid){ jbbBase.drawOval(x, y, width, height, solid); };
function DrawText(text, x, y){ jbbBase.drawText(text, x, y); };
function FlushBuffer(buffer, x, y){ jbbBase.flushBuffer(buffer, x, y); };
function Graphics(canvasID, mainLoop, fps){
	jbbBase			= new jBB;
	jbbBaseMouse	= new tMouse;
	jbbBaseKeyboard	= new tKeyboard;
	
	jbbBase.graphics(canvasID, mainLoop, fps);
	jbbBaseMouse.init(canvasID);
	jbbBaseKeyboard.init();
};
function GraphicsHeight(){ return jbbBase.graphicsHeight(); };
function GraphicsWidth(){ return jbbBase.graphicsWidth(); };
function SetViewport(x, y, width, height){ jbbBase.setViewport(x, y, width, height); };
function CenterCanvas(){ jbbBase.centerCanvas(); };
function ResizeCanvas(canvasID, width, height){
	var c = document.getElementById(canvasID);
	
	if(width == "full" || width == "Full"){
		document.body.style.overflow = 'hidden';
		
		var desk = new tDesktop();
		width = desk.getWidth();
		height= desk.getHeight();
	}
	
	c.width	= width;
	c.height = height;
};
function DebugLog(msg){ throw(msg); };
function Notify(msg){ alert(msg); };
function KeyDown(key){ return jbbBaseKeyboard.keyDown(key); };
function KeyPressed() { return jbbBaseKeyboard.keyPressed(); };
function KeyHit(key){ return jbbBaseKeyboard.keyHit(key); };
function LoadAnimImage(filename, cellWidth, cellHeight, cellCount){ 
	var img = new tImage();
	img.loadAnim(filename, cellWidth, cellHeight, cellCount); 
	return img;
};

function AutoMidHandle(value){ jbbBase.autoMidHandle(value); };
function MidHandle(image, value){ jbbBase.midHandle(image, value); };
function LoadImage(filename){
	var img = new tImage(filename);
	if(waitForResources == true){
		while(!img.isReady()){}
	}
	return img; 
};
function OnImageLoaded(img, func){ img.onLoaded(func); };
function ImageRectOverlap(img, x, y, rectX, rectY, rectWidth, rectHeight){ img.rectOverlap(x, y, rectX, rectY, rectWidth, rectHeight); };
function RectsOverlap(rect1x, rect1y, rect1width, rect1height, rect2x, rect2y, rect2width, rect2height){ return jbbBase.rectsOverlap(rect1x, rect1y, rect1width, rect1height, rect2x, rect2y, rect2width, rect2height); };
function MilliSecs(){ return new Date().getTime();  };
function MouseDown(key){ return jbbBaseMouse.mouseDown(key); };
function MouseHit(key){ return jbbBaseMouse.mouseHit(key); };
function MouseX(){ return jbbBaseMouse.mouseX(); };
function MouseY(){ return jbbBaseMouse.mouseY(); };
function MouseWheel(){ return jbbBaseMouse.wheel(); };
function HidePointer(){ jbbBaseMouse.hidePointer(jbbBase.getCanvasElement()); };
function ShowPointer(){ jbbBaseMouse.showPointer(jbbBase.getCanvasElement()); };
function SetColor(r, g, b, a){ jbbBase.setColor(r, g, b, a); };
function SetShadow(offX, offY, blur){ jbbBase.setShadow(offX, offY, blur); };
function SetAlpha(alpha){ jbbBase.setAlpha(alpha); };
function SetDrawMode(drawmode){ jbbBase.setDrawMode(drawmode); };
function SetScale(scaleX, scaleY){ jbbBase.setScale(scaleX, scaleY); };
function SetRotation(angle){ jbbBase.setRotation(jbbBase.deg2Rad(angle)); }; // angle as degree!
function Desktop(){ return new tDesktop; };
function DesktopWidth(desk){ return desk.getWidth(); };
function DesktopHeight(desk){ return desk.getHeight(); };
function GetScaleX(){ return jbbBase.scale.x; };
function GetScaleY(){ return jbbBase.scale.y; };
function CreateBob(image, firstFrame, lastFrame, speed){
	var bob = new tBob;
	bob.create(image, firstFrame, lastFrame, speed);
	return bob;
};
function StartBob(bob){ bob.start(); };
function StopBob(bob){ bob.stop(); };
function BobRange(bob, rangeName, firstFrame, lastFrame, frameSpeed){ bob.createRange(rangeName, firstFrame, lastFrame, frameSpeed); };
function SetBobRange(bob, rangeName){ bob.setRange(rangeName); };
function ResetBob(bob){ bob.reset(); };
function DeleteBobRange(bob, rangeName){ bob.deleteRange(rangeName); };
function DrawBob(bob, x, y){ bob.draw(jbbBase.getCanvas(), x, y, jbbBase.getMidHandle()); };
function BobSpeed(bob, speed){ bob.setSpeed(speed); };
function WritePixel(buffer, x, y){ jbbBase.writePixel(buffer, x, y); };
function ReadPixel(buffer, x, y){ return jbbBase.readPixel(buffer, x, y); };
function Red(color){ return color.red(); };
function Green(color){ return color.green(); };
function Blue(color){ return color.blue(); };
function Alpha(color){ return color.alpha(); };
function StringWidth(text){ return jbbBase.stringWidth(text); };
function LoadFont(family, filename, isBold, isItalic){ jbbBase.loadFont(family, filename, isBold, isItalic); };
function SetFont(family, height, isBold, isItalic){ jbbBase.setFont(family, height, isBold, isItalic); };
function ImageWidth(image){ return image.getImage().width; };
function ImageHeight(image){ return image.getImage().height; };
function ImageLoaded(image){ return image.isReady(); };
function Flip(){};

/* ------ Misc ------ */
function Include(scriptname){
	var snode = document.createElement('script');
	snode.setAttribute('type','text/javascript');
	snode.setAttribute('src',scriptname);
	document.getElementsByTagName('head')[0].appendChild(snode);
};

/* ------ Sound ------ */
function LoadSound(filename, loop){
	var snd = new tSound;
	snd.load(filename, loop);
	if(waitForResources == true){
		while(!snd.isReady()){}
	}
	
	return snd;
};
function PlaySound(sound){ sound.play(); };
function PauseSound(sound){ sound.pause(); };
function StopSound(sound){ sound.stop(); };
function SoundLength(sound){ return sound.getDuration(); };
function SoundVolume(sound, vol){ sound.volume(vol); };
function SetSoundPosition(sound, sec){ sound.setPosition(sec); };
function GetSoundPosition(sound){ return sound.getPosition(); };
function CanPlayMP3(){ 
	var result = false;
	if(jbbSoundAbilities.mp3 == 'maybe' || jbbSoundAbilities.mp3 == 'probably') result = true;
	return result; 
};
function CanPlayOGG(){
	var result = false;
	if(jbbSoundAbilities.ogg == 'maybe' || jbbSoundAbilities.ogg == 'probably') result = true;
	return result; 
};
function SoundLoop(sound, value){ sound.soundLoop(value); };
function GetLoopCount(sound){ return sound.getLoopCount(); };

/* ------ Math ------ */
function Rand(min, max){ 
	if(min > max) return(-1);
	if(min == max) return( min );
	return(min + parseInt(Math.random() * (max - min + 1)));
};
function Rnd(min, max){ return Rand(min, max); }	// for BlitzMax compatiblity
function Cos(value){ return Math.cos(value); };
function Sin(value){ return Math.sin(value); };
function ACos(value){ return Math.acos(value); };
function ASin(value){ return Math.asin(value); };
function Abs(value){ return Math.abs(value); };
function Tan(value){ return Math.tan(value); };
function ATan(value){ return Math.atan(value); };
function Ceil(value){ return Math.ceil(value); };
function Sqr(value){ return Math.sqrt(value); }
function Exp(value){ return Math.exp(value); };
function Log(value){ return Math.log(value); };
function Floor(value){ return Math.floor(value); };
function Dim2D(cols, rows){
	var a = new Array(cols);
	for(var i = 0; i < cols; i++){
		a[i] = new Array(rows);
	}
	return a;
};

/* ------ Lists ------ */
function CreateList(){ return new tList; };
function ListAddLast(list, val){ list.addLast(val); };
function ListAddFirst(list, val){ list.addFirst(val); };
function RemoveFromList(list, val){ list.remove(val); };
function ListFlip(list){ list.flip(); };
function NextItem(list){ return list.next(); };
function ClearList(list){ list.clear(); };
function ResetList(list){ list.reset(); };

/* ------ Maps ------ */
function CreateMap(){ return new tMap; };
function MapInsert(map, key, value){ map.add(key, value); };
function MapGetValue(map, key){ return map.get(key); };
function MapRemoveItem(map, key){ map.remove(key); };
function MapNextItem(map){ return map.next(); };
function ResetMap(map){ map.reset(); };
function ClearMap(map){ map.clear(); };

/* ------ Strings ------ */
function Left(inString, chars){ return inString.substr(0, chars); };
function Mid(inString, startPos, chars){ return inString.substr(startPos, chars); };
function Right(inString, chars){ return inString.substr(inString.length - chars, chars); };
function InStr(inString, toFind){ return inString.indexOf(toFind); };
function Replace(inString, toFind, replaceWith){ return inString.replace(toFind, replaceWith); };
function Lower(inString){ return inString.toLowerCase(); };
function Upper(inString){ return inString.toUpperCase(); };
function Trim(inString){ return inString.replace (/^\s+/, '').replace (/\s+$/, ''); };
