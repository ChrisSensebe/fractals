//calculate branch length draw branch calculate angle of new branches 
function fractalTree(startX,startY,angle,depth){
	//calculate length of branch
	var targetX = startX + 115*(Math.pow(.8,depth))*Math.cos(angle);
	var targetY = startY - 115*(Math.pow(.8,depth))*Math.sin(angle);
	drawBranch(depth,startX,startY,targetX,targetY);
	if (depth < maxDepth) {
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