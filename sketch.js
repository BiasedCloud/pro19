var stickman, obstacles, ground;
var stickmanAnim,obstaclesImgs,groundImg; 



var gameState = "play";

var zombie;
var zombieAnim;

var obstacle,obstacle1,obstacle2;
var obstacleGrp;

function preload(){
    stickmanAnim = loadGif("sticmanAnim.gif");
    zombieAnim = loadGif("Zombie.gif");

    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle 2.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    obstacleGrp = new Group();
    
    ground = createSprite(windowWidth/2,windowHeight-50,width*2, 100);
    ground.shapeColor= "Black"
    ground.scale =1;
    
    stickman = createSprite(windowWidth/2-50,windowHeight-210,10,20);
    stickman.addImage("anim",stickmanAnim);
    stickman.setCollider("circle",-50,100,110)
    stickman.scale = 0.5;

    zombie = createSprite(windowWidth/7,windowHeight-360,10,20);
    zombie.addImage("Z_anim",zombieAnim);
    zombie.sacle = 0.1;
    
}


function draw() {
    background("white");

    stickman.debug = false;

    if(gameState === "play"){

        if(keyDown("SPACE"||"W"||"UP_ARROW") && stickman.y >= height/5) {
            stickman.velocityY = -25;
        }
          stickman.velocityY = stickman.velocityY + 0.8;
    
        if(stickman.isTouching(obstacleGrp)){
            gameState = "end";
        }
    
    
        if(zombie.isTouching(obstacleGrp)){
            zombie.velocityY = -25;
        }
        zombie.velocityY = zombie.velocityY + 0.8;
    
        if(ground.x < 0){
            ground.x = width/2;
        }
    
        
    
        drawSprites();
        spawnObstacles();
    }

    if(gameState === "end"){
        textSize(30)
        text("GAME OVER",width/2-100,height/2-200);
        
        stickmanAnim.pause();
        zombieAnim.pause();            
        
        obstacleGrp.destroyEach();
    }
    

    stickman.collide(ground);
    zombie.collide(ground);

    stickman.velocityY = stickman.velocityY+1;
    zombie.velocityY = zombie.velocityY + 1;

    
}

function spawnObstacles(){
    if(frameCount % 120 === 0){
        obstacle = createSprite(windowWidth,windowHeight-130,10,20)
        obstacle.velocityX = -7;
        obstacle.setCollider("circle",0,0)

        var rand = Math.round(random(1,2));
        switch(rand){
            case 1: obstacle.addImage(obstacle1)
            obstacle.scale = 0.2
            break;  
            case 2: obstacle.addImage(obstacle2);
            obstacle.scale = 0.4
            obstacle.y = obstacle.y-10;
            break;
        }

        obstacle.lifetime = 400;
        obstacleGrp.add(obstacle);
    }    
}