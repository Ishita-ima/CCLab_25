let patterns = [];
let numPatterns = 4;
let scarfImg;
let worldWidth = 2000;
let worldHeight = 2000;
let worldX = 0;
let worldY = 0;

let currentScene = 0; // 0: scarf/circles, 1: ghat, 2: bhu, 3: temple, 4: stupa

let boat1, boat2;
let birds = [];
let numBirds;
let pillars = [];
let numPillars;

// Birds for each scene
let ghatBirds = [];
let ghatNumBirds;
let templeBirds = [];
let templeNumBirds;
let stupaBirds = [];
let stupaNumBirds;

function preload() {
  scarfImg = loadImage("assets/Scarf.jpeg");
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
    fill(this.hullColor);
    stroke(60, 60, 60);
    strokeWeight(2);
    beginShape();
    vertex(-60, 0);
    bezierVertex(-50, 20, 50, 20, 60, 0);
    vertex(60, 0);
    bezierVertex(55, 15, -55, 15, -60, 0);
    endShape(CLOSE);
    stroke(255, 255, 255, 80);
    strokeWeight(1);
    for (let i = -40; i <= 40; i += 20) {
      line(i, 6, i, 12);
    }
    pop();
  }
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  
  // Assign each pattern a unique scene
  patterns.push(new Pattern(random(100, worldWidth-100), random(100, worldHeight-100), "bhu"));
  patterns.push(new Pattern(random(100, worldWidth-100), random(100, worldHeight-100), "temple"));
  patterns.push(new Pattern(random(100, worldWidth-100), random(100, worldHeight-100), "ghat"));
  patterns.push(new Pattern(random(100, worldWidth-100), random(100, worldHeight-100), "stupa"));
  
  boat1 = new Boat(150, 410, color(80, 160, 220));
  boat2 = new Boat(400, 430, color(200, 0, 0));
  
  // Ghat scene pillars
  numPillars = int(random(3, 7));
  for (let i = 0; i < numPillars; i++) {
    let px = 270 + i * (260 / (numPillars - 1));
    pillars.push(px);
  }
  
  // Birds for all scenes
  setupBirds();
  setupGhatBirds();
  setupTempleBirds();
  setupStupaBirds();
}

function setupBirds() {
  birds = [];
  numBirds = int(random(3, 8));
  for (let i = 0; i < numBirds; i++) {
    birds.push(new Bird(random(200, 600), random(80, 200)));
  }
}

function setupGhatBirds() {
  ghatBirds = [];
  ghatNumBirds = int(random(3, 8));
  for (let i = 0; i < ghatNumBirds; i++) {
    ghatBirds.push(new Bird(random(100, 700), random(80, 200)));
  }
}

function setupTempleBirds() {
  templeBirds = [];
  templeNumBirds = int(random(3, 8));
  for (let i = 0; i < templeNumBirds; i++) {
    templeBirds.push(new Bird(random(100, 700), random(80, 200)));
  }
}

function setupStupaBirds() {
  stupaBirds = [];
  stupaNumBirds = int(random(3, 8));
  for (let i = 0; i < stupaNumBirds; i++) {
    stupaBirds.push(new Bird(random(100, 700), random(80, 200)));
  }
}

