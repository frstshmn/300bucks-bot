Telegram.WebApp.ready();

$(document).ready(function() {
    // Game configuration
    const rows = 8;
    const cols = 8;
    const minesCount = 10;
    const gemsCount = 10;

    let gemsFound = 0;
    let multiplier = 1;

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

    placeItems();

    // Handle cell click
    $("td.hidden").click(function() {
        if ($(this).hasClass("mine")) {
            $(this).removeClass("hidden").addClass("mine");
            $("#result").text("Game Over! You hit a mine.");
            $("td.hidden").off("click"); // Disable further clicks
        } else if ($(this).hasClass("gem")) {
            $(this).removeClass("hidden").addClass("gem");
            gemsFound++;
            multiplier += 0.5;
            $("#result").text(`Gems found: ${gemsFound}. Current multiplier: ${multiplier}`);
        } else {
            $(this).removeClass("hidden");
        }
    });
});