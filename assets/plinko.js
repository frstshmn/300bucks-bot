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

var pegs = [];
for (var i = 50; i <= 750; i += 50) {
    for (var j = 75; j <= 350; j += 100) {
        var peg = Bodies.circle(i + (j % 100 ? 25 : 0), j, 10, { isStatic: true });
        pegs.push(peg);
    }
}

var multiplierTiles = [];
var multiplierValues = [0, 0, 0, 0, 0, 0, 0, 1, 1, 2]; // Sample chances from Stake.com
for (var k = 0; k < 10; k++) {
    var multiplierTile = Bodies.rectangle(50 + k * 80, 450, 60, 40, {
        isStatic: true,
        label: "multiplier",
        multiplier: multiplierValues[k]
    });
    multiplierTiles.push(multiplierTile);
}

var boundaries = [
    Bodies.rectangle(0, 300, 20, 600, { isStatic: true }),
    Bodies.rectangle(800, 300, 20, 600, { isStatic: true })
];

// Add all of the bodies to the world
World.add(engine.world, [ground, ...pegs, ...multiplierTiles, ...boundaries]);

// Balance and multiplier variables
var balance = 300; // Default balance set to 300 dollars
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

        // Detect when the ball hits a multiplier tile
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
