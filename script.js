const pageBody = document.getElementById("rhetoric");
const pauseBtn = document.getElementById("pause-btn");
const setLength = document.getElementById("set-length");
const setLengthBtn = document.getElementById("set-length-btn");
setLengthBtn.addEventListener("click", () => {
  pageBody.innerHTML = "";
  lineLength = Number(setLength.value);
  setLength.value = null;
  initialRead();
});

pauseBtn.addEventListener("click", () => {
  if (!pause) {
    pause = true;
  } else {
    pause = false;
    infiniteRead();
  }
});

let rhetoric = "";

let pause = false;

let lineLength = 4;

let fetchRhetoric = fetch("rhetoric.json", {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    rhetoric = data.rhetoric;
    console.log(data.rhetoric[0]);
  });

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let saveText = () => {
  let savedText;
  let selectLines = document.querySelectorAll("p");
  for (let i = 0; i < selectLines.length; i++) {
    savedText += selectLines[i].textContent + " ";
  }
  return savedText.replace("undefined", "");
};

function printLine() {
  let line = getRandomInt(rhetoric.length);
  let addLine = document.createElement("p");
  let selectLines = document.querySelectorAll("p");
  if (pageBody.childElementCount >= lineLength) {
    selectLines[0].addEventListener("transitionend", function () {
      pageBody.firstElementChild.remove();
    });
    selectLines[0].classList.add("scrollOut");
  }
  addLine.innerText = rhetoric[line];
  addLine.classList.add("fade-in");
  pageBody.appendChild(addLine);
  console.log(rhetoric[line]);
}

function infiniteRead() {
  if (pause === true) {
    return;
  }
  if (rhetoric) {
    printLine();
  } else {
    console.log("Data not loaded yet");
  }
  setTimeout(infiniteRead, 5000);
}

function initialRead() {
  for (let i = 0; i < lineLength; i++) {
    printLine();
  }
}

setTimeout(initialRead, 100);
setTimeout(infiniteRead, 5000);
