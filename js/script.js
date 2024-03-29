"use strict";

function randomizingBGC() {
  return `rgb(${Math.round(Math.random() * (255 - 0)) + 0},${Math.round(Math.random() * (255 - 0)) + 0},${
    Math.round(Math.random() * (255 - 0)) + 0
  })`;
}

const BgColor = randomizingBGC();

document.querySelector(".content").style.backgroundColor = BgColor;

const winCombos = [
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const drawCombos = [
  [1, 2, 5, 6, 7],
  [1, 3, 5, 6, 8],
  [3, 4, 5, 8, 9],
  [2, 4, 5, 7, 9],
  [1, 3, 6, 7, 8],
  [1, 3, 4, 8, 9],
  [2, 3, 4, 7, 9],
  [1, 2, 6, 7, 9],
  [2, 5, 6, 7, 9],
  [1, 3, 4, 5, 8],
  [1, 2, 6, 7, 8],
  [2, 3, 4, 8, 9],
  [2, 4, 6, 7, 9],
  [1, 3, 4, 6, 8],
  [1, 5, 6, 7, 8],
  [2, 3, 4, 5, 9]
];

const unitsCollection = [...document.querySelectorAll(".unit")];
const modal = document.querySelector(".the-winner");

let round = 1;
let oSteps = [];
let xSteps = [];

const makeStep = function () {
  round++;

  if (round % 2 == 0) {
    this.classList.add("x");
    xSteps.push(unitsCollection.indexOf(this) + 1);
  } else {
    this.classList.add("o");
    oSteps.push(unitsCollection.indexOf(this) + 1);
  }

  checkTheDraw();
  checkTheWinner();
};

function addEventListeners() {
  unitsCollection.forEach((unit) => {
    unit.addEventListener("click", makeStep, {
      once: true
    });
  });
}

function removeEventListeners() {
  unitsCollection.forEach((unit) => {
    unit.removeEventListener("click", makeStep);
  });
}

function hideField() {
  document.querySelector(".field").style.transform = " translateX(-178%)";

  setTimeout(() => {
    unitsCollection.forEach((unit) => {
      unit.classList.remove("o");
      unit.classList.remove("x");
      modal.classList.remove("the-winner--active");

      round = 1;
      oSteps = [];
      xSteps = [];
    });
    document.querySelector(".field").style.transform = " translateX(0)";
    addEventListeners();
  }, 2000);
}

function showTheWinnerModal(text) {
  setTimeout(() => {
    document.querySelector(".the-winner-descr").textContent = text;
    modal.classList.add("the-winner--active");

    hideField();
  }, 1200);
}

function checkTheWinner() {
  winCombos.forEach(function (combo) {
    if (isIncludes(xSteps, combo).length == 3) {
      removeEventListeners();
      markTheCombo(combo);
      showTheWinnerModal("X WINS!");
    }
    if (isIncludes(oSteps, combo).length == 3) {
      removeEventListeners();
      markTheCombo(combo);
      showTheWinnerModal("O WINS!");
    }
  });
}

function markTheCombo(combo) {
  combo.forEach((item, i) => {
    unitsCollection[item - 1].style.backgroundColor = BgColor;

    setTimeout(() => {
      unitsCollection[item - 1].style.backgroundColor = "#fff";
    }, 1800);
  });
}

function checkTheDraw() {
  drawCombos.forEach((combo) => {
    if (isIncludes(xSteps, combo).length == 5) {
      showTheWinnerModal("DRAW!");
    }
  });
}

function isIncludes(arr1, arr2) {
  return arr1.filter((item) => arr2.includes(item));
}

addEventListeners();
