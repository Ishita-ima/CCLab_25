let cherryBlossoms = [];
let numCB = 100;
let backgroundHue;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  colorMode(HSB);
  backgroundHue = random(180, 240); // Light blue hues
}

function draw() {
  background(backgroundHue, 10, 100); // Light blue background

  // Add new cherry blossoms
  if (cherryBlossoms.length < numCB) {
    cherryBlossoms.push(new CherryBlossom(random(width), random(-50, -10)));
  }

  
  for (let i = cherryBlossoms.length - 1; i >= 0; i--) {
    cherryBlossoms[i].update();
    cherryBlossoms[i].display();

    // Remove blossoms that fall off-screen
    if (cherryBlossoms[i].y > height) {
      cherryBlossoms.splice(i, 1);
    }
  }

  

  // Draw static cherry blossoms on the tree
  for (let i = 0; i < 50; i++) {
    let x = random(width / 2 - 50, width / 2 + 50);
    let y = random(height / 2, height);
    drawCherryBlossom(x, y);
  }
}

class CherryBlossom {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 15);
    this.cbHue = random(300, 360); // Pinkish hues
    this.speedX = random(-1, 1);
    this.speedY = random(1, 3);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += random(0.01, 0.05); // Gravity effect
    this.speedX *= random(0.98, 1); // Slightly reduce horizontal speed
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.cbHue, 80, 100); // Pink color with saturation and brightness
    noStroke();
    ellipse(0, 0, this.size);
    pop();
  }
}

//Draw a tree


//draw static cherry blossoms on the tree
function drawCherryBlossom(x, y) {
  
fill(random(300, 360),80 ,100)
ellipse(x,y ,random(5-10))
}
