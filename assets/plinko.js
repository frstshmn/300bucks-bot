Telegram.WebApp.ready();

// Matter.js module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Common = Matter.Common;

// Create an engine
var engine = Engine.create();

// Create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: '#1b1b1b'
    }
});

// Create ground
var ground = Bodies.rectangle(400, 580, 800, 40, { isStatic: true, render: { fillStyle: '#ffffff' } });

// Create pegs in a triangular layout
var pegs = [];
var rows = 12;
var pegSpacing = 50;
for (var row = 1; row < rows; row++) { // Start from row 1 to skip the top peg
    for (var col = 0; col <= row; col++) {
        var x = 400 + col * pegSpacing - row * pegSpacing / 2;
        var y = 100 + row * pegSpacing;
        var peg = Bodies.circle(x, y, 5, { isStatic: true, render: { fillStyle: '#ffffff' } });
        pegs.push(peg);
    }
}

// Create multiplier slots
var multiplierValues = [29, 16, 8, 4, 2, 1, 2, 4, 8, 16, 29]; // Sample multipliers for demonstration
var slots = [];
for (var i = 0; i < multiplierValues.length; i++) {
    var x = i * 70 + 65;
    var slot = Bodies.rectangle(x, 560, 70, 20, {
        isStatic: true,
        render: {
            fillStyle: '#ffffff',
            text: {
                content: multiplierValues[i] + 'x',
                color: '#000000'
            }
        },
        label: 'slot',
        multiplier: multiplierValues[i]
    });
    slots.push(slot);
}

// Create boundaries
var boundaries = [
    Bodies.rectangle(400, 0, 800, 20, { isStatic: true }), // Top boundary
    Bodies.rectangle(0, 300, 20, 600, { isStatic: true }), // Left boundary
    Bodies.rectangle(800, 300, 20, 600, { isStatic: true }) // Right boundary
];

// Add all bodies to the world
World.add(engine.world, [ground, ...pegs, ...slots, ...boundaries]);

// Balance and bet variables
var balance = 300;
var bet = 1;

// Function to throw the ball
function throwBall() {
    if (balance >= bet) {
        balance -= bet;
        updateBalanceDisplay();
        var startX = 400; // Start the ball at the center
        var ball = Bodies.circle(startX, 0, 10, {
            restitution: 0.5,
            friction: 0,
            frictionAir: 0.01,
            label: 'ball',
            render: {
                fillStyle: '#ff0000'
            }
        });
        World.add(engine.world, [ball]);

        // Event handling for ball hitting multiplier slots
        Events.on(engine, 'collisionStart', function(event) {
            var pairs = event.pairs;
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                if (pair.bodyA.label === 'ball' && pair.bodyB.label === 'slot') {
                    var slotMultiplier = pair.bodyB.multiplier;
                    balance += bet * slotMultiplier;
                    updateBalanceDisplay();
                    World.remove(engine.world, ball);
                    return;
                } else if (pair.bodyA.label === 'slot' && pair.bodyB.label === 'ball') {
                    var slotMultiplier = pair.bodyA.multiplier;
                    balance += bet * slotMultiplier;
                    updateBalanceDisplay();
                    World.remove(engine.world, ball);
                    return;
                }
            }
        });
    } else {
        alert("Not enough balance! Reduce your bet or reset to continue playing.");
    }
}

// Function to update balance display
function updateBalanceDisplay() {
    document.getElementById('balance').innerText = balance.toFixed(2);
}

// Event handling for bet input
document.getElementById('bet').addEventListener('change', function() {
    bet = parseInt(this.value) || 1;
});

// Run the engine
Engine.run(engine);

// Run the renderer
Render.run(render);

// Render multiplier texts
Events.on(render, 'afterRender', function() {
    var context = render.context;
    context.font = '16px Arial';
    context.fillStyle = 'black';
    context.textAlign = 'center';
    for (var i = 0; i < slots.length; i++) {
        var slot = slots[i];
        context.fillText(slot.multiplier + 'x', slot.position.x, slot.position.y + 5);
    }
});

