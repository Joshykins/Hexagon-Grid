

let app, stage;
let hexBackground = [];
let settings = {
    //Size of hexagons
    size: 70,
    //none glowing color
    color: [.1,.2,.12],
    //Random modifier
    randomColorMod: .015,
    //glowing color
    glow: [.1,1.0,.4],
    //Scale of the height field
    scale: .2,
    //Speed of the height field-movement
    speed: .005,
    //Target Height Value
    target: .5,
    //Range Of Heights Around target to render
    range: .3,
    //Scale of hexagon modifier
    widthModifier:1.01,
    heightModifier:1.21
}
let hexValues = {};
//Utils
let inverseLinearInterpolation = (min, max, val) => {
    return ((val-min)/(max-min));
};

let linearInterpolation = (min, max, k) => {
    return min + (max - min) * k;
}

window.onload = () => {
    PIXI.utils.sayHello();
    let bg = document.querySelector('#display');
        

        
    app = new PIXI.autoDetectRenderer(bg.clientWidth, bg.clientHeight, {
        transparent: false,
        resolution: 1,
        backgroundColor:0x000000,
        clearBeforeRender:true,
        autoResize:true
    });
    document.getElementById('display').appendChild(app.view);

    stage = new PIXI.Container();


    let setup = () => {
        //Setup hexagon grid
        setupNoise();
        createHexagons(bg);
        animationLoop();
    }
    //Load in images
    PIXI.loader
    .add("hex", "a/i/hex.png")
    .load(setup);


    // center the sprite's anchor point
    //bunny.anchor.set(0.5);

    // move the sprite to the center of the screen
    //bunny.x = app.screen.width / 2;
    //bunny.y = app.screen.height / 2;

    let _t = NaN;
    let animationLoop = () => {
        let t = Date.now();
        let deltaT = (t - _t)/1000;
        if (isNaN(deltaT)) {
        deltaT = 0;
        }
    
        for (let i = 0; i < hexBackground.length; i++) {
            const element = hexBackground[i];
            element.update(deltaT);
        }

        hexValues.update();
        _t = t;
        app.render(stage);
        requestAnimationFrame(animationLoop);
    }
}
let setupNoise = () => {
    noise.seed(Math.floor(123));

    hexValues = new Noise(settings.scale, settings.speed);

}
class Noise {
    constructor(scale, speed) {
        this.scale = scale;
        this.speed = speed
        this.movement = 0;
    }
    retrieveHeight(x, y) {
        return noise.perlin2(x*this.scale,y*this.scale)+this.movement+.5;
    }
    update() {

        hexValues.movement += this.speed;
        if(hexValues.movement > .5 + settings.range) {
            hexValues.movement = -settings.range - .5;
            noise.seed(Math.floor(Math.random()*1000));
            console.log("reset");
        }

    }
}
let createHexagons = (bg) => {
    //lets make one hexagon
    let k = 0;
    for(let j = 0;  /*Generate one more y*/ j-1 < (bg.clientHeight/settings.size)*settings.heightModifier; j++) {
        for(let i = 0; i-1 < (bg.clientWidth/settings.size)*settings.widthModifier; i++) {
            if(j % 2 == 0) {
                hexBackground[k] = new Hexagon(i*settings.size, j*settings.size*.9, settings.size);
            }
            else {
                hexBackground[k] = new Hexagon(i*settings.size+(settings.size/2), j*settings.size*.9, settings.size);
            }
            k++;
        }
    }
    for (let i = 0; i < hexBackground.length; i++) {
        const element = hexBackground[i];
        stage.addChild(element.hex);
    }
};
class Hexagon { 
    constructor(x,y,size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.val = 0.0;
        this.min = settings.target - settings.range;
        this.max = settings.target + settings.range;
        this.color = new Array(3);
        this.originalColor = new Array(3);
        this.originalColor[0] = [settings.color[0]+((Math.random()*settings.randomColorMod)-settings.randomColorMod/2)];
        this.originalColor[1] = [settings.color[1]+((Math.random()*settings.randomColorMod)-settings.randomColorMod/2)];
        this.originalColor[2] = [settings.color[2]+((Math.random()*settings.randomColorMod)-settings.randomColorMod/2)];
        this.colormod = 0.0;
        this.hex = new PIXI.Sprite(
        PIXI.loader.resources['hex'].texture
        );
    }

    draw(deltaT) {
        this.hex.x = this.x;
        this.hex.y = this.y;
        this.hex.anchor.set(0.5);
        this.hex.width = this.size*settings.widthModifier; /*scale modifiers*/
        this.hex.height = this.size*settings.heightModifier;
        this.hex.tint = PIXI.utils.rgb2hex(this.color);
    }

    update(deltaT) {

        this.val = hexValues.retrieveHeight(this.x/this.size,this.y/this.size);


        if(this.val > this.min && this.val < this.max) {
            if(this.val < settings.target) {
                this.colormod = inverseLinearInterpolation(this.min, settings.target, this.val)
            }
            else if (this.val > settings.target) {
                this.colormod = Math.abs(inverseLinearInterpolation(settings.target, this.max, this.val) - 1)      
            }
            
            this.color[0] = linearInterpolation(settings.color[0], settings.glow[0], this.colormod);
            this.color[1] = linearInterpolation(settings.color[1], settings.glow[1], this.colormod);
            this.color[2] = linearInterpolation(settings.color[2], settings.glow[2], this.colormod);
        }
        else {
            this.colormod = 0;
            this.color = [this.originalColor[0],this.originalColor[1],this.originalColor[2]];
        }
    this.draw(deltaT);
    }
}
