const startButton = document.querySelector(".startButton");


startButton.addEventListener("click", () => {
    window.location.href = 'timertab.html';
    let minutesFocos = document.querySelector("#focos").value;
    let minutesBreak = document.querySelector("#break").value;
    chrome.storage.local.set({'minutesFocos': minutesFocos});
    chrome.storage.local.set({'minutesBreak': minutesBreak});
})





