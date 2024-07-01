Telegram.WebApp.ready();

$(document).ready(function() {
    const $winChanceSlider = $("#winChanceSlider");
    const $winChanceDisplay = $("#winChance");
    const $multiplierDisplay = $("#multiplier");
    const $expectedProfitDisplay = $("#expectedProfit");
    const $betAmountInput = $("#betAmount");
    const $betButton = $("#betButton");
    const $resultDisplay = $("#result");
    const $balanceDisplay = $("#balance");
    const $resultIndicator = $("#resultIndicator");
    const $indicatorValue = $("#indicatorValue");

    let balance = 100.00;

    $winChanceSlider.on("input", function() {
        updateWinChance();
        updateExpectedProfit();
    });

    $betAmountInput.on("input", function() {
        updateExpectedProfit();
    });

    $betButton.on("click", function() {
        const betAmount = parseFloat($betAmountInput.val());

        if (isNaN(betAmount) || betAmount <= 0) {
            $resultDisplay.text("Please enter a valid bet amount.");
            return;
        }

        if (betAmount > balance) {
            $resultDisplay.text("Insufficient balance.");
            return;
        }

        balance -= betAmount;
        updateBalance();

        const winChance = parseFloat($winChanceSlider.val());
        const win = Math.random() * 100 < winChance;
        const multiplier = (100 / winChance).toFixed(2);

        animateResult(winChance, win, betAmount, multiplier);
    });

    function updateWinChance() {
        const winChance = parseFloat($winChanceSlider.val());
        const multiplier = (100 / winChance).toFixed(2);

        $winChanceDisplay.text(winChance);
        $multiplierDisplay.text(multiplier);
        updateSliderTrack(winChance);
    }

    function updateExpectedProfit() {
        const winChance = parseFloat($winChanceSlider.val());
        const multiplier = (100 / winChance).toFixed(2);
        const betAmount = parseFloat($betAmountInput.val()) || 0;
        const expectedProfit = (betAmount * multiplier).toFixed(2);

        $expectedProfitDisplay.text(expectedProfit);
    }

    function updateBalance() {
        $balanceDisplay.text(balance.toFixed(2));
    }

    function updateSliderTrack(winChance) {
        const percentage = winChance + "%";
        $(".slider-track").css("background", `linear-gradient(to right, #60e360 ${percentage}, #f55353 ${percentage})`);
    }

    function animateResult(winChance, win, betAmount, multiplier) {
        const randomValue = Math.floor(Math.random() * 100);
        $indicatorValue.text(randomValue);
        $resultIndicator.css("left", randomValue + "%").fadeIn(200);

        if (randomValue < winChance) {
            const profit = betAmount * multiplier;
            balance += profit;
            $resultDisplay.text(`You win! Profit: ${profit.toFixed(2)} BTC`);
            $resultIndicator.css('background-color', '#3b6986');
        } else {
            $resultDisplay.text("You lose.");
            $resultIndicator.css('background-color', '#3b6986');
        }

        updateBalance();
    }

    updateWinChance();
    updateExpectedProfit();
});
