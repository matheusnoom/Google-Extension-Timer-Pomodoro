export default function soundAlert(){
    const audio = new Audio("../../audios/bellAlert.mp3");
    audio.play();
    audio.volume = 0.2;
}