Telegram.WebApp.ready();

$(document).ready(function() {
    const { Engine, Render, World, Bodies, Body, Events } = Matter;

    let engine = Engine.create();
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            wireframes: false
        }
    });

    let balance = 300;
    let betAmount = 10;
    let multiplierRange = {
        low: { min: 0.5, max: 5.6 },
        medium: { min: 0.3, max: 13 },
        high: { min: 0.2, max: 1000 }
    };

    $('#risk-level').change(function() {
        resetGame($(this).val());
    });

    $('#drop-button').click(function() {
        dropBall();
    });

    function resetGame(riskLevel) {
        World.clear(engine.world);
        Engine.clear(engine);
        render.canvas = null;
        render.context = null;
        render.textures = {};

        let numRows = 8;
        switch (riskLevel) {
            case 'medium':
                numRows = 8;
                break;
            case 'high':
                numRows = 16;
                break;
            default:
                break;
        }

        createPlinko(numRows);
        createWallsAndGround();
        Engine.run(engine);
        Render.run(render);
    }

    function createPlinko(numRows) {
        const pegs = [];
        const spacingX = 80;
        const spacingY = 80;
        const startX = 50;
        const startY = 50;

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col <= row % 2; col++) {
                const x = startX + col * spacingX;
                const y = startY + row * spacingY;
                const peg = Bodies.circle(x, y, 10, {
                    isStatic: true,
                    restitution: 1,
                    friction: 0,
                    render: {
                        fillStyle: '#888',
                        strokeStyle: '#444',
                        lineWidth: 1
                    }
                });
                peg.label = 'peg';
                pegs.push(peg);
            }
        }

        World.add(engine.world, pegs);
    }

    function createWallsAndGround() {
        const ground = Bodies.rectangle(400, 600, 800, 40, { isStatic: true });
        const leftWall = Bodies.rectangle(0, 300, 20, 600, { isStatic: true });
        const rightWall = Bodies.rectangle(800, 300, 20, 600, { isStatic: true });

        World.add(engine.world, [ground, leftWall, rightWall]);
    }

    function dropBall() {
        const ball = Bodies.circle(400, 0, 20, { restitution: 1 });
        World.add(engine.world, ball);

        Body.applyForce(ball, ball.position, { x: 0.005 * (Math.random() - 0.5), y: 0.02 });

        ball.label = 'ball';

        Events.on(engine, 'collisionStart', function(event) {
            event.pairs.forEach(pair => {
                const { bodyA, bodyB } = pair;
                if ((bodyA.label === 'ball' && bodyB.label === 'peg') ||
                    (bodyA.label === 'peg' && bodyB.label === 'ball')) {
                    const multiplier = calculateMultiplier(ball.position.x, multiplierRange);
                    const winAmount = betAmount * multiplier;
                    balance += winAmount - betAmount;
                    $('#balance').text(balance);
                    $('#result').text(winAmount > betAmount ? `You won $${winAmount}` : 'Sorry, you lost');
                }
            });
        });
    }

    function calculateMultiplier(x, range) {
        const center = 400; // Center of the canvas
        const maxMultiplier = range.low.max; // Using low risk level max multiplier
        const distanceFromCenter = Math.abs(center - x);
        const normalizedDistance = distanceFromCenter / center;
        const multiplierRange = maxMultiplier - range.low.min;
        return range.low.min + (multiplierRange * (1 - normalizedDistance));
    }

    resetGame('low');
});