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
    } else{
      if (! in_air){
        explorer.vy = - 8;
        explorer.vx *= 3;
      }
    }
    //console.log("LeftArrow pressed");
  };
  up_key.release = () => {
    if (on_rope){
      explorer.vy = 0;
    }
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
