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

    const multipliers = {
        1: {1: 1.03, 2: 1.08, 3: 1.12, 4: 1.18, 5: 1.24, 6: 1.30, 7: 1.37, 8: 1.46, 9: 1.55, 10: 1.65, 11: 1.77, 12: 1.90, 13: 2.06, 14: 2.25, 15: 2.47, 16: 2.75, 17: 3.09, 18: 3.54, 19: 4.12, 20: 4.95, 21: 6.19, 22: 8.00, 23: 12.37, 24: 24.75}
    };

    function getMultiplier(gems, mines) {
        return multipliers[gems]?.[mines] || 1;
    }

    function resetGame() {
        gemsFound = 0;
        multiplier = 1;
        betAmount = parseInt($("#bet").val());
        minesCount = parseInt($("#mines").val());
        if (betAmount < 1 || minesCount < 1 || minesCount > 24) {
            $("#result").text("Please enter valid bet amount and number of mines.");
            return;
        }
        gameStarted = true;

        if (balance >= betAmount) {
            balance -= betAmount;
            updateBalance();
        } else {
            $("#result").text("Insufficient balance to place the bet.");
            return;
        }

        $("#result").text('');
        $("td").removeClass("mine gem").addClass("hidden").text('');
        placeItems();
        $("td.hidden").off("click").on("click", cellClickHandler);
        $("#cashout").show();
        $("#restart").hide();
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

        $("td.hidden").each(function(index) {
            if (minePositions.includes(index)) {
                $(this).addClass("mine");
            } else {
                $(this).addClass("gem");
            }
        });
    }

    function cellClickHandler() {
        if ($(this).hasClass("mine")) {
            $(this).removeClass("hidden").addClass("mine").text("💣");
            $("#result").text("Game Over! You hit a mine.");
            $("td.hidden").off("click");
            $("#cashout").hide();
            $("#restart").show();
            gameStarted = false;
        } else if ($(this).hasClass("gem")) {
            $(this).removeClass("hidden").addClass("gem").text("💎");
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
        }
    });

    $("#restart").click(resetGame);
    $("#start").click(resetGame);

    updateBalance();
});