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
    <div id="wheel-wrapper">
        <div id="wheel">
            <img src="assets/images/wheel.png" alt="Roulette Wheel">
            <div id="ball"></div>
        </div>
    </div>
    <div id="betting-area">
        <div class="betting-row">
            <div class="betting-cell green" data-number="0">0</div>
        </div>
        <div class="betting-row">
            <div class="betting-cell red" data-number="3">3</div>
            <div class="betting-cell black" data-number="6">6</div>
            <div class="betting-cell red" data-number="9">9</div>
            <div class="betting-cell black" data-number="12">12</div>
            <div class="betting-cell red" data-number="15">15</div>
            <div class="betting-cell black" data-number="18">18</div>
            <div class="betting-cell red" data-number="21">21</div>
            <div class="betting-cell black" data-number="24">24</div>
            <div class="betting-cell red" data-number="27">27</div>
            <div class="betting-cell black" data-number="30">30</div>
            <div class="betting-cell red" data-number="33">33</div>
            <div class="betting-cell black" data-number="36">36</div>
        </div>
        <div class="betting-row">
            <div class="betting-cell black" data-number="2">2</div>
            <div class="betting-cell red" data-number="5">5</div>
            <div class="betting-cell black" data-number="8">8</div>
            <div class="betting-cell red" data-number="11">11</div>
            <div class="betting-cell black" data-number="14">14</div>
            <div class="betting-cell red" data-number="17">17</div>
            <div class="betting-cell black" data-number="20">20</div>
            <div class="betting-cell red" data-number="23">23</div>
            <div class="betting-cell black" data-number="26">26</div>
            <div class="betting-cell red" data-number="29">29</div>
            <div class="betting-cell black" data-number="32">32</div>
            <div class="betting-cell red" data-number="35">35</div>
        </div>
        <div class="betting-row">
            <div class="betting-cell red" data-number="1">1</div>
            <div class="betting-cell black" data-number="4">4</div>
            <div class="betting-cell red" data-number="7">7</div>
            <div class="betting-cell black" data-number="10">10</div>
            <div class="betting-cell red" data-number="13">13</div>
            <div class="betting-cell black" data-number="16">16</div>
            <div class="betting-cell red" data-number="19">19</div>
            <div class="betting-cell black" data-number="22">22</div>
            <div class="betting-cell red" data-number="25">25</div>
            <div class="betting-cell black" data-number="28">28</div>
            <div class="betting-cell red" data-number="31">31</div>
            <div class="betting-cell black" data-number="34">34</div>
        </div>
        <div class="betting-row">
            <div class="betting-cell" data-bet="1to12">1 to 12</div>
            <div class="betting-cell" data-bet="13to24">13 to 24</div>
            <div class="betting-cell" data-bet="25to36">25 to 36</div>
        </div>
        <div class="betting-row">
            <div class="betting-cell" data-bet="1to18">1 to 18</div>
            <div class="betting-cell" data-bet="even">Even</div>
            <div class="betting-cell red" data-bet="red">Red</div>
            <div class="betting-cell black" data-bet="black">Black</div>
            <div class="betting-cell" data-bet="odd">Odd</div>
            <div class="betting-cell" data-bet="19to36">19 to 36</div>
        </div>
        <div id="betting-area">
            <div id="chips">
                <div class="chip" data-value="0.00000001">1</div>
                <div class="chip" data-value="0.00000010">10</div>
                <div class="chip" data-value="0.00000100">100</div>
                <div class="chip" data-value="0.00001000">1K</div>
                <div class="chip" data-value="0.00010000">10K</div>
            </div>
            <div id="total-bet">Total Bet: <span id="total-bet-amount">0</span> $</div>
            <button id="bet-button">Bet</button>
        <div id="result-message"></div>
    </div>
</div>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="assets/roulette.js"></script>
</body>
</html>
