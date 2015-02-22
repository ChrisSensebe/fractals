//clear canvas and launch drawing
function startKochSnowflake(){
	context.clearRect(0,0,canvasWidth,canvasHeight);
	context.fillStyle = backgroundColor;
	context.fillRect(0,0,canvasWidth,canvasHeight);
	snowFlake(canvasWidth/4,2*canvasHeight/3,0,400);
}

//start drawing snowflake
function snowFlake(startX,startY,startAngle,length){
	var x = startX;
	var y = startY;
	var angle =startAngle;
	context.beginPath();
	context.moveTo(startX,startY);
	// draw first triangle
	for (var i = 0; i < 3; i++) {
		drawSide(x,y,angle,length,0);
		x = x + length*Math.cos(angle);
		y = y + length*Math.sin(angle);
		angle = angle + 4*Math.PI/3;
	}
	context.fillStyle = color;
	context.fill();
}

function drawSide(startX,startY,angle,length,depth){
	// max recursion 7 (for performance) draw a strait line
	if (depth === maxDepth || depth >= 7) {
		context.lineTo(startX+length*Math.cos(angle),startY+length*Math.sin(angle));
	}
	// draw a side _/\_ if max depth not reached
	else{
		var newDepth = depth+1;
		var newLength = length/3;
		var startX2 = startX + newLength * Math.cos(angle);
		var startY2 = startY + newLength * Math.sin(angle);
		var startX3 = startX2 + newLength * Math.cos(angle+Math.PI/3);
		var startY3 = startY2 + newLength * Math.sin(angle+Math.PI/3);
		var startX4 = startX + 2 * newLength * Math.cos(angle);
		var startY4 = startY + 2 * newLength * Math.sin(angle);
		drawSide(startX,startY,angle,newLength,newDepth);
		drawSide(startX2,startY2,angle+Math.PI/3,length/3,newDepth);
		drawSide(startX3,startY3,angle+Math.PI*5/3,newLength,newDepth);
		drawSide(startX4,startY4,angle,newLength,newDepth);
	}
}