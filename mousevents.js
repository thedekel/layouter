var element = null;
var mousex = 0;
var mousey = 0;

window.onmousedown = function(ev) {
	document.body.style.setProperty("-webkit-user-select", "none");
	el = ev.target;
	try {
	element = dup(el.id);
	element.style.position = "absolute";
	if (element.style.left == undefined) element.style.left = element.x + "px";
	if (element.style.top == undefined) element.style.top = element.y + "px";
	mousex = ev.x;
	mousey = ev.y;
	window.onmousemove = mousemove;
	} catch(Exception) {}
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
	try { document.body.removeChild(element) } catch(Exception) {};
	element = null;
	window.onmousemove = null;
}

swap = function(id1, id2) {
	el1 = document.getElementById(id1);
	el2 = document.getElementById(id2);
	el1.innerHTML = el2.innerHTML;
}

dup = function(id) {
	el = document.getElementById(id);
	niel = document.createElement(el.tagName);
	niel.innerHTML = el.innerHTML;
	niel.style.width = el.style.width;
	niel.style.height = el.style.height;
	niel.style.left = el.style.left;
	niel.style.top = el.style.top;
	niel.style.position = "absolute";
	niel.style.background = el.style.background;
	document.body.appendChild(niel);
	return niel;
}

