<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>App</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="assets/mines.css">
</head>
<body>
<div class="slot-wrapper">
    <h1>⚣ 300Bucks Mines slot ⚣</h1>

    <div class="slot-machine">
        <div class="upper-bar"></div>
        <div class="mines-slot">
            <table>
                <tr>
                    <th></th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                </tr>
                <tr>
                    <th>A</th>
                    <td class="hidden" data-row="A" data-col="1"></td>
                    <td class="hidden" data-row="A" data-col="2"></td>
                    <td class="hidden" data-row="A" data-col="3"></td>
                    <td class="hidden" data-row="A" data-col="4"></td>
                    <td class="hidden" data-row="A" data-col="5"></td>
                    <td class="hidden" data-row="A" data-col="6"></td>
                    <td class="hidden" data-row="A" data-col="7"></td>
                    <td class="hidden" data-row="A" data-col="8"></td>
                </tr>
                <tr>
                    <th>B</th>
                    <td class="hidden" data-row="B" data-col="1"></td>
                    <td class="hidden" data-row="B" data-col="2"></td>
                    <td class="hidden" data-row="B" data-col="3"></td>
                    <td class="hidden" data-row="B" data-col="4"></td>
                    <td class="hidden" data-row="B" data-col="5"></td>
                    <td class="hidden" data-row="B" data-col="6"></td>
                    <td class="hidden" data-row="B" data-col="7"></td>
                    <td class="hidden" data-row="B" data-col="8"></td>
                </tr>
                <tr>
                    <th>C</th>
                    <td class="hidden" data-row="C" data-col="1"></td>
                    <td class="hidden" data-row="C" data-col="2"></td>
                    <td class="hidden" data-row="C" data-col="3"></td>
                    <td class="hidden" data-row="C" data-col="4"></td>
                    <td class="hidden" data-row="C" data-col="5"></td>
                    <td class="hidden" data-row="C" data-col="6"></td>
                    <td class="hidden" data-row="C" data-col="7"></td>
                    <td class="hidden" data-row="C" data-col="8"></td>
                </tr>
                <tr>
                    <th>D</th>
                    <td class="hidden" data-row="D" data-col="1"></td>
                    <td class="hidden" data-row="D" data-col="2"></td>
                    <td class="hidden" data-row="D" data-col="3"></td>
                    <td class="hidden" data-row="D" data-col="4"></td>
                    <td class="hidden" data-row="D" data-col="5"></td>
                    <td class="hidden" data-row="D" data-col="6"></td>
                    <td class="hidden" data-row="D" data-col="7"></td>
                    <td class="hidden" data-row="D" data-col="8"></td>
                </tr>
                <tr>
                    <th>E</th>
                    <td class="hidden" data-row="E" data-col="1"></td>
                    <td class="hidden" data-row="E" data-col="2"></td>
                    <td class="hidden" data-row="E" data-col="3"></td>
                    <td class="hidden" data-row="E" data-col="4"></td>
                    <td class="hidden" data-row="E" data-col="5"></td>
                    <td class="hidden" data-row="E" data-col="6"></td>
                    <td class="hidden" data-row="E" data-col="7"></td>
                    <td class="hidden" data-row="E" data-col="8"></td>
                </tr>
                <tr>
                    <th>F</th>
                    <td class="hidden" data-row="F" data-col="1"></td>
                    <td class="hidden" data-row="F" data-col="2"></td>
                    <td class="hidden" data-row="F" data-col="3"></td>
                    <td class="hidden" data-row="F" data-col="4"></td>
                    <td class="hidden" data-row="F" data-col="5"></td>
                    <td class="hidden" data-row="F" data-col="6"></td>
                    <td class="hidden" data-row="F" data-col="7"></td>
                    <td class="hidden" data-row="F" data-col="8"></td>
                </tr>
                <tr>
                    <th>G</th>
                    <td class="hidden" data-row="G" data-col="1"></td>
                    <td class="hidden" data-row="G" data-col="2"></td>
                    <td class="hidden" data-row="G" data-col="3"></td>
                    <td class="hidden" data-row="G" data-col="4"></td>
                    <td class="hidden" data-row="G" data-col="5"></td>
                    <td class="hidden" data-row="G" data-col="6"></td>
                    <td class="hidden" data-row="G" data-col="7"></td>
                    <td class="hidden" data-row="G" data-col="8"></td>
                </tr>
                <tr>
                    <th>H</th>
                    <td class="hidden" data-row="H" data-col="1"></td>
                    <td class="hidden" data-row="H" data-col="2"></td>
                    <td class="hidden" data-row="H" data-col="3"></td>
                    <td class="hidden" data-row="H" data-col="4"></td>
                    <td class="hidden" data-row="H" data-col="5"></td>
                    <td class="hidden" data-row="H" data-col="6"></td>
                    <td class="hidden" data-row="H" data-col="7"></td>
                    <td class="hidden" data-row="H" data-col="8"></td>
                </tr>
            </table>

            <p id="result"></p>


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
<script src="assets/mine.js"></script>
</body>
</html>