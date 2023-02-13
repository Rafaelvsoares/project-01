// ? select DOM elements

const startBtn = document.querySelector(".start-button")
const resetBtn = document.querySelector(".reset-button")
const scoreElem = document.querySelector(".score-points")
const healthElem = document.querySelector(".health-points")
// const ammoElem = document.querySelector(".ammo-points")
const gridElem = document.querySelector(".grid")

// ? global data

const cells = []
const width = 10
const gridSize = width * width
// let player = 44

// ? create cells

for (let i = 0; i < gridSize; i++){
  const div = document.createElement('div')
  cells.push(div)
  gridElem.appendChild(div)
}

// ? Classes

class Monster {
  constructor(health, state){
    this.position = Math.floor(Math.random() * gridSize)
    this.health = health
    this.state = state
  }
  move(){
    const monsterAi = Math.floor(Math.random() * 4)
    
    // move up
    if (monsterAi === 0 && Math.floor(this.position / width) !== 0){
      cells[this.position].classList.remove('monster')
      this.position -= width
      cells[this.position].classList.add('monster')
    }
    // move right
    if (monsterAi === 1 && (this.position + 1) % width !== 0) {
      cells[this.position].classList.remove('monster')
      this.position += 1
      cells[this.position].classList.add('monster')
    }
    // move down
    if (monsterAi === 2 && Math.floor(this.position / width) !== 9){
      cells[this.position].classList.remove('monster')
      this.position += width
      cells[this.position].classList.add('monster')
    }
    // move left
    if (monsterAi === 3 && this.position % width !== 0){
      cells[this.position].classList.remove('monster')
      this.position -= 1
      cells[this.position].classList.add('monster')
    }
    this.shoot(this.position, 'right', +1)
    this.shoot(this.position, 'left', -1)
    this.shoot(this.position, 'up', -width)
    this.shoot(this.position, 'down', width)
  }
  shootV1(){
    // variables to define different intervals
    let projectileRightId
    let projectileLeftId
    let projectileDownId
    let projectileUpId

    // variables for each directional projectile
    let rightProjectileIndex = this.position
    let leftProjectileIndex = this.position
    let downProjectileIndex = this.position
    let upProjectileIndex = this.position

    function moveProjectileRight(){

      // if projectile is in the same index as player
      if (rightProjectileIndex === playerOne.position){
        removeSprite(rightProjectileIndex, 'monsterProjectile')
        clearInterval(projectileRightId)
        // playerOne.health - 1
        console.log('healthright')
        healthElem.innerText = playerOne.health--
        
        // if projectile reaches the right cell indexes
      } else if ((rightProjectileIndex + 1) % width === 0){
        removeSprite(rightProjectileIndex, 'monsterProjectile')
        clearInterval(projectileRightId)
        
      //   // player dies
      // } else if (playerOne.health < 1){
      //   removeSprite(playerOne.position, 'player')

        // projectile keeps going right
      } else {
        removeSprite(rightProjectileIndex, 'monsterProjectile')
        rightProjectileIndex++
        addSprite(rightProjectileIndex, 'monsterProjectile')
      }
    }
    function moveProjectileLeft(){

      // if projectile is in the same index as player
      if (leftProjectileIndex === playerOne.position){
        console.log('hit')
        removeSprite(leftProjectileIndex, 'monsterProjectile')
        // playerOne.health -= 1
        // healthElem.innerText = playerOne.health
        clearInterval(projectileLeftId)

        //if projectile reaches the left cell indexes -> remoce
      } else if (leftProjectileIndex % width === 0){
        removeSprite(leftProjectileIndex, 'monsterProjectile')
        clearInterval(projectileLeftId)

      //   // player dies
      // } else if (playerOne.health < 1){
      //   removeSprite(playerOne.position, 'player')

        // projectile keeps going left 
      } else {
        removeSprite(leftProjectileIndex, 'monsterProjectile')
        leftProjectileIndex--
        addSprite(leftProjectileIndex, 'monsterProjectile')
      }
    }
    function moveProjectileDown(){

      // if projectile is in the same index -> remove
      if (downProjectileIndex === playerOne.position){
        console.log('hit')
        removeSprite(downProjectileIndex, 'monsterProjectile')
        clearInterval(projectileDownId)
        // downProjectileIndex = null
        // playerOne.health -= 1
        // healthElem.innerText = playerOne.health

      // if projectile reaches the bottom cell indexes -> remove
      } else if (Math.floor(downProjectileIndex / width) === width - 1){
        removeSprite(downProjectileIndex, 'monsterProjectile')
        clearInterval(projectileDownId)
      
      // // player dies
      // } else if (playerOne.health < 1){
      //   removeSprite(playerOne.position, 'player')

      // projectile keeps going down
      } else {
        removeSprite(downProjectileIndex, 'monsterProjectile')
        downProjectileIndex += width
        // console.log(currentProjectileIndex)
        addSprite(downProjectileIndex, 'monsterProjectile')
      }
    }
    function moveProjectileUp(){
      // if projectile is in the same index -> remove
      if (upProjectileIndex === playerOne.position){
        console.log('hit')
        removeSprite(upProjectileIndex, 'monsterProjectile')
        clearInterval(projectileUpId)
        // playerOne.health -= 1
        // healthElem.innerText = playerOne.health

      // if projectile reaches top cell indexes
      } else if (Math.floor(upProjectileIndex / width) === 0){
        removeSprite(upProjectileIndex, 'monsterProjectile')
        clearInterval(projectileUpId)

      // // player dies
      // } else if (playerOne.health < 1){
      //   removeSprite(playerOne.position, 'player')

        // projectile keeps going up
      } else {
        removeSprite(upProjectileIndex, 'monsterProjectile')
        upProjectileIndex -= width
        addSprite(upProjectileIndex, 'monsterProjectile')
      }
    }
    if (this.position){
      projectileRightId = setInterval(moveProjectileRight, 100)
      projectileLeftId = setInterval(moveProjectileLeft, 100)
      projectileDownId = setInterval(moveProjectileDown, 100)
      projectileUpId = setInterval(moveProjectileUp, 100)
    }
  }

