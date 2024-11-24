//Aashita's Celestial Clock

let numplanets = 9;
let font;
let planetColors = ['grey', 'orange','blue','red', 'brown', 'yellow', 'cyan', 'blue', 'purple'];
let planetNames = ['MERCURY', 'VENUS', 'EARTH', 'MARS', 'JUPITER', 'SATURN', 'URANUS', 'NEPTUNE', 'PLUTO'];
let angle = 0; 
let h, m, s, ms;
let bigplanetcolor


function preload() {
  font = loadFont('Satoshi-Variable.ttf'); 
  font2 = loadFont('alagard.ttf');
  fontLight = loadFont('Satoshi-Light.otf')
}
function setup() {
  createCanvas(600, 600, WEBGL);
}

function draw() {
  background('rgb(15,8,51)');
  
  m = minute();
  h = hour();
  s = second();
  ms = millis();
  let timenow = 'TIME = ' + h + ' : ' + m + ' : '+ s 
  
  
  // Title
  push();
  textSize(70);
  fill('white');
  textFont(font2);
  textAlign(CENTER);
  text('Celestial Clock', 0, 200);
  pop();

  // Planets and Planet Names
  let spacing = width / (numplanets + 1); 
  
  for (let i = 0; i < numplanets; i++) {
    let x = (i + 1) * spacing - width/2;
    let y = height / 2.8;
  
    
  // planet
    push();
    strokeWeight(4);
    translate(x, y, 0); 
    fill(planetColors[i]);
    ellipse(0, 0, 40, 40); 
    pop();
    
  // planet name
    push();
    fill('rgb(255,255,255)');
    textFont(font);
    textSize(10);
    textAlign(CENTER);
    translate(x, y + 40, 0); 
    text(planetNames[i], 0, 0);
    pop();
  }
  
  let txt = 'HOURS IN 1 DAY = '
  let bigplanetcolor = 'blue'
  let hoursinday = txt + '24'
    
  if (mouseX < 80 && mouseX >40 && mouseY > 500) {
    mercuryh = map(h, 0, 24, 0, 1408);
    timenow = 'TIME = ' + mercuryh + ' : ' + m + ' : '+ s 
    bigplanetcolor = 'grey'
    angle += 0.01*1.59;  
    hoursinday = txt + '1408'
  }
  else if (mouseX > 90 && mouseX <140 && mouseY> 500) {
    venush = map(h, 0, 24, 0, 5832);
    timenow = 'TIME = ' + venush + ' : ' + m + ' : '+ s 
    bigplanetcolor = 'orange'
    angle += 0.01*1.18;  
    hoursinday = txt + '5832'
  }
  else if (mouseX > 210 && mouseX <260 && mouseY> 500) {
    marsh = map(h, 0, 24, 0, 25);
    timenow = 'TIME = ' + marsh + ' : ' + m + ' : '+ s 
    bigplanetcolor = 'red'
    angle += 0.01*0.808;
    hoursinday = txt + '25'
  }
  else if (mouseX > 270 && mouseX <320 && mouseY> 500) {
    jupiterh = map(h, 0, 24, 0, 10);
    timenow = 'TIME = ' + jupiterh + ' : ' + m + ' : '+ s 
    bigplanetcolor = 'brown'
    angle += 0.01*0.439;
    hoursinday = txt + '10'
  }
  else if (mouseX > 330 && mouseX <380 && mouseY> 500) {
    saturnh = map(h, 0, 24, 0, 11);
    timenow = 'TIME = ' + saturnh + ' : ' + m + ' : '+ s 
    bigplanetcolor = 'yellow'
    angle += 0.01*0.325;
    hoursinday = txt + '11'
  }
  else if (mouseX > 390 && mouseX <440 && mouseY> 500) {
    uranush = map(h, 0, 24, 0, 17);
    timenow = 'TIME = ' + uranush + ' : ' + m + ' : '+ s 
    bigplanetcolor = 'cyan'
    angle += 0.01*0.228;
    hoursinday = txt + '17'
  }
  else if (mouseX > 450 && mouseX <500 && mouseY> 500) {
    neptuneh = map(h, 0, 24, 0, 16);
    timenow = 'TIME = ' + neptuneh + ' : ' + m + ' : '+ s 
    bigplanetcolor = 'blue'
    angle += 0.01*0.182;
    hoursinday = txt + '16'
  }
  else if (mouseX > 510 && mouseX <560 && mouseY> 500) {
    plutoh = map(h, 0, 24, 0, 153);
    timenow = 'TIME = ' + plutoh + ' : ' + m + ' : '+ s 
    bigplanetcolor = 'purple'
    angle += 0.01*0.157;
    hoursinday = txt + '153'
  }

  textSize(16)
  textFont(font)
  text(timenow, -270, -250);
  text(hoursinday, 105, -250);
  
  //orbitControl();
  
  // 3D Rotating Sphere
  push();
    translate(0, -50, 0);
    rotateY(angle); 
    angle += 0.01;  
    fill(bigplanetcolor); 
    rotateX(HALF_PI*0.85);
    sphere(170);  
    torus(230); 
  pop();
  
}
