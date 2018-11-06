function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);
  
  window.addEventListener(
    "keydown", downListener, false
  );
  window.addEventListener(
    "keyup", upListener, false
  );
  
  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };
  
  return key;
}

function setup_keys(){
  let left_key = keyboard("ArrowLeft");

  left_key.press = () => {
    //key object pressed
    explorer.vx = - 1;
    //console.log("LeftArrow pressed");
  };
  left_key.release = () => {
    explorer.vx = 0;
  };

  let right_key = keyboard("ArrowRight");

  right_key.press = () => {
    //key object pressed
    explorer.vx = 1;
    //console.log("LeftArrow pressed");
  };
  right_key.release = () => {
    explorer.vx = 0;
  };


  let up_key = keyboard("ArrowUp");

  up_key.press = () => {
    //key object pressed
    if (on_rope){
       explorer.vy = -1;
    } else
    if (! in_air){
      explorer.vy = - 8;
      explorer.vx *= 3;
    }
    //console.log("LeftArrow pressed");
  };
  up_key.release = () => {
    //explorer.vy = 0;
  };


  let down_key = keyboard("ArrowDown");

  down_key.press = () => {
    //key object pressed
    explorer.vy = 1;
    //console.log("LeftArrow pressed");
  };
  down_key.release = () => {
    explorer.vy = 0;
  };
}

//The `randomInt` helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r2.halfWidth = r2.width / 2;

  if (!r1.vsize){
    r1.vsize = r1.width / 2;
  }

  if (!r2.vsize){
    r2.vsize = r2.width / 2;
  }

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths*1) {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < r1.vsize + r2.vsize) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};
