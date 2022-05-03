let twigs, lily;
let char;
let charOBJ;
let decorations = [];
let charX,charY;
let catImg, devilImg;
let catfish, devil;
let angle = 0;

var lastArrow = "up"; //Tells where character still is pointing
let character;
//up, down. left. right

let up,down,left,right,uStill,dStill,lStill,rStill;

//p5 speech
let myRec = new p5.SpeechRec();

let mic, micLevel;
//let triggerTalk;
let recStarted = false;
let listening = false;
let answer = "";

class Character{
  constructor(up,down, left, right, upStill, downStill, leftStill, rightStill){
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
    this.upStill = upStill;
    this.downStill = downStill;
    this.leftStill = leftStill;
    this.rightStill = rightStill;
    this.x = width/2;
    this.y = height/2
  }
  display(){
    let currIMG = this.upStill;
    //push();
    //let img = image(currIMG, width/2,height/2, 100,100);
    //console.log(img.x);
    //pop();
    if(keyIsDown(UP_ARROW)){
        currIMG = this.up;
        lastArrow ="up"
      } else if (keyIsDown(DOWN_ARROW)){
        currIMG = this.down;
        lastArrow = down;
      }else if (keyIsDown(LEFT_ARROW)){
        currIMG = this.left;
        lastArrow = "left"
      }else if (keyIsDown(RIGHT_ARROW)){
          currIMG = this.right;
          lastArrow = "right"
      }
      else if (!keyIsPressed){
        if (lastArrow == "up"){
          currIMG = this.upStill;
        }
        if(lastArrow =="down"){
          currIMG = this.downStill;
        }
        if(lastArrow == "left"){
          currIMG = this.leftStill;
        }
        if(lastArrow =="right"){
          currIMG = this.rightStill;
        }
      }
      push();
      //x,y,width, height,angle, image
      rotate_and_draw_image(this.x, this.y, 200,200,0,currIMG);
      let img = image(currIMG, this.x,this.y, 200,200);
      console.log("x:"+this.x+"y:"+this.y)
      //console.log(img.x);
      //console.log(currIMG.x);
      pop();

  }
}


class ThingOnScreen {
  constructor(x, y, img){
    this.x = x;
    this.y = y;
    this.img = img;
  }
  move(x,y){
    this.x+=x*2;
    //console.log(x);
    this.y+=y*2;
    //console.log(y);
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
    this.x+=0.25;
    this.y+=0.25;
  }
  display(){
    push()
    imageMode(CENTER);
    rotate_and_draw_image(this.x, this.y, 400,450, 215, this.img);
    image(this.img, this.x, this.y, 400,450);
    pop();
  }
  triggerTalk(){
    if((((width/2)+200)>this.x)&&((width/2-200)<this.x)){
      if((((height/2)+200)>this.y)&&((height/2-200)<this.y)){
        startListening();

        console.log('started')
      }

    }
  }
}

class JerseyDevil extends ThingOnScreen {
  constructor(x,y,img){
    super(x,y,img);
  }
  display(){
    push()
    imageMode(CENTER);
    rotate_and_draw_image(this.x, this.y, 400,450, 115, this.img);
    image(this.img, this.x, this.y, 400,450);
    pop();
  }

}


function preload(){
  twigs = loadImage("assets/grass.gif");
  lily = loadImage("assets/lily.gif");
  char = loadImage("assets/character.gif");
  catImg = loadImage("assets/othello2.gif");
  devilImg = loadImage("assets/jerseyBoy.png");
  u = loadImage("assets/charUp.gif");
  d = loadImage("assets/charDown.gif");
  r = loadImage("assets/charRight.gif");
  l = loadImage("assets/charLeft.gif");
  //change from down still
  uStill = loadImage("assets/upStill.gif");
  dStill = loadImage("assets/downStill.gif");
  rStill = loadImage("assets/rightStill.gif");
  lStill = loadImage("assets/leftStill.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i <10; i++){
    if (i%2==0){
      decorations.push(new ThingOnScreen(random(-100,width+100),random(-100,height+100),twigs));
    } else{
      decorations.push(new ThingOnScreen(random(-100,width+100),random(-100,height+100),lily));
    }


  }
  catfish = new Catfish(-500,-200, catImg);
  devil = new JerseyDevil(1000,-300,devilImg);
  //catfish.triggerTalk();
  //charOBJ = new ThingOnScreen(100, 100, twigs);
  //speech functionality
  mic = new p5.AudioIn();
  //up,down, left, right, upStill, downStill, leftStill, rightStill
  character = new Character(u,d,l,r,uStill,dStill,lStill,rStill);

}

