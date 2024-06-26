class Particle {
  fov = 50;
  resolution = 0.5;

  constructor() {
    this.pos = createVector(width / 2, height / 2)
    this.rays = [];
    this.heading = 0;
    for (let a = - this.fov / 2; a < this.fov / 2; a += this.resolution){
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  rotate(angle){
    this.heading += angle;
    let index = 0;
    for (let a = - this.fov / 2; a < this.fov / 2; a += this.resolution){
      this.rays[index].setAngle(radians(a) + this.heading);
      index++;
    }
  }
  
  update(x, y){
    this.pos.set(x, y)
  }
  
  look(walls){
    let scene = new Array(this.fov);
    for(let i = 0; i < this.rays.length; i++){
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      for(let wall of walls){
        const pt = ray.cast(wall);
        if(pt){
          let d = p5.Vector.dist(this.pos, pt); // Euclidean
          const a = ray.dir.heading() - this.heading;
          d *= cos(a);
          if (d < record){
            record = d;
            closest = pt;
          }
        }
      }
      if (closest){
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y)
      }
      scene[i] = record;
    }
    return scene;
  }
  
  show(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4);
    for (let ray of this.rays){
      ray.show();
    }
  }
}