class Canvas {
    x;
    y;
    width;
    height;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        let canvas = document.getElementById("myCanvas");
        canvas.x = this.x;
        canvas.y = this.y;
        canvas.width = this.width;
        canvas.height = this.height;

        canvas.style.cursor = 'none';

        let ctx = canvas.getContext('2d');
        ctx.clearRect(canvas.x,canvas.y, canvas.width, canvas.height);
    }

    draw() {
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext('2d');

        ctx.clearRect(this.x,this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x,this.y, this.width, this.height);
    }
}
