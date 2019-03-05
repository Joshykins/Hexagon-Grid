
window.onload = () => {
    PIXI.utils.sayHello();
    let bg = document.querySelector('#display');
    
    let renderer = PIXI.autoDetectRenderer(bg.clientWidth, bg.clientHeight, {
      transparent: false,
      resolution: 1,
      backgroundColor:0x000000,
      clearBeforeRender:true,
      autoResize:true
    });
    
    
    document.getElementById('display').appendChild(renderer.view);
    let stage = new PIXI.Container();
    
    
    let setup = () => {
        createHexagons();
      }
    
    PIXI.loader
      .add("hex", "a/i/hex.png")
      .load(setup);
    
    
    

    let hexagons;
    let createHexagons = () => {
        let i = 0; //x travel
        let j = 0; //y travel
        let scale = 30;    
        for(i = 0;i*scale<bg.clientWidth; i+=1) {
            for(j = 0;j*scale<bg.clientHeight; j+=1) {
                if(j % 2 == 0) {
                    new Hexagon(i*scale-(scale/2), scale)
                } else {
                    new Hexagon(i*scale, j*scale, scale);
                }
    
            }
        }
    }
    
    class Hexagon {
        constructor() {
            this.hexagon  = new PIXI.grpahics();
            this.x = x;
            this.y = y;
            this.size = size;
        }
        draw() {
            this.hexagon.clear();
            this.star.beginFill(0xffffff,this.opacity)
            this.star.drawCircle(this.x, this.y, this.size)
            this.star.endFill();
        }
        update() {

            this.draw();
        }
    }
    /*
    movement:0,
    //Scale is the size of each hexagon.
    scale:10,
    //Size is the scale of the perlin map 
    size:6,
    //Target is the target value to display
    target:.3,
    //Offset determines the thickness of the target value
    offset:.05,
    //Speed is the incremente at which the values cycle from the perlin noise
    speed:.01,
    //TargetSpeed is the incremend at which the target value cycles
    targetSpeed:.003,
    start(seed) {
        noise.seed(seed);
    },
    draw() {
    
        
        //Reset
        //Draw perlin
    
        
        while( i*this.size < CanvasProperties.width) {
            j = 0;
            while( j*this.size < CanvasProperties.height-this.size) {
                let val = noise.perlin2(i*.03 , j*.03 )+.5+this._movement;
                if(val < this.target + this.offset && val > this.target - this.offset) {
                    CanvasProperties.ctx.fillStyle = `rgba(255,0,0,1)`;
                    CanvasProperties.ctx.fillRect(i*this.size, j*this.size, this.size, this.size);
                }
                j++
            }
            i++
        }
        
    },
    update() {
        this.movement += this.speed;
        if(this.movement > .5) {
            this.movement = -1;
            noise.seed(Math.floor(Math.random()*100));
            console.log("reset");
        }
    }*/
}