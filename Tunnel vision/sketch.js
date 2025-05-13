let stars = [];
function setup() {
  
  let canvas = createCanvas(windowWidth, windowHeight); // fullscreen!
  canvas.parent("p5-canvas-container");
  // p.push(new Poi())
}

function draw() {
  background(0);

  for (let i = 0;i<1)

  for(let i = 0; i < 1; i++){
    stars.push(new Star()) 
  }
  for(let i = 0; i < stars.length; i++){
    stars[i].update();
    stars[i].display();
  }

  // clean
  for (let i = stars.length - 1; i >= 0; i--) {
    if (stars[i].s > 4) {
      stars.splice(i, 1);
    }
  }

  textAlign (CENTER);


  console.log(stars.length)

}

class Star{
  constructor(){
    this.s = 0.02
    this.a = random(360)
    this.originX = mouseX; // variable point
    let r = random();
    if(r<0.01){
      this.type = "ring"
    }else{this.type = "star"}

    
  }
  update(){
    this.s *= 1.04
    // keep turning vision
    this.originX = lerp(this.originX, width/2, 0.02)
  }
  display(){
    push()
    translate(this.originX, height/2)
    rotate(radians(this.a))
    scale(this.s)

    if (this.type == "star"){
      noStroke();
      fill (255)
      circle (0,200,20)

    }else if (this.type == "ring"){
      stroke (255, 50)
      noFill()
      circle (0,0,200)
      // circle (0,0,180)
      // circle (0,0,160)

    }
    // noStroke();
    // circle(0, 200, 20)
    // stroke(255)
    // line(0,100,0,200)
    pop()
  
}}