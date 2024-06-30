Telegram.WebApp.ready();

// Matter.js module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Events = Matter.Events;

// Create an engine
var engine = Engine.create();

// Create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false
    }
});

// Create bodies
var ground = Bodies.rectangle(400, 600, 800, 50, { isStatic: true });

// Create pegs
var pegs = [];
for (var i = 50; i <= 750; i += 50) {
    for (var j = 75; j <= 300; j += 50) {
        var peg = Bodies.circle(i + (j % 100 ? 25 : 0), j, 10, { isStatic: true });
        pegs.push(peg);
    }
}

// Create multiplier tiles with corresponding chances
var multiplierTiles = [];
var multiplierChances = [0.125, 0.125, 0.25, 0.25, 0.125, 0.125];
var multiplierValues = [0, 0, 0, 1, 1, 2];
var xPos = 40;

for (var i = 0; i < multiplierChances.length; i++) {
    var tileHeight = 50 + 50 * i;
    var multiplierTile = Bodies.rectangle(xPos, tileHeight, 60, 40, {
        isStatic: true,
        label: 'multiplier',
        multiplier: multiplierValues[i]
    });
    multiplierTiles.push(multiplierTile);
    xPos += 80;
}

// Create obstacles (bumpers)
var obstacles = [
    Bodies.rectangle(200, 100, 180, 20, { isStatic: true, angle: Math.PI * 0.06 }),
    Bodies.rectangle(600, 100, 180, 20, { isStatic: true, angle: -Math.PI * 0.06 }),
    Bodies.rectangle(400, 300, 300, 20, { isStatic: true, angle: Math.PI * 0.1 }),
    Bodies.rectangle(200, 500, 200, 20, { isStatic: true, angle: -Math.PI * 0.1 }),
    Bodies.rectangle(600, 500, 200, 20, { isStatic: true, angle: Math.PI * 0.1 })
];

// Boundaries
var boundaries = [
    Bodies.rectangle(0, 300, 20, 600, { isStatic: true }),
    Bodies.rectangle(800, 300, 20, 600, { isStatic: true })
];

// Add all bodies to the world
World.add(engine.world, [ground, ...pegs, ...multiplierTiles, ...obstacles, ...boundaries]);

// Balance and multiplier variables
var balance = 300;
var multiplier = 1;

// Function to throw the ball
function throwBall() {
    if (balance > 0) {
        balance -= multiplier;
        updateBalanceDisplay();
        var ball = Bodies.circle(400, 0, 10, {
            restitution: 1,
            friction: 0,
            frictionAir: 0.01,
            label: 'ball'
        });
        World.add(engine.world, [ball]);

        // Event handling for ball hitting multiplier tiles
        Events.on(engine, 'collisionStart', function(event) {
            var pairs = event.pairs;
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                if (pair.bodyA.label === 'ball' && pair.bodyB.label === 'multiplier') {
                    var multiplierValue = pair.bodyB.multiplier;
                    balance += multiplierValue * multiplier;
                    updateBalanceDisplay();
                    World.remove(engine.world, ball);
                    return;
                } else if (pair.bodyA.label === 'multiplier' && pair.bodyB.label === 'ball') {
                    var multiplierValue = pair.bodyA.multiplier;
                    balance += multiplierValue * multiplier;
                    updateBalanceDisplay();
                    World.remove(engine.world, ball);
                    return;
                }
            }
        });
    } else {
        alert("Out of balance! Reset to continue playing.");
    }
}

// Function to update balance display
function updateBalanceDisplay() {
    document.getElementById('balance').value = balance;
}

// Event handling for multiplier input
document.getElementById('multiplier').addEventListener('change', function() {
    multiplier = parseInt(this.value) || 1;
});

// Run the engine
Engine.run(engine);

// Run the renderer
Render.run(render);