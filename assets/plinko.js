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
        height: 800,
        wireframes: false,
        background: '#1b1b1b'
    }
});

// Create ground
var ground = Bodies.rectangle(400, 790, 800, 20, { isStatic: true, render: { fillStyle: '#1b1b1b' } });

// Create pegs in a triangular layout
var pegs = [];
var rows = 14; // Reduced rows by 1 to remove the top peg
var pegSpacing = 60; // Increased spacing for more room in the grid
var pegOffsetY = 80; // Adjusted Y offset to move the grid down
for (var row = 0; row < rows; row++) {
    for (var col = 0; col <= row; col++) {
        var x = 400 + col * pegSpacing - row * pegSpacing / 2;
        var y = 100 + row * pegSpacing + pegOffsetY;
        var peg = Bodies.circle(x, y, 5, { isStatic: true, render: { fillStyle: '#ffffff' } });
        pegs.push(peg);
    }
}

// Create multiplier slots with controlled probabilities
var multiplierValues = [16, 8, 4, 1, 0.2, 0.2, 0.2, 1, 4, 8, 16];
var slotWidth = 40; // Width of each slot
var slotHeight = 60;
var slotY = 750; // Move the slots to the bottom
var slotSpacing = 20; // Increased spacing between slots
var slots = [];
for (var i = 0; i < multiplierValues.length; i++) {
    var x = 60 + i * (slotWidth + slotSpacing); // Adjusted position to align correctly
    var color;
    if (multiplierValues[i] === 0.2) color = '#00FF00'; // Green for 0.2
    else if (multiplierValues[i] < 1) color = '#FFD700'; // Yellow for less than 1
    else if (multiplierValues[i] < 4) color = '#FF8C00'; // Orange for less than 4
    else color = '#FF0000'; // Red for the rest

    var slot = Bodies.rectangle(x, slotY, slotWidth, slotHeight, {
        isStatic: true,
        render: {
            fillStyle: color
        },
        label: 'slot',
        multiplier: multiplierValues[i]
    });
    slots.push(slot);
}

// Create boundaries
var boundaries = [
    Bodies.rectangle(400, 0, 800, 20, { isStatic: true }), // Top boundary
    Bodies.rectangle(0, 400, 20, 800, { isStatic: true }), // Left boundary
    Bodies.rectangle(800, 400, 20, 800, { isStatic: true }) // Right boundary
];

// Add all bodies to the world
World.add(engine.world, [ground, ...pegs, ...slots, ...boundaries]);

// Balance variable
var balance = 300;
var ballInPlay = false;

// Function to throw the ball
function throwBall() {
    if (ballInPlay) return;

    var bet = parseInt(document.getElementById('bet').value) || 1;
    if (balance >= bet) {
        ballInPlay = true;
        balance -= bet;
        updateBalanceDisplay();

        // Adjust initial position to be random within the center area
        var startX = 400 + Math.random() * 20 - 10;
        var ball = Bodies.circle(startX, 0, 10, {
            restitution: 0.5,
            friction: 0,
            frictionAir: 0.05, // Increased air friction to reduce falling speed
            label: 'ball',
            render: {
                fillStyle: '#ff0000'
            }
        });
        World.add(engine.world, [ball]);

        // Apply a random force to the ball to ensure it doesn't always go to the left
        Matter.Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: Common.random(-0.02, 0.02), y: 0 });
    } else {
        document.getElementById('messageDisplay').innerText = "Not enough balance!";
    }
}

// Function to update balance display
function updateBalanceDisplay() {
    document.getElementById('balanceDisplay').innerText = balance.toFixed(0);
}

// Function to control winning chances
function controlWinningChance(slot) {
    var probability = slot.multiplier === 0.2 ? 0.5 : 0.1; // Higher chance for 0.2x slots
    return Math.random() < probability;
}

// Event handling for ball hitting multiplier slots
Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        if ((pair.bodyA.label === 'ball' && pair.bodyB.label === 'slot') ||
            (pair.bodyA.label === 'slot' && pair.bodyB.label === 'ball')) {
            var slot = pair.bodyA.label === 'slot' ? pair.bodyA : pair.bodyB;
            if (controlWinningChance(slot)) {
                var slotMultiplier = slot.multiplier;
                balance += parseInt(document.getElementById('bet').value) * slotMultiplier;
                updateBalanceDisplay();
            }
            World.remove(engine.world, pair.bodyA.label === 'ball' ? pair.bodyA : pair.bodyB);
            ballInPlay = false;
            return;
        }
    }
});

// Run the engine
Engine.run(engine);

// Run the renderer
Render.run(render);

// Render multiplier texts
Events.on(render, 'afterRender', function() {
    var context = render.context;
    context.font = '24px Arial';
    context.fillStyle = 'black';
    context.textAlign = 'center';

    for (var i = 0; i < slots.length; i++) {
        var slot = slots[i];
        var text = slot.multiplier + 'x';
        var x = slot.position.x;
        var y = slot.position.y + 10;

        context.fillText(text, x, y);
    }
});

