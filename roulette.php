<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roulette Game</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div id="roulette-container">
    <div id="roulette-wheel">
        <div id="ball"></div>
        <!-- Roulette numbers will be added here via JavaScript -->
    </div>
</div>
<div id="betting-area">
    <div id="numbers-grid">
        <div class="number red">3</div>
        <div class="number black">6</div>
        <div class="number red">9</div>
        <div class="number red">12</div>
        <div class="number black">15</div>
        <div class="number red">18</div>
        <div class="number red">21</div>
        <div class="number black">24</div>
        <div class="number red">27</div>
        <div class="number red">30</div>
        <div class="number black">33</div>
        <div class="number red">36</div>

        <div class="number black">2</div>
        <div class="number red">5</div>
        <div class="number black">8</div>
        <div class="number black">11</div>
        <div class="number red">14</div>
        <div class="number black">17</div>
        <div class="number black">20</div>
        <div class="number red">23</div>
        <div class="number black">26</div>
        <div class="number black">29</div>
        <div class="number red">32</div>
        <div class="number black">35</div>

        <div class="number red">1</div>
        <div class="number black">4</div>
        <div class="number red">7</div>
        <div class="number black">10</div>
        <div class="number black">13</div>
        <div class="number red">16</div>
        <div class="number red">19</div>
        <div class="number black">22</div>
        <div class="number red">25</div>
        <div class="number black">28</div>
        <div class="number black">31</div>
        <div class="number red">34</div>

        <div class="number zero">0</div>

        <div class="bet">1 to 12</div>
        <div class="bet">13 to 24</div>
        <div class="bet">25 to 36</div>
        <div class="bet">1 to 18</div>
        <div class="bet">Even</div>
        <div class="bet red">Red</div>
        <div class="bet black">Odd</div>
        <div class="bet">19 to 36</div>
        <div class="bet">2:1</div>
        <div class="bet">2:1</div>
        <div class="bet">2:1</div>
    </div>
    <div id="chips">
        <button class="chip" data-value="1">1</button>
        <button class="chip" data-value="5">5</button>
        <button class="chip" data-value="10">10</button>
        <button class="chip" data-value="50">50</button>
        <button class="chip" data-value="100">100</button>
        <button class="chip" data-value="500">500</button>
    </div>
    <div id="balance">Balance: 1000</div>
    <button id="place-bet">Place Bet</button>
    <div id="result"></div>
</div>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="assets/roulette.js"></script>
</body>
</html>
