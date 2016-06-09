$(document).ready(function() {
	var canvasElement = document.getElementById('myCanvas');
	var ctx = canvasElement.getContext('2d');
	canvasElement.tabIndex = 1;
	canvasElement.width = window.innerWidth;
	var mainChar = new Image();
	var flyImage = new Image();
	var rockSrc = [
		'./sprites/rock_1.png',
		'./sprites/rock_2.png',
		'./sprites/rock_3.png',
	]
	
	mainChar.onload = function() {
		var charOffsetY = 0; // starting point (top)
		var startPoint = [0, canvasElement.height-75]
		var stoping_point = 55;
		var FPS = 30;
		var intro = false;
		var rockcount = 0;
		var rockInstance = [];
		
		setInterval(function() {
            update();
            draw();
            rocks();
        }, 1000/FPS);
        rocks();
        function draw() {
	        ctx.clearRect(0, startPoint[1], canvasElement.width, mainChar.height);
        	ctx.drawImage(mainChar, startPoint[0], startPoint[1]);
        };

        function rocks() {
        	if (rockcount <= 5) {
	        	rockInstance[rockcount] = new Image();
	        	var imagIndex = Math.floor(Math.random() * rockSrc.length);
	        	rockInstance[rockcount].src = rockSrc[imagIndex];
	        	ctx.save();
	        	ctx.drawImage(rockInstance[rockcount], Math.floor(Math.random() * canvasElement.width), 0);
	        	ctx.restore();
        		rockcount++;
        	}
        }

        function getOffset(e) {
			var _x = 0;
			var _y = 0;
			while( e && !isNaN( e.offsetLeft ) && !isNaN( e.offsetTop ) ) {
			    _x += e.offsetLeft - e.scrollLeft;
			    _y += e.offsetTop - e.scrollTop;
			    e = e.offsetParent;
			}
			return { top: _y, left: _x };
		}
        function update() {
        	if (startPoint[0] < stoping_point) {
        		startPoint[0] += 5;
        	}
        	// for(var x=0; x < rockInstance.length; x++) {
        	// 	// ctx.save()
        	// 	var img = new Image()
        	// 	img.src = rockInstance[x].src;
        	// 	ctx.clearRect(0, getOffset(rockInstance[x]).top, 100, 100);
        	// 	// ctx.translate(0,0);
        	// 	ctx.drawImage(img, getOffset(rockInstance[x]).left, getOffset(rockInstance[x]).top+5);

        	// }

        };
        window.addEventListener('keydown', function(e){
            if (e.keyCode === 37) { //left
            	move('walk-left', 10);
            } else if (e.keyCode === 39) { //right
            	move('walk-right', 10);
            } else if (e.keyCode === 32) { //space -> jump
            	move('punch', 30);
            }
            update();
        });
        function move(type, offset) {
        	if (type == 'walk-right') {
        		startPoint[0] += offset;
        	} else if (type == 'walk-left') {
        		startPoint[0] -= offset;
        	} else if (type == 'punch') {
        		// ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        		ctx.drawImage(flyImage, startPoint[0], startPoint[1]);
        	}
        	for(var x=0; x < rockInstance.length; x++) {
        		// ctx.save()
        		var img = new Image()
        		img.src = rockInstance[x].src;
        		var xy = getOffset(rockInstance[x]).top;
        		var yx = getOffset(rockInstance[x]).left;
        		// ctx.translate(0,0);
        		xy += 5;
        		ctx.drawImage(rockInstance[x], 0, 0);
        		console.log(xy + ' ' + yx);
        	}
        };

		// ctx.drawImage(mainChar, 55, canvasElement.height-200);
	};
	flyImage.src = './sprites/fly.png';
	mainChar.src = './sprites/stand.png';
});