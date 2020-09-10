class Canvas {
    position;
    width;
    height;

    constructor(x, y, width, height) {
        let canvas = document.getElementById("2DShadowProjectionCanvas");

        this.position = new Vector2D(x, y);
        this.width = width;
        this.height = height;

        canvas.x = x;
        canvas.y = y;
        canvas.width = width;
        canvas.height = height;
        canvas.style.cursor = 'none';

        // to ensure that the canvas have the right dimension, we draw it back
        let ctx = canvas.getContext('2d');
        ctx.clearRect(this.position.x, this.position.y, this.width, this.height);
    }

    draw() {
        let canvas = document.getElementById("2DShadowProjectionCanvas");
        let ctx = canvas.getContext('2d');

        ctx.clearRect(this.position.x, this.position.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    checkLightSourcePositionIsInCanvas(position) {
        if (position instanceof Vector2D) {
            return position.x - LIGHT_SOURCE_DRAWING_RADIUS >= this.position.x &&
                position.x + LIGHT_SOURCE_DRAWING_RADIUS <= this.position.x + this.width &&
                position.y - LIGHT_SOURCE_DRAWING_RADIUS >= this.position.y &&
                position.y + LIGHT_SOURCE_DRAWING_RADIUS <= this.position.y + this.height;
        }
    }

    getRandomPositionInCanvas() {
        let min = Math.ceil(this.position.x);
        let max = Math.floor(this.position.x + this.width);
        let x = Math.floor(Math.random() * (max - min + 1) + min);

        min = Math.ceil(this.position.y);
        max = Math.floor(this.position.y + this.height);
        let y = Math.floor(Math.random() * (max - min + 1) + min);

        return new Vector2D(x, y);
    }
}
