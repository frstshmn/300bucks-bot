Telegram.WebApp.ready();

document.addEventListener('DOMContentLoaded', function () {


    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    let balance = 300.00;
    let currentCard = drawCard();
    updateCardDisplay(currentCard);
    updateProfitMultipliers(currentCard);

    document.getElementById('higher-btn').addEventListener('click', () => {
        const newCard = drawCard();
        const currentValueIndex = values.indexOf(currentCard.value);
        const newValueIndex = values.indexOf(newCard.value);

        if (newValueIndex > currentValueIndex) {
            balance += calculateBet('higher', currentValueIndex);
        } else {
            balance -= calculateBet('higher', currentValueIndex);
        }
        updateBalanceDisplay();
        updateProfit('higher', currentValueIndex);

        currentCard = newCard;
        updateCardDisplay(currentCard);
        updateProfitMultipliers(currentCard);
    });

    document.getElementById('lower-btn').addEventListener('click', () => {
        const newCard = drawCard();
        const currentValueIndex = values.indexOf(currentCard.value);
        const newValueIndex = values.indexOf(newCard.value);

        if (newValueIndex < currentValueIndex) {
            balance += calculateBet('lower', currentValueIndex);
        } else {
            balance -= calculateBet('lower', currentValueIndex);
        }
        updateBalanceDisplay();
        updateProfit('lower', currentValueIndex);

        currentCard = newCard;
        updateCardDisplay(currentCard);
        updateProfitMultipliers(currentCard);
    });

    document.getElementById('skip-btn').addEventListener('click', () => {
        const newCard = drawCard();
        currentCard = newCard;
        updateCardDisplay(currentCard);
        updateProfitMultipliers(currentCard);
    });

    function drawCard() {
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const value = values[Math.floor(Math.random() * values.length)];
        return { suit, value };
    }

    function updateCardDisplay(card) {
        const cardDiv = document.getElementById('current-card');
        cardDiv.style.backgroundImage = `url(assets/images/cards/${card.value}_of_${card.suit}.png)`;
    }

    function calculateProfitMultiplier(currentValueIndex, direction) {
        let remainingCards = values.length - 1;

        if (direction === 'higher') {
            let higherCards = remainingCards - currentValueIndex;
            return (higherCards > 0) ? (remainingCards / higherCards) : remainingCards;
        } else {
            let lowerCards = currentValueIndex;
            return (lowerCards > 0) ? (remainingCards / lowerCards) : remainingCards;
        }
    }

    function updateProfitMultipliers(card) {
        const currentValueIndex = values.indexOf(card.value);
        const higherMultiplier = calculateProfitMultiplier(currentValueIndex, 'higher').toFixed(2);
        const lowerMultiplier = calculateProfitMultiplier(currentValueIndex, 'lower').toFixed(2);

        document.getElementById('profit-higher-multiplier').textContent = higherMultiplier;
        document.getElementById('profit-lower-multiplier').textContent = lowerMultiplier;
    }

    function updateProfit(type, currentValueIndex) {
        let profitHigher = parseFloat(document.getElementById('profit-higher').textContent);
        let profitLower = parseFloat(document.getElementById('profit-lower').textContent);
        let totalProfit = parseFloat(document.getElementById('total-profit').textContent);

        if (type === 'higher') {
            let multiplier = calculateProfitMultiplier(currentValueIndex, 'higher');
            profitHigher += multiplier;
        } else {
            let multiplier = calculateProfitMultiplier(currentValueIndex, 'lower');
            profitLower += multiplier;
        }

        totalProfit = profitHigher + profitLower;

        document.getElementById('profit-higher').textContent = profitHigher.toFixed(2);
        document.getElementById('profit-lower').textContent = profitLower.toFixed(2);
        document.getElementById('total-profit').textContent = totalProfit.toFixed(2);
    }

    function calculateBet(type, currentValueIndex) {
        let multiplier = calculateProfitMultiplier(currentValueIndex, type);
        let betAmount = 10; // Example fixed bet amount, you can make this dynamic
        return betAmount * multiplier;
    }

    function updateBalanceDisplay() {
        document.getElementById('balance').textContent = balance.toFixed(2);
    }

// Start the game when the page loads
    document.addEventListener("DOMContentLoaded", function() {
        updateCardDisplay(currentCard);
        updateProfitMultipliers(currentCard);
    });

})