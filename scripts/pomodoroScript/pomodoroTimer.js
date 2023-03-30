import * as storage from './getStorageMinutes.js'
import soundAlert from './soundAlert.js'
import createTimer from './chromeTimer.js'


//mapeamento dos botoes
let timer = document.querySelector(".timer");
let textBoxStatus = document.querySelector("#statusText");
let progressBar = document.querySelector(".timerBox__fill");
let botaoPlay = document.querySelector("#play");
let botaoReset = document.querySelector("#reset");


//Funcao atualizar timer
function setTimer(minutes, seconds) {
    if (minutes < 10 && seconds < 10) {
        timer.innerHTML = "0" + minutes + ":" + "0" + seconds;
    } else if (minutes < 10) {
        timer.innerHTML = "0" + minutes + ":" + seconds;

    } else if (seconds < 10) {
        timer.innerHTML = minutes + ":" + "0" + seconds;
    } else {
        timer.innerHTML = minutes + ":" + seconds;
    }
}


//update progress bar
function updateProgressBar(minutes) {
    let onePorcent = 200 / ((minutes + 1) * 60)
    actualPorcent -= onePorcent;
    progressBar.style.height = `${actualPorcent}px`;
}


//Timer de focus e break
async function focosTimer() {
    await createTimer(actualMinutes,actualSeconds)

    textBoxStatus.innerText = "FOCUS";
    textBoxStatus.style.color = "#a94e4d";
    progressBar.style.background = "#C15754";

    clearTimeout(currentTimer);

    currentTimer = setInterval(() => {

        actualSeconds--;
        updateProgressBar(minutesFocus)
        if (actualSeconds < 0) {
            actualMinutes--;
            actualSeconds = seconds;
        }
        if (actualMinutes === 0 && actualSeconds === 0) {
            clearTimeout(currentTimer);

            actualMinutes = minutesBreak;
            actualSeconds = seconds;

            progressBar.style.height = `${200}px`;

            actualPorcent = 200;
            onFocus = !onFocus;
            soundAlert();
            breakTimer()
        }

        setTimer(actualMinutes, actualSeconds)
    }, 1000);
}

async function breakTimer() {
    await createTimer(actualMinutes,actualSeconds)

    textBoxStatus.innerText = "BREAK";
    textBoxStatus.style.color = "#0e814a";
    progressBar.style.background = "#15DA7A";

    clearTimeout(currentTimer);

    currentTimer = setInterval(() => {
        actualSeconds--;
        updateProgressBar(minutesFocus)
        if (actualSeconds < 0) {
            actualMinutes--;
            actualSeconds = seconds;

        }
        if (actualMinutes === 0 && actualSeconds === 0) {
            clearTimeout(currentTimer);

            actualMinutes = minutesFocus;
            actualSeconds = seconds;

            progressBar.style.height = `${200}px`;

            actualPorcent = 200;
            onFocus = !onFocus;
            soundAlert();
            focosTimer()
        }
        setTimer(actualMinutes, actualSeconds)

    }, 1000);
}


//Funcao dos botoes
function pauseTimer() {
    clearTimeout(currentTimer);
    chrome.alarms.clearAll();
}

async function resetTimer() {
    actualPorcent = 200;
    progressBar.style.height = `${200}px`;
    if (onFocus) {
        actualMinutes = minutesFocus;
        setTimer(minutesFocus, seconds)
        await createTimer(actualMinutes,seconds)
    } else {
        actualMinutes = minutesBreak;
        setTimer(minutesBreak, seconds)
        await createTimer(actualMinutes,seconds)
    }
    actualSeconds = seconds;
}


//Variaveis
var minutesFocus = await storage.getFocosStorage() - 1;
var minutesBreak = await storage.getBreakStorage() - 1;
var seconds = 59;
var actualPorcent = 200;
let currentTimer;
let onFocus = true;
let playStatus = true;
let actualMinutes = minutesFocus;
let actualSeconds = seconds;


//Chamada das funcoes:
setTimer(minutesFocus, actualSeconds);
focosTimer();

//Botoes
botaoPlay.addEventListener("click", () => {
    if (playStatus === true) {
        pauseTimer()
        botaoPlay.src = "../../icons/buttons/play.png";
        playStatus = !playStatus;
    } else {
        playStatus = true;
        botaoPlay.src = "../../icons/buttons/pause.png";
        if (onFocus) {
            focosTimer();
        } else {
            breakTimer();
        }
    }
});

botaoReset.addEventListener("click", resetTimer);




