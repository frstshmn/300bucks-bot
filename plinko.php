<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plinko Game</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<a href="app.php" class="previous">&laquo; Back to all Games</a>

<canvas id="plinkoCanvas"></canvas>



<div class="navbar">
    <label for="balance">Balance:</label>
    <span id="balanceDisplay">300</span>
    <div class="amount">
        <label for="bet">Bet Amount: </label>
        <input type="number" id="bet" min="1" value="100">
    </div>

    <button class="plinko-btn" onclick="throwBall()">Throw Ball</button>


    <div id="messageDisplay"></div>

</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.17.1/matter.min.js"></script>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

<script src="assets/plinko.js"></script>
</body>
</html>
