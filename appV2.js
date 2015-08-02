var recursionDepth;
var color;
var backgroundColor;
var canvas          = $('#canvas').get(0);
var context         = canvas.getContext('2d');
var canvasHeight    = canvas.height;
var canvasWidth     = canvas.width;

$('body').onload = drawFractal();
$('.redraw').change(function(){
	drawFractal();
});

function drawFractal(){
    recursionDepth  = $('#recursion').val();
    color           = $('#color').val();
    backgroundColor = $('#backgroundColor').val();
    clearRect();
    select();
}

// select fractal
function select(){
	if ($('#selectFractal').val() === "fractalTree") {
		fractalTree(canvasWidth/2,canvasHeight,Math.PI/2,0);
	}
	else if ($('#selectFractal').val() === "kochSnowflake") {
		kochSnowflake(canvasWidth/4,2*canvasHeight/3,0,400);
	}
	else if($('#selectFractal').val() === "sierpinskiTriangle") {
		sierpinskiTriangle(0,canvasWidth,canvasHeight,0,0);
	}
}

// clear canvas
function clearRect(){
    context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
    context.fillStyle = backgroundColor;
	context.fillRect(0,0,this.canvasWidth,this.canvasHeight);
}

// calculate & draw fractaltree
function fractalTree(startX,startY,angle,depth){
    // calculate length of branch
	var targetX = startX + 115*(Math.pow(.8,depth))*Math.cos(angle);
	var targetY = startY - 115*(Math.pow(.8,depth))*Math.sin(angle);
	drawBranch(depth,startX,startY,targetX,targetY);
	if (depth < recursionDepth) {
		// calculate angle of new branches
		var newDepth     = depth +1;
		var angle1       = angle - Math.random()*Math.PI/2 +Math.PI/4;
		var angle2       = angle - Math.random()*Math.PI/2 +Math.PI/4;
		var newStartX    = targetX;
		var newStartY    = targetY;
		// recursive calls
		fractalTree(newStartX,newStartY,angle1,newDepth);
		fractalTree(newStartX,newStartY,angle2,newDepth);
	}
	// draw branch
    function drawBranch(depth,startX,startY,targetX,targetY){
        context.strokeStyle = color;
        context.beginPath();
        context.lineWidth = 10*(Math.pow(.8,depth));
        context.moveTo(startX,startY);
        context.lineTo(targetX,targetY);
        context.stroke();
        context.closePath();
    }
}

// calculate & draw kochsnowflake
function kochSnowflake(startX,startY,startAngle,length){
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
	// draw triangle side
    function drawSide(startX,startY,angle,length,depth){
        // max recursion draw a strait line
        if (depth === recursionDepth) {
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
}

// calculate & draw sierpinskytriangle
function sierpinskiTriangle(depth,width,height,top,left){
	//coordinates of current triangle
	var xa = left + width/2;
	var ya = top;
	var xb = left;
	var yb = top + height;
	var xc = left + width;
	var yc = top + height;
	// draw triangle if maxDepth reached
	if (depth == recursionDepth) {
		drawTriangle(xa,xb,xc,ya,yb,yc);
	}
	else{
		var newDepth = depth + 1;
		// determine top/left & height/width for next 3 triangles
		var newHeight = height/2;
		var newWidth  = width/2;
		var top1      = top;
		var left1     = left + width/4;
		var top2      = top + height/2;
		var left2     = left;
		var top3      = top + height/2;
		var left3     = left + width/2;
		// recursive calls
		sierpinskiTriangle(newDepth,newWidth,newHeight,top1,left1);
		sierpinskiTriangle(newDepth,newWidth,newHeight,top2,left2);
		sierpinskiTriangle(newDepth,newWidth,newHeight,top3,left3);
	}
	// draw triangle
	function drawTriangle(xa,xb,xc,ya,yb,yc){
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(xa,ya);
        context.lineTo(xb,yb);
        context.lineTo(xc,yc);
        context.lineTo(xa,ya);
        context.fill();
    }
}