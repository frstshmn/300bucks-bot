<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plinko Game</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div id="game-container">
    <div id="plinko-board">
        <canvas id="canvas"></canvas>
    </div>
    <div id="controls">
        <label for="risk-level">Choose Risk Level:</label>
        <select id="risk-level">
            <option value="low">Low (6 rows)</option>
            <option value="medium">Medium (12 rows)</option>
            <option value="high">High (14 rows)</option>
        </select>

        <label for="bet">Choose Bet Amount:</label>
        <input type="number" id="bet" min="1" value="10">

        <button id="drop-button">Drop Ball</button>
    </div>
    <div id="result"></div>
    <div id="balance-container">
        Balance: $<span id="balance">300</span>
    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.17.1/matter.min.js"></script>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>


<script src="assets/plinko.js"></script>
</body>
</html>
