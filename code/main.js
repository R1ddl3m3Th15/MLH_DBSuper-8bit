import kaboom from "kaboom"

// initialize context
kaboom({
  font: "sink",
  background: [ 210, 210, 255, ],
})

// loading sprites
loadSprite("ultragoku", "sprites/ultragoku.png");
loadSprite("blast2", "sprites/blast2.png");
loadSprite("JIRENOG", "sprites/JIRENOG.png");
loadSprite("blast1", "sprites/blast1.png");
loadSprite("ball2", "sprites/ball2.png");
loadSprite("ball1", "sprites/ball1.png");
loadSprite("ball3", "sprites/ball3.png");

// loading music
loadSound("bgm", "sounds/bgm.mp3");
loadSound("Effect", "sounds/Effect.mp3");
loadSound("gameover", "sounds/gameover.mp3");


// game variables
let SPEED = 620
let BSPEED = 2
let SCORE = 0
let scoreText;
let bg = false;
let backgroundMusic;
let powerupMusic;

add([
	text("Right click on the screen to get started, Use arrov keys to move, dodge the energy blasts and collect the dragonballs.", { width: width() }),
	color(0,0,255),
  pos(12, 12),
])

// function to display score
const displayScore = ()=>{
  destroy(scoreText)
  scoreText = add([
    text("Score: " + SCORE),
    scale(3),
    color(0,0,255),
    pos(width()-181, 21),
   
])
}

// function to play bgm
const playBg = ()=>{
  if(!bg){
    backgroundMusic = play("bgm")
    bg = true;
  }
}



// adding goku
const player = add([
    sprite("ultragoku"),  // renders as a sprite
    pos(120, 80),    // position in world
    area(),          // has a collider
    scale(0.5)
])

// Adding events to player
onKeyDown("left", () => {
    playBg()
    player.move(-SPEED, 0)
}) 

onKeyDown("right", () => {
   playBg()  
  player.move(SPEED, 0)
})

onKeyDown("up", () => {
    playBg()  
    player.move(0, -SPEED)
})

onKeyDown("down", () => {
    playBg()  
    player.move(0, SPEED)
})

// adding 2blasts/sec of two kinds + dragonballs on loop
loop(4,()=>{
  for(let i=0; i<1; i++){
    let x = width()
    let y = rand(0, height())

    let c = add([
    sprite("blast2"),  
    pos(x, y),    
    area(),          
    scale(0.5),
    "blast2"
    ])
    c.onUpdate(()=>{
      c.moveTo(c.pos.x - BSPEED, c.pos.y)
  })
  }
    let x = width()
    let y = rand(0, height())
    // introducing dragonballs
    let c = add([
    sprite("ball1"),  
    pos(x, y),    
    area(),          
    scale(0.125),
    "ball1"
    ])
    c.onUpdate(()=>{
      c.moveTo(c.pos.x - BSPEED, c.pos.y)
    })
  
  if (BSPEED<7){
    BSPEED += 1
  }    
})

player.onCollide("blast2", () => {
    backgroundMusic.volume(0)
    powerupMusic.volume(0)
    play("gameover")
    destroy(player) 
    addKaboom(player.pos)
    scoreText = add([
    text("Game Over"),
    scale(3),
    pos(10, 21),
    color(0,0,255)
      ])
})

player.onCollide("ball1", (ball1) => {  
    powerupMusic = play("Effect")
    destroy(ball1) 
    SCORE += 1
    displayScore()   
})

// Display the score
displayScore()