const numBirds = 1000;
const width = 400, height = 600;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

window.addEventListener("load", function(e) {
    let birds = new Array();
    let pipes = new Pipes();

    for (let i = 0; i < numBirds; i ++) {
        birds.push(new Bird());
    }

    let canvas = document.getElementById("canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    let ctx = canvas.getContext("2d");

    function draw() {
        ctx.fillStyle = 'rgb(51, 51, 51)';
        ctx.fillRect(0, 0, width, height);
        
        for (let bird of birds) {
            bird.render(ctx);
            bird.update(pipes);
        }
    
        pipes.render(ctx);
        pipes.update();
    
        let allDead        = true;
        let biggestFitness = 0;
        let bestBrain      = null;
    
        for (let bird of birds) {
            if (bird.fitness > biggestFitness) {
                biggestFitness = bird.fitness;
                bestBrain = bird.brain;
            }
            if (bird.isAlive == true) {
                allDead = false;
                break;
            }
        }
    
        if (allDead == true) {
            pipes = new Pipes();
    
            for (let i = 0; i < birds.length; i ++) {
                birds[i] = new Bird();
                birds[i].brain = bestBrain.copy();
                birds[i].brain.mutate(0.1);
            }
        }
        requestAnimationFrame(draw);
    };

    draw();
});