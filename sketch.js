//declaring variables
var monkey, monkey_running, ground, groundMoving;
var banana,bananaImage, obstacle, obstaceImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png"); 
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600,600)
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.10;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;

  FoodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background("white");
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,100,50);
  
  if(ground.x>0){
    ground.x = 400;
  }

  if(keyDown("space")){
    monkey.velocityY = -10;
  
  }
  
  if(monkey.isTouching(obstacleGroup)){
    monkey.velocityY = 10;
    ground.velocityX = 0;
  }
  
  
  monkey.y = monkey.y + 4;
  if(ground.x == ground.width/2){
    ground.x = 200;
  }
  monkey.collide(ground);
  food(); 
  obstacles();
  
  
  drawSprites();
  
}

function food(){
  if(World.frameCount%80===0){
    banana = createSprite(100,100,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.25;
    banana.velocityX = -4;
    banana.lifetime = 120;
    FoodGroup.add(banana);
    
  }
}

function obstacles(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(100,290,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.25;
    obstacleGroup.add(obstacle); 
    
   obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}




