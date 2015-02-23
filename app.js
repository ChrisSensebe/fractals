//init of script variable
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var canvasTop = 0;
var canvasLeft = 0;
var maxDepth = parseInt(document.getElementById("recursion").value);
var color = document.getElementById("color").value;
var backgroundColor = document.getElementById("backgroundColor").value;
var fractalTree = document.getElementById("fractalTree");
var sierpinskiTriangle = document.getElementById("sierpinskiTriangle");
var kochSnowflake = document.getElementById("kochSnowflake");

//clear canvas and begin drawing fractalTree
fractalTree.onclick = function(){
	context.clearRect(0,0,canvasWidth,canvasHeight);
	context.fillStyle = backgroundColor;
	context.fillRect(0,0,canvasWidth,canvasHeight);
	fractalTree(canvasWidth/2,canvasHeight,Math.PI/2,0);
}

//clear canvas and begin drawing sierpinskiTriangle
sierpinskiTriangle.onclick = function(){
	context.clearRect(0,0,canvasWidth,canvasHeight);
	context.fillStyle = backgroundColor;
	context.fillRect(0,0,canvasWidth,canvasHeight);
	sierpinsky(0,canvasWidth,canvasHeight,canvasTop,canvasLeft);
}

//clear canvas and launch drawing kochSnowflake
kochSnowflake.onclick =  function(){
	context.clearRect(0,0,canvasWidth,canvasHeight);
	context.fillStyle = backgroundColor;
	context.fillRect(0,0,canvasWidth,canvasHeight);
	snowFlake(canvasWidth/4,2*canvasHeight/3,0,400);
}