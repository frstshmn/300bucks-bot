Telegram.WebApp.ready();

// Matter.js module aliases
const {
    Engine,
    Render,
    World,
    Bodies,
    Events
} = Matter;

// Створення фізичного світу
const engine = Engine.create();

const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: '#1b1b1b',
        pixelRatio: window.devicePixelRatio
    }
});

// Статичний "земля"
const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 10, window.innerWidth, 20, {
    isStatic: true,
    render: { fillStyle: '#222' }
});

// Створення пінів
const pegs = [];
const rows = 10;
const pegSpacing = 40;
for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= row; col++) {
        const x = window.innerWidth / 2 + col * pegSpacing - row * pegSpacing / 2;
        const y = 80 + row * pegSpacing;
        const peg = Bodies.circle(x, y, 5, {
            isStatic: true,
            render: { fillStyle: '#ffffff' }
        });
        pegs.push(peg);
    }
}

// Множники та їх позиції
const multipliers = ['16x', '8x', '4x', '1x', '0.2x', '0.2x', '1x', '4x', '8x', '16x'];
const slotWidth = window.innerWidth / multipliers.length;
const slots = [];

for (let i = 0; i < multipliers.length; i++) {
    const x = i * slotWidth + slotWidth / 2;
    const y = window.innerHeight - 40;

    let color = '#ff0000';
    if (multipliers[i] === '0.2x') color = '#00ff00';
    if (multipliers[i] === '1x') color = '#ffff00';
    if (multipliers[i] === '4x') color = '#ff8c00';
    if (multipliers[i] === '8x') color = '#ff4500';
    if (multipliers[i] === '16x') color = '#ff0000';

    const slot = Bodies.rectangle(x, y, slotWidth - 4, 30, {
        isStatic: true,
        label: 'slot',
        multiplier: multipliers[i],
        render: { fillStyle: color }
    });

    slots.push(slot);
}

// Межі
const walls = [
    Bodies.rectangle(window.innerWidth / 2, -10, window.innerWidth, 20, { isStatic: true }), // верх
    Bodies.rectangle(-10, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true }), // ліво
    Bodies.rectangle(window.innerWidth + 10, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true }) // право
];

// Світ
World.add(engine.world, [ground, ...pegs, ...slots, ...walls]);

let balance = 300;
let ballInPlay = false;

// Шанси
const slotChances = [0.01, 0.03, 0.08, 0.15, 0.20, 0.20, 0.15, 0.08, 0.06, 0.04];

function getRandomSlotIndex() {
    const rnd = Math.random();
    let sum = 0;
    for (let i = 0; i < slotChances.length; i++) {
        sum += slotChances[i];
        if (rnd <= sum) return i;
    }
    return slotChances.length - 1;
}

// Запуск кулі
function throwBall() {
    if (ballInPlay) return;

    const bet = parseInt(document.getElementById('bet').value) || 1;
    if (bet <= 0 || bet > balance) {
        showMessage('Invalid bet');
        return;
    }

    const index = getRandomSlotIndex();
    const targetSlot = slots[index];
    const startX = targetSlot.position.x + (Math.random() * 20 - 10);

    balance -= bet;
    updateBalanceDisplay();
    showMessage('');

    const ball = Bodies.circle(startX, 0, 10, {
        restitution: 0.4,
        frictionAir: 0.02,
        label: 'ball',
        render: { fillStyle: '#ff0000' }
    });

    ball.bet = bet;
    ball.target = targetSlot.multiplier;
    World.add(engine.world, ball);

    ballInPlay = true;
}

// Відображення балансу
function updateBalanceDisplay() {
    document.getElementById('balanceDisplay').innerText = balance.toFixed(0);
}

// Повідомлення
function showMessage(msg) {
    document.getElementById('messageDisplay').innerText = msg;
}

// Колізії
Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs;
    for (let pair of pairs) {
        const ball = pair.bodyA.label === 'ball' ? pair.bodyA : pair.bodyB;
        const slot = pair.bodyA.label === 'slot' ? pair.bodyA : pair.bodyB;

        if (ball.label === 'ball' && slot.label === 'slot') {
            if (slot.multiplier === ball.target) {
                const multiplier = parseFloat(slot.multiplier.replace('x', ''));
                const win = Math.round(ball.bet * multiplier);
                balance += win;
                updateBalanceDisplay();
                showMessage(`You won: ${win}`);
                World.remove(engine.world, ball);
                ballInPlay = false;
            }
        }
    }
});

// Вивід тексту множників
Events.on(render, 'afterRender', function() {
    const ctx = render.context;
    ctx.font = '14px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';

    for (let slot of slots) {
        ctx.fillText(slot.multiplier, slot.position.x, slot.position.y + 5);
    }
});

// Старт
Engine.run(engine);
Render.run(render);
