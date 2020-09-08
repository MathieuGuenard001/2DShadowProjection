class Wall {
    point1;
    point2;
    id;

    constructor(position1, position2, id) {
        this.point1 = position1;
        this.point2 = position2;
        this.id = id;
    }

    draw() {
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point2.x, this.point2.y);
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
}
