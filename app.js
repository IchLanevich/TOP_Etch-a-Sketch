let isRandomColor = false;

const canvas = document.querySelector("#canvas");
const slider = document.querySelector("#grid-size-slider");
const sliderLabel = document.querySelector("#grid-size-label");
const sliderLabelPlaceholder = document.querySelector("#grid-size-label-value");

for (let i = 0; i < 8 * 8; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  canvas.appendChild(cell);
}

canvas.style.gridTemplateColumns = `repeat(${8}, 2fr)`;
canvas.style.gridTemplateRows = `repeat(${8}, 2fr)`;

slider.addEventListener("change", (e) => {

    canvas.innerHTML = "";

  let value = parseInt(e.target.value);
  let gridSize = value;
  let cellAmount = gridSize * gridSize;

  sliderLabelPlaceholder.textContent = `${gridSize} x ${gridSize}`;

  canvas.style.gridTemplateColumns = `repeat(${gridSize}, 2fr)`;
  canvas.style.gridTemplateRows = `repeat(${gridSize}, 2fr)`;

  for (let i = 0; i < cellAmount; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    canvas.appendChild(cell);
  }

});

const clearCanvasBtn = document.querySelector("#clear-canvas-btn");
const randomColorBtn = document.querySelector("#random-color-btn");

clearCanvasBtn.addEventListener("click", () => {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.classList.remove("cell-bg");
    cell.style.backgroundColor = "#2e2e2e";
  });
});

randomColorBtn.addEventListener("click", (e) => {
  isRandomColor = !isRandomColor;

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.removeEventListener("mouseover", handleMouseOverFixed);
    cell.removeEventListener("mouseover", handleMouseOverRandom);

    if (isRandomColor) {
      cell.addEventListener("mouseover", handleMouseOverRandom);
    } else {
      cell.addEventListener("mouseover", handleMouseOverFixed);
    }
  });
});

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("mouseover", handleMouseOverFixed);
});

//
//
// Helper
function getRandomColor() {
  const r = Math.floor(Math.random() * 256); // Random value for red (0 to 255)
  const g = Math.floor(Math.random() * 256); // Random value for green (0 to 255)
  const b = Math.floor(Math.random() * 256); // Random value for blue (0 to 255)

  return `rgb(${r}, ${g}, ${b})`; // Return the RGB color in the format "rgb(r, g, b)"
}

function handleMouseOverRandom(e) {
  const hoveredCell = e.target;
  hoveredCell.style.backgroundColor = getRandomColor();
}

function handleMouseOverFixed(e) {
  const hoveredCell = e.target;
  hoveredCell.style.backgroundColor = "#6f6767";
}
