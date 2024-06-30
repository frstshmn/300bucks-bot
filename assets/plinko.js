Telegram.WebApp.ready();

$(document).ready(function() {
    let balance = 300;
    const $dropButton = $('#drop-button');
    const $result = $('#result');
    const $riskLevel = $('#risk-level');
    const $betInput = $('#bet');
    const $balanceDisplay = $('#balance');
    const numBuckets = 5;

    const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Events = Matter.Events;

    const engine = Engine.create();
    const world = engine.world;
    const render = Render.create({
        element: document.getElementById('plinko-board'),
        engine: engine,
        canvas: document.getElementById('canvas'),
        options: {
            width: 600,
            height: 600,
            wireframes: false
        }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    function createPins(numRows) {
        Composite.clear(world);
        const pinRadius = 5;
        const pinSpacing = 40;
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col <= row; col++) {
                const x = 300 + col * pinSpacing - row * pinSpacing / 2;
                const y = 50 + row * pinSpacing;
                const pin = Bodies.circle(x, y, pinRadius, { isStatic: true });
                Composite.add(world, pin);
            }
        }

        for (let i = 0; i < numBuckets; i++) {
            const x = i * 120 + 90;
            const bucket = Bodies.rectangle(x, 550, 100, 10, { isStatic: true });
            Composite.add(world, bucket);
        }
    }

    function calculatePrize(risk, bucketIndex) {
        const lowRiskPrizes = [10, 20, 30, 40, 50];
        const mediumRiskPrizes = [0, 20, 40, 60, 80];
        const highRiskPrizes = [0, 0, 50, 100, 150];

        switch (risk) {
            case 'low':
                return lowRiskPrizes[bucketIndex];
            case 'medium':
                return mediumRiskPrizes[bucketIndex];
            case 'high':
                return highRiskPrizes[bucketIndex];
            default:
                return 0;
        }
    }

    $dropButton.on('click', function() {
        const bet = parseInt($betInput.val());
        if (isNaN(bet) || bet <= 0) {
            alert('Please enter a valid bet amount');
            return;
        }

        if (balance < bet) {
            alert('Not enough balance to place this bet');
            return;
        }

        const risk = $riskLevel.val();
        const numRows = risk === 'low' ? 6 : risk === 'medium' ? 12 : 14;
        createPins(numRows);

        balance -= bet;
        $balanceDisplay.text(balance);

        $result.text('');

        const ball = Bodies.circle(300, 0, 10, { restitution: 0.5 });
        Composite.add(world, ball);

        Events.on(engine, 'collisionStart', function(event) {
            const pairs = event.pairs;
            for (let pair of pairs) {
                if (pair.bodyA === ball || pair.bodyB === ball) {
                    const xPos = Math.round(ball.position.x / 120);
                    const bucketIndex = Math.min(Math.max(xPos, 0), numBuckets - 1);
                    const prize = calculatePrize(risk, bucketIndex);

                    balance += prize;
                    $balanceDisplay.text(balance);
                    $result.text(`You won: ${prize}`);
                    Composite.remove(world, ball);
                }
            }
        });
    });
});

