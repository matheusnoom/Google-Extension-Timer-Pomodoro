//mapeamento dos botoes
let timer = document.querySelector(".timer");
let textBoxStatus = document.querySelector("#statusText");
let progressBar = document.querySelector(".timerBox__fill");

let botaoPlay = document.querySelector("#play");
let botaoReset = document.querySelector("#reset");


//get storage
async function getFocosStorage() {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get(minutesFocos, function (value) {
                resolve(value.minutesFocos);
            })
        } catch (e) {
            reject(e);
        }
    });
}

async function getBreakStorage() {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get(minutesBreak, function (value) {
                resolve(value.minutesFocos);
            })
        } catch (e) {
            reject(e);
        }
    });
}


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
function focosTimer() {
    clearTimeout(currentTimer);
    currentTimer = setInterval(() => {

        actualSeconds--;
        updateProgressBar(minutesFocos)
        if (actualSeconds < 0) {
            actualMinutes--;
            actualSeconds = segundosTeste;
        }
        if (actualMinutes === 0 && actualSeconds === 0) {
            clearTimeout(currentTimer);

            actualMinutes = minutesBreak;
            actualSeconds = segundosTeste;

            textBoxStatus.innerText = "BREAK";
            textBoxStatus.style.color = "#a94e4d";
            progressBar.style.background = "#C15754";
            progressBar.style.height = `${200}px`;

            actualPorcent = 200;
            onFocus = !onFocus;

            breakTimer()
        }

        setTimer(actualMinutes, actualSeconds)
    }, 1000);
}

function breakTimer() {
    clearTimeout(currentTimer);
    currentTimer = setInterval(() => {
        actualSeconds--;
        updateProgressBar(minutesFocos)
        if (actualSeconds < 0) {
            actualMinutes--;
            actualSeconds = segundosTeste;

        }
        if (actualMinutes === 0 && actualSeconds === 0) {
            clearTimeout(currentTimer);

            actualMinutes = minutesFocos;
            actualSeconds = segundosTeste;

            textBoxStatus.style.color = "#0e814a";
            textBoxStatus.innerText = "FOCOS";
            progressBar.style.background = "#15DA7A";
            progressBar.style.height = `${200}px`;

            actualPorcent = 200;
            onFocus = !onFocus;

            focosTimer()
        }
        setTimer(actualMinutes, actualSeconds)

    }, 1000);
}


//Funcao dos botoes
function pauseTimer() {
    clearTimeout(currentTimer);
}

function resetTimer() {
    actualPorcent = 200;
    progressBar.style.height = `${200}px`;
    if (onFocus) {
        actualMinutes = minutesFocos;
        setTimer(minutesFocos, segundosTeste)
    } else {
        actualMinutes = minutesBreak;
        setTimer(minutesBreak, segundosTeste)
    }
    actualSeconds = segundosTeste;
}


//Variaveis
var minutesFocos = await getFocosStorage() - 1;
var minutesBreak = await getBreakStorage() - 1;
var segundosTeste = 60;
var actualPorcent = 200;
let currentTimer;
let onFocus = true;
let playStatus = true;
let actualMinutes = minutesFocos;
let actualSeconds = segundosTeste;


//Chamada das funcoes:
setTimer(minutesFocos, actualSeconds);

focosTimer();
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




