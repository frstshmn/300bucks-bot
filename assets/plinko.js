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
        height: 800, // Increased height to accommodate slots at the bottom
        wireframes: false,
        background: '#1b1b1b'
    }
});

// Create ground
var ground = Bodies.rectangle(400, 790, 800, 20, { isStatic: true, render: { fillStyle: '#1b1b1b' } });

// Create pegs in a triangular layout
var pegs = [];
var rows = 13; // Increased to 13 rows
var pegSpacing = 50;
var pegOffsetY = -100; // Raise the peg grid by adjusting the Y offset
for (var row = 1; row < rows; row++) { // Start from row 1 to skip the top peg
    for (var col = 0; col <= row; col++) {
        var x = 400 + col * pegSpacing - row * pegSpacing / 2;
        var y = 100 + row * pegSpacing + pegOffsetY;
        var peg = Bodies.circle(x, y, 5, { isStatic: true, render: { fillStyle: '#ffffff' } });
        pegs.push(peg);
    }
}

// Stake chances (example data)
var stakeChances = {
    '16x': 0.01,
    '8x': 0.05,
    '4x': 0.1,
    '1x': 0.5,
    '0.2x': 0.34
};

// Create multiplier slots
var multiplierValues = ['16x', '8x', '4x', '1x', '0.2x', '0.2x', '0.2x', '1x', '4x', '8x', '16x']; // Use keys for stakeChances
var slotWidth = 60;
var slotHeight = 40;
var slotY = 750; // Move the slots to the bottom
var slots = [];
for (var i = 0; i < multiplierValues.length; i++) {
    var x = 60 + i * (slotWidth + 10); // Adjusted position to align correctly
    var color;
    switch(multiplierValues[i]) {
        case '0.2x': color = '#00FF00'; break; // Green for 0.2
        case '1x': color = '#FFD700'; break; // Yellow for 1
        case '4x': color = '#FF8C00'; break; // Orange for 4
        default: color = '#FF0000'; // Red for the rest
    }

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
var ballInPlay = false; // Flag to check if ball is in play

// Function to throw the ball
function throwBall() {
    if (ballInPlay) return; // Prevent throwing a new ball while one is in play

    var bet = parseInt(document.getElementById('bet').value) || 1;
    if (balance >= bet) {
        ballInPlay = true;
        balance -= bet;
        updateBalanceDisplay();
        // Start the ball slightly above the center
        var startX = 400 + Math.random() * 10 - 5;
        var ball = Bodies.circle(startX, 0, 10, {
            restitution: 0.3, // Lower restitution for less bounce
            friction: 0.005, // Slight friction
            frictionAir: 0.02, // Increase air friction to slow down the ball
            density: 0.001, // Adjust density for slower fall
            label: 'ball',
            render: {
                fillStyle: '#ff0000'
            }
        });
        World.add(engine.world, [ball]);
    } else {
        document.getElementById('messageDisplay').innerText = "Not enough balance!";
    }
}

// Function to update balance display
function updateBalanceDisplay() {
    document.getElementById('balanceDisplay').innerText = balance.toFixed(0);
}

// Function to get multiplier from stake chances
function getMultiplier() {
    var random = Math.random();
    var sum = 0;
    for (var key in stakeChances) {
        sum += stakeChances[key];
        if (random <= sum) return key;
    }
    return '0.2x'; // Fallback in case of rounding errors
}

// Event handling for ball hitting multiplier slots
Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        if ((pair.bodyA.label === 'ball' && pair.bodyB.label === 'slot') ||
            (pair.bodyA.label === 'slot' && pair.bodyB.label === 'ball')) {
            var slotMultiplier = (pair.bodyA.label === 'slot') ? pair.bodyA.multiplier : pair.bodyB.multiplier;
            var realMultiplier = getMultiplier();
            balance += parseInt(document.getElementById('bet').value) * parseFloat(realMultiplier);
            updateBalanceDisplay();
            World.remove(engine.world, pair.bodyA.label === 'ball' ? pair.bodyA : pair.bodyB);
            ballInPlay = false; // Ball is no longer in play
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

    // Draw multiplier texts on the slots
    for (var i = 0; i < slots.length; i++) {
        var slot = slots[i];
        var text = slot.multiplier;
        var x = slot.position.x;
        var y = slot.position.y + 10; // Adjusted position to be on the slots

        context.fillText(text, x, y);
    }
});
