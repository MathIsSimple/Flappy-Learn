class Bird {
    constructor() {
        this.fitness = 0;
        this.isAlive = true;
        this.s = 20;
        this.x = this.s;
        this.y = height / 2 - this.s / 2;
        this.v = 0;
        this.g = 0.15;
        this.maxV = 7;

        this.brain = new NeuralNetwork(5, 4, 1);
    }

    render(ctx) {
        if (this.isAlive == true) {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x, this.y, this.s, this.s);
        }
    }

    update(pipes) {
        if (this.isAlive == true) {
            let inputs = [
                this.y / height, 
                this.v, (pipes.x - this.x) / width, 
                pipes.yTop / height, 
                pipes.yBottom / height];

            if (this.brain.predict(inputs)[0] > 0.5) this.up();                

            this.v += this.g;
            this.y += this.v;

            if (this.v > this.maxV)  this.v = this. maxV;
            if (this.v < -this.maxV) this.v = -this.maxV;

            let died = false;

            if (this.y > height || this.y + this.s < 0) died = true;
            if (this.x < pipes.x + pipes.w && this.x + this.s > pipes.x) {
                if (this.y < pipes.yTop + pipes.hTop && this.y + this.s > pipes.yTop) died = true;
                if (this.y < pipes.yBottom + pipes.hBottom && this.y + this.s > pipes.yBottom) died = true;
            }

            if (!died) this.fitness += 1;
            if (died)  this.isAlive = false;
        }
    }

    calculateFitness(maxFitness) {
        this.fitness /= maxFitness;
    }

    up() {
        if (this.isAlive == true) {
            this.v -= 5;
        }
    }
}