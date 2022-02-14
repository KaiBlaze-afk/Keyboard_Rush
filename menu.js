let timeset = document.getElementById("timeset");
let timelimit = document.getElementById("timelimit");
timelimit.value = localStorage.getItem("countlocal") || 1;

function timingchange() {
  timeset.innerHTML = timelimit.value;
  localStorage.setItem("countlocal", timelimit.value);
}
timeset.innerHTML = timelimit.value;

if (localStorage.getItem("darkmode") == "true") {
  document.getElementById("moon").style.backgroundColor = "#000";
} else {
  document.getElementById("moon").style.backgroundColor = "#0000";
}
if (localStorage.getItem("blindmode") == "true") {
  document.getElementById("hide").style.backgroundColor = "#000";
} else {
  document.getElementById("hide").style.backgroundColor = "#0000";
}

function darkmode() {
  if (localStorage.getItem("darkmode") == "true") {
    localStorage.setItem("darkmode", false);
    document.getElementById("moon").style.backgroundColor = "#0000";
  } else {
    localStorage.setItem("darkmode", true);
    document.getElementById("moon").style.backgroundColor = "#000";
  }
  changing()
}
function blindmode() {
  if (localStorage.getItem("blindmode") == "true") {
    localStorage.setItem("blindmode", false);
    document.getElementById("hide").style.backgroundColor = "#0000";
  } else {
    localStorage.setItem("blindmode", true);
    document.getElementById("hide").style.backgroundColor = "#000";
  }
  console.log(localStorage.getItem("blindmode"));
}

function changing(){
if(localStorage.getItem("darkmode")== "true"){
  document.getElementById("home").style.cssText="background:rgba(0, 0, 0, 0.563);color:white;"
  document.getElementById("box").style.cssText="background:rgba(0, 0, 0, 0.563);box-shadow: 3px 3px 5px black;"
}else{
  document.getElementById("home").style.cssText="background:rgba(255, 255, 255, 0.563);color:black;"
  document.getElementById("box").style.cssText="background:rgba(255, 255, 255, 0.563);box-shadow: 3px 3px 5px grey;"
}
}

let list = () => {
  let lists = document.querySelectorAll("li");
  for (let i = 0; i < lists.length; i++) {
    lists[i].classList.toggle("lists");
  }
};
changing()