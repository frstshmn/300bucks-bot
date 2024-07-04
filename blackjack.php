<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Betting Game</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div id="roulette">
    <div id="wheel-container">
        <div id="wheel">
            <div id="ball"></div>
        </div>
    </div>
    <div id="betting-area">
        <table>
            <!-- Row 1 -->
            <tr>
                <td class="number" data-number="3">3</td>
                <td class="number" data-number="6">6</td>
                <td class="number" data-number="9">9</td>
                <td class="number" data-number="12">12</td>
                <td class="number" data-number="15">15</td>
                <td class="number" data-number="18">18</td>
                <td class="number" data-number="21">21</td>
                <td class="number" data-number="24">24</td>
                <td class="number" data-number="27">27</td>
                <td class="number" data-number="30">30</td>
                <td class="number" data-number="33">33</td>
                <td class="number" data-number="36">36</td>
                <td class="bet-column" rowspan="3" data-bet="2to1">2:1</td>
            </tr>
            <!-- Row 2 -->
            <tr>
                <td class="number" data-number="2">2</td>
                <td class="number" data-number="5">5</td>
                <td class="number" data-number="8">8</td>
                <td class="number" data-number="11">11</td>
                <td class="number" data-number="14">14</td>
                <td class="number" data-number="17">17</td>
                <td class="number" data-number="20">20</td>
                <td class="number" data-number="23">23</td>
                <td class="number" data-number="26">26</td>
                <td class="number" data-number="29">29</td>
                <td class="number" data-number="32">32</td>
                <td class="number" data-number="35">35</td>
            </tr>
            <!-- Row 3 -->
            <tr>
                <td class="number" data-number="1">1</td>
                <td class="number" data-number="4">4</td>
                <td class="number" data-number="7">7</td>
                <td class="number" data-number="10">10</td>
                <td class="number" data-number="13">13</td>
                <td class="number" data-number="16">16</td>
                <td class="number" data-number="19">19</td>
                <td class="number" data-number="22">22</td>
                <td class="number" data-number="25">25</td>
                <td class="number" data-number="28">28</td>
                <td class="number" data-number="31">31</td>
                <td class="number" data-number="34">34</td>
            </tr>
            <!-- Additional Betting Options -->
            <tr>
                <td colspan="4" class="bet-row" data-bet="1to12">1 to 12</td>
                <td colspan="4" class="bet-row" data-bet="13to24">13 to 24</td>
                <td colspan="4" class="bet-row" data-bet="25to36">25 to 36</td>
                <td class="bet-column" rowspan="3" data-bet="2to1">2:1</td>
            </tr>
            <tr>
                <td colspan="2" class="bet-row" data-bet="1to18">1 to 18</td>
                <td colspan="2" class="bet-row" data-bet="even">Even</td>
                <td colspan="4" class="bet-row" data-bet="red">Red</td>
                <td colspan="2" class="bet-row" data-bet="odd">Odd</td>
                <td colspan="2" class="bet-row" data-bet="19to36">19 to 36</td>
            </tr>
            <tr>
                <td colspan="12" class="number" data-number="0">0</td>
            </tr>
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
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="assets/blackjack.js"></script>
</body>
</html>
