let angle = 0;
let topColorSlider1, topColorSlider2, topColorSlider3;
let bottomColorSlider1, bottomColorSlider2, bottomColorSlider3;
let densitySlider;
let font;

function preload() {
  font = loadFont('Satoshi-Medium.otf'); // Ensure the font file is in the correct location
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  
  textFont(font);
  
  topColorSlider1 = createSlider(0, 255, 255);
  topColorSlider1.position(20, 20);
  let label1 = createP('Question Everything');
  label1.position(160, 0);
  label1.style('font-family', 'Satoshi, sans-serif'); 
  
  topColorSlider2 = createSlider(0, 255, 0); 
  topColorSlider2.position(20, 60);
  let label2 = createP('Acknowledge Tradition');
  label2.position(160, 40);
  label2.style('font-family', 'Satoshi, sans-serif'); 
  
  topColorSlider3 = createSlider(0, 255, 255); 
  topColorSlider3.position(20, 100);
  let label3 = createP('Embrace Complexity');
  label3.position(160, 80);
  label3.style('font-family', 'Satoshi, sans-serif'); 
  
  // Create sliders for bottom gradient colors
  bottomColorSlider1 = createSlider(0, 255, 0); 
  bottomColorSlider1.position(20, 140);
  let label4 = createP('Craft with Data');
  label4.position(160, 120);
  label4.style('font-family', 'Satoshi, sans-serif'); 
  
  bottomColorSlider2 = createSlider(0, 255, 0); 
  bottomColorSlider2.position(20, 180);
  let label5 = createP('Disciplinary Fusion');
  label5.position(160, 160);
  label5.style('font-family', 'Satoshi, sans-serif'); 
  
  bottomColorSlider3 = createSlider(0, 255, 255); 
  bottomColorSlider3.position(20, 220);
  let label6 = createP('Practicality');
  label6.position(160, 200);
  label6.style('font-family', 'Satoshi, sans-serif'); 
  
  // Create slider for density
  densitySlider = createSlider(1, 60, 21);
  densitySlider.position(20, 260);
  let label7 = createP('Design with Heart');
  label7.position(160, 240);
  label7.style('font-family', 'Satoshi, sans-serif'); 
}

function draw() {
  clear();
  
  drawGradientBackground();
  
  rotateZ(angle / 2);
  // orbitControl(4, 4); 

  let currentDensity = densitySlider.value(); 

  for (let theta = 0; theta < 60; theta += currentDensity) { 
    beginShape(POINTS);
    
    stroke(topColorSlider2.value(), bottomColorSlider1.value(), bottomColorSlider3.value());
    strokeWeight(1);
    
    for (let phi = 0; phi < 360; phi += 2) {
      let r = 20 * sin(phi * 1) + 100; 
      let x = r * cos(phi);
      let y = r * sin(phi);
      let z = vShape(350, r / 100, 0.8, 0.15) - 200;
      line(x, y, z, x + y, y + z, z + x);
      circle(x, y, r / 1100);
    }
    endShape();
    rotateX(angle);
    angle += 0.4;
  }
}

function drawGradientBackground() {
  for (let i = 0; i <= height; i++) {
    let interColor = lerpColor(
      color(topColorSlider1.value(), topColorSlider2.value(), topColorSlider3.value()),
      color(bottomColorSlider1.value(), bottomColorSlider2.value(), bottomColorSlider3.value()),
      map(i, 0, height, 0, 1)
    );
    stroke(interColor);
    line(-width / 2, i - height / 2, width / 2, i - height / 2); 
  }
}

function vShape(A, r, a, b) {
  return A * pow(Math.E, -b * pow(abs(r), 1.5)) * pow(abs(r), a);
}

function keyPressed() {
  if (key == 's') {
    save("mySketch.png");
  }
}