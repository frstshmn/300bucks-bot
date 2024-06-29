Telegram.WebApp.ready();

$(document).ready(function() {
    // Game configuration
    const rows = 8;
    const cols = 8;
    const minesCount = 10;
    const gemsCount = 10;

    let gemsFound = 0;
    let multiplier = 1;
    let betAmount = 1;

    function resetGame() {
        gemsFound = 0;
        multiplier = 1;
        betAmount = parseInt($("#bet").val());
        $("#result").text('');
        $("td").removeClass("mine gem").addClass("hidden").text('');
        placeItems();
        $("td.hidden").off("click").on("click", cellClickHandler);
        $("#restart").hide();
    }

    // Place mines and gems randomly
    function placeItems() {
        const totalCells = rows * cols;
        let minePositions = [];
        let gemPositions = [];

        while (minePositions.length < minesCount) {
            let minePosition = Math.floor(Math.random() * totalCells);
            if (!minePositions.includes(minePosition)) {
                minePositions.push(minePosition);
            }
        }

        while (gemPositions.length < gemsCount) {
            let gemPosition = Math.floor(Math.random() * totalCells);
            if (!minePositions.includes(gemPosition) && !gemPositions.includes(gemPosition)) {
                gemPositions.push(gemPosition);
            }
        }

        $("td.hidden").each(function(index) {
            if (minePositions.includes(index)) {
                $(this).addClass("mine");
            } else if (gemPositions.includes(index)) {
                $(this).addClass("gem");
            }
        });
    }

    function cellClickHandler() {
        if ($(this).hasClass("mine")) {
            $(this).removeClass("hidden").addClass("mine").text("💣");
            $("#result").text("Game Over! You hit a mine.");
            $("td.hidden").off("click"); // Disable further clicks
            $("#restart").show();
        } else if ($(this).hasClass("gem")) {
            $(this).removeClass("hidden").addClass("gem").text("💎");
            gemsFound++;
            multiplier += 0.5;
            $("#result").text(`Gems found: ${gemsFound}. Current multiplier: ${multiplier}`);
        } else {
            $(this).removeClass("hidden");
        }
    }

    $("#restart").click(resetGame);

    resetGame();
});