//init of script variable
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var canvasTop = 0;
var canvasLeft = 0;
var maxDepth = parseInt(document.getElementById("recursion").value);
var fractalType = document.getElementById("selectFractal").value;
var color = document.getElementById("color").value;
var backgroundColor = document.getElementById("backgroundColor").value;

//launch app
$('body').onload = launch();
$('.redraw').change(function(){
	launch();
});

function launch(){
	setVariables();
	selectFractal();
}

//set variables
function setVariables(){
	fractalType = document.getElementById("selectFractal").value;
	maxDepth = parseInt(document.getElementById("recursion").value);
	color = document.getElementById("color").value;
	backgroundColor = document.getElementById("backgroundColor").value;
}

//select fractal and launch generation
function selectFractal(){
	if (fractalType === "fractalTree") {
		startFractalTree();
	}
	if(fractalType === "sierpinskiTriangle") {
		startSierpinski();
	}
	if (fractalType === "kochSnowflake") {
		startKochSnowflake();
	}
}