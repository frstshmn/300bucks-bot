$(document).ready(function() {
    // Game configuration
    const rows = 5;
    const cols = 5;
    let minesCount = 10;
    let gemsFound = 0;
    let multiplier = 1;
    let betAmount = 1;
    let balance = 300;
    let gameStarted = false;
    let gameOver = false;

    const multipliers = {
        1: {1: 1.03, 2: 1.08, 3: 1.12, 4: 1.18, 5: 1.24, 6: 1.30, 7: 1.37, 8: 1.46, 9: 1.55, 10: 1.65, 11: 1.77, 12: 1.90, 13: 2.06, 14: 2.25, 15: 2.47, 16: 2.75, 17: 3.09, 18: 3.54, 19: 4.12, 20: 4.95, 21: 6.19, 22: 8.00, 23: 12.37, 24: 24.75},
        2: {1: 1.08, 2: 1.12, 3: 1.18, 4: 1.24, 5: 1.30, 6: 1.37, 7: 1.46, 8: 1.55, 9: 1.65, 10: 1.77, 11: 1.90, 12: 2.06, 13: 2.25, 14: 2.47, 15: 2.75, 16: 3.09, 17: 3.54, 18: 4.12, 19: 4.95, 20: 6.19, 21: 8.00, 22: 12.37, 23: 24.75},
        3: {1: 1.12, 2: 1.18, 3: 1.24, 4: 1.30, 5: 1.37, 6: 1.46, 7: 1.55, 8: 1.65, 9: 1.77, 10: 1.90, 11: 2.06, 12: 2.25, 13: 2.47, 14: 2.75, 15: 3.09, 16: 3.54, 17: 4.12, 18: 4.95, 19: 6.19, 20: 8.00, 21: 12.37, 22: 24.75},
        4: {1: 1.18, 2: 1.24, 3: 1.30, 4: 1.37, 5: 1.46, 6: 1.55, 7: 1.65, 8: 1.77, 9: 1.90, 10: 2.06, 11: 2.25, 12: 2.47, 13: 2.75, 14: 3.09, 15: 3.54, 16: 4.12, 17: 4.95, 18: 6.19, 19: 8.00, 20: 12.37, 21: 24.75},
        5: {1: 1.24, 2: 1.30, 3: 1.37, 4: 1.46, 5: 1.55, 6: 1.65, 7: 1.77, 8: 1.90, 9: 2.06, 10: 2.25, 11: 2.47, 12: 2.75, 13: 3.09, 14: 3.54, 15: 4.12, 16: 4.95, 17: 6.19, 18: 8.00, 19: 12.37, 20: 24.75},
        6: {1: 1.30, 2: 1.37, 3: 1.46, 4: 1.55, 5: 1.65, 6: 1.77, 7: 1.90, 8: 2.06, 9: 2.25, 10: 2.47, 11: 2.75, 12: 3.09, 13: 3.54, 14: 4.12, 15: 4.95, 16: 6.19, 17: 8.00, 18: 12.37, 19: 24.75},
        7: {1: 1.37, 2: 1.46, 3: 1.55, 4: 1.65, 5: 1.77, 6: 1.90, 7: 2.06, 8: 2.25, 9: 2.47, 10: 2.75, 11: 3.09, 12: 3.54, 13: 4.12, 14: 4.95, 15: 6.19, 16: 8.00, 17: 12.37, 18: 24.75},
        8: {1: 1.46, 2: 1.55, 3: 1.65, 4: 1.77, 5: 1.90, 6: 2.06, 7: 2.25, 8: 2.47, 9: 2.75, 10: 3.09, 11: 3.54, 12: 4.12, 13: 4.95, 14: 6.19, 15: 8.00, 16: 12.37, 17: 24.75},
        9: {1: 1.55, 2: 1.65, 3: 1.77, 4: 1.90, 5: 2.06, 6: 2.25, 7: 2.47, 8: 2.75, 9: 3.09, 10: 3.54, 11: 4.12, 12: 4.95, 13: 6.19, 14: 8.00, 15: 12.37, 16: 24.75},
        10: {1: 1.65, 2: 1.77, 3: 1.90, 4: 2.06, 5: 2.25, 6: 2.47, 7: 2.75, 8: 3.09, 9: 3.54, 10: 4.12, 11: 4.95, 12: 6.19, 13: 8.00, 14: 12.37, 15: 24.75},
        11: {1: 1.77, 2: 1.90, 3: 2.06, 4: 2.25, 5: 2.47, 6: 2.75, 7: 3.09, 8: 3.54, 9: 4.12, 10: 4.95, 11: 6.19, 12: 8.00, 13: 12.37, 14: 24.75},
        12: {1: 1.90, 2: 2.06, 3: 2.25, 4: 2.47, 5: 2.75, 6: 3.09, 7: 3.54, 8: 4.12, 9: 4.95, 10: 6.19, 11: 8.00, 12: 12.37, 13: 24.75},
        13: {1: 2.06, 2: 2.25, 3: 2.47, 4: 2.75, 5: 3.09, 6: 3.54, 7: 4.12, 8: 4.95, 9: 6.19, 10: 8.00, 11: 12.37, 12: 24.75},
        14: {1: 2.25, 2: 2.47, 3: 2.75, 4: 3.09, 5: 3.54, 6: 4.12, 7: 4.95, 8: 6.19, 9: 8.00, 10: 12.37, 11: 24.75},
        15: {1: 2.47, 2: 2.75, 3: 3.09, 4: 3.54, 5: 4.12, 6: 4.95, 7: 6.19, 8: 8.00, 9: 12.37, 10: 24.75},
        16: {1: 2.75, 2: 3.09, 3: 3.54, 4: 4.12, 5: 4.95, 6: 6.19, 7: 8.00, 8: 12.37, 9: 24.75},
        17: {1: 3.09, 2: 3.54, 3: 4.12, 4: 4.95, 5: 6.19, 6: 8.00, 7: 12.37, 8: 24.75},
        18: {1: 3.54, 2: 4.12, 3: 4.95, 4: 6.19, 5: 8.00, 6: 12.37, 7: 24.75},
        19: {1: 4.12, 2: 4.95, 3: 6.19, 4: 8.00, 5: 12.37, 6: 24.75},
        20: {1: 4.95, 2: 6.19, 3: 8.00, 4: 12.37, 5: 24.75},
        21: {1: 6.19, 2: 8.00, 3: 12.37, 4: 24.75},
        22: {1: 8.00, 2: 12.37, 3: 24.75},
        23: {1: 12.37, 2: 24.75},
        24: {1: 24.75}
    };

    function getMultiplier(gems, mines) {
        return multipliers[gems]?.[mines] || 1;
    }

    function resetGame() {
        if (gameStarted && !gameOver) {
            $("#result").text("You must cash out or hit a mine before starting a new game.");
            return;
        }

        gemsFound = 0;
        multiplier = 1;
        betAmount = parseInt($("#bet").val());
        minesCount = parseInt($("#mines").val());
        if (betAmount < 1 || minesCount < 1 || minesCount > 24) {
            $("#result").text("Please enter valid bet amount and number of mines.");
            return;
        }
        gameStarted = true;
        gameOver = false;

        if (balance >= betAmount) {
            balance -= betAmount;
            updateBalance();
        } else {
            $("#result").text("Insufficient balance to place the bet.");
            return;
        }

        $("#result").text('');
        $(".tile").removeClass("mine gem revealed").addClass("hidden").text('');
        placeItems();
        $(".tile.hidden").off("click").on("click", cellClickHandler);
        $("#cashout").show();
        $("#restart").hide();
        $("#start").prop("disabled", true);
    }

    function updateBalance() {
        $("#balance").text(`Balance: ${balance.toFixed(2)}`);
    }

    // Place mines and gems randomly
    function placeItems() {
        const totalCells = rows * cols;
        let allPositions = Array.from(Array(totalCells).keys());
        let minePositions = [];

        while (minePositions.length < minesCount) {
            let minePosition = Math.floor(Math.random() * allPositions.length);
            minePositions.push(allPositions.splice(minePosition, 1)[0]);
        }

        $(".tile.hidden").each(function(index) {
            if (minePositions.includes(index)) {
                $(this).addClass("mine");
            } else {
                $(this).addClass("gem");
            }
        });
    }

    function cellClickHandler() {
        if (!gameStarted) {
            $("#result").text("You must start the game first.");
            return;
        }

        if ($(this).hasClass("mine")) {
            $(this).removeClass("hidden").addClass("revealed mine").text("💣");
            $("#result").text("Game Over! You hit a mine.");
            $(".tile.hidden").off("click");
            $("#cashout").hide();
            $("#restart").show();
            gameStarted = false;
            gameOver = true;
            $("#start").prop("disabled", false);
        } else if ($(this).hasClass("gem")) {
            $(this).removeClass("hidden").addClass("revealed gem").text("💎");
            gemsFound++;
            multiplier = getMultiplier(gemsFound, minesCount);
            $("#result").text(`Gems found: ${gemsFound}. Current multiplier: ${multiplier.toFixed(2)}`);
        }
    }

    $("#cashout").click(function() {
        if (gameStarted) {
            let winnings = betAmount * multiplier;
            balance += winnings;
            updateBalance();
            $("#result").text(`You cashed out with ${winnings.toFixed(2)}. Your balance is now ${balance.toFixed(2)}.`);
            $("#cashout").hide();
            $("#restart").show();
            gameStarted = false;
            gameOver = true;
            $("#start").prop("disabled", false);
        }
    });

    $("#restart").click(resetGame);
    $("#start").click(resetGame);

    updateBalance();
});
