chrome.action.onClicked.addListener((tab) => {
    chrome.windows.create({
        url: chrome.runtime.getURL("/popups/popup.html"),
        type: "popup",
        width: 350,
        height: 480
    },(win)=>{
        chrome.storage.local.set({'winId': win.id});
    })
});


chrome.alarms.onAlarm.addListener(async function(alarm) {
    let teste
    await chrome.storage.local.get(['winId']).then((result) => {
        teste = result.winId;
    });
    chrome.windows.update(teste, {focused: true});
});
