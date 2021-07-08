let rhetoric = "";
let pause = false;
let lineLength = 4;

fetch("rhetoric.json", {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    rhetoric = data.rhetoric;
    console.log(rhetoric[0]);
    initialRead();
  });

setTimeout(infiniteRead, 5000);

function initialRead() {
  for (let i = 0; i < lineLength; i++) {
    printLine();
  }
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

function printLine() {
  let line = getRandomInt(rhetoric.length);
  let addLine = document.createElement("p");
  let selectLines = document.querySelectorAll("p");
  if (rhetDiv.childElementCount >= lineLength) {
    selectLines[0].addEventListener("transitionend", function () {
      rhetDiv.firstElementChild.remove();
    });
    selectLines[0].classList.add("scrollOut");
    setTimeout(addBlock, 500);
  } else {
    addBlock();
  }
  function addBlock() {
    addLine.innerText = rhetoric[line];
    addLine.classList.add("fade-in");
    rhetDiv.appendChild(addLine);
    console.log(rhetoric[line]);
  }
}

function setLength() {
  rhetDiv.innerHTML = "";
  lineLength = Number(setLengthInput.value);
  initialRead();
}

function toggleModal() {
  modal.classList.toggle("hidden");
}

function saveText() {
  pause = true;
  pauseBtn.innerText = "Resume";
  toggleModal();
  textArea.innerText = concatText();
}

function pauseText() {
  if (!pause) {
    pause = true;
    pauseBtn.innerText = "Resume";
  } else {
    pause = false;
    pauseBtn.innerText = "Pause";
    infiniteRead();
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function concatText() {
  let savedText;
  let selectLines = document.querySelectorAll("p");
  for (let i = 0; i < selectLines.length; i++) {
    savedText += selectLines[i].textContent + " ";
  }
  return savedText.replace("undefined", "");
}

const rhetDiv = document.getElementById("rhetoric");
const modal = document.getElementById("modal");
const textArea = document.getElementById("text-area");
const setLengthInput = document.getElementById("set-length");

const pauseBtn = document.getElementById("pause-btn");
pauseBtn.addEventListener("click", pauseText);
const setLengthBtn = document.getElementById("set-length-btn");
setLengthBtn.addEventListener("click", setLength);
const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", saveText);
const closeBtn = document.getElementById("close-btn");
closeBtn.addEventListener("click", toggleModal);
