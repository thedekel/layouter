var rules = {};
chrome.extension.sendRequest({"command":"fetch", "url":location.href},function(response){
    console.log(response);
    if (!response.rules){
        return;
    }
    rules = response.rules;
    for (i in rules){
        //get element
        var el;
        if (typeof(i)=='string' && i.charAt(0)=="#"){
            el = document.getElementById(i.substr(1));
        }else if (typeof(i)=='string' && i.charAt(0)=="."){
            var q = parseInt(i.substr(1));
            var qq = i.substr(1+q.toString().length);
            el = document.getElementsByClassName(qq)[q];
        }else{
            el = document.getElementsByTagName("DIV")[parseInt(i)];
        }
        //x and y
        if (rules[i].hasOwnProperty("x")){
            document.body.appendChild(el);
            el.style.position="absolute";
            el.style.left = rules[i].x+"px";
            el.style.top = rules[i].y+"px";
        }
        //width and height
        if (rules[i].hasOwnProperty("width")){
                el.style.width = rules[i].width;
                el.style.height = rules[i].height;
                el.style.overflow = "scroll";
                el.style.minHeight="inherit";
                el.style.minWidth="inherit";
        }
        //display
        if (rules[i].hasOwnProperty("display")){
            el.style.display = "none";
        }
    }
});
var setsize = function(obj){
    var oid;
    if (obj.id){
        oid = "#"+obj.id;
    }else if (obj.class){
        var clist = document.getElementsByClassName(obj.class);
        for (i = 0;i<clist.length; i++){
            if (obj == clist[i]){
                oid = "."+i+obj.class;
            }
        }
    }else{
        var dlist = document.getElementsByTagName("DIV");
        for (i = 0;i<dlist.length; i++){
            if (obj == dlist[i]){
                oid = i+obj;
            }
        }
    }
    console.log("60, oid"+oid);
    if (!rules.hasOwnProperty(oid)){
        rules[oid] = {};
    }
    rules[oid]["width"] = obj.wi;
    rules[oid]["height"] = obj.he;
    console.log(rules);
                    if (rules){
                        console.log(rules);
                        chrome.extension.sendRequest({"loc":location.href, "str":JSON.stringify(rules)});
                    }
}
var setpos = function(obj){
     var oid;
    if (obj.id){
        oid = "#"+obj.id;
    }else if (obj.class){
        var clist = document.getElementsByClassName(obj.class);
        for (i = 0;i<clist.length; i++){
            if (obj == clist[i]){
                oid = "."+i+obj.class;
            }
        }
    }else{
        var dlist = document.getElementsByTagName("DIV");
        for (i = 0;i<dlist.length; i++){
            if (obj == dlist[i]){
                oid = i+obj;
            }
        }
    }
    console.log("85, oid="+oid);
    if (!rules.hasOwnProperty(oid)){
        rules[oid] = {};
    }
    rules[oid]["x"] = obj.x;
    rules[oid]["y"] = obj.y;
    console.log(rules);
                    if (rules){
                        console.log(rules);
                        chrome.extension.sendRequest({"loc":location.href, "str":JSON.stringify(rules)});
                    }
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
                    if (rules){
                        console.log(rules);
                        chrome.extension.sendRequest({"loc":location.href, "str":JSON.stringify(rules)});
                    }
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
                el.style.border = "2px solid blue";
                curElement = el;
                movediv(el);
            }
        } else if (ev.keyCode == 68){
                    console.log("am I here???");
                    el.style.display = "none";

                
 var oid;
    if (el.id){
        oid = "#"+el.id;
    }else if (el.class){
        var clist = document.getElementsByClassName(el.class);
        for (i = 0;i<clist.length; i++){
            if (el == clist[i]){
                oid = "."+i+el.class;
            }
        }
    }else{
        var dlist = document.getElementsByTagName("DIV");
        for (i = 0;i<dlist.length; i++){
            if (el == dlist[i]){
                oid = i+el;
            }
        }
    }
    if (!rules.hasOwnProperty(oid)){
        rules[oid] = {};
    }
    rules[oid]["display"] = "none";
    console.log(rules);
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
                el.style.minHeight="inherit";
                el.style.minWidth="inherit";
            }else {
                return;
            }
            var ret = {
                "id": el.id,
                "wi": el.style.width,
                "he": el.style.height
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
                    if (rules){
                        console.log(rules);
                        chrome.extension.sendRequest({"loc":location.href, "str":JSON.stringify(rules)});
                    }
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
                el.style.border = "2px solid blue";
                curElement = el;
                movediv(el);
            }

        }else if (req.command == "endmode"){
            console.log('stop emode');
        }
        sendback();
    }
);
    
