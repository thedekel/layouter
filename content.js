chrome.extension.onRequest.addListener(
    function(req, sender, sendback){
        chrome.tabs.getCurrent(
            function(tab){
                console.log(tab.id);
                if (req.command == "startmode" && req.tabid!=tab.id){
                    console.log('stop on tab '+tab.id);
                }
            }
        );
    }
);

