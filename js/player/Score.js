import {DataStore} from "../base/DataStore.js";

export class Score {
    constructor(){
        this.scoreNumber = 0;
        this.isScore = true;
    }

    draw(){
        const ctx= DataStore.getInstance().ctx;
        ctx.font = '24 Arial';
        ctx.fillStyle = "#ff2523";
        ctx.fillText(
            this.scoreNumber,
            window.innerWidth/10,
            window.innerHeight/18,
            1000
        )
    }
}