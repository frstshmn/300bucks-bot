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
        <!-- Додамо пін і лунки тут -->
    </div>
    <div id="controls">
        <label for="risk-level">Choose Risk Level:</label>
        <select id="risk-level">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        <button id="drop-button">Drop Ball</button>
    </div>
    <div id="result"></div>
</div>
<script src="assets/plinko.js"></script>
</body>
</html>
