import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";


export class Director {
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance
    }
    constructor(){
        this.dataStore = DataStore.getInstance();
        this.move = 2;
        this.isGameOver = true;
        this.dataStore.put('move',this.move);

        this.tanA = 0.375;
        this.pencilTopLength=70;
        this.pencilBottomLength = 350;
    }

    createPencil(){
        const minTop = window.innerWidth/8;
        const maxTop = window.innerHeight/2;
        const top = Math.random()*(maxTop - minTop) + minTop;

        this.dataStore.get('pencils').push(new DownPencil(top));
        this.dataStore.get('pencils').push(new UpPencil(top));
    }

    birdsEvent(){
        for(let i =0;i<=2;i++){
            this.dataStore.get('birds').defaultY[i] = this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time=0;
    }

    static isStrike(bird,pencil){
        let s = false;
        let tanA = 0.4;
        if(
            (pencil.type === 'up' && bird.top < pencil.toplength) ||
            (pencil.type === 'down' && bird.bottom > pencil.toplength)
        ){
            if (bird.top > pencil.bottom ||
                bird.bottom < pencil.top ||
                bird.right < pencil.left ||
                bird.left > pencil.right
            ) {
                s = true;
            }
        }else{
            if (bird.top > pencil.bottom ||
                bird.bottom < pencil.top ||
                bird.right < (pencil.left + (bird.top-pencil.toplength)*tanA) ||
                bird.left > (pencil.right - (bird.top-pencil.toplength)*tanA)
            ) {
                console.log(bird.right,(pencil.left + (bird.top-pencil.toplength)*tanA))
                s = true;
            }

            // s=true;
        }

        return !s;

    }

    check(){
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        const length = pencils.length;
        if((birds.y + birds.height) > land.y){
            this.isGameOver = true;
        }
        //创建小鸟模型
        const birdBorder = {
            top:birds.y,
            bottom:birds.y + birds.srcH,
            left:birds.x,
            right:birds.x + birds.srcW,
        }

        // //创建水管模型
        for(let i=0;i<length;i++){
            const pencilBorder={
                top:pencils[i].y,
                bottom:pencils[i].y + pencils[i].srcH,
                left:pencils[i].x,
                right:pencils[i].x + pencils[i].srcW,
            }
            if(Object.getPrototypeOf(pencils[i]).constructor === UpPencil){
                pencilBorder.type = 'up';
                pencilBorder.toplength = pencils[i].y + pencils[i].srcH - this.pencilTopLength;
            }else{
                pencilBorder.type = 'down';
                pencilBorder.toplength = pencils[i].y + pencils[i].srcH - this.pencilBottomLength;
            }
            if(Director.isStrike(birdBorder,pencilBorder)){
                this.isGameOver = true
            }
        }
        //进入的时候开启加分功能
        if(birdBorder.right > pencils[0].x && birdBorder.left < (pencils[0].x + pencils[0].srcW)){
            this.dataStore.get('score').isScore=true;
        }
        //离开的时候加分同时关闭加分功能
        if(birdBorder.left > (pencils[0].x + pencils[0].srcW) && this.dataStore.get('score').isScore){
            this.dataStore.get('score').isScore = false;
            this.dataStore.get('score').scoreNumber++
        }
    }
    run(){
        this.check();
        if(!this.isGameOver){
            this.dataStore.get('background').draw();

            let pencils = this.dataStore.get('pencils');
            if(pencils[0].x + pencils[0].width <= 0 && pencils.length === 4){
                pencils.shift();
                pencils.shift();
            }

            if(pencils[0].x <= (window.innerWidth - pencils[0].width)/2 && pencils.length === 2){
                this.createPencil()
            }

            this.dataStore.get('pencils').forEach(function(value){
                value.draw()
            });
            this.dataStore.get('land').draw();
            this.dataStore.get('score').draw();
            this.dataStore.get('birds').draw();
            const timer = requestAnimationFrame(()=>this.run());
            this.dataStore.put('timer',timer)
        }else{
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('timer'))
            this.dataStore.destory();
        }

    }


}