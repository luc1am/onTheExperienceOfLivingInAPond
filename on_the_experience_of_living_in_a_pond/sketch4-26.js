let twigs;
let char;
let charOBJ;
let decorations = [];
let charX,charY;
let catfish;
let angle = 0;

class ThingOnScreen {
  constructor(x, y, img){
    this.x = x;
    this.y = y;
    this.img = img;
  }
  move(x,y){
    this.x+=x*2;
    console.log(x);
    this.y+=y*2;
    console.log(y);
  }
  display(){
    image(this.img, this.x, this.y, 100,100);
  }
}

class Catfish extends ThingOnScreen {
  constructor(x,y, img){
    super(x,y,img);
  }
  path(){
    this.x+=1;
    this.y+=1;
  }
  display(){

    rotate_and_draw_image(this.x, this.y, 400,450, 215, this.img);
    image(this.img, this.x, this.y, 400,450);
  }
}

function preload(){
  twigs = loadImage("assets/grass.gif");
  char = loadImage("assets/character.gif");
  catImg = loadImage("assets/othello2.gif")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i <10; i++){
    decorations.push(new ThingOnScreen(random(-100,width+100),random(-100,height+100),twigs))
  }
  catfish = new Catfish(-500,-200, catImg);
  //charOBJ = new ThingOnScreen(100, 100, twigs);
}

function draw() {
  rectMode(CENTER);
  charX = width/2;
  charY = width/2;
  background('#aecfdf');
  image(char, width/2,height/2, 100,100);
  for (let i = 0; i< decorations.length; i++){
    decorations[i].display();
  }
  //charOBJ.display();
  //image(char, charX, charY, 100,100)
  iskeyDown()
  outsideFrame()
  catfish.display();
  catfish.path();
}


//2
function iskeyDown(){
  if(keyIsDown(UP_ARROW)){
    //console.log("up")
    for (let i = 0; i< decorations.length; i++){
      decorations[i].move(0,1);

    }
    catfish.move(0,1);
    //charOBJ.move(0,1);
  } else if (keyIsDown(DOWN_ARROW)){
    for (let i = 0; i< decorations.length; i++){
      decorations[i].move(0,-1);

    }
    catfish.move(0,-1)
    //console.log("d")
    //charOBJ.move(0,-1);
  }else if (keyIsDown(LEFT_ARROW)){
    for (let i = 0; i< decorations.length; i++){
      decorations[i].move(1,0);

    }
    catfish.move(1,0)
    //console.log("l")
    //charOBJ.move(1,0);
  }else if (keyIsDown(RIGHT_ARROW)){
    for (let i = 0; i< decorations.length; i++){
      decorations[i].move(-1,0);

    }
    catfish.move(-1,0)
    //console.log("r")
    //charOBJ.move(-1,0)
  }
}

function outsideFrame(){
  for (let i = 0; i< decorations.length; i++){
    if(decorations[i].x> width+100){
      decorations[i].x = -100;
      decorations[i].y = random(-100,height +100);
    }
    if(decorations[i].x < -100){
      decorations[i].x = width+100;
      decorations[i].y = random(-100,height +100);
    }
    if(decorations[i].y> height+100){
      decorations[i].y = -100;
      decorations[i].x = random(-100,width +100);
    }
    if(decorations[i].y> height+100){
      decorations[i].y = height + 100;
      decorations[i].x = random(-100,width +100);
    }
  }
}
// stack overflow
//https://stackoverflow.com/questions/45388765/how-to-rotate-image-in-p5-js
function rotate_and_draw_image(img_x, img_y, img_width, img_height, img_angle,img){
  imageMode(CENTER);
  translate(img_x+img_width/2, img_y+img_width/2);
  rotate(PI/180*angle);
  //image(img, 0, 0, img_width, img_height);
  rotate(-PI / 180 * img_angle);
  translate(-(img_x+img_width/2), -(img_y+img_width/2));
  imageMode(CORNER);
}
