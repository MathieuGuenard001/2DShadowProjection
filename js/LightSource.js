const LIGHT_SOURCE_DRAWING_RADIUS = 5;

class LightSource {
    position;

    constructor(x, y) {
        this.position = new Vector2D(x, y);
    }

    draw() {
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, LIGHT_SOURCE_DRAWING_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    updatePosition(position) {
        if (position instanceof Vector2D) {
            this.position = position;
        }
    }
}
