/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new IshitaDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class IshitaDancer {
  constructor(startX, startY) {
    // Position and movement
    this.x = startX;
    this.y = startY;
    this.diameter = 100; // Body diameter
    this.radius = this.diameter / 2; // Radius for leg positioning
    
    // Ballet movement properties
    this.twirl = 0; // Angle for twirling
    this.twirlSpeed = 0.05;
    this.jumpHeight = 40;
    this.jumpAngle = 0;
    this.jumpSpeed = 0.08;
    
    // Horizontal movement
    this.moveSpeed = 1.2;
    this.direction = 1; // 1 for right, -1 for left
    
    // Leg properties
    this.legLength = 60;
    
    // Facial features
    this.eyeSize = 15;
    this.eyeOffset = 20;
    
  }
  update() {
    // Update twirl and jump
    this.twirl += this.twirlSpeed;
    this.jumpAngle += this.jumpSpeed;
    
    // Update horizontal position
    this.x += this.moveSpeed * this.direction;
    
    // Check boundaries and reverse direction if needed
    if (this.x > width - this.radius || this.x < this.radius) {
      this.direction *= -1;
  }}
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    // Apply the jump effect
    let jumpOffset = sin(this.jumpAngle) * this.jumpHeight;
    translate(this.x, this.y + jumpOffset);
    
    // Apply twirl
    rotate(sin(this.twirl) * 0.3);

    // Draw puppet strings
    stroke(255); // White strings
    strokeWeight(1);
    line(-5, -this.radius, -50, -100); // Left string
    line(10, -this.radius, 50, -100); // Right string
    
    // Draw body
    fill(200, 300, 100);
    ellipse(0, 0, this.diameter, this.diameter);
    
    // Draw top
    stroke(139, 69, 19); // Brown color
    strokeWeight(15);
    line(-30, -this.radius + 5, 30, -this.radius + 5);
    
    // Draw eyes
    fill(255);
    noStroke();
    ellipse(-this.eyeOffset, -15, this.eyeSize, this.eyeSize);
    ellipse(this.eyeOffset, -15, this.eyeSize, this.eyeSize);
    
    // Draw pupils
    fill(0);
    ellipse(-this.eyeOffset, -15, this.eyeSize/2, this.eyeSize/2);
    ellipse(this.eyeOffset, -15, this.eyeSize/2, this.eyeSize/2);
    
    // Draw nose
    fill(255, 150, 150);
    ellipse(0, 0, 20, 10);
    
    // Draw smile
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(0, 10, 40, 30, 0.2, PI-0.2);
    
    // Draw ballet legs
    stroke(255, 0, 0); // Red legs
    strokeWeight(4);



    // Leg positions 
    // First leg - extended in position
    let leg1Angle = PI/2 + sin(this.twirl * 1.5) * 0.7;
    let leg1StartX = this.radius * cos(leg1Angle);
    let leg1StartY = this.radius * sin(leg1Angle);
    let leg1EndX = leg1StartX + this.legLength * cos(leg1Angle - 0.2);
    let leg1EndY = leg1StartY + this.legLength * sin(leg1Angle - 0.2);
    
    // Second leg - in position
    let leg2Angle = PI/2 - 0.3 + cos(this.twirl * 1.2) * 0.5;
    let leg2StartX = this.radius * cos(leg2Angle);
    let leg2StartY = this.radius * sin(leg2Angle);
    let leg2EndX = leg2StartX + this.legLength * 0.7 * cos(leg2Angle + 0.4);
    let leg2EndY = leg2StartY + this.legLength * 0.7 * sin(leg2Angle + 0.4);
    
    // Draw the legs
    line(leg1StartX, leg1StartY, leg1EndX, leg1EndY);
    line(leg2StartX, leg2StartY, leg2EndX, leg2EndY);
    




    // ⬆️ draw your dancer above ⬆️
    // ******** //

  
   

    pop();
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/