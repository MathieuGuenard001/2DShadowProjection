const RAY_ROTATION_MODE = 0;
const CIRCLE_RAY_MODE = 1;
const ALLOWED_MODES = [RAY_ROTATION_MODE, CIRCLE_RAY_MODE];

class LightEngine {
    wallIntersections;
    mode;

    constructor() {
        this.wallIntersections = [];
        this.mode = RAY_ROTATION_MODE;
    }

    setMode(mode) {
        if (ALLOWED_MODES.includes(mode,0)) {
            this.mode = mode;
        }
    }

    castLight(lightSource, walls) {
        if (!(lightSource instanceof LightSource)) {
            return;
        }

        this.wallIntersections = [];

        switch (this.mode) {
            case RAY_ROTATION_MODE:
                this.findWallIntersectionRayRotationMode(lightSource, walls);

                this.drawLight();
                break;
            case CIRCLE_RAY_MODE:
                this.findWallIntersectionsCircleRayMode(lightSource, walls);

                break;
        }
    }

    findWallIntersectionRayRotationMode(lightSource, walls) {
        let lastWallFound = -1;
        let lastWallIntersectionFound = null;
        for (let angle = 0; angle < Math.PI * 2; angle+=0.01) {
            let yVariation = Math.sin(angle);
            let xVariation = Math.cos(angle);
            let rayProjection = new Vector2D(lightSource.position.x + xVariation,
                lightSource.position.y + yVariation);

            let ray = new Line(lightSource.position, rayProjection, -1);

            let finalIntersection = null;
            let finalIntersectionDistance = 1000000000;
            let wallId = -1;

            for (let i = 0; i < walls.length; i++) {
                let intersection = isRayIntersectingLine(ray, walls[i]);
                if (intersection != null) {
                    if (finalIntersection == null) {
                        finalIntersection = intersection;
                        finalIntersectionDistance = lengthOfLine(lightSource.position, finalIntersection);
                        wallId = walls[i].id;
                    } else {
                        let intersectionDistance = lengthOfLine(lightSource.position, intersection);
                        if (intersectionDistance < finalIntersectionDistance) {
                            finalIntersection = intersection;
                            finalIntersectionDistance = intersectionDistance;
                            wallId = walls[i].id;
                        }
                    }
                }
            }
            if (finalIntersection != null) {
                if (wallId !== lastWallFound) {
                    if (lastWallIntersectionFound != null)
                        this.wallIntersections.push(lastWallIntersectionFound);
                    this.wallIntersections.push(finalIntersection);
                    lastWallFound = wallId;
                } else {
                    lastWallIntersectionFound = finalIntersection;
                }
            }
        }
    }

    findWallIntersectionsCircleRayMode(lightSource, walls) {
        let maxCircleRayRadius = this.calculateMaxCircleRayRadius(lightSource);
        let circleRay = new Circle(lightSource.position.x, lightSource.position.y, 0);
        let test = []; // [[position of intersection, wall id, radius],[...]]

        for (circleRay.radius; circleRay.radius < maxCircleRayRadius; circleRay.augmentRadius(1)) {
            for (let i = 0; i < walls.length; i++) {
                let intersections = circleLineIntersection(circleRay, walls[i]);
                for (let y = 0; y < intersections.length; y++) {
                    let ray = new Line(lightSource.position, intersections[y], -1);
                    let rayLength = lengthOfLine(ray.point1, ray.point2);
                    let intersectionIsClosest = true;

                    for (let z = 0; z < walls.length && intersectionIsClosest; z++) {
                        if (walls[i].id !== walls[z].id) {
                            let rayCastIntersection = isRayIntersectingLine(ray, walls[z]);
                            if (rayCastIntersection != null &&
                                lengthOfLine(lightSource.position, rayCastIntersection)  < rayLength) {
                                intersectionIsClosest = false;
                            }
                        }
                    }

                    if (intersectionIsClosest) {
                        let updatedTest = false;

                        for (let a = 0; a < test.length; a++) {
                            if (test[a][1] === walls[i].id && test[a][2] < circleRay.radius &&
                                    lengthOfLine(test[a][0], intersections[y]) < 5) {
                                test[a] = [intersections[y], walls[i].id, circleRay.radius];
                                updatedTest = true;
                                break;
                            }
                        }

                        if (!updatedTest) test.push([intersections[y], walls[i].id, circleRay.radius]);
                    }
                }
            }
        }

        this.wallIntersections = test;
    }

    calculateMaxCircleRayRadius(lightSource) {
        let L_U_Corner = Math.sqrt(Math.pow(lightSource.position.x, 2) + Math.pow(lightSource.position.y, 2));
        let R_U_Corner = Math.sqrt(Math.pow(lightSource.position.x, 2)
            + Math.pow(canvas.width - lightSource.position.x, 2));
        let L_L_Corner = Math.sqrt(Math.pow(canvas.width - lightSource.position.x, 2)
            + Math.pow(lightSource.position.y, 2));
        let R_L_Corner = Math.sqrt(Math.pow(canvas.width - lightSource.position.x, 2)
            + Math.pow(canvas.height - lightSource.position.y, 2));

        return Math.ceil(Math.max(L_U_Corner, R_U_Corner, L_L_Corner, R_L_Corner));
    }

    drawLight() {
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext('2d');

        let point = this.wallIntersections[0];
        ctx.moveTo(point.x, point.y);
        ctx.beginPath();for (let i = 1; i < this.wallIntersections.length ; i++) {
            point = this.wallIntersections[i];
            ctx.lineTo(point.x, point.y);
        }
        point = this.wallIntersections[0];
        ctx.lineTo(point.x, point.y);

        ctx.fillStyle = "white";
        ctx.fill();
    }
}
