//Create variables here
var dog,happydog,database,foodS,foodStock;

function preload()
{
  //load images here
  dogImg1=loadImage("images/dogImg.png");
  dogImg2=loadImage("images/dogImg1.png")
  
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  dog = createSprite(350,250,20,20);
  dog.addImage(dogImg1);
  dog.scale=0.2;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  a=random(0,255);
  b=random(0,255);
  c=random(0,255);

}


function draw() { 
  background(a,b,c) 
  dog.display();
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogImg2)
  }
  
  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg1);
  }
  drawSprites();
  textSize(20);
  stroke(4);
  text("Food Remaining: " + foodS,50,225);
  text("Note: There are only 20 bones in Food stock",10,30);
  text("Reload this page to change background color",10,400);


  //add styles here

}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}


