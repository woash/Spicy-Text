let gridCols = 80;
let gridRows = 80;
let cellWidth, cellHeight;
let xMarks = [];
let floralBg;
let eraseMode = false; // false: draw, true: erase

function preload() {
  floralBg = loadImage('floralbg.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight); // You can adjust canvas size
  // ...existing code...
  cellWidth = width / gridCols;
  cellHeight = height / gridRows;
  // Initialize grid with false (no 'x')
  for (let i = 0; i < gridCols; i++) {
    xMarks[i] = [];
    for (let j = 0; j < gridRows; j++) {
      xMarks[i][j] = false;
    }
  }
}

function draw() {
  if (floralBg) {
    image(floralBg, 0, 0, width, height);
  } else {
    background(0);
  }
  // Draw all 'x' marks
  stroke(255);
  strokeWeight(2.5);
  for (let i = 0; i < gridCols; i++) {
    for (let j = 0; j < gridRows; j++) {
      if (xMarks[i][j]) {
        let x = i * cellWidth + cellWidth / 2;
        let y = j * cellHeight + cellHeight / 2;
        let size = min(cellWidth, cellHeight) * 0.8;
        // Draw 'x'
        line(x - size/2, y - size/2, x + size/2, y + size/2);
        line(x - size/2, y + size/2, x + size/2, y - size/2);
      }
    }
  }
}

function mouseDragged() {
  handleXAtMouse(mouseX, mouseY);
}

function mousePressed() {
  handleXAtMouse(mouseX, mouseY);
}

function touchStarted() {
  handleXAtMouse(touchX, touchY);
  return false;
}

function touchMoved() {
  handleXAtMouse(touchX, touchY);
  return false;
}

function handleXAtMouse(x, y) {
  let i = floor(x / cellWidth);
  let j = floor(y / cellHeight);
  if (i >= 0 && i < gridCols && j >= 0 && j < gridRows) {
    if (eraseMode) {
      xMarks[i][j] = false;
    } else {
      xMarks[i][j] = true;
    }
  }
}

function keyPressed() {
  if (key === 'e' || key === 'E') {
    eraseMode = true;
  } else if (key === 'd' || key === 'D') {
    eraseMode = false;
  }
}
