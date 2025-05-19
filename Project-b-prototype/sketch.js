let boat1, boat2;
let birds = [];
let numBirds;

function setup() {
  createCanvas(800, 500);

  boat1 = new Boat(150, 410, color(80, 160, 220));
  boat2 = new Boat(400, 430, color(200, 0, 0));

  // Setup birds
  numBirds = int(random(3, 8));
  for (let i = 0; i < numBirds; i++) {
    birds.push(new Bird(random(200, 600), random(80, 200)));
  }
}

function draw() {
  background(135, 206, 235); // Sky

  drawGhat();
  drawTemples();

  boat1.update();
  boat1.display();

  boat2.update();
  boat2.display();

  // Draw and update birds
  let anyBirdEscaped = false;
  for (let i = 0; i < birds.length; i++) {
    birds[i].update();
    birds[i].display();
    if (birds[i].state === "zooming" && birds[i].hasEscaped) anyBirdEscaped = true;
  }

  // Instructions
  textSize(15);
  fill(0);
  text("Click a bird to zoom in!", 10, 20);

  // Reset birds after zoom
  if (anyBirdEscaped) {
    birds = [];
    numBirds = int(random(3, 8));
    for (let i = 0; i < numBirds; i++) {
      birds.push(new Bird(random(200, 600), random(80, 200)));
    }
  }
}

function mousePressed() {
  for (let i = 0; i < birds.length; i++) {
    birds[i].isClicked(mouseX, mouseY);
    if (birds[i].isInside && birds[i].state === "flying") {
      birds[i].state = "zooming";
    }
  }
}

// --- BOAT CLASS ---
class Boat {
  constructor(startX, startY, hullColor) {
    this.x = startX;
    this.y = startY;
    this.hullColor = hullColor;
    this.scaleFactor = 1.1;
  }
  update() {
    this.x += 0.5;
    if (this.x > width + 80) this.x = -80;
  }
  display() {
    push();
    translate(this.x, this.y);
    scale(this.scaleFactor);

    // Hull using vertex
    fill(this.hullColor);
    stroke(60, 60, 60);
    strokeWeight(2);
    beginShape();
    vertex(-60, 0);
    bezierVertex(-50, 20, 50, 20, 60, 0);
    vertex(60, 0);
    bezierVertex(55, 15, -55, 15, -60, 0);
    endShape(CLOSE);

    // Plank lines
    stroke(255, 255, 255, 80);
    strokeWeight(1);
    for (let i = -40; i <= 40; i += 20) {
      line(i, 6, i, 12);
    }
    pop();
  }
}

// --- BIRD CLASS ---
class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(22, 34);
    this.dirX = random([-1, 1]);
    this.dirY = random([-1, 1]);
    this.speed = random(1, 2);
    this.state = "flying"; // "flying" or "zooming"
    this.zoomX = this.x;
    this.zoomY = this.y;
    this.zoomSize = this.size;
    this.hasEscaped = false;
    this.isInside = false;
  }
  update() {
    if (this.state === "flying") {
      this.x += this.dirX * this.speed;
      this.y += this.dirY * this.speed;
      if (this.x < 60 || this.x > width-60) this.dirX *= -1;
      if (this.y < 40 || this.y > 240) this.dirY *= -1;
      if (random() < 0.01) this.dirX *= -1;
      if (random() < 0.01) this.dirY *= -1;
    } else if (this.state === "zooming") {
      let targetX = width/2;
      let targetY = height/2;
      this.zoomX = lerp(this.zoomX, targetX, 0.1);
      this.zoomY = lerp(this.zoomY, targetY, 0.1);
      this.zoomSize = lerp(this.zoomSize, 250, 0.08);

      // Use squared distance and manual abs
      let dx = this.zoomX - targetX;
      let dy = this.zoomY - targetY;
      let dist2 = dx*dx + dy*dy;
      let dz = this.zoomSize - 250;
      if (dz < 0) dz = -dz;
      // Thresholds: squared distance < 4, dz < 3
      if (dist2 < 4 && dz < 3) {
        this.hasEscaped = true;
      }
    }
  }
  display() {
    if (this.state === "flying") {
      drawRealBird(this.x, this.y, this.size, this.dirX);
    } else {
      drawRealBird(this.zoomX, this.zoomY, this.zoomSize, 1);
    }
  }
  isClicked(mx, my) {
    let bx, by, bs;
    if (this.state === "zooming") {
      bx = this.zoomX;
      by = this.zoomY;
      bs = this.zoomSize;
    } else {
      bx = this.x;
      by = this.y;
      bs = this.size;
    }
    let dx = mx - bx;
    let dy = my - by;
    let dist2 = dx*dx + dy*dy;
    if (dist2 < bs*bs) {
      this.isInside = true;
    } else {
      this.isInside = false;
    }
  }
}

// --- BIRD SHAPE ---
function drawRealBird(x, y, s, facing) {
  push();
  translate(x, y);
  scale(facing, 1);
  fill(80, 80, 80);
  stroke(40);
  strokeWeight(s * 0.07);
  ellipse(0, 0, s * 1.1, s * 0.55);
  fill(120, 120, 120);
  ellipse(s * 0.42, -s * 0.08, s * 0.34, s * 0.34);
  fill(230, 180, 50);
  triangle(s * 0.57, -s * 0.08, s * 0.75, -s * 0.03, s * 0.57, s * 0.06);
  fill(0);
  ellipse(s * 0.5, -s * 0.13, s * 0.07, s * 0.07);
  noFill();
  stroke(60, 60, 60);
  strokeWeight(s * 0.09);
  arc(-s * 0.05, -s * 0.15, s * 0.9, s * 0.9, PI * 0.9, PI * 1.7);
  fill(70, 70, 70);
  noStroke();
  triangle(-s * 0.55, 0, -s * 0.82, -s * 0.12, -s * 0.7, s * 0.13);
  pop();
}

// Draw ghat steps with red and white stripes
function drawGhat() {
  let baseY = 350;
  let stepHeight = 13;
  let stepWidth = 320;
  for (let i = 0; i < 10; i++) {
    fill(i % 2 === 0 ? 255 : 200, 0, 0);
    rect(240 - i * 13, baseY - i * stepHeight, stepWidth + i * 26, stepHeight);
  }
  // River
  noStroke();
  fill(70, 130, 180);
  rect(0, 420, width, 80);
}

// Draw simple temples above the stairs
function drawTemples() {
  // Main central temple
  fill(220, 180, 120);
  rect(340, 160, 60, 60);
  fill(180, 140, 80);
  rect(350, 120, 40, 40);
  fill(160, 120, 60);
  ellipse(370, 120, 40, 30);
  fill(100, 80, 40);
  ellipse(370, 110, 18, 18);

  // Side domes
  fill(210, 170, 110);
  rect(270, 180, 35, 45);
  fill(130, 100, 60);
  ellipse(287, 180, 35, 20);

  fill(210, 170, 110);
  rect(495, 180, 35, 45);
  fill(130, 100, 60);
  ellipse(512, 180, 35, 20);

  // Add windows for detail
  fill(80, 60, 40, 120);
  for (let i = 0; i < 3; i++) {
    rect(355 + i * 15, 180, 8, 20, 2);
  }
}
