<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Betting Game</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>

<div class="blackJack_container">
    <h1>Blackjack Game</h1>
    <div id="balanceDisplay">Balance: $<span id="balance">300.00</span></div>
    <div id="betSection">
        <input type="number" id="betAmount__blackJack" placeholder="Bet Amount">
        <button id="betButton">Bet</button>
    </div>
    <div id="gameSection">
        <div class="hand-container">
            <div id="dealerValue" class="hand-value"></div>
            <div id="dealerHand" class="hand"></div>
        </div>
        <div class="hand-container">
            <div id="playerValue" class="hand-value"></div>
            <div id="playerHand" class="hand"></div>
        </div>
    </div>
    <div id="actionButtons">
        <button id="hitButton">Hit</button>
        <button id="standButton">Stand</button>
    </div>
    <div id="resultDisplay"></div>
</div>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="assets/blackjack.js"></script>
</body>
</html>
