//grab grid
const grid = document.querySelector('.grid');
const doodler = document.createElement('div');
let doodlerLeftSpace = 50;
let startPoint = 100;
let doodlerBottomSpace =startPoint;
let platformCount = 5;
let platforms = [];
let isGameOver=false;
let upTimerId;
let downTimerId;
let leftTimerId;
let rightTimerId;
let isJumping = true;
let isGoingLeft = false;
let isGoingRight = false;


function createDoodler(){
    grid.appendChild(doodler);
    doodler.classList.add('doodler'); //style
    doodlerLeftSpace = platforms[0].left; //doodler starts in correct space
    doodler.style.left = doodlerLeftSpace + 'px';
    doodler.style.bottom = doodlerBottomSpace + 'px';
    console.log(doodler.style.bottom);
}

class Platform{
    constructor(newPlatformBottom) {
        this.left = Math.random() * (400-85);
        this.bottom = newPlatformBottom;
        this.visual = document.createElement('div');
  
        const visual = this.visual;
        visual.classList.add('platform');
        visual.style.left = this.left + 'px';
        visual.style.bottom = this.bottom + 'px';
        grid.appendChild(visual);
      }
}

function createPlatforms(){ // 5 platforms so far
    for(let i =0; i < platformCount; i++) {
        let platformGap = 600 / platformCount;
        let newPlatformBottom = 100 + i * platformGap;
        let newPlatform = new Platform (newPlatformBottom);
        platforms.push(newPlatform);
        console.log(platforms);
      }
}

function movePlatforms(){
    if(doodlerBottomSpace>200){
        platforms.forEach(platform =>{
            platform.bottom -=4; //lower;
            let visual = platform.visual;
            visual.style.bottom = platform.bottom + 'px';
        })
    }
}

function jump(){
    clearInterval(downTimerId); //stop falling
    isJumping=true;
    upTimerId = setInterval(function(){
        doodlerBottomSpace +=20;
        doodler.style.bottom = doodlerBottomSpace + 'px'; //shoot up
        if(doodlerBottomSpace>startPoint+250){
            fall();
        }
    },50);
}

function fall(){
    clearInterval(upTimerId); //stop jumping
    isJumping=false;
    downTimerId = setInterval(function(){
        doodlerBottomSpace -=5;
        doodler.style.bottom = doodlerBottomSpace + 'px'; //fall down
        if(doodlerBottomSpace<=0){
            gameOver();
        }
        //if falls onto a platform - jump again // 60 - doodler size
        platforms.forEach(platform =>{
            if(doodlerBottomSpace>=platform.bottom && 
                doodlerBottomSpace<=(platform.bottom+15) && 
                (doodlerLeftSpace + 60) >=platform.left &&
                doodlerLeftSpace <= (platform.left +85) && !isJumping){
                    console.log("Pew Landed");
                    startPoint = doodlerBottomSpace; //override 
                    jump();
            }
        })
        
    },30);
}

function gameOver(){
    console.log("WaWa Game Over!");
    isGameOver=true;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
}

function control(event){
    if(event.key ==="ArrowLeft"){
        moveLeft();
    }
    else if(event.key === "ArrowRight"){
        moveRight();
    }
}

function moveLeft(){
    clearInterval(rightTimerId);
    isGoingRight=false;
    isGoingLeft=true;
    leftTimerId = setInterval(function(){
        if(doodlerLeftSpace>=0){
            doodlerLeftSpace-=5;
            doodler.style.left = doodlerLeftSpace+'px';
        }else moveRight();
    },30);
}

function moveRight(){
    clearInterval(leftTimerId);
    isGoingLeft=false;
    isGoingRight=true;
    rightTimerId=setInterval(function(){
        if(doodlerLeftSpace<=(400-60)){ //grid.width - doodler.width
            doodlerLeftSpace+=5;
            doodler.style.left=doodlerLeftSpace+'px';
        }else moveLeft();
    },30);
}

function start(){
    if(!isGameOver){
        createPlatforms();
        createDoodler();
        setInterval(movePlatforms,30); //constantly move
        jump();
        document.addEventListener('keyup',control); //key control
    } 

}
start(); //attach to button

/**
 * Add-ons = 
 *  button to start
 *  platforms within the grid 
 *  (V) doodle jump
 *  (V) doodle fall  
 *  (V) if fall on latform jump again  
 *  (V) game over
 *  score
 *  always adding platforms 
 *  (V) start on platform
 *  (V) controle left
 *  (V) controle right
 * remove hardocoded things
 *  
 */