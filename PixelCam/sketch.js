let capture;
let cols = 80;
let rows = 80;
let emojis = ["🌑", "🟣", "⚪️"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(width / cols/1.2);
  capture = createCapture(VIDEO);
  capture.size(cols, rows);
  capture.hide();
}

function draw() {
  background(255);
  capture.loadPixels();

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let i = (y * cols + x) * 4;
      let r = capture.pixels[i];
      let g = capture.pixels[i + 1];
      let b = capture.pixels[i + 2];

      // Calculate brightness
      let brightness = (r + g + b) / 3;

      // Map brightness to an emoji
      let index = floor(map(brightness, 0, 255, 0, emojis.length));
      let emoji = emojis[index];

      text(emoji, x * (width / cols), y * (height / rows));
    }
  }
}
