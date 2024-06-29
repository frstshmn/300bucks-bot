<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>App</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/mines.css">
</head>
<body>
<div class="container">
    <div class="menu">
        <div class="menu-header">
            <a href="app.php" class="previous">&laquo; Back to all Games</a>
        </div>
        <div class="menu-content">
            <label for="bet">Bet Amount:</label>
            <input type="number" id="bet" min="1" value="1">
            <label for="mines">Number of Mines:</label>
            <select id="mines">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
            </select>
            <button id="start">Bet</button>
        </div>
        <div class="menu-footer">
            <p id="balance">Balance: 300</p>
        </div>
    </div>
    <div class="game">
        <div class="grid">
            <div class="tile hidden" data-row="A" data-col="1"></div>
            <div class="tile hidden" data-row="A" data-col="2"></div>
            <div class="tile hidden" data-row="A" data-col="3"></div>
            <div class="tile hidden" data-row="A" data-col="4"></div>
            <div class="tile hidden" data-row="A" data-col="5"></div>
            <div class="tile hidden" data-row="B" data-col="1"></div>
            <div class="tile hidden" data-row="B" data-col="2"></div>
            <div class="tile hidden" data-row="B" data-col="3"></div>
            <div class="tile hidden" data-row="B" data-col="4"></div>
            <div class="tile hidden" data-row="B" data-col="5"></div>
            <div class="tile hidden" data-row="C" data-col="1"></div>
            <div class="tile hidden" data-row="C" data-col="2"></div>
            <div class="tile hidden" data-row="C" data-col="3"></div>
            <div class="tile hidden" data-row="C" data-col="4"></div>
            <div class="tile hidden" data-row="C" data-col="5"></div>
            <div class="tile hidden" data-row="D" data-col="1"></div>
            <div class="tile hidden" data-row="D" data-col="2"></div>
            <div class="tile hidden" data-row="D" data-col="3"></div>
            <div class="tile hidden" data-row="D" data-col="4"></div>
            <div class="tile hidden" data-row="D" data-col="5"></div>
            <div class="tile hidden" data-row="E" data-col="1"></div>
            <div class="tile hidden" data-row="E" data-col="2"></div>
            <div class="tile hidden" data-row="E" data-col="3"></div>
            <div class="tile hidden" data-row="E" data-col="4"></div>
            <div class="tile hidden" data-row="E" data-col="5"></div>
        </div>
    </div>
</div>
<p id="result" style="text-align: center;"></p>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="assets/mine.js"></script>
</body>
</html>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>App</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/mines.css">
</head>
<body>
<div class="container">
    <div class="game">
        <div class="grid">
            <div class="tile hidden" data-row="A" data-col="1"></div>
            <div class="tile hidden" data-row="A" data-col="2"></div>
            <div class="tile hidden" data-row="A" data-col="3"></div>
            <div class="tile hidden" data-row="A" data-col="4"></div>
            <div class="tile hidden" data-row="A" data-col="5"></div>
            <div class="tile hidden" data-row="B" data-col="1"></div>
            <div class="tile hidden" data-row="B" data-col="2"></div>
            <div class="tile hidden" data-row="B" data-col="3"></div>
            <div class="tile hidden" data-row="B" data-col="4"></div>
            <div class="tile hidden" data-row="B" data-col="5"></div>
            <div class="tile hidden" data-row="C" data-col="1"></div>
            <div class="tile hidden" data-row="C" data-col="2"></div>
            <div class="tile hidden" data-row="C" data-col="3"></div>
            <div class="tile hidden" data-row="C" data-col="4"></div>
            <div class="tile hidden" data-row="C" data-col="5"></div>
            <div class="tile hidden" data-row="D" data-col="1"></div>
            <div class="tile hidden" data-row="D" data-col="2"></div>
            <div class="tile hidden" data-row="D" data-col="3"></div>
            <div class="tile hidden" data-row="D" data-col="4"></div>
            <div class="tile hidden" data-row="D" data-col="5"></div>
            <div class="tile hidden" data-row="E" data-col="1"></div>
            <div class="tile hidden" data-row="E" data-col="2"></div>
            <div class="tile hidden" data-row="E" data-col="3"></div>
            <div class="tile hidden" data-row="E" data-col="4"></div>
            <div class="tile hidden" data-row="E" data-col="5"></div>
        </div>
    </div>
    <div class="menu">
        <div class="menu-content">
            <div class="balance">
                <span>Balance: $0.00</span>
            </div>
            <div class="bet-section">
                <label for="betAmount">Bet Amount</label>
                <input type="number" id="betAmount" value="0.00000000">
                <button class="bet-control">½</button>
                <button class="bet-control">2×</button>
            </div>
            <button id="start" class="bet-button">Bet</button>
            <button id="cashout" class="bet-button">Cashout</button>
            <button id="restart" class="bet-button">Restart</button>
            <div class="mines-section">
                <label for="mines">Mines</label>
                <select id="mines">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                </select>
            </div>

        </div>
    </div>
</div>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="assets/mine.js"></script>
</body>
</html>
