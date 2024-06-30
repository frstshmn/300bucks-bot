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
            height: 600
        }
    });

    // Constants and variables
    let balance = 300;
    let betAmount = 10;

    // Dropdown change event
    $('#risk-level').change(function() {
        const riskLevel = $(this).val();
        let numRows = 6; // Default low risk
        switch (riskLevel) {
            case 'medium':
                numRows = 12;
                break;
            case 'high':
                numRows = 14;
                break;
            default:
                numRows = 6;
                break;
        }
        resetGame(numRows);
    });

    // Button click event
    $('#drop-button').click(function() {
        dropBall();
    });

    // Function to reset the game based on row count
    function resetGame(numRows) {
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
                flanges.push(Bodies.polygon(xStart + col * spacing, yStart + row * 100, 3, 20, flangeOptions));
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

        // Simulate win/loss based on random chance
        const winChance = Math.random();
        let winAmount = 0;
        if (winChance < 0.1) {
            winAmount = betAmount * 5; // 10% chance to win 5 times the bet
        } else if (winChance < 0.3) {
            winAmount = betAmount * 2; // 20% chance to win 2 times the bet
        }

        // Update balance and display results
        balance += winAmount - betAmount;
        $('#balance').text(balance);
        $('#result').text(winAmount > 0 ? `You won $${winAmount}` : 'Sorry, you lost');
    }

    // Initialize the game with default settings
    resetGame(6);
});
