class Pipes {
    constructor() {
        this.speed = 1;
        this.maxSpeed = 5;
        this.makeNewPipes();
    }

    makeNewPipes() {
        this.x = width;
        this.w = width / 10;
        this.yTop    = 0;
        this.hTop    = random(height / 3, height / 1.75);
        this.yBottom = this.hTop + 80;
        this.hBottom = height - this.hTop;
    }

    render(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.yTop,    this.w, this.hTop);
        ctx.fillRect(this.x, this.yBottom, this.w, this.hBottom);
    }

    update() {
        this.x -= this.speed;

        if (this.x + this.w <= 0) {
            this.makeNewPipes();
            this.speed += 0.5;
            if (this.speed >= this.maxSpeed) this.speed = this.maxSpeed;
        }
    }
}