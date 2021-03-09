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
  let tooWeak = document.getElementById('tooWeak')
  let nextlevel = document.getElementById('next_level')
 
  let character = document.querySelector(".character");
  let map = document.querySelector(".map");
  let lever = document.querySelector(".lever");
  let door = document.querySelector(".door")

  //Check player interactions
  // addEventListener('keydown', (event) => {
  // console.log(event);
  // });



  //start in the middle of the map
  // 737 / 795
  let x = 737;
  let y = 795;
  // initial stepsCount
  if (x == 737 && y == 795) {stepsCount = 2001}
  
  let held_directions = []; //State of which arrow keys we are holding down
  let speed = 1; //pixels per frame


  // MOVEMENT + PLAYER POSITION
  const placeCharacter = () => {
    
    let pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
    );

    const held_direction = held_directions[0];
    if (held_direction) {
      if (held_direction === directions.right) {
        x += speed;
      
      }
      if (held_direction === directions.left) {
        x -= speed;
      
      }
      if (held_direction === directions.down) {
        y += speed;
       
      }
      if (held_direction === directions.up) {
        y -= speed;
      
      }
      position.textContent = `${x},${y}`;
      character.setAttribute("facing", held_direction);

      //  EAT COOKIE
      stepsCount++; // Count Steps / The more stpes the thinner you get!
      if (stepsCount >= 2700) {
        youlose.style.visibility = 'unset';
        x = 200;
        y = 650;
      }
      bodyCondition.textContent = stepsCount; // Display steps.


      // Cookie_1
      let cookie_1 = document.getElementById('cookie-1')
      if (cookie_1.style.visibility != 'hidden' && x > 567 && x < 593 && y > 638 && y < 655) {
        console.log('cookie1')
        cookie_1.style.visibility = 'hidden';
        stepsCount > 800 ? stepsCount -= 800 : stepsCount = 0;
      }

      // Cookie_2
      let cookie_2 = document.getElementById('cookie-2')
      if (cookie_2.style.visibility != 'hidden' && x > 492 && x < 517 && y < 506 && y > 488) {
        cookie_2.style.visibility = 'hidden';
        stepsCount > 800 ? stepsCount -= 800 : stepsCount = 0;
      }
      // Cookie_3
      let cookie_3 = document.getElementById('cookie-3')
      if (cookie_3.style.visibility != 'hidden' && x > 166 && x < 183 && y > 256 && y < 277) {
        cookie_3.style.visibility = 'hidden';
        stepsCount > 400 ? stepsCount -= 400 : stepsCount = 0;
      }
      // Cookie_4
      let cookie_4 = document.getElementById('cookie-4')
      if (cookie_4.style.visibility != 'hidden' && x > 481 && x < 505 && y < 230 && y > 213) {
        cookie_4.style.visibility = 'hidden';
        stepsCount > 2700 ? stepsCount -= 2700 : stepsCount = 0;
      }
    

      
      // CHANGE BODY STATUS - FAT - NORMAL - SLIM
        if (stepsCount >= 2000) {
          characterSpritesheet.style.backgroundImage = "url('/img/heroSlim.png')"
          // state.textContent = 'Slim'
        }
        if (stepsCount >= 1000 && stepsCount < 2000) {
          characterSpritesheet.style.backgroundImage = "url('/img/heroNormal.png')"
          // state.textContent = 'Normal'
        }
        if (stepsCount < 1000) {
          characterSpritesheet.style.backgroundImage = "url('/img/heroFat.png')"
          // state.textContent = 'Fat'
        }
    }

    // WALK 
    character.setAttribute("walking", held_direction ? "true" : "false");

    // LIMIT THE MAP - WALLS
    let leftLimit = 0;
    let rightLimit = (16 * 50) + 8;
    // let topLimit = 22;
    let bottomLimit = (16 * 50);
    if (x < leftLimit) { x = leftLimit; }
    if (x > rightLimit) { x = rightLimit; }
    // if (y < topLimit) { y = topLimit; }
    if (y > bottomLimit) { y = bottomLimit; }
   


    // INTERNAL WALLS
    if (x < 151 && y < 23 || x > 164 && y < 23) { y = 22 } // top limit
    if (x > 150 && x < 165 && y < 20) { y = 20 } // top limit - door
    if (x > 550 && y < 626 && y > 621) { y = 626 }
    if (x < 563 && y > 625 && y < 689 && x > 550) { x = 563}
    if (x < 563 && y > 756 ) { x = 563}
    if (y > 755 && x < 562) { y = 755}
    if (y < 690 && x < 563 && x > 348 && y > 685) { y = 690}
    if (y < 690 && x < 301 && y > 685 ) { y = 690}
    if (x < 227 && y > 670 ) {x = 227}
    if (y > 532 && y < 690 && x > 347 && x < 350) { x = 347}
    if (y > 532 && y < 690 && x > 300 && x < 305) { x = 305}
    if (x > 127 && y <476 && y > 471) { y = 476}
    if (x > 580 && y > 474 && y < 534 && x < 585) {x = 580}
    if (y > 531 && y <536 && x > 351) { y = 531}
    if (y > 531 && y <536 && x < 305) { y = 531}
    if (x < 77 && x > 70 && y > 83 ) {x = 77}
    if (x < 18 && y > 51 ) {x = 18}
    if ( y > 50 && x < 18) {y = 50}
    if ( y > 82 && x < 74) {y = 82}
    if (y < 476 && x > 127 && y > 301 && x < 132) {x = 127}
    if (y > 82 && x > 127 && y < 243 && x < 132) {x = 127}
    if ( y > 223 && y < 318 && x > 196 && x < 200) { x = 196}
    if ( y > 300 &&  y < 305 && x > 127 && x < 205) {y = 300}
    if ( y < 243 &&  y > 230 && x > 127 && x < 205) {y = 243}
    if ( y > 82 && y < 87 && x > 132 && x < 504) {y = 82}
    if (x > 555 && y > 0 && y < 300 ) { x = 555}
    if (x < 507 && y > 82 && y < 166 && x > 502) { x = 507}
    if (y > 290 && x > 402 && y < 300) {y = 290} 
    if (x < 428 && y < 300 && y >152 && x >425) { x = 428}
    if (y < 167 && x < 506 && x > 425 && y > 160) {y = 167}


console.log([x,y])
    // Lever mechanics
    if (x < 33 && y > 60 ) {
      document.addEventListener("keydown", (event) => {
        if (x < 33 && y > 60 && event.keyCode === 32 && stepsCount <= 1000) {
          lever.setAttribute('pull', 'true')
          stepsCount = 1005;
          characterSpritesheet.style.backgroundImage = "url('/img/heroNormal.png')"
          setTimeout(() => {
            // DOOR KEEPS BLINKING WHEN I MAKE IT INTERACTIVE - I DONT KNOW WHAT IS WRONG 
            // lever.setAttribute('pull', 'false')
            // door.style.visibility == 'hidden' ? door.style.visibility = 'unset' : door.style.visibility = 'hidden';
            door.style.visibility = 'hidden';
          }, 800)
        } else if ( x < 33 && y > 60 && event.keyCode === 32 && stepsCount > 1010) {
          tooWeak.style.visibility ='unset';
          setTimeout(hideText, 1000)
        }
      })} 

      function hideText () {
        tooWeak.style.visibility ='hidden'
      }





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


