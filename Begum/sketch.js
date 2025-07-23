let img;
let pane;
let params;

function preload() {
  img = loadImage('paanbegum.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Parameters are now relative (percentages)
  params = {
    // Frame: 50% of windowWidth, ~50% of windowHeight
    widthRatio: 0.7,
    heightRatio: 0.7,
    frequency: 9.5,

    // Flower: scaled relative to width
    aRatio: 0.02, // small offset
    bRatio: 0.01  // petal size
  };

  noFill();
  stroke(0);
  strokeWeight(2);
}

function draw() {
  background(255);
  image(img, 0, 0, width, height);

  // Mouse distance normalized
  let mouseDist = dist(mouseX, mouseY, width / 2, height / 2);
  let maxDist = dist(0, 0, width / 2, height / 2);
  let normalizedDist = constrain(1 - (mouseDist / maxDist), 0, 1);

  // Waviness and flower detail
  let waviness = map(normalizedDist, 0, 1, 0, width * 0.07); // max 3% of width
  let k = map(normalizedDist, 0, 1, 1, 12);

  drawWavyFrame(waviness);
  drawFlower(k);
}

function drawWavyFrame(waviness) {
  let w = width * params.widthRatio;
  let h = height * params.heightRatio;
  let freq = params.frequency;

  let left = width / 2 - w / 2;
  let right = width / 2 + w / 2;
  let top = height / 2 - h / 2;
  let bottom = height / 2 + h / 2;

  stroke(197, 0, 0);
  strokeWeight(2);
  noFill();

  beginShape();
  // Top side
  for (let x = 0; x <= w; x++) {
    let y = top + waviness * sin((x / w) * freq * -TWO_PI);
    vertex(left + x, y);
  }

  // Right side
  for (let y = 0; y <= h; y++) {
    let x = right + waviness * sin((y / h) * freq * TWO_PI);
    vertex(x, top + y);
  }

  // Bottom side
  for (let x = 0; x <= w; x++) {
    let y = bottom + waviness * sin((x / w) * freq * TWO_PI);
    vertex(right - x, y);
  }

  // Left side
  for (let y = 0; y <= h; y++) {
    let x = left + waviness * sin((y / h) * freq * -TWO_PI);
    vertex(x, bottom - y);
  }
  endShape(CLOSE);
}

function drawFlower(k) {
  let a = width * params.aRatio;
  let b = width * params.bRatio;

  stroke(197, 0, 0);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let theta = 0; theta < TWO_PI; theta += 0.01) {
    let r = a + b * cos(k * theta);
    let x = r * cos(theta);
    let y = r * sin(theta);
    vertex(x + width / 2.05, y + height / 2);
  }
  endShape(CLOSE);
}
