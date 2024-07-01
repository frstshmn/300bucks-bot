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
        <div class="wrap">
            <div class="slider-indicators">
                <div class="content" style="left: 0%;">
                    <div class="line"></div>
                    <div class="value">0</div>
                </div>
                <div class="content" style="left: 25%;">
                    <div class="line"></div>
                    <div class="value">25</div>
                </div>
                <div class="content" style="left: 50%;">
                    <div class="line"></div>
                    <div class="value">50</div>
                </div>
                <div class="content" style="left: 75%;">
                    <div class="line"></div>
                    <div class="value">75</div>
                </div>
                <div class="content" style="left: 100%;">
                    <div class="line"></div>
                    <div class="value">100</div>
                </div>
            </div>
            <div class="range">
                <div class="lower" style="width: 50%;"></div>
                <div class="higher" style="width: 50%;"></div>
            </div>
            <input min="2" max="98" type="range" id="winChanceSlider" class="classic-slider" value="50">
            <div class="result-indicator" id="resultIndicator">
                <span id="indicatorValue"></span>
            </div>
        </div>
    </div>
    <p>Win Chance: <span id="winChance">50</span>%</p>
    <p>Multiplier: <span id="multiplier">2.00</span></p>
    <p>Expected Profit: <span id="expectedProfit">0.00</span> $</p>
    <p>Balance: <span id="balance">300.00</span> $</p>
    <input type="number" id="betAmount" value="1">
    <button id="betButton">Bet</button>
    <p id="result"></p>
</div>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="assets/dice.js"></script>
</body>
</html>
