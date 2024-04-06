//https://www.youtube.com/watch?v=TOEi6T2mtHo&t=1s

let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 1000;
let rotationSpeed = 0.02;

const canvasWidth = 800;
const sceneW = canvasWidth / 2;
const sceneH = 400

function setup() {
  createCanvas(canvasWidth, sceneH);

  for(let i = 0; i < 5; i++){
    let x1 = random(sceneW);
    let x2 = random(sceneW);
    let y1 = random(sceneH);
    let y2 = random(sceneH);
    walls.push(new Boundary(x1, y1, x2, y2))
  }
  // walls.push(new Boundary(150, 150, 150, 250));
  // walls.push(new Boundary(150, 150, 250, 150));
  // walls.push(new Boundary(250, 150, 250, 250));

  walls.push(new Boundary(0, 0, sceneW, 0));
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
  walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
  walls.push(new Boundary(0, sceneH, 0, 0));
  particle = new Particle();
}

function draw() {
  if(keyIsDown(81)){ // q
    particle.rotate(-rotationSpeed);
  } else if(keyIsDown(68)){
    particle.rotate(rotationSpeed);
  }



  background(0);
  for (let wall of walls){
    wall.show()
  }
  particle.show();
  //particle.update(noise(xoff) * sceneW, noise(yoff) * sceneH)
  particle.update(mouseX, mouseY);

  xoff += 0.01;
  yoff += 0.01;

  scene = particle.look(walls);
  
  const w = sceneW / scene.length; // resolution
  push();
  translate(sceneW, 0);
  for (let i = 0; i < scene.length; i++ ){
    noStroke();
    const sq = scene[i] * scene[i];
    const wSq = sceneW * sceneW;
    //const b = map(sq, 0, wSq, 255, 0); // tuto, trop lumineux
    const b = map(scene[i], 0, sceneW, 255, 0);
    //const h = map(scene[i], 0, sceneW, sceneH, 0); // tuto, mais a un effet fisheye car fait des proportion avec la taille d'écran
    const h = 0.5 * (0.2 / scene[i]) * wSq; // pourquoi on prend la version au carré ? j'ai pris ça au piff, et ça marche.
    fill(b);
    rectMode(CENTER);
    rect(i * w + w / 2, sceneH / 2, w + 1, h);
  }
  pop();
}