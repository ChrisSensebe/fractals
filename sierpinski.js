function sierpinsky(depth,width,height,top,left){
	//coordinates of current triangle
	var xa = left + width/2;
	var ya = top;
	var xb = left;
	var yb = top + height;
	var xc = left + width;
	var yc = top + height;
	//draw triangle if maxDepth reached
	if (depth === maxDepth) {
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
		sierpinsky(newDepth,newWidth,newHeight,top1,left1);
		sierpinsky(newDepth,newWidth,newHeight,top2,left2);
		sierpinsky(newDepth,newWidth,newHeight,top3,left3);
	}
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
	// context.closePath();
}