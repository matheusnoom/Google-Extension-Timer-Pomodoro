const startButton = document.querySelector(".startButton");
let errorText = document.querySelector("#errorText");


startButton.addEventListener("click", () => {
    let minutesFocos = document.querySelector("#focos").value;
    let minutesBreak = document.querySelector("#break").value;

    try{
        if (minutesFocos <= null || minutesBreak <= null) {
            errorText.hidden = false;
        } else {
            chrome.storage.local.set({'minutesFocos': Math.round(minutesFocos)});
            chrome.storage.local.set({'minutesBreak': Math.round(minutesBreak)});
            window.location.href = 'timertab.html';
        }
    }catch (e){
        console.log(e);
    }
})





