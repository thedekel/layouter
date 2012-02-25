chrome.extension.onRequest.addListener(
    function(req, sender, sendback){
        console.log("anything");
        console.log(req);
        sendback();
        if (req.command == "startemode"){
            console.log('starting emode');
        }else if (req.command == "endmode"){
            console.log('stop emode');
        }
    }
);