  shoot(position, direction, opp){
    const id = setInterval(() => {
      removeSprite(position, 'monsterProjectile' )
      if (position === playerOne.position){
        healthElem.innerText = playerOne.health -= 1
        clearInterval(id)
      } else if (playerOne.health < 1){
        removeSprite(playerOne.position, 'player')
        addSprite(playerOne.position, 'grave')
        document.removeEventListener('keyup', playerOne.player)
        clearInterval(id)
      } else if ((position + 1) % width === 0 && direction === 'right' || 
      position % width === 0 && direction === 'left' || 
      Math.floor(position / width) === 0 && direction === 'up' || 
      Math.floor(position / width) === width - 1 && direction === 'down'){
        clearInterval(id)
      
      } else {
        position = position + opp
        addSprite(position, 'monsterProjectile')
        // console.log(id)
      }
    }, 100)
  }
    
}

class Player{
  constructor(position, health, score){
    this.position = position
    this.health = health
    this.score = score
    // this.ammo =  5
  }
  move(e){
    if (e.key === 'd' && (this.position + 1) % width !== 0){
      removeSprite(this.position, 'player')
      this.position += 1
      addSprite(this.position, 'player')
      dropItem.goldCollision()
      dropItem.healthCollision()

    // move right
    } else if (e.key === 'a' && this.position % width !== 0){
      removeSprite(this.position, 'player')
      this.position -= 1
      addSprite(this.position, 'player')
      dropItem.goldCollision()
      dropItem.healthCollision()

      //move down
    } else if (e.key === 's' && Math.floor(this.position / width) < width - 1){
      removeSprite(this.position, 'player')
      this.position += width
      addSprite(this.position, 'player')
      dropItem.goldCollision()
      dropItem.healthCollision()

      // move up
    } else if (e.key === 'w' && Math.floor(this.position / width) > 0){
      removeSprite(this.position, 'player')
      this.position -= width
      // console.log(Math.floor(player / width))
      addSprite(this.position, 'player')
      dropItem.goldCollision()
      dropItem.healthCollision()
    }

  }
  shoot(e){
    let projectileId
    let currentProjectileIndex = this.position
    function moveProjectileRight(){

      // if projectile is in the same index -> remove
      if (currentProjectileIndex === monster.position){
        removeSprite(currentProjectileIndex, 'playerProjectile')
        monster.state = 'dead'
        removeSprite(monster.position, 'monster')
        dropItem.randomDrop()
        monster.position = null
        clearInterval(monsterId)
        monsterAlive()
        clearInterval(projectileId)

        // if projectile reaches the right cell indexes -> remove
      } else if ((currentProjectileIndex + 1) % width === 0){
        removeSprite(currentProjectileIndex, 'playerProjectile')
        clearInterval(projectileId)

        // projectile keeps going right
      } else {
        removeSprite(currentProjectileIndex, 'playerProjectile')
        currentProjectileIndex++
        addSprite(currentProjectileIndex, 'playerProjectile')
      }
    }
    function moveProjectileLeft(){

      // if projectile is in the same index -> remove
      if (currentProjectileIndex === monster.position){
        removeSprite(currentProjectileIndex, 'playerProjectile')
        monster.state = 'dead'
        removeSprite(monster.position, 'monster')
        dropItem.randomDrop()
        monster.position = null
        clearInterval(monsterId)
        monsterAlive()
        clearInterval(projectileId)

        //if projectile reaches the left cell indexes -> remoce
      } else if (currentProjectileIndex % width === 0){
        removeSprite(currentProjectileIndex, 'playerProjectile')
        clearInterval(projectileId)

        // projectile keeps going left 
      } else {
        removeSprite(currentProjectileIndex, 'playerProjectile')
        currentProjectileIndex--
        addSprite(currentProjectileIndex, 'playerProjectile')
      }
    }
    function moveProjectileDown(){

      // if projectile is in the same index -> remove
      if (currentProjectileIndex === monster.position){
        removeSprite(currentProjectileIndex, 'playerProjectile')
        monster.state = 'dead'
        removeSprite(monster.position, 'monster')
        dropItem.randomDrop()
        monster.position = null
        clearInterval(monsterId)
        monsterAlive()
        clearInterval(projectileId)

      // if projectile reaches the bottom cell indexes -> remove
      } else if (Math.floor(currentProjectileIndex / width) === width - 1){
        removeSprite(currentProjectileIndex, 'playerProjectile')
        clearInterval(projectileId)
      
      // projectile keeps going down
      } else {
        removeSprite(currentProjectileIndex, 'playerProjectile')
        currentProjectileIndex += width
        // console.log(currentProjectileIndex)
        addSprite(currentProjectileIndex, 'playerProjectile')
      }
    }
    function moveProjectileUp(){
      // if projectile is in the same index -> remove
      if (currentProjectileIndex === monster.position){
        removeSprite(currentProjectileIndex, 'playerProjectile')
        monster.state = 'dead'
        removeSprite(monster.position, 'monster')
        dropItem.randomDrop()
        monster.position = null
        clearInterval(monsterId)
        monsterAlive()
        clearInterval(projectileId)

      // if projectile reaches top cell indexes
      } else if (Math.floor(currentProjectileIndex / width) === 0){
        removeSprite(currentProjectileIndex, 'playerProjectile')
        clearInterval(projectileId)

        // projectile keeps going up
      } else {
        removeSprite(currentProjectileIndex, 'playerProjectile')
        currentProjectileIndex -= width
        addSprite(currentProjectileIndex, 'playerProjectile')
      }
    }
    if (e.key === 'ArrowRight'){
      projectileId = setInterval(moveProjectileRight, 100)
    } else if (e.key === 'ArrowLeft'){
      projectileId = setInterval(moveProjectileLeft, 100)
    } else if (e.key === 'ArrowDown'){
      projectileId = setInterval(moveProjectileDown, 100)
    } else if (e.key === 'ArrowUp'){
      projectileId = setInterval(moveProjectileUp, 100)
    }
  }
  player(e){
    playerOne.shoot(e)
    playerOne.move(e)
  }
}

