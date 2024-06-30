<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plinko Game</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div id="game-container">
    <div id="plinko-board">
        <ul class="buckets">
            <li id="one">0</li>
            <li id="two">0</li>
            <li id="three">0</li>
            <li id="four">0</li>
            <li id="five">0</li>
        </ul>
        <ul class="percents">
            <li id="one_percent">0.00%</li>
            <li id="two_percent">0.00%</li>
            <li id="three_percent">0.00%</li>
            <li id="four_percent">0.00%</li>
            <li id="five_percent">0.00%</li>
        </ul>
    </div>
    <div id="controls">
        <label for="risk-level">Choose Risk Level:</label>
        <select id="risk-level">
            <option value="low">Low (6 rows)</option>
            <option value="medium">Medium (12 rows)</option>
            <option value="high">High (14 rows)</option>
        </select>
        <button id="drop-button">Drop Ball</button>
    </div>
    <div id="result"></div>
</div>
<script src="assets/plinko.js"></script>
</body>
</html>
