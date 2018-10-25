var posP = 0,
  Bspeed, r, l;
var c;
var e = [];
var lvl = 1;
var eCount = 10;
var score = 1;
var txtSiz;
var difference =1.1;
var nxtLVL;
var stock =30;
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  Bspeed = width / 100;
  txtSiz = width / 40;
  cnv.position(0, 0);
  noStroke();
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(txtSiz);
  pos = width / 2;
  c = new Cube();
  for (var i = 0; i < eCount; i++) {
    let w = int(random(width / 57, width / 14.8));
    let h = int(random(height / 30, height / 15));
    let x = int(random(w / 2, width - w / 2));
    let y = int(random(-50 * (lvl ** 0.98) * eCount, -h / 2));
    let rn1=((lvl**(0.25)) * height / 150);
    let rn2=((lvl**(0.5)) * height / 100);
    let speed = int(random(rn1,rn2));
    e[i] = new Enemie(x, y, w, h, speed);
  }
  nxtLVL=int(getNum());
}
function draw() {
  breed();
  stages();
  background(0);
  Ui();
  c.Cdisplay();
  c.Cmove(posP);
  for (let enm of e) {
    c.Cinspect(enm.x, enm.y, enm.width, enm.height, enm.speed)
    enm.Edisplay();
    enm.Emove();
  }
  for (let i = 0; i < e.length; i++) {
    if (e[i].y > height + e[i].height / 2) {
      score++;
      nxtLVL--;
      e.splice(i, 1);
    }
  }
}

// controllers
function keyPressed() {
  switch (true) {
    case keyCode == LEFT_ARROW:
      posP = -Bspeed;
      r = false;
      l = true;
      break;
    case keyCode == RIGHT_ARROW:
      posP = Bspeed;
      r = true;
      l = false;
      break;
    default:

  }
}

function keyReleased() {
  if (keyCode == LEFT_ARROW && !r) {
    posP = 0;
  }
  if (keyCode == RIGHT_ARROW && !l) {
    posP = 0;
  }
}
//





//classes
class Cube {
  constructor() {
    this.cubeSize = int(width / 26);
    this.x = int(width / 2);
    this.y = int(height * 0.9 - this.cubeSize / 2);
  }
  Cdisplay() {
    //this.x = int(constrain(this.x, this.cubeSize / 2, width - this.cubeSize / 2));
    this.x=constrain(mouseX,this.cubeSize/2,width-this.cubeSize/2);
    push();
    stroke(255);
    line(0,this.y+this.cubeSize/2,width,this.y+this.cubeSize/2);
    pop();
    push();
    noStroke();
    fill(255);
    rect(this.x, this.y, this.cubeSize, this.cubeSize);
    pop();
  }
  Cmove(plus) {
    //this.x += plus;
  }
  Cinspect(ex, ey, ew, eh, espd) {
    if (abs(ey - this.y) < this.cubeSize / 2 + eh / 2 && abs(ex - this.x) < this.cubeSize / 2 + ew / 2) {
      if (abs(ey - this.y) < this.cubeSize / 2 + eh / 2) {
        for (let enm of e) {
          e.y += e.speed / 2;
        }
      }
      if (abs(ex - this.x) < this.cubeSize / 2 + ew / 2) {
        this.x += posP;
      }
      background(255, 0, 0, 35);
      noLoop();
      setTimeout(function() {
        alert("YOU LOST , TRY AGIN"+"\nYOUR TOTAL SCORE IS: "+(score-1)+
        "\nLEVEL REACHED: "+lvl+"\nClick OK to start again");
        document.location.reload(true);
      }, 500);
    }
  }
}

class Enemie {
  constructor(x, y, w, h, spd) {
    this.width = w;
    this.height = h;
    this.x = x - this.width / 2;
    this.y = y;
    this.speed = spd;
    this.dead = false;
  }
  Edisplay() {
    push();
    noStroke();
    fill(255, 0, 50);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
  Emove() {
    if (!this.dead) {
      this.y += this.speed;
    }
  }
}
//addons :
function breed() {
  if (e.length < eCount) {
    let w = int(random(width / 57, width / 14.8));
    let h = int(random(height / 30, height / 15));
    let x = int(random(w / 2, width - w / 2));
    let y = int(random(-50 * eCount, -h / 2));
    let rn1=((lvl**0.25)* height / 150);
    let rn2=((lvl**0.5)* height / 100);
    let speed = int(random(rn1,rn2));
    e.push(new Enemie(x, y, w, h, speed));
  }
}
function stages(){
  if (score>getNum()) {
    stock+=getNum();
    lvl++;
    nxtLVL=int(getNum()-score);
    if (eCount<20) {
      eCount+=2;
    }
  }
}
function Ui(){
  let len1 = score.toString().length;
  let len2 = lvl.toString().length;
  push();
  stroke(255,0,255);
  fill(255, 200, 100);
  text("SCORE: "+int(score - 1), width - (len1+7) * txtSiz/3.5, txtSiz);
  text("LEVEL: "+int(lvl),(len2+2)*txtSiz,txtSiz);
  text("NEXT: "+int(nxtLVL),(len2+2)*txtSiz,2*txtSiz);
  pop();
}
function getNum(){
  return int((stock)**difference);
}
