$(document).ready(function() {
    let totalBet = 0;
    const $totalBetAmount = $('#total-bet-amount');

    $('.chip').on('click', function() {
        const value = parseFloat($(this).data('value'));
        totalBet += value;
        $totalBetAmount.text(totalBet.toFixed(8));
    });

    $('#table .cell').on('click', function() {
        // Betting logic
        const number = $(this).data('number');
        console.log('Bet on number:', number);
    });

    $('#bet-button').on('click', function() {
        // Betting action
        alert('Bet placed: ' + totalBet.toFixed(8) + ' BTC');
        totalBet = 0;
        $totalBetAmount.text(totalBet.toFixed(8));
    });
});
