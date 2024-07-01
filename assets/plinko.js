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
var rows = 13;
var pegSpacing = 50;
var pegOffsetY = -100;
for (var row = 1; row < rows; row++) {
    for (var col = 0; col <= row; col++) {
        var x = 400 + col * pegSpacing - row * pegSpacing / 2;
        var y = 100 + row * pegSpacing + pegOffsetY;
        var peg = Bodies.circle(x, y, 5, { isStatic: true, render: { fillStyle: '#ffffff' } });
        pegs.push(peg);
    }
}

// Create multiplier slots with controlled probabilities
var multiplierValues = [16, 8, 4, 1, 0.2, 0.2, 0.2, 1, 4, 8, 16];
var probabilities = [0.0009, 0.0045, 0.009, 0.09, 0.09, 0.09, 0.009, 0.0045, 0.0009];
var slotWidth = 40;
var slotHeight = 60;
var slotY = 750;
var slots = [];
for (var i = 0; i < multiplierValues.length; i++) {
    var x = 200 + i * (slotWidth + 10); // Adjusted position to align correctly
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
        multiplier: multiplierValues[i],
        probability: probabilities[i]
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

        // Adjust initial position and apply force to influence the path
        var startX = 400;
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

        // Apply force to influence the path towards higher probability slots
        Matter.Body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: Common.random(-0.03, 0.03), y: 0 });
    } else {
        document.getElementById('messageDisplay').innerText = "Not enough balance!";
    }
}

// Function to update balance display
function updateBalanceDisplay() {
    document.getElementById('balanceDisplay').innerText = balance.toFixed(0);
}

// Event handling for ball hitting multiplier slots
Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        if ((pair.bodyA.label === 'ball' && pair.bodyB.label === 'slot') ||
            (pair.bodyA.label === 'slot' && pair.bodyB.label === 'ball')) {
            var slotMultiplier = (pair.bodyA.label === 'slot') ? pair.bodyA.multiplier : pair.bodyB.multiplier;
            balance += parseInt(document.getElementById('bet').value) * slotMultiplier;
            updateBalanceDisplay();
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
