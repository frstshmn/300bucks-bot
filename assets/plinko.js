Telegram.WebApp.ready();

$(document).ready(function() {
    let engine = Matter.Engine.create();
    let world = engine.world;
    let particles = [];
    let balance = 300;
    let rows = 6; // Default number of rows

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

        let x = Math.random() * $('#canvas').width(); // Random x position
        let particle = new Particle(x, 0, 10);
        particles.push(particle);
        Matter.Engine.update(engine);

        setTimeout(() => {
            checkOutcome(particle, bet);
        }, 2000); // Wait for particle to settle
    });

    function setupBoard() {
        // Clear existing pegs and setup new pegs based on the selected rows
        // This function would need implementation depending on your game setup
    }

    function checkOutcome(particle, bet) {
        const x = particle.body.position.x;
        let rewardMultiplier = calculateReward(x);
        let reward = bet * rewardMultiplier;
        balance += reward - bet;
        $('#balance').text(balance);
        $('#result').text(reward > bet ? `You won $${reward - bet}!` : `You lost $${bet - reward}!`);

        // Remove the particle from the world and array
        Matter.World.remove(world, particle.body);
        particles.splice(particles.indexOf(particle), 1);
    }

    function calculateReward(x) {
        // Define reward zones based on x position
        if (x < $('#canvas').width() * 0.25) {
            return 2; // 2x reward
        } else if (x < $('#canvas').width() * 0.75) {
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
        fill(this.hue, 255, 255);
        noStroke();
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        ellipse(0, 0, this.r * 2);
        pop();
    };

    Particle.prototype.isOffScreen = function() {
        var x = this.body.position.x;
        var y = this.body.position.y;
        return (x < -50 || x > $('#canvas').width() + 50 || y > $('#canvas').height());
    };
});