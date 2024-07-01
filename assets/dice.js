$(document).ready(function() {
    const $winChanceSlider = $("#winChanceSlider");
    const $winChanceDisplay = $("#winChance");
    const $multiplierDisplay = $("#multiplier");
    const $expectedProfitDisplay = $("#expectedProfit");
    const $betAmountInput = $("#betAmount");
    const $betButton = $("#betButton");
    const $resultDisplay = $("#result");
    const $balanceDisplay = $("#balance");

    let balance = 100.00;

    $winChanceSlider.on("input", function() {
        const winChance = parseFloat($winChanceSlider.val());
        const multiplier = (100 / winChance).toFixed(2);
        const betAmount = parseFloat($betAmountInput.val()) || 0;
        const expectedProfit = (betAmount * multiplier).toFixed(2);

        $winChanceDisplay.text(winChance);
        $multiplierDisplay.text(multiplier);
        $expectedProfitDisplay.text(expectedProfit);
    });

    $betButton.on("click", function() {
        const winChance = parseFloat($winChanceSlider.val());
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

        const win = Math.random() * 100 < winChance;
        const multiplier = (100 / winChance).toFixed(2);

        if (win) {
            const profit = betAmount * multiplier;
            balance += profit;
            $resultDisplay.text(`You win! Profit: ${profit.toFixed(2)} BTC`);
        } else {
            $resultDisplay.text("You lose.");
        }

        updateBalance();
    });

    function updateBalance() {
        $balanceDisplay.text(balance.toFixed(2));
    }
});
