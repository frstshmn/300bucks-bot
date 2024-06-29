
Telegram.WebApp.ready();

    $(document).ready(function() {
    // Game configuration
    const rows = 8;
    const cols = 8;
    let minesCount = 10;
    const gemsCount = 10;

    let gemsFound = 0;
    let multiplier = 1;
    let betAmount = 1;
    let balance = 100;
    let gameStarted = false;

    function resetGame() {
    gemsFound = 0;
    multiplier = 1;
    betAmount = parseInt($("#bet").val());
    minesCount = parseInt($("#mines").val());
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
    $("#balance").text(`Balance: ${balance}`);
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
    $("#cashout").hide();
    $("#restart").show();
    gameStarted = false;
} else if ($(this).hasClass("gem")) {
    $(this).removeClass("hidden").addClass("gem").text("💎");
    gemsFound++;
    multiplier += 0.5;
    $("#result").text(`Gems found: ${gemsFound}. Current multiplier: ${multiplier}`);
} else {
    $(this).removeClass("hidden");
}
}

    $("#cashout").click(function() {
    if (gameStarted) {
    let winnings = betAmount * multiplier;
    balance += winnings;
    updateBalance();
    $("#result").text(`You cashed out with ${winnings}. Your balance is now ${balance}.`);
    $("#cashout").hide();
    $("#restart").show();
    gameStarted = false;
}
});

    $("#restart").click(resetGame);
    $("#start").click(resetGame);

    updateBalance();
});