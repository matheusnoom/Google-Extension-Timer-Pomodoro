const returnButton = document.querySelector(".buttonReturn");

returnButton.addEventListener("click",()=>{
    chrome.alarms.clearAll();
    window.location.href = 'popup.html';
});