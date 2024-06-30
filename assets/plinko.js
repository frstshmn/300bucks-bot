Telegram.WebApp.ready();
$(document).ready(function() {
    const $board = $('#plinko-board');
    const $dropButton = $('#drop-button');
    const $result = $('#result');
    const $riskLevel = $('#risk-level');

    const pins = [];
    const buckets = [];
    const numRows = 6;
    const numBuckets = 6;

    // Create pins
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col <= row; col++) {
            const $pin = $('<div>', { class: 'pin' });
            $pin.css({
                left: `${50 + col * 50 - row * 25}px`,
                top: `${50 + row * 50}px`
            });
            $board.append($pin);
            pins.push($pin);
        }
    }

    // Create buckets
    for (let i = 0; i < numBuckets; i++) {
        const $bucket = $('<div>', { class: 'bucket', 'data-index': i });
        $bucket.css({ left: `${i * 50}px` });
        $board.append($bucket);
        buckets.push($bucket);
    }

    $dropButton.on('click', function() {
        $result.text('');
        const risk = $riskLevel.val();

        // Simulate ball drop
        let currentPos = Math.floor(Math.random() * numBuckets);
        for (let i = 0; i < numRows; i++) {
            const direction = Math.random() < 0.5 ? -1 : 1;
            currentPos += direction;
            currentPos = Math.max(0, Math.min(numBuckets - 1, currentPos));
        }

        const bucketIndex = currentPos;
        const prize = calculatePrize(risk, bucketIndex);
        $result.text(`You won: ${prize}`);
    });

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
});
