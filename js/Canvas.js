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
}
