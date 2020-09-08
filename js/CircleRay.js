class CircleRay extends Circle {

    constructor(x, y, radius) {
        super(x, y, radius);
    }

    updatePosition(position) {
        this.position = position;
        this.radius = LIGHT_SOURCE_DRAWING_RADIUS;
    }

    augmentRadius(augmentation) {
        this.radius += augmentation;
    }

    setRadius(radius) {
        this.radius = radius;
    }
}
