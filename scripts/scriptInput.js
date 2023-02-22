// Inputs
let focus_timer = document.querySelector("#focos");
let break_timer = document.querySelector("#break");


//Botoes
const incrementFocos = document.querySelector("#incrementFocos");
const decrementFocos = document.querySelector("#decrementFocos");
const incrementBreak = document.querySelector("#incrementBreak")
const decrementBreak = document.querySelector("#decrementBreak");

//Increment e decrement dos valores
incrementFocos.addEventListener("mousedown", () => {
    focus_timer.value++;
})
decrementFocos.addEventListener("mousedown", () => {
    if (focus_timer.value > 0) {
        focus_timer.value--;
    }
})

incrementBreak.addEventListener("mousedown", () => {
    break_timer.value++;
})

decrementBreak.addEventListener("mousedown", () => {
    if (break_timer.value > 0) {
        break_timer.value--;
    }
})

//Mousepressed increment and decrement
let interval;
const timer = 140;

//increment focos
incrementFocos.addEventListener("mousedown", () => {

    interval = setInterval(() => {
        focus_timer.value++;
    }, timer)

})
incrementFocos.addEventListener("mouseup", () => {
    clearInterval(interval);
})

//decrement focos
decrementFocos.addEventListener("mousedown", () => {

    interval = setInterval(() => {
        if (focus_timer.value > 0) {
            focus_timer.value--;
        }
    }, timer)

})
decrementFocos.addEventListener("mouseup", () => {
    clearInterval(interval);
})

//increment break

incrementBreak.addEventListener("mousedown", () => {

    interval = setInterval(() => {
        break_timer.value++;
    }, timer)

})
incrementBreak.addEventListener("mouseup", () => {
    clearInterval(interval);
})

//decrement break

decrementBreak.addEventListener("mousedown", () => {

    interval = setInterval(() => {
        if (break_timer.value > 0) {
            break_timer.value--;
        }
    }, timer)

})
decrementBreak.addEventListener("mouseup", () => {
    clearInterval(interval);
})

//Evitar valores negativos para o timer

focus_timer.addEventListener("change", () => {
    if (focus_timer.value < 0) {
        focus_timer.value = null;
    }
})
break_timer.addEventListener("change", () => {
    if (break_timer.value < 0) {
        break_timer.value = null;
    }
})








