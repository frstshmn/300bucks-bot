<?php
session_start();
require_once 'config.php';
require_once 'db.php';

if (isset($_SESSION['telegram_id'])) {

    $stmt = $pdo->prepare("SELECT balance, name, photo FROM users WHERE telegram_id = ?");
    $stmt->execute([$_SESSION['telegram_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    $balance = $user['balance'] ?? 300;
    $userName = $user['name'] ?? 'User';
    $userPhoto = $user['photo'] ?? '';
    $isDemo = false;
} else {
    $balance = 5000;
    $userName = 'Demo User';
    $userPhoto = '';
    $isDemo = true;
}
?>

<script>
    const userBalance = <?= json_encode((float)$balance) ?>;
    const checkDemo = <?= json_encode($isDemo) ?>;
</script>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Betting Game</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div class="wrapper-dice">
<div class="game-container__dice">
    <a href="app.php" class="previous">&laquo; Back to all Games</a>
    <h1>Dice Game</h1>
    <div class="bet-buttons">
        <input type="number" id="bet-amount" value="1">
        <button id="betButton" style="margin-top: 2px;">Bet</button>
    </div>

    <div class="slider-container">
        <div class="slider-outer">
        <div class="slider-indicators">
            <div class="content" style="left: 10px;">
                <div class="value">0</div>
                <div class="pin"></div>
            </div>
            <div class="content" style="left: 66px;">
                <div class="value">25</div>
                <div class="pin"></div>
            </div>
            <div class="content" style="left: 50%;">
                <div class="value">50</div>
                <div class="pin"></div>
            </div>
            <div class="content" style="left: 189px;">
                <div class="value">75</div>
                <div class="pin"></div>
            </div>
            <div class="content" style="left: 248px;">
                <div class="value">100</div>
                <div class="pin"></div>
            </div>
        </div>
        <div class="wrap">

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
    </div>
    <div class="controls-dice">
        <p>Win Chance: <span id="winChance">50</span>%</p>
        <p>Multiplier: <span id="multiplier">2.00</span>x</p>
        <p>Expected Profit: <span id="expectedProfit">0.00</span> $</p>
        <p>Balance: <span id="balance">300.00</span> $</p>

    </div>
    <p id="result"></p>
</div>
</div>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="assets/dice.js"></script>
</body>
</html>