class Items{
  constructor(){
    this.gold = 1
    this.health = 2
    this.ammo = 3
  }
  randomDrop(){
    const item = Math.floor(Math.random() *  3)
    
    if (item === 0) {
      addSprite(monster.position, 'gold')
      this.goldCollision()
    } else if (item === 1){
      addSprite(monster.position, 'health')
      
    } else if (item  === 2){
      this.bomb()
    }
  }
  bomb(){
    addSprite(monster.position, 'bomb')
    const bombElem = document.querySelector('.bomb')
    const bombIndex = cells.indexOf(bombElem)
    let bombId = setTimeout(()=>{
      removeSprite(bombIndex, 'bomb')
      addSprite(bombIndex, 'explosion')
      
      // ! up -> adds explosion sprite
      if (Math.floor(bombIndex / width) !== 0) {
        addSprite(bombIndex - width, 'explosion')
      }

      // ! down -> adds explosion sprite
      if (Math.floor((bombIndex + width) / width) < 10){
        addSprite(bombIndex + width, 'explosion')
      }

      // ! left -> adds explosion sprite
      if (bombIndex % width !== 0) {
        addSprite(bombIndex - 1, 'explosion')
      }

      // ! right -> adds explosion sprite
      if ((bombIndex + 1) % width !== 0){
        addSprite(bombIndex + 1, 'explosion')
      }

      // ! up-right -> adds explosion sprite
      if (Math.floor(bombIndex / width) !== 0 && (bombIndex + 1) % width !== 0){
        addSprite(bombIndex - (width - 1), 'explosion')
      }

      // ! up-left -> adds explosion sprite
      if (Math.floor(bombIndex / width) !== 0 && bombIndex % width !== 0){
        addSprite(bombIndex - (width + 1), 'explosion')
      }

      // ! down-right -> adds explosion sprite
      if (Math.floor(bombIndex / width) !== 9 && (bombIndex + 1) % width !== 0) {
        addSprite(bombIndex + (width + 1), 'explosion')
      }
      
      // ! down-left -> adds explosion sprite
      if (Math.floor(bombIndex / width) !== 9 && bombIndex % width !== 0) {
        addSprite(bombIndex + (width - 1), 'explosion')
      } 

      // ! Removes explosion sprite after 5 seconds
      const bombRemove = setTimeout(() => {
        const explosionElems = document.querySelectorAll('.explosion')
        const explosions = explosionElems.forEach((explosion) => {
          const explosionIndex = cells.indexOf(explosion)
          if (explosionIndex === playerOne.position){
            playerOne.health--
            healthElem.innerText = playerOne.health
            
          }
          removeSprite(explosionIndex, 'explosion' )
        })
      }, 500)
    }, 3000)
  }
  goldCollision(){
    const goldElem = document.querySelector('.gold')
    let goldIndex = cells.indexOf(goldElem)
    if (playerOne.position === goldIndex){
      console.log(`Coin: ${goldIndex}`)
      console.log(`Player: ${playerOne.position}`)
      removeSprite(goldIndex, 'gold')
      goldIndex = null
      scoreElem.innerText = playerOne.score += 10
    }
  }
  healthCollision(){
    const heartElem = document.querySelector('.health')
    let healthIndex = cells.indexOf(heartElem)
    if (playerOne.position === healthIndex){
      removeSprite(healthIndex, 'health')
      healthIndex = null
      healthElem.innerText = playerOne.health += 1
    }
  }
}

