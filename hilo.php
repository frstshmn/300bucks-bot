<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Game</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div class="hilo__game-container">
    <div class="hilo__card-display">
        <div class="card" id="current-card"></div>
    </div>
    <div class="controls">
        <button id="higher-btn">Higher</button>
        <button id="lower-btn">Lower</button>
    </div>
    <div class="profit-display">
        <div>Profit Higher (1.17x): <span id="profit-higher">0</span></div>
        <div>Profit Lower (4.29x): <span id="profit-lower">0</span></div>
        <div>Total Profit (1.00x): <span id="total-profit">0</span></div>
    </div>
    <div class="balance-display">
        Balance: $<span id="balance">300.00</span>
    </div>
</div>
<script src="assets/hilo.js"></script>
</body>
</html>
