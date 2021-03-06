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
  let x = 200;
  let y = 650;
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
      // if (stepsCount >= 400) {
      //   youlose.style.visibility = 'unset';
      //   x = 100;
      //   y = 500;
      // }
      bodyCondition.textContent = stepsCount; // Display steps.


      // Cookie_1
      let cookie_1 = document.getElementById('cookie-1')
      if (cookie_1.style.visibility != 'hidden' && x > 40 && x < 50 && y < 333 && y > 323) {
        cookie_1.style.visibility = 'hidden';
        stepsCount > 180 ? stepsCount -= 180 : stepsCount = 0;
      }

      // Cookie_2
      let cookie_2 = document.getElementById('cookie-2')
      if (cookie_2.style.visibility != 'hidden' && x > 235 && x < 355 && y < 233 && y > 213) {
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
        characterSpritesheet.style.backgroundImage = "url('/img/heroFat.png')"
        state.textContent = 'Fat'
      }
    }

    // WALK SOMETHING - TEST IT MORE MILES!!
    character.setAttribute("walking", held_direction ? "true" : "false");

    // LIMIT THE MAP - WALLS

    let leftLimit = -3;
    let rightLimit = (16 * 25) - 14;
    let topLimit = (16 * 4);
    let bottomLimit = (16 * 50);
    if (x < leftLimit) { x = leftLimit; }
    if (x > rightLimit) { x = rightLimit; }
    if (y < topLimit) { y = topLimit; }
    if (y > bottomLimit) { y = bottomLimit; }
    console.log(x);
    console.log(y);

    // INTERNAL WALLS
    if (x < 42 && y < 512) { x = 42 }
    if (x > 79 && y < 512 && y > 308) { x = 79 }
    if (y > 308 && y < 513 && x > 79 || y < 513 && x < 42) { y = 513 }
    if (y > 307 && y < 512 && x > 79) { y = 307 }
    if (y < 256 && x < 212 || y < 256 && x > 252) { y = 256 }
    if (y < 256 && x < 213) { x = 213 }
    if (y < 256 && x > 251) { x = 251 }
    // if (y < 24) { y = 24 }



    // CAMERA POSITION
    let camera_left = pixelSize * 190;
    let camera_top = pixelSize * 370;
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


