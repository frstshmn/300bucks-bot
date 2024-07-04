<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roulette Game</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div class="roulette-container">
    <div class="roulette-wheel" id="rouletteWheel">
        <div class="ball" id="ball"></div>
    </div>
</div>
<div class="bets-container">
    <div class="bet-grid">
        <div class="bet" data-number="0" style="background-color: green;">0</div>
        <div class="bet" data-number="32" style="background-color: black;">32</div>
        <div class="bet" data-number="15" style="background-color: red;">15</div>
        <div class="bet" data-number="19" style="background-color: black;">19</div>
        <div class="bet" data-number="4" style="background-color: red;">4</div>
        <div class="bet" data-number="21" style="background-color: black;">21</div>
        <div class="bet" data-number="2" style="background-color: red;">2</div>
        <div class="bet" data-number="25" style="background-color: black;">25</div>
        <div class="bet" data-number="17" style="background-color: red;">17</div>
        <div class="bet" data-number="34" style="background-color: black;">34</div>
        <div class="bet" data-number="6" style="background-color: red;">6</div>
        <div class="bet" data-number="27" style="background-color: black;">27</div>
        <div class="bet" data-number="13" style="background-color: red;">13</div>
        <div class="bet" data-number="36" style="background-color: black;">36</div>
        <div class="bet" data-number="11" style="background-color: red;">11</div>
        <div class="bet" data-number="30" style="background-color: black;">30</div>
        <div class="bet" data-number="8" style="background-color: red;">8</div>
        <div class="bet" data-number="23" style="background-color: black;">23</div>
        <div class="bet" data-number="10" style="background-color: red;">10</div>
        <div class="bet" data-number="5" style="background-color: black;">5</div>
        <div class="bet" data-number="24" style="background-color: red;">24</div>
        <div class="bet" data-number="16" style="background-color: black;">16</div>
        <div class="bet" data-number="33" style="background-color: red;">33</div>
        <div class="bet" data-number="1" style="background-color: black;">1</div>
        <div class="bet" data-number="20" style="background-color: red;">20</div>
        <div class="bet" data-number="14" style="background-color: black;">14</div>
        <div class="bet" data-number="31" style="background-color: red;">31</div>
        <div class="bet" data-number="9" style="background-color: black;">9</div>
        <div class="bet" data-number="22" style="background-color: red;">22</div>
        <div class="bet" data-number="18" style="background-color: black;">18</div>
        <div class="bet" data-number="29" style="background-color: red;">29</div>
        <div class="bet" data-number="7" style="background-color: black;">7</div>
        <div class="bet" data-number="28" style="background-color: red;">28</div>
        <div class="bet" data-number="12" style="background-color: black;">12</div>
        <div class="bet" data-number="35" style="background-color: red;">35</div>
        <div class="bet" data-number="3" style="background-color: black;">3</div>
        <div class="bet" data-number="26" style="background-color: red;">26</div>
    </div>
    <div class="bet-options">
        <div class="chip" data-value="1">1</div>
        <div class="chip" data-value="5">5</div>
        <div class="chip" data-value="10">10</div>
        <div class="chip" data-value="50">50</div>
        <div class="chip" data-value="100">100</div>
        <div class="chip" data-value="500">500</div>
    </div>
    <div>
        <button id="placeBetButton">Place Bet</button>
    </div>
    <div id="resultDisplay">Balance: <span id="balance">1000</span></div>
</div>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="assets/roulette.js"></script>
</body>
</html>
