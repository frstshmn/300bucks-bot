Telegram.WebApp.ready();

$(document).ready(function() {
    let engine = Matter.Engine.create();
    let world = engine.world;
    let particles = [];
    let balance = 300;
    let rows = 6; // Default number of rows
    const canvas = $('#canvas')[0];
    const context = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;

    $('#risk-level').change(function() {
        switch ($(this).val()) {
            case 'low':
                rows = 6;
                break;
            case 'medium':
                rows = 12;
                break;
            case 'high':
                rows = 14;
                break;
        }
        setupBoard();
    });

    $('#drop-button').click(function() {
        let bet = parseInt($('#bet').val());
        if (bet > balance) {
            alert("Insufficient balance!");
            return;
        }

        let x = Math.random() * canvas.width;
        let particle = new Particle(x, 0, 10);
        particles.push(particle);

        setTimeout(() => {
            checkOutcome(particle, bet);
        }, 2000); // Wait for particle to settle
    });

    function setupBoard() {
        // Clear and set up new pegs based on the selected rows
        // Implementation depends on game setup
    }

    function checkOutcome(particle, bet) {
        const x = particle.body.position.x;
        let rewardMultiplier = calculateReward(x);
        let reward = bet * rewardMultiplier;
        balance += reward - bet;
        $('#balance').text(balance);
        $('#result').text(reward > bet ? `You won $${reward - bet}!` : `You lost $${bet - reward}!`);

        Matter.World.remove(world, particle.body);
        particles.splice(particles.indexOf(particle), 1);
    }

    function calculateReward(x) {
        if (x < canvas.width * 0.25) {
            return 2; // 2x reward
        } else if (x < canvas.width * 0.75) {
            return 1; // no reward
        } else {
            return 3; // 3x reward
        }
    }

    function Particle(x, y, r) {
        this.hue = Math.random() * 360;
        var options = {
            restitution: 0.5,
            friction: 0,
            density: 1
        };
        x += Math.random() * 2 - 1;
        this.body = Matter.Bodies.circle(x, y, r, options);
        this.body.label = "particle";
        this.r = r;
        Matter.World.add(world, this.body);
    }

    Particle.prototype.show = function() {
        context.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        context.beginPath();
        const pos = this.body.position;
        context.arc(pos.x, pos.y, this.r, 0, Math.PI * 2);
        context.fill();
    };

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        Matter.Engine.update(engine);
        particles.forEach(particle => particle.show());
        requestAnimationFrame(render);
    }

    render();
});