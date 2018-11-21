import { ResourceLoader } from './js/base/ResourceLoader.js';
import { BackGround } from './js/runtime/BackGround.js';
import {DataStore} from "./js/base/DataStore.js";
import {Land} from "./js/runtime/Land.js";
import {Director} from "./js/Director.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onloaded(map => this.onResourceFristLoaded(map))

    }

    onResourceFristLoaded(map) {
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        // this.registEvent();
        this.init()
    }

    init(){
        this.dataStore.put('pencils',[])
            .put('background',BackGround)
            .put('land',Land)
            .put('birds',Birds)
            .put('score',Score)
            .put('startButton',StartButton);

        this.registEvent();
        if(this.director.isGameOver){
            this.dataStore.get('background').draw();
            this.dataStore.get('startButton').draw();
            return;
        }
        this.director.createPencil();
        this.director.run();

    }

    registEvent(){
        this.canvas.addEventListener('touchstart',e=>{
            e.preventDefault();
            if(this.director.isGameOver){
                this.director.isGameOver = false;
                this.init();
            }else{
                this.director.birdsEvent()
            }
        })

    }
}