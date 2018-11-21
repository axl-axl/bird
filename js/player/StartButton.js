import {Sprite} from "../base/Sprite.js";

export class StartButton extends Sprite{
    constructor(){
        const image = Sprite.getImage('beginButton');
        super(
            image,0,0,
            image.width,
            image.height,
            window.innerWidth/2.2,
            window.innerHeight/2.5,
            image.width,
            image.height
        )
    }
}