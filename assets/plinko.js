Telegram.WebApp.ready();

$(document).ready(function() {
    const { Engine, Render, World, Bodies, Body } = Matter;

    // Matter.js engine
    const engine = Engine.create();

    // Matter.js renderer
    const render = Render.create({
        element: document.getElementById('canvas'),
        engine: engine,
        options: {
            width: 800,
            height: 600,
            wireframes: false  // Turn off wireframes for better visibility
        }
    });

    // Constants and variables
    let balance = 300;
    let betAmount = 10;
    let payoutMultiplier = {
        low: { min: 0.5, max: 5.6 },
        medium: { min: 0.3, max: 13 },
        high: { min: 0.2, max: 1000 }
    };

    // Dropdown change event
    $('#risk-level').change(function() {
        const riskLevel = $(this).val();
        let numRows = 8; // Default rows
        let multiplierRange = payoutMultiplier.low; // Default multiplier range

        switch (riskLevel) {
            case 'medium':
                multiplierRange = payoutMultiplier.medium;
                break;
            case 'high':
                numRows = 16;
                multiplierRange = payoutMultiplier.high;
                break;
            default:
                break;
        }

        resetGame(numRows, multiplierRange);
    });

    // Button click event
    $('#drop-button').click(function() {
        dropBall();
    });

    // Function to reset the game based on row count and multiplier range
    function resetGame(numRows, multiplierRange) {
        // Reset Matter.js world
        World.clear(engine.world);
        Engine.clear(engine);
        render.canvas.remove();
        render.canvas = null;
        render.context = null;
        render.textures = {};
        engine.world.gravity.y = 1;

        // Recreate Matter.js objects
        const flanges = createFlanges(numRows);
        const catches = createCatches();
        const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        World.add(engine.world, [ground, ...flanges, ...catches]);

        // Re-run the engine and renderer
        Engine.run(engine);
        Render.run(render);
    }

    // Function to create flanges based on number of rows
    function createFlanges(numRows) {
        const flanges = [];
        const flangeOptions = {
            isStatic: true
        };
        let xStart = 45;
        const yStart = 150;
        const spacing = 50;

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < 4; col++) {
                const x = xStart + col * spacing;
                const y = yStart + row * 100;
                const multiplier = calculateMultiplier(x, 800, multiplierRange.min, multiplierRange.max);
                flanges.push({ body: Bodies.polygon(x, y, 3, 20, flangeOptions), multiplier: multiplier });
            }
        }
        return flanges;
    }

    // Function to create catches
    function createCatches() {
        const catches = [];
        const catchOptions = {
            isStatic: true
        };
        let xStart = 82;
        const spacing = 45;

        for (let i = 0; i < 20; i++) {
            catches.push(Bodies.rectangle(xStart + i * spacing, 560, 2, 40, catchOptions));
        }
        return catches;
    }

    // Function to calculate multiplier based on ball position
    function calculateMultiplier(x, width, minMultiplier, maxMultiplier) {
        const center = width / 2;
        const distanceFromCenter = Math.abs(center - x);
        const normalizedDistance = distanceFromCenter / (width / 2);
        const multiplierRange = maxMultiplier - minMultiplier;
        return parseFloat((minMultiplier + multiplierRange * normalizedDistance).toFixed(2));
    }

    // Function to drop the ball
    function dropBall() {
        const ballOptions = {
            friction: 0.2,
            restitution: 1
        };
        const ball = Bodies.circle(400, 0, 20, ballOptions);
        World.add(engine.world, ball);

        // Apply initial force to the ball
        Body.applyForce(ball, ball.position, { x: Math.random() * 0.002 - 0.001, y: 0.02 });

        // Find the corresponding flange for the ball's initial position
        const initialX = ball.position.x;
        const flange = findFlangeByPosition(initialX);

        // Determine multiplier and win amount
        const multiplier = flange ? flange.multiplier : 1;
        const winAmount = betAmount * multiplier;

        // Update balance and display results
        balance += winAmount - betAmount;
        $('#balance').text(balance);
        $('#result').text(winAmount > betAmount ? `You won $${winAmount}` : 'Sorry, you lost');
    }

    // Function to find the corresponding flange by position
    function findFlangeByPosition(x) {
        const flanges = engine.world.bodies.filter(body => body.label === 'flange');
        return flanges.find(flange => {
            const bounds = flange.bounds;
            return x >= bounds.min.x && x <= bounds.max.x;
        });
    }

    // Initialize the game with default settings
    resetGame(6, payoutMultiplier.low);
});