class Canvas {
    position;
    width;
    height;

    constructor(x, y, width, height) {
        this.position = new Position(x, y);
        this.width = width;
        this.height = height;

        let canvas = document.getElementById("myCanvas");
        canvas.x = this.position.x;
        canvas.y = this.position.y;
        canvas.width = this.width;
        canvas.height = this.height;

        canvas.style.cursor = 'none';

        // to ensure that the canvas have the right dimension, we draw it back
        let ctx = canvas.getContext('2d');
        ctx.clearRect(canvas.x,canvas.y, canvas.width, canvas.height);
    }

    draw() {
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext('2d');

        ctx.clearRect(this.position.x,this.position.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(this.position.x,this.position.y, this.width, this.height);
    }

    checkLightSourcePositionIsInCanvas(position) {
        if (position instanceof Position) {
            return position.x - LIGHT_SOURCE_DRAWING_RADIUS >= this.position.x &&
                position.x + LIGHT_SOURCE_DRAWING_RADIUS <= this.position.x + this.width &&
                position.y - LIGHT_SOURCE_DRAWING_RADIUS >= this.position.y &&
                position.y + LIGHT_SOURCE_DRAWING_RADIUS <= this.position.y + this.height;
        }
    }

    getRandomPositionInCanvas() {
        let min = Math.ceil(canvas.position.x);
        let max = Math.floor(canvas.position.x + canvas.width);
        let x = Math.floor(Math.random() * (max - min + 1) + min);

        min = Math.ceil(canvas.position.y);
        max = Math.floor(canvas.position.y + canvas.height);
        let y = Math.floor(Math.random() * (max - min + 1) + min);

        return new Position(x, y);
    }
}
