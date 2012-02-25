var rules = {};
var setsize = function(obj){
    rules[obj.id] = rules[obj.id] || new Object();
    rules[obj.id]["width"] = obj.wi;
    rules[obj.id]["height"] = obj.he;
    console.log(rules);
}

var movediv = function(el){
	window.onclick = function(ev){
		console.log("clicked, x,y ="+ev.x + " " + ev.y);
		el.style.position = "absolute";
		el.style.left = ev.x;
		el.style.top = ev.y;
	}
}

var resizediv = function(el){
    window.onclick = function(ev){
        console.log("clicked, x,y = "+ev.x + " " + ev.y);
        var t = el.offsetTop;
        var l = el.offsetLeft;
        console.log("l,t = "+l + " " + t);
        if (ev.x>= l && ev.y >= t){
            console.log("here");
            el.style.width = ev.x-l+"px";
            el.style.height = ev.y-t+"px";
        }else {
            return;
        }
        var ret = {
            "id": el.id,
            "wi": el.width,
            "he": el.height
        }
        setsize(ret);
    }
}
swap = function(id1, id2) {
	el1 = document.getElementById(id1);
	el2 = document.getElementById(id2);
	el1.innerHTML = el2.innerHTML;
}


var curElement = null;
var mousex = 0;
var mousey = 0;
mousemove = function(ev) {
	xdelta = ev.x - mousex;
	ydelta = ev.y - mousey;
	element.style.left = parseInt(element.style.left) + xdelta + "px";
	element.style.top = parseInt(element.style.top) + ydelta + "px";
	mousex += xdelta;
	mousey += ydelta;
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
console.log("34");
chrome.extension.onRequest.addListener(
    function(req, sender, sendback){
        if (req.command == "startemode"){
            console.log('38');
            console.log('starting emode');
            //set it up so divs do stuff on hover
            var newstyle = document.createElement("style");
            newstyle.innerHTML = "div:hover{border:2px solid blue}\ndiv{border:1px solid red}";
            document.head.appendChild(newstyle);
            window.onclick = function(ev){
                var el = ev.target;
                while (el.tagName != "DIV"){
                    el = el.parentNode;
                    if (el.tagName == "BODY"){
                        console.log('body reached, stopping')
                        return;
                    }
                }
                try{
                document.head.removeChild(newstyle);
                }catch(Exception){}
                el.style.border = "2px solid blue";
                curElement = el;
                resizediv(el);

            }

        }else if (req.command == "endmode"){
            console.log('stop emode');
        }
        sendback();
    }
);
    
