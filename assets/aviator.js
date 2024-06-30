$(document).ready(function() {
    var gameStarted = false;
    var multiplier = 1.00;
    var balance = 300;
    var betAmount = 10; // You can set this dynamically

    $('#start-button').click(function() {
        if (!gameStarted) {
            gameStarted = true;
            $('#cashout-button').prop('disabled', false);
            startGame();
        }
    });

    $('#cashout-button').click(function() {
        if (gameStarted) {
            cashout();
        }
    });

    function startGame() {
        var multiplierInterval = setInterval(function() {
            multiplier += 0.01;
            $('#multiplier-value').text(multiplier.toFixed(2) + 'x');
        }, 100);

        var crashTimeout = setTimeout(function() {
            clearInterval(multiplierInterval);
            gameOver();
        }, Math.random() * 5000 + 2000); // Random crash time between 2-7 seconds
    }

    function cashout() {
        gameStarted = false;
        var winnings = betAmount * multiplier;
        balance += winnings;
        $('#balance-value').text(balance.toFixed(2));
        alert('You cashed out: $' + winnings.toFixed(2));
        resetGame();
    }

    function gameOver() {
        gameStarted = false;
        alert('Game over! Multiplier crashed at ' + multiplier.toFixed(2) + 'x');
        resetGame();
    }

    function resetGame() {
        multiplier = 1.00;
        $('#multiplier-value').text(multiplier.toFixed(2) + 'x');
        $('#cashout-button').prop('disabled', true);
    }
});