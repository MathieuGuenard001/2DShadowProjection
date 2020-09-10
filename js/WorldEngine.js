let canvas;
let lightSource;
let lightEngine;
let walls;

function onLoad() {
    canvas = new Canvas(0, 0, 500, 500);

    lightSource = new LightSource(canvas.position.x + canvas.width/2,
        canvas.position.y + canvas.height/2);

    walls = [];
    generateWalls(5);

    lightEngine = new LightEngine();

    drawAll();

    // Will move the light source with the mouse
    document.getElementById("2DShadowProjectionCanvas").onmousemove = mouseMovedEvent;

    // This is temporary, only to help dev
    //window.setInterval(testRay, 10);
}

function drawAll() {
    canvas.draw();
    lightEngine.castLight(lightSource, walls);
    lightSource.draw();

    for (let i = 0; i < walls.length; i++) {
        walls[i].draw();
    }
}

function testRay() {

}

function mouseMovedEvent(event) {
    // Represent the position in the center of the light source
    let mousePosition = new Vector2D(event.clientX - 2 * LIGHT_SOURCE_DRAWING_RADIUS,
        event.clientY - 2 * LIGHT_SOURCE_DRAWING_RADIUS);

    // Ensure that the light source doesn't go out of the canvas
    if (canvas.checkLightSourcePositionIsInCanvas(mousePosition)) {
        lightSource.updatePosition(mousePosition);

        drawAll();
    }
}

function generateWalls(numberOfWall) {
    // Top canvas wall
    walls.push(new Line(canvas.position, new Vector2D(canvas.position.x + canvas.width, canvas.position.y), 0));
    // Left canvas wall
    walls.push(new Line(canvas.position, new Vector2D(canvas.position.x, canvas.position.y + canvas.height), 1));
    // Bottom canvas wall
    walls.push(new Line(new Vector2D(canvas.position.x, canvas.position.y + canvas.height),
        new Vector2D(canvas.position.x + canvas.width, canvas.position.y + canvas.height), 2));
    // Right canvas wall
    walls.push(new Line(new Vector2D(canvas.position.x + canvas.width, canvas.position.y),
        new Vector2D(canvas.position.x + canvas.width, canvas.position.y + canvas.height), 3));



    for (let i = 4; i < numberOfWall + 4; i++) {
        let point1 = canvas.getRandomPositionInCanvas();
        let point2 = canvas.getRandomPositionInCanvas();

        walls.push(new Line(point1, point2, i));
    }
}
