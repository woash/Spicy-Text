let font;
let points = [];
let r = 5;
let angle = 0;
let img;
let x1, y1, x2, y2;

function preload() {
  font = loadFont('Yantramanav-Black.ttf');
  font2 = loadFont('Yantramanav-Medium.ttf')
  img = loadImage("mirch.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(windowWidth, windowHeight);
  
  let fontSize = windowWidth * 0.33;
  
  push();
  textAlign(CENTER);
  points = font.textToPoints('तीखा', windowWidth * 0.15, windowHeight * 0.67, fontSize, {sampleFactor: 0.15});
  pop();
  angleMode(DEGREES);
}

function draw() {
  background('yellow');
  image(img, 0, 0);
  
  let mainTextX = windowWidth * 0.5;
  let mainTextY = windowHeight * 0.67;
  let largeTextSize = windowWidth * 0.5;
  let mediumTextSize = windowWidth * 0.33;
    
  push();
  noFill();
  strokeWeight(3);
  textFont(font);
  textAlign(CENTER);
  textSize(largeTextSize);
  text('तीखा', mainTextX, mainTextY + 20);
  pop();
  
  // Draw static text with a red fill
  fill('red');
  textFont(font);
  textAlign(CENTER);
  textSize(mediumTextSize);
  text('तीखा', mainTextX, mainTextY);
  
  // Loop through the points of the text
  for (let i = 0; i < points.length; i++) {
    let d = dist(mouseX, mouseY, points[i].x, points[i].y);
    let interactionRadius = windowWidth * 0.05;
    
    if (d < interactionRadius) {
      fill('red');
      
      push();
      stroke('yellow');
      strokeWeight(2);
      line(points[i].x, points[i].y, 
           points[i].x + random(-windowWidth * 0.067, windowWidth * 0.008), 
           points[i].y + random(-windowHeight * 0.008, windowHeight * 0.067));
      pop();
    } else {
      // Default movement for particles (sine wave)
      fill('yellow');
      ellipse(points[i].x + r * sin(angle + i * 25), points[i].y, 5, 5);
      
      push();
      stroke('black');
      strokeWeight(2);
      line(points[i].x, points[i].y, 
           points[i].x + r * cos(angle + i), 
           points[i].y + windowHeight * 0.017);
      pop();
    }
  }
  
  angle += 5;
  
  // Bottom text
  textFont(font2);
  fill('yellow')
  textAlign(CENTER);
  textSize(windowWidth * 0.033);
  text('S P I C Y  //  T E E K H A', mainTextX, windowHeight * 0.92);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  img.resize(windowWidth, windowHeight);
  
  let fontSize = windowWidth * 0.33;
  points = font.textToPoints('तीखा', windowWidth * 0.15, windowHeight * 0.67, fontSize, {sampleFactor: 0.15});
}

function keyPressed() {
  if (key === 's') {
    saveGif('Mango', 5, { delay: 1 });
  }
}