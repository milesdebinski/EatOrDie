document.addEventListener('DOMContentLoaded', () => {


  const bodyStates = [
    { name: 'fat', img: 'img/fat.png' },
    { name: 'normal', img: 'img/normal.png' },
    { name: 'slim', img: 'img/slim.png' }
  ];




  // Global Variables
  let bodyCondition = document.querySelector(".condition")
  let state = document.querySelector(".state")
  let position = document.querySelector(".position")
  let characterSpritesheet = document.querySelector(".character_spritesheet");
  let stepsCount = 0;
  let playerPosition = [0, 0];

  let character = document.querySelector(".character");
  let map = document.querySelector(".map");

  //start in the middle of the map
  let x = 95;
  let y = 60;
  let held_directions = []; //State of which arrow keys we are holding down
  let speed = 1; //How fast the character moves in pixels per frame



  const placeCharacter = () => {



    let pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
    );

    const held_direction = held_directions[0];

    if (held_direction) {
      if (held_direction === directions.right) {
        x += speed;
        playerPosition[0]++;
      }
      if (held_direction === directions.left) {
        x -= speed;
        playerPosition[0]--;
      }
      if (held_direction === directions.down) {
        y += speed;
        playerPosition[1]--;
      }
      if (held_direction === directions.up) {
        y -= speed;
        playerPosition[1]++;
      }
      position.textContent = playerPosition;
      // console.log(playerPosition);
      character.setAttribute("facing", held_direction);

      //  EAT COOKIE
      stepsCount++;
      bodyCondition.textContent = stepsCount;
      // Cookie-1
      let cookie_1 = document.getElementById('cookie-1')

      if (playerPosition[0] > 73 && playerPosition[0] < 85 && playerPosition[1] < -34 && playerPosition[1] > -43) {
        cookie_1.style.visibility = 'hidden';
        characterSpritesheet.style.backgroundImage = "url('/img/normal.png')"
        stepsCount = 81;
        state.textContent = 'Normal'
      }
      // Cookie-2
      let cookie_2 = document.getElementById('cookie-2')
      if (playerPosition[0] > -79 && playerPosition[0] < -67 && playerPosition[1] < 27 && playerPosition[1] > 16) {
        cookie_2.style.visibility = 'hidden';
        characterSpritesheet.style.backgroundImage = "url('/img/fat.png')"
        stepsCount = 0;
        state.textContent = 'Fat'
      }
      console.log(stepsCount);


      // CHANGE BODY STATUS

      if (stepsCount == 80) {
        characterSpritesheet.style.backgroundImage = "url('/img/normal.png')"
        state.textContent = 'Normal'
        // stepsCount = 0;
      }
      if (stepsCount === 160) {
        characterSpritesheet.style.backgroundImage = "url('/img/slim.png')"
        state.textContent = 'Slim'
      }
    }


    character.setAttribute("walking", held_direction ? "true" : "false");

    // LIMIT THE MAP - WALLS
    let leftLimit = -16;
    let rightLimit = (16 * 13);
    let topLimit = -28;
    let bottomLimit = (16 * 8) + 2;
    if (x < leftLimit) { x = leftLimit; }
    if (x > rightLimit) { x = rightLimit; }
    if (y < topLimit) { y = topLimit; }
    if (y > bottomLimit) { y = bottomLimit; }


    let camera_left = pixelSize * 66;
    let camera_top = pixelSize * 42;

    map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${-y * pixelSize + camera_top}px, 0 )`;
    character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0 )`;
  }


  //GAME LOOP
  const step = () => {
    placeCharacter();
    window.requestAnimationFrame(() => {


      step();
    })
  }
  step(); //START THE FIRST STEP



  // MOVEMENT
  const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
  }
  const keys = {
    38: directions.up,
    37: directions.left,
    39: directions.right,
    40: directions.down,
  }

  document.addEventListener("keydown", (e) => {
    let dir = keys[e.which];
    if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)

    }
  })

  document.addEventListener("keyup", (e) => {
    let dir = keys[e.which];
    let index = held_directions.indexOf(dir);
    if (index > -1) {
      held_directions.splice(index, 1)
    }
  });












})


