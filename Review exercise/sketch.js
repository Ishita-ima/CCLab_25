let xArray=[];
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  for (let x =20; x < width; x = x + 30) {
    xArray.push(x);
  }console.log(xArray);
}

function draw() {
  background(200);

 for (let i = 0; i < xArray.length; i++) {
    let x = xArray[i];
    rect(x, 200, 20, 20);
  }

}