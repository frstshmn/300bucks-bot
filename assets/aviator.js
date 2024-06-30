$(document).ready(function() {
    var gameStarted = false;
    var score = 0;
    var multiplier = 1; // Початковий мультиплікатор
    var cashoutValue = 0; // Вартість cashout

    $('#start-button').click(function() {
        if (!gameStarted) {
            gameStarted = true;
            $(this).hide();
            startGame();
        }
    });

    $('#cashout-button').click(function() {
        if (gameStarted) {
            cashout();
        }
    });

    function startGame() {
        var player = $('#player');
        var obstacle = $('#obstacle');
        var container = $('#game-container');
        var containerWidth = container.width();
        var containerHeight = container.height();

        // Move the obstacle randomly and update score
        var moveInterval = setInterval(function() {
            var obstacleTop = parseInt(obstacle.css('top'));
            if (obstacleTop > containerHeight) {
                obstacleTop = -20; // Reset obstacle to top
                var randomLeft = Math.random() * (containerWidth - 100); // Adjust as needed
                obstacle.css('left', randomLeft);
                score += multiplier; // Змінено: додавання мультиплікатора до очків
                $('#score-value').text(score);
            }
            obstacle.css('top', obstacleTop + 5); // Adjust obstacle speed
        }, 50);

        // Move the player left and right
        $(document).on('keydown', function(e) {
            var playerLeft = parseInt(player.css('left'));
            if (e.keyCode === 37) { // Left arrow key
                player.css('left', playerLeft - 10);
            } else if (e.keyCode === 39) { // Right arrow key
                player.css('left', playerLeft + 10);
            }
        });
    }

    function cashout() {
        // Реалізація функції cashout
        var cashoutAmount = score * multiplier;
        alert('Cashout: ' + cashoutAmount);
        resetGame();
    }

    function resetGame() {
        // Скидання гри до початкових значень
        gameStarted = false;
        score = 0;
        multiplier = 1;
        $('#score-value').text(score);
        $('#start-button').show();
    }
});