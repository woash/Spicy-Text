let sentence = "i will fill the void with little drawings in my journal";
let index = 0;
let positions = [];
let drawing = false;
let spacing = 40;

let font;
let img

function preload() {
  
  font = loadFont('Post.otf');
  img = loadImage('sadgirl.png')
  
}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont(font);
  
}

function draw() {
  background(img);
  
  
  for (let i = 0; i < positions.length; i++) {
    let char = sentence[i];
    let size = map(i, 0, sentence.length, 24, 64);
    textSize(size);
    text(char, positions[i].x, positions[i].y);
  }
}

function mousePressed() {
  drawing = true;
  index = 0;
  positions = [];
}

function mouseDragged() {
  if (drawing && index < sentence.length) {
    // Only add a new letter if the cursor has moved far enough
    if (positions.length === 0 || p5.Vector.dist(positions[positions.length - 1], createVector(mouseX, mouseY)) > spacing) {
      positions.push(createVector(mouseX, mouseY));
      index++;
    }
  }
}

function mouseReleased() {
  drawing = false;
}

function touchStarted() {
  mousePressed();
  return false; // prevent default touch behavior (like scrolling)
}

function touchMoved() {
  mouseDragged();
  return false;
}

function touchEnded() {
  mouseReleased();
  return false;
}
