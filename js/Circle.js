class Circle {
    position;
    radius;

    constructor(x, y, radius) {
        this.position = new Vector2D(x, y);
        this.radius = radius;
    }

    augmentRadius(augmentation) {
        this.radius += augmentation;
    }

    draw() {
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.storkeStyle = "white";
        ctx.stroke();
    }
}
