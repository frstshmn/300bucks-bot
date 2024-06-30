Telegram.WebApp.ready();


$(document).ready(function() {
    var gameStarted = false;
    var multiplier = 1.00;
    var balance = 300;
    var betAmount = 10;

    $('#start-button').click(function() {
        if (!gameStarted) {
            gameStarted = true;
            $('#cashout-button').prop('disabled', false);
            betAmount = parseFloat($('#bet-amount').val());
            if (betAmount > balance || betAmount <= 0) {
                $('#round-info').text('Invalid bet amount.');
                resetGame();
                return;
            }
            balance -= betAmount;
            $('#balance-value').text(balance.toFixed(2));
            $('#round-info').text('');
            startGame();
        }
    });

    $('#cashout-button').click(function() {
        if (gameStarted) {
            cashout();
        }
    });

    function startGame() {
        var airplane = $('#airplane-placeholder');
        var trail = $('#trail');
        var multiplierInterval = setInterval(function() {
            multiplier += 0.01;
            $('#multiplier-value').text(multiplier.toFixed(2) + 'x');
            var x = multiplier * 10;
            var y = -multiplier * 5;
            airplane.css('transform', 'translate(' + x + 'px, ' + y + 'px)');
            trail.css('width', x + 'px');
        }, 100);

        var crashTimeout = setTimeout(function() {
            clearInterval(multiplierInterval);
            if (gameStarted) gameOver();
        }, Math.random() * 5000 + 2000); // Random crash time between 2-7 seconds
    }

    function cashout() {
        gameStarted = false;
        var winnings = betAmount * multiplier;
        balance += winnings;
        $('#balance-value').text(balance.toFixed(2));
        $('#round-info').text('You cashed out: $' + winnings.toFixed(2));
        resetGame();
    }

    function gameOver() {
        gameStarted = false;
        $('#round-info').text('Game over! Multiplier crashed at ' + multiplier.toFixed(2) + 'x.');
        resetGame();
    }

    function resetGame() {
        multiplier = 1.00;
        $('#multiplier-value').text(multiplier.toFixed(2) + 'x');
        $('#cashout-button').prop('disabled', true);
        $('#airplane-placeholder').css('transform', 'translate(0, 0)');
        $('#trail').css('width', '0');
    }
});