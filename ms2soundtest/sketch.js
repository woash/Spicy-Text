let img;
let mainSound;
let xPosSound, xNegSound, yPosSound, yNegSound;
let circleX, circleY;
let circleSize = 40;
let isDragging = false;
let maxDistance = 300; // Maximum distance from center for full volume
let mainVolumeSlider; // Volume slider for main sound

function preload() {
  // Load the main sound that plays with start/stop
  img = loadImage('blurbg.png');
  mainSound = loadSound("youtube_VAmN_FMs4ok_audio.mp3");
  
  // Load sounds for each axis
  xPosSound = loadSound("heartbeat.mp3"); // Replace with different sounds
  xNegSound = loadSound("heartbeatslow.mp3");
  yPosSound = loadSound("ambient.mp3");
  yNegSound = loadSound("rain.mp3");
}

function setup() {
  createCanvas(600, 600);
  
  // Initialize circle at center
  circleX = width / 2;
  circleY = height / 2;
  
  // Create start and stop buttons
  let startButton = createButton("start");
  startButton.position(10, height + 10);
  startButton.mousePressed(start);
  
  let stopButton = createButton("stop");
  stopButton.position(70, height + 10);
  stopButton.mousePressed(stop);
  
  createP("Main Sound Volume:").position(140, height - 5);
  mainVolumeSlider = createSlider(0, 1, 0.5, 0.01);
  mainVolumeSlider.position(140, height + 25);
  mainVolumeSlider.style('width', '150px');
  mainVolumeSlider.input(updateMainVolume);
  
  mainSound.setVolume(mainVolumeSlider.value());
  
  xPosSound.loop();
  xNegSound.loop();
  yPosSound.loop();
  yNegSound.loop();
  
  xPosSound.setVolume(0);
  xNegSound.setVolume(0);
  yPosSound.setVolume(0);
  yNegSound.setVolume(0);
}

function updateMainVolume() {
  mainSound.setVolume(mainVolumeSlider.value());
}

function start() {
  mainSound.loop();
}

function stop() {
  mainSound.pause();
}

function draw() {
  background(255,50);
  img.resize(600,600)
   image(img,0,0);
  
  // Draw x and y axes
  stroke('black');
  line(0, height/2, width, height/2); // x-axis
  line(width/2, 0, width/2, height);  // y-axis
  
  // Draw draggable circle
  fill('black');
  noStroke();
  ellipse(circleX, circleY, circleSize);
  
  // Update sound volumes based on circle position
  updateSoundVolumes();
  
  // Add text labels for axes
  noStroke()
  fill('black');
  textSize(14);
  text("Heartbeat Slow", width - 100, height/2 - 10);
  text("Heartbeat", 10, height/2 - 10);
  text("Rain", width/2 + 10, 20);
  text("Ambient", width/2 + 10, height - 20);
}

function updateSoundVolumes() {
  // Calculate distance from center for each axis
  let centerX = width / 2;
  let centerY = height / 2;
  
  // Calculate direction and distance from center
  let xDist = circleX - centerX;
  let yDist = circleY - centerY;
  
  // Update volumes based on position
  // Positive X axis
  if (xDist > 0) {
    let volume = map(xDist, 0, maxDistance, 0, 1, true);
    xPosSound.setVolume(volume);
  } else {
    xPosSound.setVolume(0);
  }
  
  // Negative X axis
  if (xDist < 0) {
    let volume = map(abs(xDist), 0, maxDistance, 0, 1, true);
    xNegSound.setVolume(volume);
  } else {
    xNegSound.setVolume(0);
  }
  
  // Positive Y axis (note: in p5.js, y increases downward)
  if (yDist > 0) {
    let volume = map(yDist, 0, maxDistance, 0, 1, true);
    yPosSound.setVolume(volume);
  } else {
    yPosSound.setVolume(0);
  }
  
  // Negative Y axis
  if (yDist < 0) {
    let volume = map(abs(yDist), 0, maxDistance, 0, 1, true);
    yNegSound.setVolume(volume);
  } else {
    yNegSound.setVolume(0);
  }
}

function mousePressed() {
  // Check if mouse is over the circle
  let d = dist(mouseX, mouseY, circleX, circleY);
  if (d < circleSize / 2) {
    isDragging = true;
  }
}

function mouseReleased() {
  isDragging = false;
}

function mouseDragged() {
  if (isDragging) {
    circleX = mouseX;
    circleY = mouseY;
    
    // Constrain to canvas
    circleX = constrain(circleX, 0, width);
    circleY = constrain(circleY, 0, height);
  }
}