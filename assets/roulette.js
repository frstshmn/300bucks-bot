$(document).ready(function() {
    let totalBet = 0;
    const $totalBetAmount = $('#total-bet-amount');
    let bets = [];

    $('.chip').on('click', function() {
        const value = parseFloat($(this).data('value'));
        totalBet += value;
        $totalBetAmount.text(totalBet.toFixed(8));
    });

    $('#table .cell').on('click', function() {
        const number = $(this).data('number');
        const betType = $(this).data('bet');
        if (number !== undefined) {
            bets.push({ type: 'number', value: number });
        } else if (betType) {
            bets.push({ type: 'bet', value: betType });
        }
        console.log('Bets:', bets);
    });

    $('#bet-button').on('click', function() {
        const wheel = $('#wheel');
        const ball = $('#ball');

        const randomAngle = Math.floor(Math.random() * 360) + 3600; // Spin at least 10 full rotations
        const ballAngle = randomAngle % 360; // Ball position relative to the wheel

        wheel.css('transform', `rotate(${randomAngle}deg)`);
        ball.css('transform', `rotate(${-randomAngle}deg)`); // Ball rotates in the opposite direction

        // Calculate the winning number after the animation
        setTimeout(function() {
            const numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
            const index = Math.floor(ballAngle / (360 / numbers.length));
            const winningNumber = numbers[index];

            $('#result-message').text(`The winning number is ${winningNumber}`);

            // Determine if the player won or lost
            let won = false;
            for (const bet of bets) {
                if (bet.type === 'number' && bet.value === winningNumber) {
                    won = true;
                    break;
                }
                // Add additional checks for other bet types (red/black, odd/even, etc.) here
            }

            if (won) {
                $('#result-message').append('<br>Congratulations, you won!');
            } else {
                $('#result-message').append('<br>Sorry, you lost.');
            }

            // Reset bets
            totalBet = 0;
            bets = [];
            $totalBetAmount.text(totalBet.toFixed(8));

        }, 5000); // Duration of the spin animation
    });
});
