let canvas;
let light_source;

function onLoad() {
    canvas = new Canvas(0, 0, 500, 500);

    light_source = new LightSource(canvas.position.x + canvas.width/2,
        canvas.position.y + canvas.height/2);

    drawAll();
}

function drawAll() {
    canvas.draw();
    light_source.draw();
}
