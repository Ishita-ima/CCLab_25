/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let creatureX, creatureY;//i made a change right now
let speedX, speedY;
let creatureSize = 100;
let breatheSpeed = 0.05;
let breatheAngle = 0;
let openingAngle = 0;
let cheeseX, cheeseY;
let eatingState = 0;
let frameCounter = 0;

function setup() {
  let canvas = createCanvas(800, 500);
   canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
  creatureX = width / 2;
  creatureY = height / 2;
  speedX = random(-5, 5);
  speedY = random(-5, 5);
  placeCheese();
}

function draw() {
  drawBackground();
  drawCheese();

  if (eatingState <= 0) {
    // Moving state
    updateCreature();
    drawCreature();
    drawTail();

    // Check for mouse press near cheese
    if (dist(creatureX, creatureY, cheeseX, cheeseY) < 500 && mouseIsPressed) {
      eatingState = 1;
    }
  } else if (eatingState <= 1) {
    // Opening mouth
    openingAngle = openingAngle + radians(5);
    drawCreature();
    drawTail();

    if (openingAngle >= PI / 2) {
      eatingState = 2;
      frameCounter = 0;
    }
  } else if (eatingState <= 2) {
    // Eating
    drawCreature();
    drawTail();
    frameCounter = frameCounter + 1;

    // Draw eaten cheese
    fill(255, 204, 0);
    noStroke();
    ellipse(creatureX, creatureY + creatureSize / 2 + 20, 20, 20);

    if (frameCounter >= 30) {
      eatingState = 3;
    }
  } else if (eatingState <= 3) {
    // Closing mouth
    openingAngle = openingAngle - radians(10);
    drawCreature();
    drawTail();

    if (openingAngle <= 0) {
      eatingState = 0;
      placeCheese();
      openingAngle = 0;
    }
  }
}

function drawBackground() {
  background(112, 128, 144);
  let triSize = 30;
  let Horiz = width / triSize;
  let Vert = height / triSize;

  fill(0);
  noStroke();

  // Edge triangles
  for (let i = 0; i < Horiz; i++) {
    let x = triSize / 2 + i * triSize;
    triangle(x - triSize / 2, 0, x + triSize / 2, 0, x, triSize);
    triangle(
      x - triSize / 2,
      height,
      x + triSize / 2,
      height,
      x,
      height - triSize
    );
  }

  for (let i = 0; i < Vert; i++) {
    let y = triSize / 2 + i * triSize;
    triangle(0, y - triSize / 2, triSize, y, 0, y + triSize / 2);
    triangle(
      width,
      y - triSize / 2,
      width - triSize,
      y,
      width,
      y + triSize / 2
    );
  }
}

function drawCreature() {
  push();
  translate(creatureX, creatureY);

  // Orange body with white border
  fill(255, 165, 0);
  stroke(255);
  strokeWeight(2);
  drawJaggedCircle(0, 0, creatureSize);

  // Yellow eyes when eating 
  if (eatingState >= 1) {
    fill(255, 204, 0);
  } else {
    fill(0);
  }
  noStroke();
  triangle(-15, -10, -25, 0, -5, 0); // Left eye
  triangle(15, -10, 5, 0, 25, 0); // Right eye

  // mouth
  noFill();
  stroke(0);
  strokeWeight(1);
  arc(
    0,
    15,
    30,
    20 + openingAngle * 10,
    PI - openingAngle,
    TWO_PI + openingAngle
  );

  pop();
}

function drawJaggedCircle(x, y, d) {
  let steps = 40;
  let baseRadius = d / 2;
  beginShape();
  for (let i = 0; i < steps; i++) {
    let angle = map(i, 0, steps, 0, TWO_PI);
    let offset = random(-baseRadius * 0.2, baseRadius * 0.2);
    let r = baseRadius + offset;
    vertex(x + r * cos(angle), y + r * sin(angle));
  }
  endShape(CLOSE);
}

function drawTail() {
  push();
  translate(creatureX, creatureY);
  for (let i = 0; i < 40; i++) {
    let x = i - 60;
    let y = sin(radians(frameCount + i) * 10) * 5;
    fill(255);
    noStroke();
    circle(x, y, 3);
  }
  pop();
}

function updateCreature() {
  creatureX = creatureX + speedX;
  creatureY = creatureY + speedY;

  if (
    creatureX <= 30 ||
    creatureX >= width - 30 ||
    creatureY <= 30 ||
    creatureY >= height - 30
  ) {
    creatureX = width / 2;
    creatureY = height / 2;
    speedX = random(-5, 5);
    speedY = random(-5, 5);
  }

  breatheAngle = breatheAngle + breatheSpeed;
  creatureSize = map(sin(breatheAngle), -1, 1, 70, 130);
}

function placeCheese() {
  cheeseX = random(100, width - 100);
  cheeseY = random(100, height - 100);
}

function drawCheese() {
  fill(255, 204, 0);
  noStroke();
  ellipse(cheeseX, cheeseY, 20, 20);
}
