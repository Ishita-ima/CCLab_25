//let greetings1 = "Hallo";
//let greetings2 = "nihao";
let greetings=["Hallo", "nihao", "bonjour", "namaste"];
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(10,210,230);

  // text(greetings[0], width/2,height/2)
  // text(greetings[1], width/2,height/2+12)

  for (let i = 0; i < greetings.length; i++) {
    if (i==0){}
    fill("red");
  }else if (i==gretings.length-1){fill("blue")
  }
    text(greetings[i], width/2,height/2+i*12)
  }

