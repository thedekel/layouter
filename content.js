var rules = {};
var setsize = function(obj){
    rules[obj.id] = rules[obj.id] || new Object();
    rules[obj.id]["width"] = obj.wi;
    rules[obj.id]["height"] = obj.he;
    console.log(rules);
}
var setpos = function(obj){
    rules[obj.id] = rules[obj.id] || new Object();
    rules[obj.id]["x"] = obj.x;
    rules[obj.id]["y"] = obj.y;
    console.log(rules);
}

var movediv = function(el){
    window.onkeydown = function(ev){
        if (ev.keyCode == 27){
            console.log("I'm here");
            var newstyle = document.createElement("style");
            newstyle.innerHTML = "div:hover{border:2px solid blue}";
            document.head.appendChild(newstyle);
            window.onkeydown = function(ev){
                if (ev.keyCode == 27){
                    console.log("escape");
                    document.head.removeChild(newstyle);
                    window.onclick = null;
                    window.onkeydown = null;          
                }
            }
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
             //   el.style.border = "2px solid blue";
                curElement = el;
                movediv(el);
            }
        }
    }
	window.onclick = function(ev){
        if (ev.ctrlKey){
            console.log("clicked, x,y = "+ev.x + " " + ev.y);
            var t = el.offsetTop;
            var l = el.offsetLeft;
            console.log("l,t = "+l + " " + t);
            if (ev.x>= l && ev.y >= t){
                console.log("here");
                document.body.appendChild(el);
                el.style['-webkit-transition'] = 'all 1s ease-out';
                el.style.width = ev.x-l+"px";
                el.style.height = ev.y-t+"px";
                el.style.overflow = "scroll";
            }else {
                return;
            }
            var ret = {
                "id": el.id,
                "wi": el.width,
                "he": el.height
            }
            setsize(ret);
        }else{
            console.log("clicked, x,y ="+ev.x + " " + ev.y);
            document.body.appendChild(el);
            el.style['-webkit-transition'] = 'all 1s ease-out';
            el.style.position = "absolute";
            el.style.left = ev.x +"px";
            el.style.top = ev.y + "px";
            var ret = {
                "id": el.id,
                "x" : ev.x,
                "y" : ev.y
            }
            setpos(ret);
        }
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
            var newstyle = document.createElement("style");
            newstyle.innerHTML = "div:hover{border:2px solid blue}";
            document.head.appendChild(newstyle);
            window.onkeydown = function(ev){
                if (ev.keyCode == 27){
                    console.log("escape");
                    document.head.removeChild(newstyle);
                    window.onclick = null;
                    window.onkeydown = null;          
                }
            }
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
                //el.style.border = "2px solid blue";
                curElement = el;
                movediv(el);
            }

        }else if (req.command == "endmode"){
            console.log('stop emode');
        }
        sendback();
    }
);
    
