let paperImg;

let imgW, imgH;

let particles =[];

let numParticles=5;
let worldWidth = 2000;
let worldHeight =2000;
let worldX = 0;
let worldY= 0;



function preload() {
  paperImg = loadImage("assets/Paper-Texture-4.jpg");
}




function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

 for (let i = 0; i < numParticles; i++){
    particles.push(new Particle());
  }

  imgH = paperImg.height;
  imgW = paperImg.width;
}

function draw() {
  background(220);
  push ();
  translate(worldX, worldY);

  image(paperImg, 0, 0, worldWidth, worldHeight);

  for (let i = 0; i < particles.length; i++){
    particles[i].update();
    particles[i].display();
  }

  pop();

  let navigationSpeed =4;
  if(keyIsPressed == true){
    if(key=="a"){
      worldX += navigationSpeed;}
      else if (key=="d"){
        worldX -= navigationSpeed;
      }
      else if (key=="w"){
        worldY += navigationSpeed;
      }
      else if (key=="s"){
        worldY -= navigationSpeed;
      }
    }
  }


class Particle{
  constructor(){
    this.x = random(0, width);
    this.y = random(0, height);
    this.speedX = random(-2, 2);
    this.dia = 20
  }
  update(){
    this.x += this.speedX;

    // bounce
    if(this.x > width-this.dia/2 || this.x < this.dia/2){
      this.speedX = -this.speedX;
    }
  }
  display(){
    push();
    translate(this.x, this.y);

    circle(0, 0, this.dia);

    pop();
  }
}