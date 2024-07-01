<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Betting Game</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div class="game-container__dice">
    <h1>Dice Game</h1>
    <div class="slider-container">
        <div class="slider-wrapper">
            <div class="slider-track"></div>
            <input type="range" id="winChanceSlider" min="0" max="100" value="50">
            <div class="result-indicator" id="resultIndicator"><span id="indicatorValue">50</span></div>
        </div>
        <p>Win Chance: <span id="winChance">50</span>%</p>
    </div>
    <p>Multiplier: <span id="multiplier">2.00</span></p>
    <p>Expected Profit: <span id="expectedProfit">0.00</span> BTC</p>
    <p>Balance: <span id="balance">100.00</span> BTC</p>
    <input type="number" id="betAmount" placeholder="Bet Amount" min="0.01" step="0.01">
    <button id="betButton">Bet</button>
    <p id="result"></p>
</div>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="assets/dice.js"></script>
</body>
</html>
