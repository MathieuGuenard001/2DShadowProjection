let canvas;
let light_source;
let walls;

let circleRay;
let maxCircleRayRadius;

function onLoad() {
    canvas = new Canvas(0, 0, 500, 500);

    light_source = new LightSource(canvas.position.x + canvas.width/2,
        canvas.position.y + canvas.height/2);

    walls = [];
    generateWalls(5);

    circleRay = new CircleRay(light_source.position.x, light_source.position.y, LIGHT_SOURCE_DRAWING_RADIUS);
    calculateMaxCircleRayRadius();

    drawAll();

    // Will move the light source with the mouse
    window.onmousemove = mouseMovedEvent;

    // This is temporary, only to help dev
    window.setInterval(updateCircleRay, 500);
}

function drawAll() {
    canvas.draw();
    light_source.draw();

    for (let i = 0; i < walls.length; i++) {
        walls[i].draw();
    }

    circleRay.draw();
}

function mouseMovedEvent(event) {
    // Represent the position in the center of the light source
    let mousePosition = new Vector2D(event.clientX - LIGHT_SOURCE_DRAWING_RADIUS,
        event.clientY - LIGHT_SOURCE_DRAWING_RADIUS);

    // Ensure that the light source doesn't go out of the canvas
    if (canvas.checkLightSourcePositionIsInCanvas(mousePosition)) {
        light_source.updatePosition(mousePosition);

        circleRay.updatePosition(mousePosition);
        calculateMaxCircleRayRadius();

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

function calculateMaxCircleRayRadius() {
    let L_U_Corner = Math.sqrt(Math.pow(light_source.position.x, 2) + Math.pow(light_source.position.y, 2));
    let R_U_Corner = Math.sqrt(Math.pow(light_source.position.x, 2) + Math.pow(canvas.width - light_source.position.x, 2));
    let L_L_Corner = Math.sqrt(Math.pow(canvas.width - light_source.position.x, 2) + Math.pow(light_source.position.y, 2));
    let R_L_Corner = Math.sqrt(Math.pow(canvas.width - light_source.position.x, 2) + Math.pow(canvas.height - light_source.position.y, 2));

    maxCircleRayRadius = Math.max(L_U_Corner, R_U_Corner, L_L_Corner, R_L_Corner);
    maxCircleRayRadius = Math.ceil(maxCircleRayRadius);
}

function updateCircleRay() {
    if (circleRay.radius < maxCircleRayRadius) {
        circleRay.augmentRadius(1);
        drawAll();
        for (let i = 0; i < walls.length; i++) {
            circleLineIntersection(circleRay, walls[i]);
        }
    }
}
