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
    selectAndDraw();
}

function selectAndDraw(){
	if ($('#selectFractal').val() === "fractalTree") {
		fractalTree(canvasWidth/2,canvasHeight,Math.PI/2,0);
	}
	else if ($('#selectFractal').val() === "kochSnowflake") {
		kochSnowflake();
	}
	else if($('#selectFractal').val() === "sierpinskiTriangle") {
		sierpinskiTriangle(0,canvasWidth,canvasHeight,0,0);
	}
}

function clearRect(){
    context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
    context.fillStyle = backgroundColor;
	context.fillRect(0,0,this.canvasWidth,this.canvasHeight);
}

function fractalTree(startX,startY,angle,depth){
    //calculate length of branch
	var targetX = startX + 115*(Math.pow(.8,depth))*Math.cos(angle);
	var targetY = startY - 115*(Math.pow(.8,depth))*Math.sin(angle);
	drawBranch(depth,startX,startY,targetX,targetY);
	if (depth < recursionDepth) {
		//calculate angle of new branches
		var newDepth     = depth +1;
		var angle1       = angle - Math.random()*Math.PI/2 +Math.PI/4;
		var angle2       = angle - Math.random()*Math.PI/2 +Math.PI/4;
		var newStartX    = targetX;
		var newStartY    = targetY;
		//recursive calls
		fractalTree(newStartX,newStartY,angle1,newDepth);
		fractalTree(newStartX,newStartY,angle2,newDepth);
	}
	//draw branch
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

function kochSnowflake(){
    
}

function sierpinskiTriangle(depth,width,height,top,left){
	//coordinates of current triangle
	var xa = left + width/2;
	var ya = top;
	var xb = left;
	var yb = top + height;
	var xc = left + width;
	var yc = top + height;
	//draw triangle if maxDepth reached
	if (depth == recursionDepth) {
		drawTriangle(xa,xb,xc,ya,yb,yc);
	}
	else{
		var newDepth = depth + 1;
		//determine top/left & height/width for next 3 triangles
		var newHeight = height/2;
		var newWidth  = width/2;
		var top1      = top;
		var left1     = left + width/4;
		var top2      = top + height/2;
		var left2     = left;
		var top3      = top + height/2;
		var left3     = left + width/2;
		//recursive calls
		sierpinskiTriangle(newDepth,newWidth,newHeight,top1,left1);
		sierpinskiTriangle(newDepth,newWidth,newHeight,top2,left2);
		sierpinskiTriangle(newDepth,newWidth,newHeight,top3,left3);
	}
	//draw triangle
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