Telegram.WebApp.ready();

$(document).ready(function() {
    const $winChanceSlider = $("#winChanceSlider");
    const $winChanceDisplay = $("#winChance");
    const $multiplierDisplay = $("#multiplier");
    const $expectedProfitDisplay = $("#expectedProfit");
    const $betAmountInput = $("#bet-amount");
    const $betButton = $("#betButton");
    const $resultDisplay = $("#result");
    const $balanceDisplay = $("#balance");
    const $resultIndicator = $("#resultIndicator");
    const $indicatorValue = $("#indicatorValue");

    let balance = 300.00;

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
        const randomValue = Math.floor(Math.random() * 100);
        const win = randomValue < winChance;
        const multiplier = (100 / winChance).toFixed(2);

        animateResult(winChance, win, betAmount, multiplier, randomValue);
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
        $(".lower").css("width", percentage);
        $(".higher").css("width", (100 - winChance) + "%");
    }

    function animateResult(winChance, win, betAmount, multiplier, randomValue) {
        const randomPercentage = randomValue + "%";
        $indicatorValue.text(randomValue);
        $resultIndicator.css("left", randomPercentage).fadeIn(200);
        $resultIndicator.css('display', 'flex');

        if (win) {
            const profit = betAmount * multiplier;
            balance += profit;
            $resultDisplay.text(`You win! Profit: ${profit.toFixed(2)} $`);
            $resultIndicator.addClass('win').removeClass('lose');
        } else {
            $resultDisplay.text("You lose.");
            $resultIndicator.addClass('lose').removeClass('win');
        }

        // Запуск анімації
        $resultIndicator.css("animation", "none");
        setTimeout(() => {
            $resultIndicator.css("animation", "");
        }, 10);

        updateBalance();
    }

    updateWinChance();
    updateExpectedProfit();
});