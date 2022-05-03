let twigs, lily;
let char;
let charOBJ;
let decorations = [];
let charX,charY;
let catImg, devilImg;
let catfish, devil;
let angle = 0;
let title = true;
let hapa_def = "Hapa is the Hawaiian word meaning 'half' or 'part.'<br>It has come to describe a person of mixed heritage,<br>being part Asian or Pacific Islander. Haole is the <br>Hawaiian word for foreigner. Together it describes a <br>part API, part white person."

let sound;

let startButt;
let titleP;

var lastArrow = "up"; //Tells where character still is pointing
let character;

//char. image frames
let up,down,left,right,uStill,dStill,lStill,rStill;

//p5 speech
let myRec = new p5.SpeechRec();
let myRecDevil = new p5.SpeechRec();

let mic, micLevel;
//let recStarted = false;
let listening = false;
let answer = "cOOL!";
let jerseyListening;

let answerDev = "what";

//RiveScript


let bot = new RiveScript();
let botVoice = new p5.Speech();

let devilBot = new RiveScript();


let looseDevilLines;

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
    //checks which view should be showing
    let currIMG = this.upStill;
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
      //defines Still Frames
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
      //console.log("x:"+this.x+"y:"+this.y)
      pop();
  }
}

//decorations and
class ThingOnScreen {
  constructor(x, y, img){
    this.x = x;
    this.y = y;
    this.img = img;
  }
  move(x,y){
    this.x+=x*2;
    this.y+=y*2;
  }
  display(){
    image(this.img, this.x, this.y, 100,100);
  }
  nudge(){
    for (let i = 0; i<3; i++){
      this.x +=0.5;
      this.y +=0.5;
      //wait
    }
    for (let i = 0; i<3; i++){
      this.x-=0.5;
      this.y-=0.5
    }
    console.log("nudged");
  }
}

