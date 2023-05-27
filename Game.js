var images =  [new Image(), new Image()] //ein Array für alle Bilder, die ich verwende
images[0].src = "./Bilder/Platform_2.png" //für jedes Bild muss die Source gesetzt werden
images[1].src ="./Bilder/Cat.png"

const canvas = document.querySelector("canvas"); //spezifisches Element, hier canvas
const c = canvas.getContext("2d"); //macht es möglich, bestimmte Funktionen wie drawImage() zu verwenden

canvas.width = 1500
canvas.height = 750

const gravity = 0.6 //für natürlichere Darstellung des Fallens

class Player {
  constructor() { //nötig, damit jeder neue "Player" die gleichen Werte annimmt
    this.position = { //Startposition
      x: 100,
      y: 400,
    }
    this.velocity = { //Geschwindigkeit, hier fürs Fallen (da y 1 ist)
      x: 0,
      y: 1,
    }

    this.width = images[1].width
    this.height = images[1].height

    this.speed = 8
  }

  draw() {
    c.drawImage (images[1], this.position.x, this.position.y)
  }

  update() {
    this.draw();

    this.position.y += this.velocity.y //der y- Position wird die Geschwindigkeit zugefügt (hier (default:) Pixel pro frame)
    this.position.x += this.velocity.x

    if (this.position.y + this.height + this.velocity <= canvas.height)
    this.velocity.y += gravity
  } 
}

class Platform {
  constructor({x, y, width, height, image}) {
    this.position = {
      x,
      y,
    }
    this.image = image,
    this.width = width,
    this.height = height
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

var player = new Player() 
var platforms = [new Platform({x:600, y:200, image: images[0], width: images[0].width, height: images[0].height}), 
  new Platform({x: -20, y: 650, image: images[0], width: images[0].width, height: images[0].height})] 
var countw = 0
var scrollDistanz = 0
var keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
}

function animate() {

  requestAnimationFrame(animate) //Iterative Funktion

  c.fillStyle= "#3d354a",
  c.fillRect(0,0,canvas.width, canvas.height)

  platforms.forEach(platform => {
    platform.draw()
  })

  player.update()

if (player.position.y > canvas.height) {
  start()
}

  if (keys.right.pressed && player.position.x < 800) {
    player.velocity.x = player.speed
  } 
  
  else if (keys.left.pressed && player.position.x > 80) {
    player.velocity.x = -player.speed
  } 
  
  else {
    player.velocity.x = 0

  if (keys.right.pressed)  {
      scrollDistanz += player.speed

      platforms.forEach(platform => {
        platform.position.x -= player.speed
      })

  } else if (keys.left.pressed) {
      scrollDistanz -= player.speed

      platforms.forEach(platform => {
        platform.position.x += player.speed
      })
  }
}
  

  platforms.forEach(platform => {
    if (
      player.position.x <= platform.position.x + platform.width &&
      player.position.x + player.width >= platform.position.x &&

      player.position.y + player.velocity.y <= platform.position.y &&
      player.position.y + player.height >= platform.position.y
    ) 
    {
      player.velocity.y = 0;
      countw = 0
    } 
    else {player.velocity.y += gravity}}
  )}
  platforms.forEach(platform => {
  if (player.position.y == 0 && player.position.y == platform.position.y + platform.height) {
    player.velocity.y = 1;
  }})

animate() //die iterative Funktion wird einmal aufgerufen, das reicht

function start() {
  player = new Player() 
  platforms = [new Platform({x:600, y:200, image: images[0], width: images[0].width, height: images[0].height}), 
   new Platform({x: -20, y: 650, image: images[0], width: images[0].width, height: images[0].height})] 
 
  keys = {
   right: {
     pressed: false,
   },
   left: {
     pressed: false,
   },
 }
  countw = 0
  scrollDistanz = 0
 }


 window.addEventListener("keydown", ({ key }) => {
  //fürs gesamte Fenster ein Eventlistener. Wenn eine Taste gedrückt wird, wird der Wert der Taste (z. B. "a", "v" etc. genommen und kann für die folgende Funktion genau so verwendet werden)
  switch (
    key //if- Abfrage für mehrere Fälle (eigentlich austauschbar mit else if(), switch sieht aber besser aus)
  ) {
    case "w":
      player.velocity.y -= 15;
      break

    case "a":
      keys.left.pressed = true;
      break
    case "s":
      player.velocity.y = 5;
      break
    case "d":
      keys.right.pressed = true;
      break
  }
})

window.addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w":
      break
    case "a":
      keys.left.pressed = false;
      break
    case "s":
      break
    case "d":
      keys.right.pressed = false;
      break
  }
} )