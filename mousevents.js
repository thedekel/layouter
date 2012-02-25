var element = null;
var mousex = 0;
var mousey = 0;

window.onmousedown = function(ev) {
	document.body.style.setProperty("-webkit-user-select", "none");
	element = ev.target;
	element.style.position = "absolute";
	if (element.style.left == undefined) element.style.left = element.x + "px";
	if (element.style.top == undefined) element.style.top = element.y + "px";
	mousex = ev.x;
	mousey = ev.y;
	window.onmousmomve = mousemove;
	
}

mousemove = function(ev) {
	xdelta = ev.x - mousex;
	ydelta = ev.y - mousey;
	element.style.left = parseInt(element.style.left) + xdelta + "px";
	element.style.top = parseInt(element.style.top) + ydelta + "px";
	mousex += xdelta;
	mousey += ydelta;
}

window.onmouseup = function(ev) {
	element = null;
	document.body.style.setProperty("-webkit-user-select", "auto");
	window.onmousemove = null;
}
