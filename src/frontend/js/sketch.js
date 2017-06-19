const BRUSH = 0;
const CIRCLE = 1;
const SQUARE = 2;
const TRIANGLE = 3;

let canvas;

const drawing = [];
let currentPath = [];
let isDrawing = false;

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(startPath);
  canvas.mouseReleased(endPath);
}

function draw() {
  if (isDrawing) {
    const point = {
      x: mouseX,
      y: mouseY,
    };
    currentPath.push(point);
  }
  stroke(0);
  strokeWeight(4);
  noFill();
  for (let i = 0; i < drawing.length; i += 1) {
    const path = drawing[i];
    beginShape();
    for (let j = 0; j < path.length; j += 1) {
      vertex(path[j].x, path[j].y)
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
