var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var milk, milkImg;
//var food, dogFoodImg;


function preload()
{
  dogImg = loadImage("Dog.png");
  dogHappyImg = loadImage("happydog.png");
 // milkImg = loadImage("milk.png");
   milkImg = loadImage("dogfood.png");


}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  emo = createSprite(200,200,1,1);
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(50);
  //foodStock-=1;
  

  milk = createSprite(140,435,15,15);
  milk.addImage(milkImg);
  milk.scale = 0.05;

  milk1 = createSprite(210,285,40,40);
  milk1.addImage(milkImg);
  milk1.scale = 0.08;
  milk1.visible = false;


  
}


function draw() {  
  background("green")

  if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);
    milk1.visible = true;

   
  }

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
    milk1.visible = false;
  }
}

if(foodS == 0){
  
  dog.addImage(dogImg);
  foodS = 50;

}



  drawSprites();
  textSize(17);
  fill("black");
  text("Press up arrow key to feed food to the Dog ",50,50);
  fill("black");
  text("food Remaining "+foodS,170,440);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}

