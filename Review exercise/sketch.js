let patterns = [];
let numPatterns = 4;
let scarfImg;
let imgW, imgH;
let worldWidth = 800;
let worldHeight = 500;
let worldX = 0;
let worldY = 0;

let currentScene = 0; // 0: scarf/circles, 1: landscape

let boat1, boat2;

// --- PRELOAD ---
function preload() {
  scarfImg = loadImage("assets/Scarf.jpeg");
}

// --- SETUP ---
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  // Scene 0: patterns
  for (let i = 0; i < numPatterns; i++) {
    patterns.push(new Pattern(random(width), random(height)));
  }
  // Scene 1: boats
  boat1 = new Boat(150, 410, color(80, 160, 220));
  boat2 = new Boat(400, 430, color(200, 0, 0));
}

// --- DRAW ---
function draw() {
  if (currentScene === 0) {
    // Scene 0: scarf and circles
    background(220);
    push();
    translate(worldX, worldY);
    image(scarfImg, 0, 0, worldWidth, worldHeight);
    pop();

    for (let i = 0; i < patterns.length; i++) {
      patterns[i].update();
      patterns[i].display();
    }

    let navigationSpeed = 10;
    if (keyIsDown(LEFT_ARROW)) worldX += navigationSpeed;
    if (keyIsDown(RIGHT_ARROW)) worldX -= navigationSpeed;
    if (keyIsDown(UP_ARROW)) worldY += navigationSpeed;
    if (keyIsDown(DOWN_ARROW)) worldY -= navigationSpeed;

    textSize(15);
    fill(0);
    text("Use arrow keys to navigate", 10, 20);
    text("Click a red circle to open the landscape", 10, 40);
  } else if (currentScene === 1) {
    // Scene 1: landscape with boats
    background(135, 206, 235); // Sky
    drawGhat();
    drawTemples();
    boat1.update();
    boat1.display();
    boat2.update();
    boat2.display();

    textSize(15);
    fill(0);
    text("Press 'b' to go back", 10, 20);
  }
}

// --- MOUSE CLICKED ---
function mousePressed() {
  if (currentScene === 0) {
    // Check if any pattern is clicked
    for (let i = 0; i < patterns.length; i++) {
      if (patterns[i].isClicked(mouseX - worldX, mouseY - worldY)) {
        currentScene = 1;
        break;
      }
    }
  }
}

// --- KEY PRESSED ---
function keyPressed() {
  // Allow user to return to scarf/circle scene
  if (currentScene === 1 && (key === 'b' || key === 'B')) {
    currentScene = 0;
  }
}

// --- PATTERN CLASS ---
class Pattern {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
  }
  update() {}
  display() {
    push();
    fill("red");
    noStroke();
    circle(this.x, this.y, this.r);
    pop();
  }
  isClicked(mx, my) {
    // Check if mouse (mx, my) is within this circle
    let d = dist(mx, my, this.x, this.y);
    return d < this.r / 2;
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

// --- GHAT DRAWING ---
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

// --- TEMPLE DRAWING ---
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