function draw() {
  if (currentScene === 0) {
    background(220);
    push();
    translate(worldX, worldY);
    image(scarfImg, 0, 0, worldWidth, worldHeight);
    for (let i = 0; i < patterns.length; i++) {
      patterns[i].display();
    }
    pop();

    let navigationSpeed = 10;
    if (keyIsPressed) {
      if (key === 'a' || key === 'A') worldX += navigationSpeed;
      else if (key === 'd' || key === 'D') worldX -= navigationSpeed;
      else if (key === 'w' || key === 'W') worldY += navigationSpeed;
      else if (key === 's' || key === 'S') worldY -= navigationSpeed;
    }

    textSize(15);
    fill(0);
    text("Use A, W, S, D to navigate", 10, 20);
    text("Click a red circle to open a scene", 10, 40);

  } else if (currentScene === 1) {
    background(135, 206, 235);
    drawGhatWithPillars();
    drawTemples();
    boat1.update(); boat1.display();
    boat2.update(); boat2.display();

    // Draw and update ghat birds
    let anyGhatBirdEscaped = false;
    for (let i = 0; i < ghatBirds.length; i++) {
      ghatBirds[i].update();
      ghatBirds[i].display();
      if (ghatBirds[i].state === "zooming" && ghatBirds[i].hasEscaped) anyGhatBirdEscaped = true;
    }
    textSize(15);
    fill(0);
    text("Click a bird to zoom in!", 10, 20);
    if (anyGhatBirdEscaped) {
      currentScene = 0;
      setupGhatBirds();
    }

  } else if (currentScene === 2) {
    background(200, 220, 250);
    drawBhuGateScene();
    let birdEscaped = false;
    for (let i = 0; i < birds.length; i++) {
      birds[i].update();
      birds[i].display();
      if (birds[i].state === "zooming" && birds[i].hasEscaped) birdEscaped = true;
    }
    textSize(15);
    fill(0);
    text("Click a bird to zoom in!", 10, 20);
    if (birdEscaped) {
      currentScene = 0;
      setupBirds();
    }
  } else if (currentScene === 3) {
    // Temple scene
    background(210, 230, 250);
    drawKashiTempleScene();
    let templeBirdEscaped = false;
    for (let i = 0; i < templeBirds.length; i++) {
      templeBirds[i].update();
      templeBirds[i].display();
      if (templeBirds[i].state === "zooming" && templeBirds[i].hasEscaped) templeBirdEscaped = true;
    }
    textSize(15);
    fill(0);
    text("Click a bird to zoom in!", 10, 20);
    if (templeBirdEscaped) {
      currentScene = 0;
      setupTempleBirds();
    }
  } else if (currentScene === 4) {
    // Stupa scene - NEW
    background(200, 230, 255);
    drawStupaScene();
    let stupaBirdEscaped = false;
    for (let i = 0; i < stupaBirds.length; i++) {
      stupaBirds[i].update();
      stupaBirds[i].display();
      if (stupaBirds[i].state === "zooming" && stupaBirds[i].hasEscaped) stupaBirdEscaped = true;
    }
    textSize(15);
    fill(0);
    text("Click a bird to zoom in!", 10, 20);
    if (stupaBirdEscaped) {
      currentScene = 0;
      setupStupaBirds();
    }
  }
}

function mousePressed() {
  if (currentScene === 0) {
    let worldMouseX = mouseX - worldX;
    let worldMouseY = mouseY - worldY;
    for (let i = 0; i < patterns.length; i++) {
      patterns[i].isClicked(worldMouseX, worldMouseY);
      if (patterns[i].isInside) {
        if (patterns[i].type === "bhu") {
          currentScene = 2;
        } else if (patterns[i].type === "temple") {
          currentScene = 3;
        } else if (patterns[i].type === "stupa") {
          currentScene = 4;
        } else {
          currentScene = 1;
        }
      }
    }
  } else if (currentScene === 2) {
    for (let i = 0; i < birds.length; i++) {
      birds[i].isClicked(mouseX, mouseY);
      if (birds[i].isInside && birds[i].state === "flying") {
        birds[i].state = "zooming";
      }
    }
  } else if (currentScene === 1) {
    for (let i = 0; i < ghatBirds.length; i++) {
      ghatBirds[i].isClicked(mouseX, mouseY);
      if (ghatBirds[i].isInside && ghatBirds[i].state === "flying") {
        ghatBirds[i].state = "zooming";
      }
    }
  } else if (currentScene === 3) {
    for (let i = 0; i < templeBirds.length; i++) {
      templeBirds[i].isClicked(mouseX, mouseY);
      if (templeBirds[i].isInside && templeBirds[i].state === "flying") {
        templeBirds[i].state = "zooming";
      }
    }
  } else if (currentScene === 4) {
    for (let i = 0; i < stupaBirds.length; i++) {
      stupaBirds[i].isClicked(mouseX, mouseY);
      if (stupaBirds[i].isInside && stupaBirds[i].state === "flying") {
        stupaBirds[i].state = "zooming";
      }
    }
  }
}

function keyPressed() {
  if (currentScene > 0 && (key === 'b' || key === 'B')) currentScene = 0;
}

//  PATTERN CLASS (simple red circles only) 
class Pattern {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.r = 40;
    this.type = type; // "bhu", "ghat", "temple", or "stupa"
    this.isInside = false;
  }
  display() {
    push();
    fill("red");
    noStroke();
    circle(this.x, this.y, this.r);
    pop();
  }
  isClicked(mx, my) {
    let d = dist(mx, my, this.x, this.y); // use dist to calculate distance
    if (d < this.r / 2) {
      this.isInside = true;
    } else {
      this.isInside = false;
    }
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
      //abs for absolute value, to make zoom effect more smooth
      if (dist(this.zoomX, this.zoomY, targetX, targetY) < 2 && abs(this.zoomSize-250) < 3) {
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
    let d = dist(mx, my, bx, by); // use dist to calculate distance
    // Check if the mouse is inside the bird's area
    if (d < bs) {
      this.isInside = true;
    } else {
      this.isInside = false;
    }
  }
}

