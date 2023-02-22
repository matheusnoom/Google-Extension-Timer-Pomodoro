chrome.action.onClicked.addListener((tab) => {
    chrome.windows.create({
        url: chrome.runtime.getURL("/popups/popup.html"),
        type: "popup",
        width: 350,
        height: 480
    })
});