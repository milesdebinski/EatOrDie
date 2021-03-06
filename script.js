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
  let youlose = document.getElementById('youlose')
  // let playerPosition = [0, 0];
  let character = document.querySelector(".character");
  let map = document.querySelector(".map");

  //start in the middle of the map
  let x = 100;
  let y = 500;
  let held_directions = []; //State of which arrow keys we are holding down
  let speed = 1; //How fast the character moves in pixels per frame


  // MOVEMENT + PLAYER POSITION
  const placeCharacter = () => {
    let pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
    );

    const held_direction = held_directions[0];
    if (held_direction) {
      if (held_direction === directions.right) {
        x += speed;
        // playerPosition[0]++;
      }
      if (held_direction === directions.left) {
        x -= speed;
        // playerPosition[0]--;
      }
      if (held_direction === directions.down) {
        y += speed;
        // playerPosition[1]--;
      }
      if (held_direction === directions.up) {
        y -= speed;
        // playerPosition[1]++;
      }
      position.textContent = `${x},${y}`;
      character.setAttribute("facing", held_direction);

      //  EAT COOKIE
      stepsCount++; // Count Steps / The more stpes the thinner you get!
      if (stepsCount >= 400) {
        youlose.style.visibility = 'unset';
        x = 100;
        y = 500;
      }
      bodyCondition.textContent = stepsCount; // Display steps.
      // Cookie_1
      let cookie_1 = document.getElementById('cookie-1')
      if (cookie_1.style.visibility != 'hidden' && x > 22 && x < 29 && y < 214 && y > 206) {
        cookie_1.style.visibility = 'hidden';
        stepsCount > 180 ? stepsCount -= 180 : stepsCount = 0;
      }

      // Cookie_2
      let cookie_2 = document.getElementById('cookie-2')
      if (cookie_2.style.visibility != 'hidden' && x > 153 && x < 163 && y < 144 && y > 134) {
        cookie_2.style.visibility = 'hidden';
        stepsCount > 320 ? stepsCount -= 320 : stepsCount = 0;
      }


      // CHANGE BODY STATUS - FAT - NORMAL - SLIM
      if (stepsCount >= 320) {
        characterSpritesheet.style.backgroundImage = "url('/img/slim1.png')"
        state.textContent = 'Slim'
      }
      if (stepsCount >= 160 && stepsCount < 320) {
        characterSpritesheet.style.backgroundImage = "url('/img/normal1.png')"
        state.textContent = 'Normal'
      }
      if (stepsCount < 160) {
        characterSpritesheet.style.backgroundImage = "url('/img/fat1.png')"
        state.textContent = 'Fat'
      }
    }

    // WALK SOMETHING - TEST IT MORE MILES!!
    character.setAttribute("walking", held_direction ? "true" : "false");

    // LIMIT THE MAP - WALLS

    let leftLimit = -12;
    let rightLimit = (16 * 13) - 4;
    let topLimit = -26;
    let bottomLimit = (16 * 26);
    if (x < leftLimit) { x = leftLimit; }
    if (x > rightLimit) { x = rightLimit; }
    if (y < topLimit) { y = topLimit; }
    if (y > bottomLimit) { y = bottomLimit; }
    console.log(x);
    console.log(y);
    // INTERNAL WALLS

    if (x < 12 && y < 263) { x = 12 }
    if (x > 37 && y < 263 && y > 155) { x = 37 }
    if (y < 264 && x > 40 && y > 160 || y < 264 && x < 9) { y = 264 }
    if (y > 154 && y < 264 && x > 40) { y = 154 }
    if (y < 124 && x < 104 || y < 124 && x > 134) { y = 124 }
    if (y < 124 && y && x < 105) { x = 105 }
    if (y < 124 && y && x > 133) { x = 133 }
    if (y < 24) { y = 24 }



    // CAMERA POSITION
    let camera_left = pixelSize * 95;
    let camera_top = pixelSize * 200;
    // CAMERA MOVEMENT
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


