import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";
import {Director} from "../Director.js";

export class UpPencil extends Pencil{
    constructor(top){
        const image = Sprite.getImage('pencilUp');
        super(image,0,0,
            image.width,image.height,
            DataStore.getInstance().canvas.width,0,
            image.width,image.height);
        this.top = top;
    }

    draw(){
        this.y = this.top - this.img.height;
        super.draw()
    }

}