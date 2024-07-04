<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roulette Game</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div id="roulette-container">
    <div id="roulette-wheel">
        <div id="ball"></div>
        <div class="number" data-number="0" style="transform: rotate(0deg);">0</div>
        <div class="number" data-number="32" style="transform: rotate(9.7297297297deg);">32</div>
        <!-- Add more numbers here with appropriate rotation -->
        <div class="number" data-number="26" style="transform: rotate(350.2702702703deg);">26</div>
    </div>
</div>
<div id="betting-area">
    <div id="numbers-grid">

        <div class="bet" data-number="1">1</div>
        <div class="bet" data-number="2">3</div>
        <div class="bet" data-number="2">2</div>
        <!-- Add more bets here -->
    </div>
    <div id="chips">
        <button class="chip" data-value="1">1</button>
        <button class="chip" data-value="5">5</button>
        <button class="chip" data-value="10">10</button>
        <button class="chip" data-value="50">50</button>
        <button class="chip" data-value="100">100</button>
        <button class="chip" data-value="500">500</button>
    </div>
    <div id="balance">Balance: 1000</div>
    <button id="place-bet">Place Bet</button>
    <div id="result"></div>
</div>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="assets/roulette.js"></script>
</body>
</html>
