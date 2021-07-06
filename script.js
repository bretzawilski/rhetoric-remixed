const pageBody = document.getElementById("rhetoric");

let rhetoric = "";

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

function printLine() {
  let line = getRandomInt(rhetoric.length);
  let addLine = document.createElement("p");
  if (pageBody.childElementCount === 4) {
    pageBody.firstElementChild.remove();
  }
  addLine.innerText = rhetoric[line];
  pageBody.appendChild(addLine);
  console.log(rhetoric[line]);
}

function infiniteRead() {
  if (rhetoric) {
    printLine();
  } else {
    console.log("Data not loaded yet");
  }
  setTimeout(infiniteRead, 5000);
}

setTimeout(infiniteRead, 100);
