//mapeamento dos botoes
let minutes = document.querySelector("#minutesCase");
let seconds = document.querySelector("#secondsCase");
let textBoxStatus = document.querySelector("#statusBox");

let botao1 = document.querySelector("#play");
let botao2 = document.querySelector("#pause");
let botao3 = document.querySelector("#reset");

//get storage
let minutesFocos;
let minutesBreak;

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


minutesFocos = await getFocosStorage();
minutesBreak = await getBreakStorage();


//variaveis utilizadas
let onFocus = true;
let actualMinutes = minutesFocos;
let actualSeconds = 3;

minutes.innerText = minutesFocos;
seconds.innerText = actualSeconds;


let currentTimer;

function focosTimer() {
    onFocus = !onFocus;
    clearTimeout(currentTimer);

    currentTimer = setInterval(() => {
        actualSeconds--;
        if (actualSeconds < 0) {
            actualMinutes--;
            actualSeconds = 3;
        }
        if (actualMinutes === 0 && actualSeconds === 0) {
            clearTimeout(currentTimer);
            console.log("fim");
            actualMinutes = minutesBreak;
            actualSeconds = 3;
            textBoxStatus.innerText = "BREAK";
            breakTimer()
        }
        seconds.innerText = actualSeconds;
        minutes.innerText = actualMinutes;
    }, 1000);
}

function breakTimer() {
    onFocus = !onFocus;
    clearTimeout(currentTimer);
    currentTimer = setInterval(() => {
        actualSeconds--;
        if (actualSeconds < 0) {
            actualMinutes--;
            actualSeconds = 3;

        }
        if (actualMinutes === 0 && actualSeconds === 0) {
            clearTimeout(currentTimer);
            console.log("fim");
            actualMinutes = minutesFocos;
            actualSeconds = 3;
            textBoxStatus.innerText = "FOCOS";
            focosTimer()
        }
        seconds.innerText = actualSeconds;
        minutes.innerText = actualMinutes;
    }, 1000);
}


function pauseTimer() {
    clearTimeout(currentTimer);
}

function resetTimer() {
    if (onFocus) {
        actualMinutes = minutesFocos;
        minutes.innerText = minutesFocos;
        seconds.innerText = 60;
    } else {
        actualMinutes = minutesBreak;
        minutes.innerText = minutesBreak;
        seconds.innerText = 60;
    }
    actualSeconds = 3;
}

//Chamada das funcoes

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




