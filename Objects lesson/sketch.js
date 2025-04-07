function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  boat1=new Boat();
  console.log(boat1);
}

function draw() {
  background(30,50,240);
  boat1.display();
}

class Boat {
  constructor(){
    this.x=100;
    this.y=100;
    this.scaleFactor=1;
  }
  display(){
    push();
    translate(this.x, this.y);

    noStroke();
    
    fill(20, 40, 90)
    arc(0, -20, 150, 90, 0, PI);
    

    push();
    translate(0, -50);
    fill(200, 120, 90)
    triangle(0, -30, 20, 0, 0, 30)

    fill("green");
    circle(0, 0, 5)
    pop();

    fill("red");
    circle(0, 0, 5)
    pop();
  }}