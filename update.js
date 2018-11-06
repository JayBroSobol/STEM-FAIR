function update() {
        explorer.x += explorer.vx;
        explorer.y += explorer.vy;
        for(var i=0; i < blobs.length; i++){
          var b = blobs[i];
          b.vx += randomInt(-4,4)*0.05;
          b.vy += randomInt(-4,4)*0.05;
          b.x += b.vx;
          b.y += b.vy;
          if (b.y <=0 ){
            b.y = app.renderer.view.height-1;
          }
          if (b.x <=0 ){
            b.x= app.renderer.view.width;
          }
          if (b.y >=app.renderer.view.height ){
            b.y = 0;
          }
          if (b.x >app.renderer.view.width ){
            b.x =0; 
          }
          var max_v=3;
          if (b.vx >max_v ){
            b.vx =max_v; 
          }
          if (b.vx <-max_v ){
            b.vx =-max_v; 
          }

          if (b.vy >max_v ){
            b.vy =max_v; 
          }
          if (b.vy <-max_v ){
            b.vy =-max_v; 
          }
        }

        in_air = true;
        bricks.forEach(function(brick){
           if (hitTestRectangle(explorer, brick)){
              in_air = false;
           } 
        });

        on_rope = false;
        ropes.forEach(function(rope){
           if (hitTestRectangle(explorer, rope)){
              on_rope = true;
           } 
        });

        hit_blob = false;
        blobs.forEach(function(blob){
           if (hitTestRectangle(explorer, blob)){
              hit_blob = true;
           } 
        });

        if(hit_blob){
          on_game_over();
        }

        if(hitTestRectangle(explorer,treasure)){
          on_game_win();
        }
        if(in_air && !on_rope){
          explorer.vy += gravity;
        }
        if (!in_air && !on_rope)
        {
          explorer.vy =0;
        }

        if (explorer.y >= 512){
            on_game_over();
        }
    }