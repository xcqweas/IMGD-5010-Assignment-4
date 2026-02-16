let iris = []

function setup() {

  createCanvas(800, 600);

  fetch("iris.json")
    .then(r => r.json())
    .then(data => {
      iris = data;
      console.log("Loaded:", iris.length);
      redraw();
    });

  noLoop();
}
function draw() {
  background(120, 220, 120)

  // make sure data is loaded
  if(iris === undefined) return
  
  // Find ranges for mapping
  let minPL = Infinity, maxPL = -Infinity;
  let minPW = Infinity, maxPW = -Infinity;

  for (let d of iris) {
    minPL = min(minPL, d.petalLength);
    maxPL = max(maxPL, d.petalLength);
    minPW = min(minPW, d.petalWidth);
    maxPW = max(maxPW, d.petalWidth);
  }

  // Draw each sample as a little flower
  for (let d of iris) {
    let x = map(d.petalLength, minPL, maxPL, 80, width - 80);
    let y = map(d.petalWidth, minPW, maxPW, height - 80, 80);

    // Slight jitter to make it organic
    x += random(-6, 6);
    y += random(-6, 6);

    drawFlower(x, y, d);
  }

  // only draw once
  noLoop()
}

function drawFlower(x, y, d) {
  push();
  translate(x, y);

  // Species color
  let c;
  if (d.species === "setosa") c = color(120, 220, 255);
  else if (d.species === "versicolor") c = color(255, 160, 120);
  else c = color(140, 15, 140);

  // Size and shape from sepal measurements
  let size = map(d.sepalLength, 4.0, 8.0, 8, 30);
  let petalStretch = map(d.sepalWidth, 2.0, 4.5, 0.6, 1.4);

  noStroke();

  // Glow
  fill(red(c), green(c), blue(c), 35);
  circle(0, 0, size * 2.4);

  // Petals
  fill(red(c), green(c), blue(c), 180);
  for (let i = 0; i < 6; i++) {
    rotate(TWO_PI / 6);
    ellipse(size * 0.6, 0, size * petalStretch, size * 0.6);
  }

  // Center
  fill(255, 230);
  circle(0, 0, size * 0.4);

  pop();
}
