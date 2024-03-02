const frequencyInput = document.querySelector("#frequencyInput");
const startBtn = document.querySelector("#startBtn");
const timerDisp = document.querySelector("#timerDisp");

const msg = new SpeechSynthesisUtterance();
msg.rate = 1.9; // From 0.1 to 10

let frequency = 20;
let running = false;
let timeLeft = 0;
let timeLength = 1000 * 60 * 2; // 10 minutes
let doneCount = 0;
let expectedTime = 0;

let focusInt = findInterval();
console.log(focusInt);

frequencyInput.value = frequency;
frequencyInput.addEventListener("change", () => {
  if (!frequencyInput.value) {
    frequencyInput.value = 1;
  }
  frequency = Math.min(Math.max(parseInt(frequencyInput.value), 1), 1000);
  frequencyInput.value = frequency;
})



startBtn.addEventListener("click", () => {
  running = !running;
  if (running) {
    startBtn.innerHTML = `Stop`;
    if (timeLeft == 0) {
      console.log("here")
      expectedTime = Date.now() + timeLength;
    } else {
      expectedTime = Date.now() + timeLeft;

    }
    timer();
  } else {
    startBtn.innerHTML = `Start`;
    console.log("here")
    timeLeft = 0;
  }
})



function timer() {
  console.log(timeLeft)
  if (running) {
    const pastTimeLeft = timeLeft;
    timeLeft = expectedTime - Date.now();
    const difference = pastTimeLeft - timeLeft;
    let hours = Math.floor(timeLeft / (1000 * 60 * 60));
    let minutes = Math.floor(timeLeft / (1000 * 60)) % 60;
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (timeLeft < 0) {
      hours = "00";
      minutes = "00";
      seconds = "00";
    }
    
    if (hours.toString().length === 1) {
      hours = "0" + hours.toString();
    }
    if (minutes.toString().length === 1) {
      minutes = "0" + minutes.toString();
    }
    if (seconds.toString().length === 1) {
      seconds = "0" + seconds.toString();
    }
    timerDisp.innerHTML = `${hours}:${minutes}:${seconds}`;
    if (difference > 0) {
      focusInt -= difference;
    }
    console.log("difference", difference);
    console.log("focusInt", focusInt);
    if (focusInt <= 0) {
      console.log("heer")
      focusInterval();
    }
    if (timeLeft <= 0) {
      doneCount--;
      if (doneCount < 0) {
        doneCount = 20;
        window.speechSynthesis.cancel();
        msg.text = "done";
        
        window.speechSynthesis.speak(msg);
      }
      
    }
    setTimeout(timer, 100);
  }
}

function findInterval() {
  return (Math.random() < 0.5 ? Math.random() / 2 + 0.5 : Math.random() + 1) * frequency * 1000;
}

function focusInterval() {
  if (timeLeft <= 0) {
    return;
  }
  console.log("HERHERHE")
  window.speechSynthesis.cancel();
  focusInt = findInterval();
  msg.text = "focus";
  
  window.speechSynthesis.speak(msg);
  
}