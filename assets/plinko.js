Telegram.WebApp.ready();

$(document).ready(function() {
    let balance = 300;
    const $board = $('#plinko-board');
    const $dropButton = $('#drop-button');
    const $result = $('#result');
    const $riskLevel = $('#risk-level');
    const $betInput = $('#bet');
    const $balanceDisplay = $('#balance');
    const numBuckets = 6;

    function createPins(numRows) {
        $board.find('.pin').remove();
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col <= row; col++) {
                const $pin = $('<div>', { class: 'pin' });
                $pin.css({
                    left: `${50 + col * 50 - row * 25}px`,
                    top: `${50 + row * 50}px`
                });
                $board.append($pin);
            }
        }
    }

    function calculatePrize(risk, bucketIndex) {
        const lowRiskPrizes = [10, 20, 30, 40, 50, 60];
        const mediumRiskPrizes = [0, 20, 40, 60, 80, 100];
        const highRiskPrizes = [0, 0, 50, 100, 150, 200];

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

    function dropBall(numRows) {
        let currentPos = Math.floor(Math.random() * numBuckets);
        for (let i = 0; i < numRows; i++) {
            const direction = Math.random() < 0.5 ? -1 : 1;
            currentPos += direction;
            currentPos = Math.max(0, Math.min(numBuckets - 1, currentPos));
        }

        return currentPos;
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
        const bucketIndex = dropBall(numRows);
        const prize = calculatePrize(risk, bucketIndex);

        balance += prize;
        $balanceDisplay.text(balance);

        $result.text(`You won: ${prize}`);
    });
});