const playerOne = new Player(44, 5, 0)
const monster = new Monster(3, 'alive')
const dropItem = new Items()
let monsterId

//! Start game
startBtn.addEventListener('click', () => {
  clearInterval(monsterId)
  healthElem.innerText = playerOne.health
  scoreElem.innerText = playerOne.score
  addSprite(playerOne.position, 'player')
  document.addEventListener('keyup', playerOne.player)
  monsterAlive()
})

//! Reset game
resetBtn.addEventListener('click', () => {
  location.reload()
})

// ? functions

// ! Infinite loop to call class monster when dead/alive
function monsterAlive(){
  // console.log(monster.position)
  if (monster.state === 'dead'){
    //! fix this line and the ones that shoot
    monster.position = Math.floor(Math.random() * gridSize)
    monsterDead()
  }
  if (monster.state === 'alive'){
    monsterId = setInterval(() => {
      if (playerOne.health === 0){
        clearInterval(monsterId)
      } else {
        monster.move()
      }
    }, 1000)
  }

  function monsterDead(){
    setTimeout(() => {
      monster.state = 'alive'
      // console.log(monster.state);
      monsterAlive()
    }, 5000)
  }
}

// ! Adds/Removes image
function addSprite(param, param2){
  cells[param].classList.add(param2)
}
function removeSprite(param, param2){
  cells[param].classList.remove(param2)
}