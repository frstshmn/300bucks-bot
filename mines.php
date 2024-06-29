<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>App</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="assets/style.css">
</head>
<body>


<div style="text-align: center; margin-top: 20px;">
    <label for="bet">Bet Amount: </label>
    <input type="number" id="bet" min="1" value="1">
    <label for="mines">Number of Mines: </label>
    <input type="number" id="mines" min="1" max="64" value="10">
    <button id="start">Start Game</button>
    <button id="cashout" style="display: none;">Cash Out</button>
    <button id="restart" style="display: none;">Restart Game</button>
</div>

<div style="text-align: center; margin-top: 10px;">
    <p id="balance">Balance: 300</p>
</div>

<table>
    <tr>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
    </tr>
    <tr>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
    </tr>
    <tr>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
    </tr>
    <tr>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
    </tr>
    <tr>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
        <td class="hidden"></td>
    </tr>
</table>

<p id="result" style="text-align: center;"></p>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="assets/app.js"></script>
</body>
</html>