// --- NEW: STUPA SCENE (Dhamek Stupa at Sarnath) ---
function drawStupaScene() {
  push();
  translate(width/2, height/2);
  
  // Sky
  noStroke();
  fill(180, 210, 235);
  rect(-width/2, -height/2, width, height/2 + 60);
  
  // Background trees
  drawTreeLine(-width/2, 60, width, 80);
  
  // Green ground
  fill(120, 160, 90);
  rect(-width/2, 60, width, height/2);
  
  // Paved area
  fill(200, 190, 170);
  rect(-300, 110, 600, 200);
  
  // Ruins in foreground
  drawRuins(-250, 200, 500, 80);
  
  // Main stupa structure
  drawStupa(0, 0, 180);
  
  pop();
}

// Draw the cylindrical Dhamek Stupa
function drawStupa(x, y, size) {
  push();
  translate(x, y);
  
  // Base platform
  fill(210, 200, 180);
  stroke(170, 160, 140);
  strokeWeight(2);
  ellipse(0, 100, size*1.2, size*0.3);
  
  // Stone base
  fill(190, 180, 160);
  rect(-size/2.4, 30, size/1.2, 70, 5);
  
  // Cylindrical structure
  fill(140, 130, 110);
  stroke(100, 90, 80);
  strokeWeight(2);
  
  // Main body (tapered cylinder)
  beginShape();
  for (let angle = 0; angle <= PI; angle += PI/24) {
    let sx = cos(angle) * (size/2);
    let sy = 30;
    vertex(sx, sy);
  }
  for (let angle = PI; angle <= TWO_PI; angle += PI/24) {
    let sx = cos(angle) * (size/2);
    let sy = 30;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  
  // Main cylinder body
  fill(150, 140, 120);
  ellipse(0, 30, size, size*0.1);
  rect(-size/2.2, -200, size/1.1, 230, 5);
  
  // Top dome
  fill(120, 110, 100);
  arc(0, -200, size/1.1, size/2, PI, TWO_PI);
  
  // Decorative details
  fill(170, 160, 140);
  noStroke();
  
  // Horizontal bands on cylinder
  for (let y = 20; y > -180; y -= 40) {
    rect(-size/2.3, y, size/1.15, 10, 3);
  }
  
  // Small decoration at top
  fill(90, 80, 70);
  ellipse(0, -230, 10, 20);
  
  // Stone texture
  stroke(120, 110, 100, 40);
  strokeWeight(1);
  for (let i = 0; i < 100; i++) {
    let x1 = random(-size/2.2, size/2.2);
    let y1 = random(-200, 30);
    let x2 = x1 + random(-10, 10);
    let y2 = y1 + random(-10, 10);
    line(x1, y1, x2, y2);
  }
  
  // Windows/niches
  fill(60, 50, 40);
  noStroke();
  for (let angle = 0; angle < TWO_PI; angle += PI/2) {
    let wx = cos(angle) * (size/2.1);
    let wy = -50;
    rect(wx-10, wy-15, 20, 30, 5);
  }
  
  pop();
}

// Draw ruined brick structures around the stupa
function drawRuins(x, y, width, height) {
  push();
  translate(x, y);
  
  // Brick color
  fill(180, 100, 60);
  stroke(140, 80, 40);
  strokeWeight(1);
  
  // Several ruined wall sections
  for (let i = 0; i < 6; i++) {
    let wx = random(0, width);
    let wy = random(0, height/2);
    let ww = random(40, 100);
    let wh = random(20, 40);
    
    // Jagged wall tops (ruins)
    beginShape();
    vertex(wx, wy+wh);
    vertex(wx, wy);
    
    // Create jagged top
    for (let j = 0; j < ww; j += 8) {
      vertex(wx+j, wy-random(0, 10));
    }
    
    vertex(wx+ww, wy);
    vertex(wx+ww, wy+wh);
    endShape(CLOSE);
    
    // Brick pattern
    stroke(140, 80, 40, 120);
    strokeWeight(0.5);
    for (let row = 0; row < wh; row += 5) {
      for (let col = 0; col < ww; col += 10) {
        let offset = (row % 10 === 0) ? 0 : 5;
        rect(wx + col + offset, wy + row, 9, 4);
      }
    }
  }
  
  // Circular ruined foundation
  noFill();
  stroke(160, 90, 50);
  strokeWeight(2);
  for (let radius = 40; radius < 100; radius += 10) {
    let segments = floor(radius/5);
    for (let i = 0; i < segments; i++) {
      let start = random(0, TWO_PI);
      let end = start + random(PI/8, PI/3);
      arc(width/4*3, height/3, radius*2, radius*2, start, end);
    }
  }
  
  pop();
}

// Draw a line of trees for the background
function drawTreeLine(x, y, width, height) {
  push();
  translate(x, y);
  
  noStroke();
  for (let i = 0; i < width; i += 20) {
    let treeHeight = random(30, 70);
    let treeWidth = random(20, 40);
    
    // Tree trunk
    fill(100, 70, 40);
    rect(i, 0, 5, treeHeight);
    
    // Tree foliage
    fill(60 + random(40), 100 + random(40), 40 + random(30));
    ellipse(i+2, -treeHeight/2, treeWidth, treeHeight);
  }
  
  pop();
}

// --- KASHI TEMPLE SCENE ---
function drawKashiTempleScene() {
  push();
  translate(width/2, height/2);
  
  // Base platform
  fill(210, 190, 170);
  noStroke();
  rect(-350, 100, 700, 50, 5);
  
  // Background temples/towers (smaller, in distance)
  drawShikhara(-250, 80, 70, 140, color(230, 230, 230));
  drawShikhara(250, 80, 70, 140, color(230, 230, 230));
  
  // Main temple complex
  
  // Golden dome (central feature)
  fill(255, 215, 0);
  stroke(150, 120, 10);
  strokeWeight(2);
  ellipse(0, -10, 120, 100);
  
  // Base structure for golden dome
  fill(245, 222, 179);
  rect(-50, 5, 100, 95, 5);
  
  // Main white shikhara (right of gold dome)
  drawShikhara(80, 60, 80, 180, color(245, 245, 245));
  
  // Secondary white shikhara (left of gold dome)
  drawShikhara(-80, 60, 80, 180, color(245, 245, 245));
  
  // Golden spire on top of dome
  stroke(255, 215, 0);
  strokeWeight(3);
  line(0, -60, 0, -90);
  
  // Flag on top
  fill(255, 140, 0);
  noStroke();
  triangle(0, -90, 15, -85, 0, -80);
  
  // Crowd of people (simplified)
  drawCrowdOfPeople();
  
  pop();
}

// Function to draw a shikhara (temple spire)
function drawShikhara(x, y, width, height, color) {
  push();
  translate(x, y);
  
  // Main body of shikhara
  fill(color);
  stroke(150);
  strokeWeight(1);
  
  // Base of shikhara
  rect(-width/2, 0, width, 20);
  
  // Tapered spire shape
  beginShape();
  vertex(-width/2, 0);
  vertex(-width/4, -height * 0.6);
  vertex(0, -height);
  vertex(width/4, -height * 0.6);
  vertex(width/2, 0);
  endShape(CLOSE);
  
  // Horizontal lines (architectural details)
  stroke(130);
  for (let i = 0; i < 5; i++) {
    let y = -i * (height/6);
    line(-width/2 + i * 5, y, width/2 - i * 5, y);
  }
  
  // Top ornament
  fill(255, 215, 0);
  noStroke();
  ellipse(0, -height-10, 10, 15);
  
  pop();
}

// Simplified representation of crowd
function drawCrowdOfPeople() {
  // Draw people as simple shapes
  for (let i = 0; i < 40; i++) {
    let x = random(-300, 300);
    let y = random(100, 150);
    let size = random(5, 10);
    
    // Person
    fill(random(100, 200), random(50, 150), random(50, 150));
    noStroke();
    ellipse(x, y, size, size); // Head
    rect(x-size/2, y+size/2, size, size*1.5); // Body
  }
  
  // Add barrier/railing
  stroke(100);
  strokeWeight(2);
  line(-300, 130, 300, 130);
  for (let x = -280; x <= 280; x += 40) {
    line(x, 130, x, 150);
  }
}

// --- DRAW BHU GATE FULL SCENE ---
function drawBhuGateScene() {
  push();
  translate(width/2-10, height/2+60);
  scale(2.2);
  drawBhuGateCore(0, 0);
  pop();
}

// --- DRAW BHU GATE CORE ---
function drawBhuGateCore(cx, cy) {
  fill(249, 224, 127);
  stroke(140, 80, 30);
  strokeWeight(2);
  rectMode(CENTER);
  rect(cx, cy+30, 130, 120, 8);

  rect(cx-70, cy+30, 38, 110, 8);
  rect(cx+70, cy+30, 38, 110, 8);

  fill(249, 224, 127);
  stroke(140, 80, 30);
  rect(cx, cy-36, 130, 16, 4);
  rect(cx-70, cy-26, 38, 12, 4);
  rect(cx+70, cy-26, 38, 12, 4);

  fill(249, 224, 127);
  stroke(140, 80, 30);
  rect(cx, cy-56, 32, 32, 4);
  triangle(cx-16, cy-72, cx, cy-100, cx+16, cy-72);
  rect(cx, cy-92, 12, 18, 2);
  triangle(cx-6, cy-100, cx, cy-110, cx+6, cy-100);
  rect(cx-70, cy-56, 18, 32, 4);
  triangle(cx-79, cy-72, cx-70, cy-90, cx-61, cy-72);
  rect(cx+70, cy-56, 18, 32, 4);
  triangle(cx+61, cy-72, cx+70, cy-90, cx+79, cy-72);

  fill(255, 245, 200);
  stroke(180, 120, 60);
  rect(cx, cy+58, 54, 65, 6);
  fill(220, 200, 150);
  rect(cx-70, cy+58, 18, 65, 6);
  rect(cx+70, cy+58, 18, 65, 6);

  fill(180, 140, 80);
  rect(cx-70, cy+25, 10, 18, 2);
  rect(cx+70, cy+25, 10, 18, 2);
  fill(180, 140, 80, 160);
  rect(cx, cy+25, 18, 14, 2);

  fill(255);
  rect(cx, cy-12, 50, 16, 2);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(10);
  text("काशी हिन्दू विश्वविद्यालय", cx, cy-12);

  fill(210, 190, 150);
  rect(cx-40, cy+90, 10, 38, 3);
  rect(cx+40, cy+90, 10, 38, 3);

  drawPalm(cx-90, cy+10, 25, 60);
  drawPalm(cx+90, cy+10, 25, 60);
}

// --- PALM TREE ---
function drawPalm(x, y, w, h) {
  push();
  translate(x, y);
  stroke(80, 60, 30);
  strokeWeight(w/7);
  line(0, h*0.2, 0, h);
  stroke(40, 120, 50);
  strokeWeight(2);
  for (let a = -PI/2-0.5; a <= -PI/2+0.5; a += 0.2) {
    let lx = cos(a) * w;
    let ly = sin(a) * w;
    line(0, 0, lx, ly);
  }
  for (let a = -PI/2+0.7; a <= -PI/2+1.5; a += 0.2) {
    let lx = cos(a) * w;
    let ly = sin(a) * w;
    line(0, 0, lx, ly);
  }
  for (let a = -PI/2-1.5; a <= -PI/2-0.7; a += 0.2) {
    let lx = cos(a) * w;
    let ly = sin(a) * w;
    line(0, 0, lx, ly);
  }
  pop();
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

// --- GHAT WITH PILLARS ---
function drawGhatWithPillars() {
  let baseY = 350;
  let stepHeight = 13;
  let stepWidth = 320;
  for (let i = 0; i < 10; i++) {
    let redValue;
    if (i % 2 === 0) redValue = 255;
    else redValue = 200;
    fill(redValue, 0, 0);
    rect(240 - i * 13, baseY - i * stepHeight, stepWidth + i * 26, stepHeight);
  }
  for (let i = 0; i < pillars.length; i++) {
    let px = pillars[i];
    fill(210, 190, 150);
    rect(px, baseY - 130, 18, 130, 6);
    fill(180, 140, 80);
    ellipse(px + 9, baseY - 130, 26, 18);
  }
  noStroke();
  fill(70, 130, 180);
  rect(0, 420, width, 80);
}

// --- TEMPLE DRAWING ---
function drawTemples() {
  fill(220, 180, 120);
  rect(340, 160, 60, 60);
  fill(180, 140, 80);
  rect(350, 120, 40, 40);
  fill(160, 120, 60);
  ellipse(370, 120, 40, 30);
  fill(100, 80, 40);
  ellipse(370, 110, 18, 18);

  fill(210, 170, 110);
  rect(270, 180, 35, 45);
  fill(130, 100, 60);
  ellipse(287, 180, 35, 20);

  fill(210, 170, 110);
  rect(495, 180, 35, 45);
  fill(130, 100, 60);
  ellipse(512, 180, 35, 20);

  fill(80, 60, 40, 120);
  for (let i = 0; i < 3; i++) {
    rect(355 + i * 15, 180, 8, 20, 2);
  }
}
