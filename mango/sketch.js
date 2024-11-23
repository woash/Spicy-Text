let font;
let points = [];
let r = 5;
let angle = 0;
let img;
let x1, y1, x2, y2;

function preload() {
  font = loadFont('Yantramanav-Black.ttf');
  font2 = loadFont('Yantramanav-Medium.ttf')
  img = loadImage("Frame.jpg");
}

function setup() {
  createCanvas(400, 400);
  img.resize(400, 400);
  
  push();
  textAlign(CENTER);
  points = font.textToPoints('आम', 20, 280, 213, {sampleFactor: 0.15}); // Scaled down from original 320
  pop();
  angleMode(DEGREES);
}

function draw() {
  background('black');
  image(img, 0, 0);
  
  fill('blue');
  textFont(font);
  textAlign(CENTER);
  textSize(213); // Scaled down from original 320
  text('आम', 200, 280);
  
  push();
  noFill();
  strokeWeight(3);
  stroke('yellow');
  textFont(font);
  textAlign(CENTER);
  textSize(213);
  text('आम', 200, 280);
  pop();
  
  for (let i = 0; i < points.length; i++) {
    let d = dist(mouseX, mouseY, points[i].x, points[i].y);
    
    if (d < 30) {
      fill('blue');
      ellipse(points[i].x + random(-30, 5), points[i].y + random(-5, 30), 10, 10);
      
      push();
      stroke('pink');
      strokeWeight(2);
      line(points[i].x, points[i].y, points[i].x + random(-5, 5), points[i].y + random(-5, 5));
      pop();
    } else {
      // Default movement for particles (sine wave)
      fill('black');
      ellipse(points[i].x + r * sin(angle + i * 25), points[i].y, 10, 10);
      
      push();
      stroke('pink');
      strokeWeight(2);
      line(points[i].x, points[i].y, points[i].x + r * cos(angle + i), points[i].y + 10);
      pop();
    }
  }
  
  angle += 5;
  
  textFont(font2);
  fill('yellow')
  textAlign(CENTER);
  textSize(15); // Scaled down from original 20
  text('M A N G O  //  A A M', 200, 370);
}

function keyPressed() {
  if (key === 's') {
    saveGif('Mango', 5, { delay: 1 });
  }
}