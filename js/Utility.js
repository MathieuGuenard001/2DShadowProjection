function calculateDirectionalVector(line) {
    let dirUnitVec_x = line.point2.x - line.point1.x;
    let dirUnitVec_y = line.point2.y - line.point1.y;

    return new Vector2D(dirUnitVec_x, dirUnitVec_y);
}

function circleLineIntersection(circle, line) {
    let lineDirectionalVector, A, B, C, det, t;
    let intersections = [];
    const A_bias = 0.0000001;

    lineDirectionalVector = calculateDirectionalVector(line);

    A = Math.pow(lineDirectionalVector.x, 2) + Math.pow(lineDirectionalVector.y, 2);
    B = 2 * (lineDirectionalVector.x * (line.point1.x - circle.position.x) + lineDirectionalVector.y * (line.point1.y - circle.position.y));
    C = Math.pow(line.point1.x - circle.position.x, 2) + Math.pow(line.point1.y - circle.position.y, 2) - Math.pow(circle.radius, 2);

    det = B * B - 4 * A * C;

    if (A <= A_bias || det < 0) {
        // No intersection
    } else if (det === 0) {
        // One potential intersection
        t = -B/(2 * A);
        intersections.push(new Vector2D(line.point1.x + t * lineDirectionalVector.x,
            line.point1.y + t * lineDirectionalVector.y));
    } else {
        // Two potential intersections
        t = (-B + Math.sqrt(det)) / (2 * A);
        if (t >= 0 && t <= 1) {
            intersections.push(new Vector2D(line.point1.x + t * lineDirectionalVector.x,
                line.point1.y + t * lineDirectionalVector.y));
        }
        t = (-B - Math.sqrt(det)) / (2 * A);
        if (t >= 0 && t <= 1) {
            intersections.push(new Vector2D(line.point1.x + t * lineDirectionalVector.x,
                line.point1.y + t * lineDirectionalVector.y));
        }
    }

    return intersections;
}

function isRayIntersectingLine(ray, line) {
    let directionalVector = calculateDirectionalVector(ray);

    let denominator = calculateDenominator(ray, line);

    if (denominator !== 0) { // not parallel
        let t = calculateT(ray, line, denominator);

        let u = calculateU(ray, line, denominator);

        if (0 <= t && 0 <= u && u <= 1) {
            return new Vector2D(ray.point1.x + directionalVector.x * t,
                    ray.point1.y + directionalVector.y * t);
        }
    }

    return null;
}

function calculateDenominator(line1, line2) {
    return (line1.point1.x - line1.point2.x) * (line2.point1.y - line2.point2.y) -
        (line1.point1.y - line1.point2.y) * (line2.point1.x - line2.point2.x);
}

function calculateT(line1, line2, denominator) {
    return ((line1.point1.x - line2.point1.x) * (line2.point1.y - line2.point2.y) -
        (line1.point1.y - line2.point1.y) * (line2.point1.x - line2.point2.x))/denominator;
}

function calculateU(line1, line2, denominator) {
    return -((line1.point1.x - line1.point2.x) * (line1.point1.y - line2.point1.y) -
        (line1.point1.y - line1.point2.y) * (line1.point1.x - line2.point1.x))/denominator;
}

function lengthOfLine(position1, position2) {
    return Math.sqrt(Math.pow(position2.x - position1.x, 2) + Math.pow(position2.y - position1.y, 2));
}
