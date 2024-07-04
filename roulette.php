<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roulette Game</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div id="roulette">
    <div id="wheel">
        <div id="ball"></div>
    </div>
    <div id="betting-area">
        <table>
            <!-- Numbers 0 - 36 -->
            <tr>
                <td class="number" data-number="0">0</td>
                <td class="number" data-number="1">1</td>
                <td class="number" data-number="2">2</td>
                <!-- Add more numbers as needed -->
            </tr>
            <!-- Add more rows as needed -->
        </table>
    </div>
    <div id="controls">
        <input type="number" id="bet-amount" placeholder="Bet Amount">
        <button id="place-bet">Place Bet</button>
    </div>
    <div id="results">
        <p id="result"></p>
        <p>Balance: <span id="balance">1000</span></p>
    </div>
</div>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="assets/roulette.js"></script>
</body>
</html>
