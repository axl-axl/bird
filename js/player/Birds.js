import {Sprite} from "../base/Sprite.js";

export class Birds extends Sprite{
    constructor(){
        const image = Sprite.getImage('birds');
        super(
            image,0,0,
            image.width,
            image.height,
            0,0,
            image.width,
            image.height
            );
        this.birdWidth = 34;
        this.birdHeight = 26;
        this.clipingX=[9,9+34+18,9+34+18+34+18];
        this.clipingY=[10,10,10];
        this.birdX = Math.floor(window.innerWidth/4);
        this.birdsX = [this.birdX,this.birdX,this.birdX];
        this.birdY = Math.floor(window.innerHeight/2);
        this.birdsY = [this.birdY,this.birdY,this.birdY];
        this.defaultY = [this.birdY,this.birdY,this.birdY];
        this.index = 0;
        this.count = 0;
        this.time = 0;
    }

    draw(){
        const speed = 0.1;
        this.count = this.count + speed;
        this.index = Math.floor(this.count);
        if(this.count >= 2){
            this.count = 0;
        }
        //自由落体公式 g*t^2/2
        const g = 0.98/2.4;//地球重力0.98
        //向上偏移量掉落之前向上停顿
        const offsetTop = 30;
        const offsetY = g*this.time*(this.time-offsetTop)/2;
        for(let i=0;i<=2;i++){
            this.birdsY[i] = this.defaultY[i] + offsetY;
        }
        this.time++;

        this.srcX = this.clipingX[this.index];
        this.srcY = this.clipingY[this.index];
        this.srcW = this.birdWidth;
        this.srcH = this.birdHeight;
        this.width = this.birdWidth;
        this.height = this.birdHeight;
        this.x = this.birdsX[this.index];
        this.y = this.birdsY[this.index];
        super.draw()

    }
}