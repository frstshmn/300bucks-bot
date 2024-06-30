<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aviator Game</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div id="game-container__aviator">

        <div id="multiplier">Multiplier: <span id="multiplier-value">1.00x</span></div>
        <div id="airplane-placeholder">✈️</div>
        <button id="start-button">Start</button>
        <button id="cashout-button" disabled>Cashout</button>
        <div id="balance">Balance: $<span id="balance-value">300</span></div>

</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="assets/aviator.js"></script>
</body>
</html>