function draw() {
  //myRec.stop();
  rectMode(CENTER);
  charX = width/2;
  charY = width/2;

  background('#aecfdf');
  //image(char, width/2,height/2, 100,100);
  for (let i = 0; i< decorations.length; i++){
    decorations[i].display();
  }
  //charOBJ.display();
  //image(char, charX, charY, 100,100)
  iskeyDown()
  outsideFrame()
  catfish.display();
  catfish.path();
  devil.display();
  character.display();
  trigger();
  //rotate_and_draw_image(width/2, height/2, 200,200,0,uStill);
  //let test = image(uStill, width/2, height/2);
  //console.log(test.x);
  //console.log(devil .x, devil.y);
}

function trigger(){
  if (!listening){
    if((((width/2)+200)>catfish.x)&&((width/2-200)<catfish.x)){
      if((((height/2)+200)>catfish.y)&&((height/2-200)<catfish.y)){

        startListening();
        console.log('started')

      }
    }

  }
}

//2

//this should've just been a method of each class.
function iskeyDown(){
  if(keyIsDown(UP_ARROW)){
    //console.log("up")
    for (let i = 0; i< decorations.length; i++){
      decorations[i].move(0,1);
    }
    catfish.move(0,1);
    devil.move(0,1)
    //charOBJ.move(0,1);
  } else if (keyIsDown(DOWN_ARROW)){
    for (let i = 0; i< decorations.length; i++){
      decorations[i].move(0,-1);

    }
    catfish.move(0,-1)
    devil.move(0,-1)
    //console.log("d")
    //charOBJ.move(0,-1);
  }else if (keyIsDown(LEFT_ARROW)){
    for (let i = 0; i< decorations.length; i++){
      decorations[i].move(1,0);

    }
    catfish.move(1,0)
    devil.move(1,0)
    //console.log("l")
    //charOBJ.move(1,0);
  }else if (keyIsDown(RIGHT_ARROW)){
    for (let i = 0; i< decorations.length; i++){
      decorations[i].move(-1,0);

    }
    catfish.move(-1,0)
    devil.move(-1,0)
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
//x,y,width, height,angle, image
function rotate_and_draw_image(img_x, img_y, img_width, img_height, img_angle,img){

  imageMode(CENTER);
  translate(img_x+img_width/2, img_y+img_width/2);
  rotate(PI/180*angle);
  //image(img, 0, 0, img_width, img_height);
  rotate(-PI / 180 * img_angle);
  translate(-(img_x+img_width/2), -(img_y+img_width/2));
  imageMode(CORNER);
}

function startListening(){
  let continuous=true;
  let interimResults = false;

  mic.start();
  myRec.start(continuous, interimResults);
  //myRec.start();
  listening = true;
  myRec.onResult = answerMe;
}

function answerMe(){
  let inputStr = myRec.resultString;
  inputStr = inputStr.toLowerCase();
  console.log(inputStr);
  answer = "im listening";
  console.log(answer);
  listening = false;
  console.log("ive stopped listening")
  // if((((width/2)+200)<catfish.x)&&((width/2-200)>catfish.x)){
  //   if((((height/2)+200)<catfish.y)&&((height/2-200)>catfish.y)){
  //
  //   }
  // }


}
