chrome.extension.onRequest.addListener(
    function(req, sender, sendback){
        if (req.command == "startemode"){
            console.log('starting emode');
        }else if (req.command == "endmode"){
            console.log('stop emode');
        }
        sendback();
    }
);

