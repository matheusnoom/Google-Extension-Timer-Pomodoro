const startButton = document.querySelector(".startButton");


startButton.addEventListener("click", () => {
    let minutesFocos = document.querySelector("#focos").value;
    let minutesBreak = document.querySelector("#break").value;

    if (minutesFocos <= null && minutesBreak <= null) {
        alert("Insira os valores")
    } else {
        window.location.href = 'timertab.html';

        chrome.storage.local.set({'minutesFocos': minutesFocos});
        chrome.storage.local.set({'minutesBreak': minutesBreak});
    }
})





