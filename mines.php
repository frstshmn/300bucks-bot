<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>App</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/mines.css">
</head>
<body>

<a href="app.php" class="previous">&laquo; Back to all Games</a>

<div class="navbar">
    <div class="amount">
        <label for="bet">Bet Amount: </label>
        <input type="number" id="bet" min="1" value="100">
    </div>

    <div>
        <label for="mines">Number of Mines: </label>
        <input type="number" id="mines" min="1" max="24" value="10">
    </div>

    <div class="nav-buttons">
        <button id="start">Start Game</button>
        <button id="cashout" style="display: none;">Cash Out</button>
        <button id="restart" style="display: none;">Restart Game</button>
    </div>
</div>

<div style="text-align: center; margin-top: 10px;">
    <p id="balance">Balance: 300</p>
</div>

<div class="grid">
    <div class="tile hidden" data-row="A" data-col="1"></div>
    <div class="tile hidden" data-row="A" data-col="2"></div>
    <div class="tile hidden" data-row="A" data-col="3"></div>
    <div class="tile hidden" data-row="A" data-col="4"></div>
    <div class="tile hidden" data-row="A" data-col="5"></div>
    <div class="tile hidden" data-row="B" data-col="1"></div>
    <div class="tile hidden" data-row="B" data-col="2"></div>
    <div class="tile hidden" data-row="B" data-col="3"></div>
    <div class="tile hidden" data-row="B" data-col="4"></div>
    <div class="tile hidden" data-row="B" data-col="5"></div>
    <div class="tile hidden" data-row="C" data-col="1"></div>
    <div class="tile hidden" data-row="C" data-col="2"></div>
    <div class="tile hidden" data-row="C" data-col="3"></div>
    <div class="tile hidden" data-row="C" data-col="4"></div>
    <div class="tile hidden" data-row="C" data-col="5"></div>
    <div class="tile hidden" data-row="D" data-col="1"></div>
    <div class="tile hidden" data-row="D" data-col="2"></div>
    <div class="tile hidden" data-row="D" data-col="3"></div>
    <div class="tile hidden" data-row="D" data-col="4"></div>
    <div class="tile hidden" data-row="D" data-col="5"></div>
    <div class="tile hidden" data-row="E" data-col="1"></div>
    <div class="tile hidden" data-row="E" data-col="2"></div>
    <div class="tile hidden" data-row="E" data-col="3"></div>
    <div class="tile hidden" data-row="E" data-col="4"></div>
    <div class="tile hidden" data-row="E" data-col="5"></div>
</div>

<p id="result" style="text-align: center;"></p>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="assets/mine.js"></script>
</body>
</html>
