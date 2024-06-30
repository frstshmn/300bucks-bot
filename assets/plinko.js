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

var boundaries = [
    Bodies.rectangle(0, 300, 20, 600, { isStatic: true }),
    Bodies.rectangle(800, 300, 20, 600, { isStatic: true })
];

// Add all of the bodies to the world
World.add(engine.world, [ground, ...pegs, ...boundaries]);

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
            frictionAir: 0.01
        });
        World.add(engine.world, [ball]);
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
