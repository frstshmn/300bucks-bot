<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>App</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="assets/slots.css">
</head>
<body>
<div class="slot-wrapper">
    <h1>⚣ 300Bucks Slots ⚣</h1>

    <div class="slot-machine">
        <div class="upper-bar"></div>
        <div class="reels">
            <div class="reel" id="reel-1">
                7️⃣
            </div>
            <div class="reel" id="reel-2">
                7️⃣
            </div>
            <div class="reel" id="reel-3">
                7️⃣
            </div>
        </div>
        <div class="lower-bar"></div>
    </div>

    <div class="controls">
        <button id="spin">Spin ⬇️</button>
        <button id="stop" disabled>Stop ⏹️</button>
    </div>

    <div class="balance">
        <h2>Balance: <span id="balance">300</span>⚣</h2>
    </div>

    <div class="bet-choices">
        <div class="bet-choice">
            <input id="bet-1" type="radio" name="bet" value="1">
            <label for="bet-1">1</label>
        </div>
        <div class="bet-choice">
            <input id="bet-5" type="radio" name="bet" value="5">
            <label for="bet-5">5</label>
        </div>
        <div class="bet-choice">
            <input id="bet-10" type="radio" name="bet" value="10" checked>
            <label for="bet-10">10</label>
        </div>
        <div class="bet-choice">
            <input id="bet-20" type="radio" name="bet" value="20">
            <label for="bet-20">20</label>
        </div>
        <div class="bet-choice">
            <input id="bet-50" type="radio" name="bet" value="50">
            <label for="bet-50">50</label>
        </div>
        <div class="bet-choice">
            <input id="bet-100" type="radio" name="bet" value="100">
            <label for="bet-100">100</label>
        </div>
    </div>

    <div class="info">
        <small>
            <p>3 in a row: 10x</p>
            <p>2 in a row: 1.5x</p>
            <p>3 from ♥️,♣️,♦️,♠️: 5x</p>
        </small>
    </div>
</div>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="assets/app.js"></script>
</body>
</html>