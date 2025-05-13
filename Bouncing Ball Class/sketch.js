
// let egg1;
// let egg2;
let basket = [];//eggArray, eggs

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
//   egg1= new Egg (100);
// egg2=new Egg (200);

// let egg = new Egg (100, 100)
// basket.push(egg);

for (let i=0; i<100; i++){
  let egg = new Egg (random (0,width), random (0,height));
  basket.push(egg);
}

console.log(basket)

}

function draw() {
  background(0);
  // egg1.update();
 
  // egg1.display();
  // egg2.update();
  // egg2.display()

  for (let i=0; i<100; i++){
    basket[i].update();
    basket[i].display();
  }
  // egg1.update()
}

class Egg {
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.diaX = 80;
    this.diaY = 130;
    this.speedX =random (-2,2);
    this.speedY = random (-2,2);
    this.scaleFactor = random(0.3,1);
  }

  update(){
  this.x +=this.speedX;
  this.y +=this.speedY;

  if (this.x<0 || this.x>width){
    this.speedX *= -1;
  }
  if (this.y<0 || this.y>height){
    this.speedY *= -1;
  }
  }

  display() {
    push();
     translate(this.x, this.y);
     scale (this.scaleFactor);
     //circle(0, 0, this.dia);  
     //upper half
     //ellipse (0,0, this.diaX, this.diaY)
     arc (0,0,this.diaX, this.diaY,PI, TWO_PI);
     //lower half
     //ellipse (0,0,this.diaX, this.diaX)
     arc (0,0,this.diaX, this.diaX,0,PI);
  pop();
  }}