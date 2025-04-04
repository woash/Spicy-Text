const params = {
  image1: 1,
  image2: 3,
  size: 10,
  color: "#000000",
};

const pane = new Tweakpane.Pane();

pane.addInput(params, "image1", { step: 1, min: 0, max: 3 });

pane.addInput(params, "image2", { step: 1, min: 0, max: 3 });

pane.addInput(params, "size", { step: 1, min: 5, max: 50 }).on("change", () => {
  numStrips = params.size;
});
pane.addInput(params, "color").on("change", () => redraw());

let images = [];
let numStrips = 20;
let filenames = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

function preload() {
  for (let i = 0; i < filenames.length; i++) {
    images[i] = loadImage(filenames[i]);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < images.length; i++) {
    images[i].resize(600, 0);
  }
}

function draw() {
  background(params.color);
  face1();
  face2();
}

function face1() {
  let stripWidth = width / numStrips;
  let img1 = images[params.image1];
  if (!img1) return;

  for (let i = 0; i < numStrips; i++) {
    if (i % 2 !== 0) continue;

    let x = i * stripWidth;
    let offset = stripWidth;

    copy(
      img1,
      x,
      0,
      stripWidth,
      img1.height,
      x + offset,
      0,
      stripWidth,
      img1.height
    );
  }
}

function face2() {
  let stripWidth = width / numStrips;
  let img2 = images[params.image2];
  if (!img2) return;

  for (let i = 0; i < numStrips; i++) {
    if (i % 2 === 0) continue;

    let x = i * stripWidth;
    let offset = stripWidth;

    copy(
      img2,
      x,
      0,
      stripWidth,
      img2.height,
      x + offset,
      0,
      stripWidth,
      img2.height
    );
  }
}
