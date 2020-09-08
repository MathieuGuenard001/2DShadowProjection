let canvas;
let light_source;
let walls;

function onLoad() {
    canvas = new Canvas(0, 0, 500, 500);

    light_source = new LightSource(canvas.position.x + canvas.width/2,
        canvas.position.y + canvas.height/2);

    walls = [];
    generateWalls(5);

    drawAll();

    // Will move the light source with the mouse
    window.onmousemove = mouseMovedEvent;
}

function drawAll() {
    canvas.draw();
    light_source.draw();

    for (let i = 0; i < walls.length; i++) {
        walls[i].draw();
    }
}

function mouseMovedEvent(event) {
    // Represent the position in the center of the light source
    let mousePosition = new Position(event.clientX - LIGHT_SOURCE_DRAWING_RADIUS,
        event.clientY - LIGHT_SOURCE_DRAWING_RADIUS);

    // Ensure that the light source doesn't go out of the canvas
    if (canvas.checkLightSourcePositionIsInCanvas(mousePosition)) {
        light_source.updatePosition(mousePosition);
        drawAll();
    }
}

function generateWalls(numberOfWall) {
    for (let i = 0; i < numberOfWall; i++) {
        let point1 = canvas.getRandomPositionInCanvas();
        let point2 = canvas.getRandomPositionInCanvas();

        walls.push(new Wall(point1, point2, i));
    }
}
