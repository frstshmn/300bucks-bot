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
    element: document.getElementById('plinkoCanvas'),
    engine: engine,
    options: {
        wireframes: false,
        background: '#1b1b1b'
    }
});

// Create ground
var ground = Bodies.rectangle(400, 690, 800, 20, { isStatic: true, render: { fillStyle: '#1b1b1b' } });

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

// Create multiplier slots
var multiplierValues = [16, 8, 4, 1, 0.2, 0.2, 0.2, 1, 4, 8, 16]; // Sample multipliers for demonstration
var slotWidth = 60;
var slotHeight = 40;
var slotY = 550; // Move the slots further down
var slots = [];
for (var i = 0; i < multiplierValues.length; i++) {
    var x = i * (slotWidth + 10) + 45;
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
    Bodies.rectangle(0, 350, 20, 700, { isStatic: true }), // Left boundary
    Bodies.rectangle(800, 350, 20, 700, { isStatic: true }) // Right boundary
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
        // Start the ball slightly above the center
        var startX = 400 + Math.random() * 10 - 5;
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
        document.getElementById('messageDisplay').innerText = "Not enough balance!";
        document.getElementById('throwBallBtn').classList.add('disabled');
    }
}

// Function to update balance display
function updateBalanceDisplay() {
    document.getElementById('balanceDisplay').innerText = balance.toFixed(2);
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
    context.font = '24px Arial';
    context.fillStyle = 'black';
    context.textAlign = 'center';

    // Render slots and multiplier texts
    for (var i = 0; i < slots.length; i++) {
        var slot = slots[i];
        var x = slot.position.x;
        var y = slotY; // Adjusted position for slots

        context.fillStyle = slot.render.fillStyle;
        context.fillRect(x - slotWidth / 2, y - slotHeight / 2, slotWidth, slotHeight);

        // Render multiplier text
        var text = slot.multiplier + 'x';
        context.fillStyle = 'black';
        context.fillText(text, x, y + slotHeight / 2 + 20); // Adjusted position for text
    }
});
