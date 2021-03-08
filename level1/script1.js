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
  let nextlevel = document.getElementById('next_level')
  // let playerPosition = [0, 0];
  let character = document.querySelector(".character");
  let map = document.querySelector(".map");
  let lever = document.querySelector(".lever");
  let door = document.querySelector(".door")

  //Check player interactions
  // addEventListener('keydown', (event) => {
  // console.log(event);
  // });

  // document.addEventListener("keydown", (event) => {
  //   if (event.keyCode === 32) {
  //     lever.setAttribute('pull', 'true')
  //     setTimeout(() => {
  //       lever.setAttribute('pull', 'false')
  //       door.style.visibility == 'hidden' ? door.style.visibility = 'unset' : door.style.visibility = 'hidden';
  //     }, 800)
  //   }
  // })


  //start in the middle of the map
  let x = 60;
  let y = 65;
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
      if (stepsCount >= 70000) {
        youlose.style.visibility = 'unset';
        x = 200;
        y = 650;
      }
      bodyCondition.textContent = stepsCount; // Display steps.


      // Cookie_1
      let cookie_1 = document.getElementById('cookie-1')
      if (cookie_1.style.visibility != 'hidden' && x > 40 && x < 50 && y < 333 && y > 323) {
        cookie_1.style.visibility = 'hidden';
        stepsCount > 300 ? stepsCount -= 300 : stepsCount = 0;
      }

      // Cookie_2
      let cookie_2 = document.getElementById('cookie-2')
      if (cookie_2.style.visibility != 'hidden' && x > 235 && x < 355 && y < 233 && y > 213) {
        cookie_2.style.visibility = 'hidden';
        stepsCount > 500 ? stepsCount -= 500 : stepsCount = 0;
      }


      // CHANGE BODY STATUS - FAT - NORMAL - SLIM
      //   if (stepsCount >= 500) {
      //     characterSpritesheet.style.backgroundImage = "url('/img/heroSlim.png')"
      //     state.textContent = 'Slim'
      //   }
      //   if (stepsCount >= 300 && stepsCount < 500) {
      //     characterSpritesheet.style.backgroundImage = "url('/img/heroNormal.png')"
      //     state.textContent = 'Normal'
      //   }
      //   if (stepsCount < 300) {
      //     characterSpritesheet.style.backgroundImage = "url('/img/heroFat.png')"
      //     state.textContent = 'Fat'
      //   }
    }

    // WALK SOMETHING - TEST IT MORE MILES!!
    character.setAttribute("walking", held_direction ? "true" : "false");

    // LIMIT THE MAP - WALLS

    let leftLimit = -2;
    let rightLimit = (16 * 50) + 8;
    // let topLimit = 22;
    let bottomLimit = (16 * 50);
    if (x < leftLimit) { x = leftLimit; }
    if (x > rightLimit) { x = rightLimit; }
    // if (y < topLimit) { y = topLimit; }
    if (y > bottomLimit) { y = bottomLimit; }
    // console.log(held_direction)


    // INTERNAL WALLS
    if (x < 151 && y < 23 || x > 164 && y < 23) { y = 22 }
    if (x > 150 && x < 165 && y < 20) { y = 20 }
    // if (x > 79 && y < 512 && y > 308) { x = 79 }
    // if (y > 308 && y < 513 && x > 79 || y < 513 && x < 42) { y = 513 }
    // if (y > 307 && y < 512 && x > 79) { y = 307 }
    // if (y < 256 && x < 212 || y < 256 && x > 252) { y = 256 }
    // if (y < 256 && x < 213) { x = 213 }
    // if (y < 256 && x > 251) { x = 251 }
    // if (y < 24) { y = 24 }


    // Lever mechanics
    if (x < 33 && y > 60)
      document.addEventListener("keydown", (event) => {
        if (event.keyCode === 32) {
          lever.setAttribute('pull', 'true')
          setTimeout(() => {
            // DOOR KEEPS BLINKING WHEN I MAKE IT INTERACTIVE - I DONT KNOW WHAT IS WRONG 
            // lever.setAttribute('pull', 'false')
            // door.style.visibility == 'hidden' ? door.style.visibility = 'unset' : door.style.visibility = 'hidden';
            door.style.visibility = 'hidden';
          }, 800)
        }
      })





    // Next Level
    if (door.style.visibility == 'hidden') {
      if (x > 151 && x < 164 && y < 22) {
        nextlevel.style.visibility = 'unset';
        console.log('next level')
      }

    }




    // CAMERA POSITION
    let camera_left = pixelSize * 400;
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


