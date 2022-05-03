let twigs;
let char;
let charOBJ;
let charX,charY;

class Character {
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


function preload(){
  twigs = loadImage("assets/grass.gif");
  char = loadImage("assets/character.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  charOBJ = new Character(width/2, height/2, char);
}

function draw() {
  rectMode(CENTER);
  charX = width/2;
  charY = width/2;
  background('#aecfdf');
  image(twigs, 100,100, 100,100);
  charOBJ.display();
  //image(char, charX, charY, 100,100)
  iskeyDown()
}

// function keyPressed(){
//   if( keyCode === UP_ARROW){
//
//     console.log("up")
//     charOBJ.move(0,-1);
//   } else if (keyCode === DOWN_ARROW){
//     console.log("d")
//     charOBJ.move(0,1);
//   }else if (keyCode === LEFT_ARROW){
//     console.log("l")
//     charOBJ.move(-1,0);
//   }else if (keyCode === RIGHT_ARROW){
//     console.log("r")
//     charOBJ.move(1,0)
//   }
// }

//2
function iskeyDown(){
  if(keyIsDown(UP_ARROW)){

    console.log("up")
    charOBJ.move(0,-1);
  } else if (keyIsDown(DOWN_ARROW)){
    console.log("d")
    charOBJ.move(0,1);
  }else if (keyIsDown(LEFT_ARROW)){
    console.log("l")
    charOBJ.move(-1,0);
  }else if (keyIsDown(RIGHT_ARROW)){
    console.log("r")
    charOBJ.move(1,0)
  }
}
