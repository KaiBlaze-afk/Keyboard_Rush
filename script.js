let timer = document.getElementById("timer");
let board = document.getElementById("Back");
let Input = document.getElementById("Input");
let wpm = document.getElementById("wpm");
let cpm = document.getElementById("cpm");
let accu = document.getElementById("accu");
let score = 0;
let scor = 0;
let total = 0;
let timemax = localStorage.getItem("countlocal")*60 || 60;
let nums = random();
for (let i = 1; i <= 13; i++) {
  nums = nums + " " + random();
}
let randomnums = nums.split(" ");




let list = () => {
  let lists = document.querySelectorAll("li");
  for (let i = 0; i < lists.length; i++) {
    lists[i].classList.toggle("lists");
  }
};

function random() {
  let x = Math.floor(Math.random() * (1000 - 1)) + 1;
  return x;
}
timer.innerHTML = timemax;
function maintimer() {
  if (timer.innerHTML == timemax) {
    for (let counter = timemax-1; counter >= 0; counter = counter - 1) {
      setTimeout(function () {
        counter = timemax-1 - counter;
        timer.innerHTML = counter;
        if (counter == timemax/4) {
          timer.style.border="3px solid red"
        } else if (counter == timemax/2) {
          timer.style.border=" 3px solid yellow"
        } else if (counter == 0) {
          Input.setAttribute("readonly", "true");
          board.style.display = "none";
          Input.style.cssText =
            'background:transparent;color:#0bf;text-align:center;border:none;font-family:"Courier New", Courier, monospace;font-weight:bold;';
          document.getElementById("time").style.display = "none";
          if (accu.innerText <= 60) {
            Input.value = "You should learn alphabets first";
          } else {
            if (wpm.innerText <= timemax/6) {
              Input.value = "You Must have started learning just now..";
            } else if (wpm.innerText <= timemax/4) {
              Input.value = "You are a beginner now, a long way to go..";
            } else if (wpm.innerText <= timemax/2) {
              Input.value = "Its not that bad but You can do better..";
            } else if (wpm.innerText <= timemax) {
              Input.value = "You are doing great..";
            } else {
              Input.value = "You are amazing..";
            }
          }
        }
      }, counter * 1000);
    }
  }
}
function space() {
  for (let i = 0; i <= 13; i++) {
    randomnums[i] = randomnums[i + 1];
    if (randomnums[i] == undefined) {
      randomnums[i] = random();
    }
  }
  fetching();
  Input.value = "";
}

fetching();
function fetching() {
  fetch("words.txt")
    .then((response) => response.text())
    .then((data) => {
      let wordarray = data.split("\n");
      display();
      function display() {
        let sentence = wordarray[randomnums[0]];
        for (let i = 1; i <= 13; i++) {
          sentence = sentence + "  " + wordarray[randomnums[i]];
          board.value = sentence;
        }
      }
    });
}

Input.onkeydown = function (event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    maintimer();
  } else if (event.which == 8) {
    if (Input.value == " ") {
      event.preventDefault();
    }
  } else if (event.which == 32) {
    total = board.value.split(" ")[0].length + total;
    if (board.value.split(" ")[0] == Input.value) {
      scor = board.value.split(" ")[0].length + scor;
    }
    accu.innerHTML = ((scor * 100) / total).toFixed(1);
    if (accu.innerHTML == 100.0) {
      accu.innerHTML = 100;
    }
    event.preventDefault();
    if (timer.innerHTML == 0 || timer.innerHTML == timemax) {
      return false;
    } else {
      score = score + Input.value.length + 1;
      wpm.innerHTML = scor / 5;
      cpm.innerHTML = score;
      space();
    }
  }
};



if (localStorage.getItem("blindmode") == "true") {
  Input.style.color="#0000"
} else {
  Input.style.color="rgb(0, 102, 255)"
}
if (localStorage.getItem("darkmode") == "true") {
  document.getElementById("home").style.cssText =
    "background:rgba(0, 0, 0, 0.563);color:white;";
  document.getElementById("box").style.cssText =
    "background:rgba(0, 0, 0, 0.563);box-shadow: 3px 3px 5px black;";
  document.getElementById("monitor").style.cssText = "color:white";
  document.getElementById("timer").style.cssText =
    "background:rgba(0, 0, 0, 0);color:white;";
  document.getElementById("wpm").style.cssText =
    "background:rgba(0, 0, 0, 0.35);color:white;";
  document.getElementById("cpm").style.cssText =
    "background:rgba(0, 0, 0, 0.35);color:white;";
  document.getElementById("accu").style.cssText =
    "background:rgba(0, 0, 0, 0.35);color:white;";
} else {
  document.getElementById("home").style.cssText =
    "background:rgba(255, 255, 255, 0.563);color:black;";
  document.getElementById("box").style.cssText =
    "background:rgba(255, 255, 255, 0.563);box-shadow: 3px 3px 5px grey;";
  document.getElementById("monitor").style.cssText = "color:black";
  document.getElementById("timer").style.cssText =
    "background:rgba(0, 0, 0, 0);color:black;";
  document.getElementById("wpm").style.cssText =
    "background:rgba(255,255,255, 0.35);color:black;";
  document.getElementById("cpm").style.cssText =
    "background:rgba(255,255,255, 0.35);color:black;";
  document.getElementById("accu").style.cssText =
    "background:rgba(255,255,255, 0.35);color:black;";
}

