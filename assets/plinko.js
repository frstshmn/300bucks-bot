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
    element: document.getElementById('plinkoCanvas'),
    engine: engine,
    options: {
        width: 800,
        height: 700,
        wireframes: false,
        background: '#1b1b1b'
    }
});

// Create ground
var ground = Bodies.rectangle(400, 690, 800, 20, { isStatic: true, render: { fillStyle: '#1b1b1b' } });

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

// Create multiplier slots
var multiplierValues = [16, 8, 4, 1, 0.2, 0.2, 0.2, 1, 4, 8, 16];
var slotWidth = 60;
var slotHeight = 40;
var slotY = 550;
var slots = [];
for (var i = 0; i < multiplierValues.length; i++) {
    var x = i * (slotWidth + 10) + 45;
    var color;
    if (multiplierValues[i] === 0.2) color = '#00FF00';
    else if (multiplierValues[i] < 1) color = '#FFD700';
    else if (multiplierValues[i] < 4) color = '#FF8C00';
    else color = '#FF0000';

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
    Bodies.rectangle(400, 0, 800, 20, { isStatic: true }),
    Bodies.rectangle(0, 350, 20, 700, { isStatic: true }),
    Bodies.rectangle(800, 350, 20, 700, { isStatic: true })
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
