let p;
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  p= new pinWheel(width/2, height/2);
}

function draw() {
  background(220);
  p.update();
  p.display();
}

class pinWheel {
  constructor (startX, startY){
    this.x=startX;
    this.y=startY;
    this.angle =0;
    this.scaleFactor = 1;
    }
  update(){
  }

  drawSingleWing(){
    fill (30, 90, 100);
    triangle (0,0,0,-this.radius/2, this.radius/2, this.radius/2);

    fill (220, 150, 30);

    triangle (0,0, this.radius/2, -this.radius/2, this.radius/2, 0);
  }
  display(){
    push();
    translate(this.x, this.y);

    strokeWeight (5);
    line (0,0,0, this.radius*2);

    noStroke();


    //pinwheel with 4 wings

    push();
    translate(0, 0);
    rotate(radians(-this.angle));
    for (let i = 0; i < 4; i++){
      rotate(radians(360/4));
      this.drawSingleWing();
    }
    pop();
    
    fill("red");
    circle (0,0,5);
    pop();
    
   
  }}