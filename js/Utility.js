function calculateDirectionalVector(line) {
    let dirUnitVec_x = line.point2.x - line.point1.x;
    let dirUnitVec_y = line.point2.y - line.point1.y;

    return new Vector2D(dirUnitVec_x, dirUnitVec_y);
}

function circleLineIntersection(circle, line) {
    let lineDirectionalVector, A, B, C, det, t;
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
        new Vector2D(line.point1.x + t * lineDirectionalVector.x, line.point1.y + t * lineDirectionalVector.y).draw();
    } else {
        // Two potential intersections
        t = (-B + Math.sqrt(det)) / (2 * A);
        if (t >= 0 && t <= 1) {
            new Vector2D(line.point1.x + t * lineDirectionalVector.x, line.point1.y + t * lineDirectionalVector.y).draw();
        }
        t = (-B - Math.sqrt(det)) / (2 * A);
        if (t >= 0 && t <= 1) {
            new Vector2D(line.point1.x + t * lineDirectionalVector.x, line.point1.y + t * lineDirectionalVector.y).draw();
        }
    }
}