class Catfish extends ThingOnScreen {
  constructor(x,y, img){
    super(x,y,img);
    //this.showText = false;
    this.cue;
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
  text(){
    this.showText = true;
    this.cue = createP("i'm listening");
    this.cue.position(this.x+100, this.y+100);
  }
  hideText(){
    this.cue.hide()
  }
  answer(ans){
    let startFrame = frameCount;
    let p = createP(ans);
    p.style('background-color', "#ffffff")
    p.position(this.x, this.y);
    console.log(frameCount - startFrame);
    if (frameCount - startFrame > 100){
      p.hide();
    }
  }
}

class JerseyDevil extends ThingOnScreen {
  constructor(x,y,img, lines){
    super(x,y,img);
    this.lines = lines;
  }
  display(){
    push()
    imageMode(CENTER);
    rotate_and_draw_image(this.x, this.y, 600,650, 115, this.img);
    image(this.img, this.x, this.y, 600,700);
    pop();
  }
  speak(){
    if (frameCount % 1000 == 0){
      let index = round(random(0,this.lines.length - 1))
      console.log(index);
      let currText = this.lines[index];
      botVoice.speak(currText);
      console.log(currText);
    }

  }

}


function preload(){
  twigs = loadImage("assets/grass.gif");
  lily = loadImage("assets/lily.gif");
  char = loadImage("assets/character.gif");
  catImg = loadImage("assets/othello4.gif");
  devilImg = loadImage("assets/jerseyBoy3.gif");
  //character frames
  u = loadImage("assets/charUp.gif");
  d = loadImage("assets/charDown.gif");
  r = loadImage("assets/charRight.gif");
  l = loadImage("assets/charLeft.gif");
  uStill = loadImage("assets/upStill.gif");
  dStill = loadImage("assets/downStill.gif");
  rStill = loadImage("assets/rightStill.gif");
  lStill = loadImage("assets/leftStill.gif");

  sound = loadSound("assets/bbc_birds.mp3");

  bot.loadFile("rive.txt").then(loaded).catch(error);
  devilBot.loadFile("devilbot.txt").then(loaded).catch(error);
  looseDevilLines = loadStrings("looseDevilLines.txt");

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
  devil = new JerseyDevil(1500,-600,devilImg, looseDevilLines);
  //speech functionality
  mic = new p5.AudioIn();
  character = new Character(u,d,l,r,uStill,dStill,lStill,rStill);


  startButt = createButton("start");
  startButt.position(300, height-300);
  startButt.mousePressed(function start(){
    title = false;
    console.log('mouse presseed');
    loop();
  });
  titleP = createP("[on the experience of living in a pond]")
  titleP.center();
  titleP.style('font-family','roc-grotesk');
  titleP.style('font-size', '48px');
  titleP.style('color', "#24420e")
  sound.play();
  sound.loop();

}

var hapa, hapaTit;


function draw() {
  //myRec.stop();
  // rectMode(CENTER);
  // charX = width/2;
  // charY = width/2;
  background('#aecfdf');

  for (let i = 0; i< decorations.length; i++){
    decorations[i].display();
    if((decorations[i].x+10> width/2&&  width/2>decorations[i].x-10)
      && (decorations[i].y+10> height/2 && height/2 > decorations[i].y -10)){
        decorations[i].nudge();
      }
  }
  if (title){
    // p = createP("[on the experience of living in a pond]")
    // p.center();
    // p.style('font-family','roc-grotesk');
    // p.style('font-size', '48px');
    // p.style('color', "#24420e")
    // noLoop();
    hapaTit = createP("Hapa Haole:");
    hapaTit.position(300,200);
    //hapaTit.center();
    hapaTit.style('font-family','roc-grotesk');
    hapaTit.style('font-size', '28px');
    hapaTit.style('color', "#24420e")
    hapa = createP(hapa_def);
    hapa.position(300, 250);
    noLoop();
  } else if (title === false){
    loop();
    //console.log('entered')
    titleP.hide();
    startButt.hide();

    iskeyDown()
    outsideFrame()
    catfish.display();
    catfish.path();
    devil.display();
    character.display();
    //console.log(catfish.x);
    canStart();
    devil.speak();
  }
}

function canStart(){
  if (!listening){
    //console.log(catfish.x, width/2)
    if ((catfish.x+400 > width/2 && width/2 > catfish.x-50) && (catfish.y+300> height/2 && height/2> catfish.y-100)){
      console.log("in range");
      startListeningCatfish();
      catfish.text();
    }
  }
  if(listening){
    if ((catfish.x+400 <character.x || character.x< catfish.x-50)||(catfish.y +300<character.y|| character.y< catfish.y-100)){
      console.log("out of range");
      myRec.stop();
      catfish.hideText();
      listening = false;
    }
  }
  if (!jerseyListening){
    if ((devil.x+400> width/2 && width/2 >devil.x-50)&&
  (devil.y+300> height/2 && height/2 > devil.y -100)){
    console.log("inDevilRange");
    startListeningDevil();
    //devil.text();
  }
  }
  if (jerseyListening){
    if ((devil.x +400< character.x || character.x <devil.x-50)||
  (devil.y+300 <character.y || character.y < devil.y -100 )){
    console.log("out devil range");
    myRecDevil.stop()
    jerseyListening = false;
  }
  }
}

//this should've just been a method of each class.
function iskeyDown(){
  if(keyIsDown(UP_ARROW)){
    for (let i = 0; i< decorations.length; i++){
      decorations[i].move(0,1);
    }
    catfish.move(0,1);
    devil.move(0,1)
  } else if (keyIsDown(DOWN_ARROW)){
    for (let i = 0; i< decorations.length; i++){
      decorations[i].move(0,-1);
    }
    catfish.move(0,-1)
    devil.move(0,-1)
  }else if (keyIsDown(LEFT_ARROW)){
    for (let i = 0; i< decorations.length; i++){
      decorations[i].move(1,0);
    }
    catfish.move(1,0)
    devil.move(1,0)
  }else if (keyIsDown(RIGHT_ARROW)){
    for (let i = 0; i< decorations.length; i++){
      decorations[i].move(-1,0);
    }
    catfish.move(-1,0)
    devil.move(-1,0)
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

function startListeningCatfish(){
  let continuous=true;
  let interimResults = false;
  listening = true;
  mic.start();
  myRec.start(continuous, interimResults);
  myRec.onResult = answerMeCatfish;

}
function startListeningDevil(){
  let continuous = true;
  let interimResults = false;
  jerseyListening = true;
  mic.start();
  myRecDevil.start(continuous, interimResults);
  myRecDevil.onResult = answerMeDevil;
}

function answerMeCatfish(){
  let inputStr = myRec.resultString;
  inputStr = inputStr.toLowerCase();
  console.log(inputStr);
  bot.reply("local-user", inputStr).then(respond);
  //console.log(answer);
  //listening = false;
  // if((((width/2)+200)<catfish.x)&&((width/2-200)>catfish.x)){
  //   if((((height/2)+200)<catfish.y)&&((height/2-200)>catfish.y)){
  //
  //   }
  // }
}


function answerMeDevil(){
  let inputStr = myRecDevil.resultString;
  inputStr = inputStr.toLowerCase();
  console.log(inputStr);
  devilBot.reply("local-user", inputStr).then(respondDev);
  //botVoice.speak(answerDev);
  console.log("heard");
}

function respond(reply){
  answer = reply;
  console.log(answer);
  catfish.answer(answer);
}

function respondDev(reply){
  answerDev = reply;
  botVoice.speak(answerDev);
}
function loaded() {
  bot.sortReplies();
  devilBot.sortReplies();
  console.log("Chatbots ready!");
  //You must sort the replies before trying to fetch any!
}

function error(error) {
  console.log("There is an error.");
  console.log(error);
}
