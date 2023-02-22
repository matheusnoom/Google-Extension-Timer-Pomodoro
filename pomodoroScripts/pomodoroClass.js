//mapeamento dos botoes
let timer = document.querySelector("#timer");
let textBoxStatus = document.querySelector("#statusBox");

let botao1 = document.querySelector("#play");
let botao2 = document.querySelector("#pause");
let botao3 = document.querySelector("#reset");

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


//Timer de focus e break
function focosTimer() {
    console.log("focus");
    console.log(onFocus);
    clearTimeout(currentTimer);

    currentTimer = setInterval(() => {
        actualSeconds--;
        if (actualSeconds < 0) {
            actualMinutes--;
            actualSeconds = segundosTeste;
        }
        if (actualMinutes === 0 && actualSeconds === 0) {
            clearTimeout(currentTimer);
            console.log("fim");
            actualMinutes = minutesBreak;
            actualSeconds = segundosTeste;
            textBoxStatus.innerText = "BREAK";
            onFocus = !onFocus;
            breakTimer()
        }
        setTimer(actualMinutes, actualSeconds)
    }, 1000);
}

function breakTimer() {
    console.log("break");
    console.log(onFocus);
    clearTimeout(currentTimer);
    currentTimer = setInterval(() => {
        actualSeconds--;
        if (actualSeconds < 0) {
            actualMinutes--;
            actualSeconds = segundosTeste;

        }
        if (actualMinutes === 0 && actualSeconds === 0) {
            clearTimeout(currentTimer);
            console.log("fim");
            actualMinutes = minutesFocos;
            actualSeconds = segundosTeste;
            textBoxStatus.innerText = "FOCOS";
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
var minutesFocos = await getFocosStorage();
var minutesBreak = await getBreakStorage();
var segundosTeste = 2;
let currentTimer;
let onFocus = true;
let actualMinutes = minutesFocos;
let actualSeconds = segundosTeste;


//Chamada das funcoes:
setTimer(minutesFocos, actualSeconds)

focosTimer()
botao1.addEventListener("click", () => {
    if (onFocus) {
        focosTimer();
    } else {
        breakTimer();
    }
});
botao2.addEventListener("click", pauseTimer);

botao3.addEventListener("click", resetTimer);




