class LightEngine {
    wallIntersections;

    constructor() {
        this.wallIntersections = [];
    }

    castLight(lightSource, walls) {
        if (!(lightSource instanceof LightSource)) {
            return;
        }

        this.wallIntersections = [];

        this.findWallIntersectionRayRotationMode(lightSource, walls);

        this.drawLight();
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

    drawLight() {
        let canvas = document.getElementById("2DShadowProjectionCanvas");
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
