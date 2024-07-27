//grab grid
const grid = document.querySelector('.grid');
const doodler = document.createElement('div');
let doodlerLeftSpace = 50;
let doodlerBottomSpace =100;
let platformCount = 5;
let platforms = [];
let isGameOver=false;
let upTimerId;

function createDoodler(){
    grid.appendChild(doodler);
    doodler.classList.add('doodler'); //style
    doodler.style.left = doodlerLeftSpace + 'px';
    doodler.style.bottom = doodlerBottomSpace + 'px';
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
    upTimerId = setInterval(function(){
        doodlerBottomSpace +=20;
        doodler.style.bottom = doodlerBottomSpace + 'px';
    },30);
}

function start(){
    if(!isGameOver){
        createDoodler();
        createPlatforms();
        setInterval(movePlatforms,30); //constantly move
        jump();
    } 

}
start(); //attach to button

/**
 * Add-ons = 
 * 1. button to start
 * 2. platforms within the grid 
 * 3. doodle jump
 * 4. doodle fall 
 * 5. game over
 * 6. score
 * 7. always adding platforms 
 */