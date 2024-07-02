Telegram.WebApp.ready();

document.addEventListener("DOMContentLoaded", function() {
    const betButton = document.getElementById("betButton");
    const hitButton = document.getElementById("hitButton");
    const standButton = document.getElementById("standButton");
    const balanceDisplay = document.getElementById("balance");
    const betAmountInput = document.getElementById("betAmount");
    const resultDisplay = document.getElementById("resultDisplay");
    const dealerHand = document.getElementById("dealerHand");
    const playerHand = document.getElementById("playerHand");
    const dealerValueDisplay = document.getElementById("dealerValue");
    const playerValueDisplay = document.getElementById("playerValue");

    let balance = 300.00;
    let betAmount = 0;
    let dealerCards = [];
    let playerCards = [];
    let deck = [];

    function initializeDeck() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        deck = [];
        for (const suit of suits) {
            for (const value of values) {
                deck.push({ suit, value });
            }
        }
        deck = shuffle(deck);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startGame() {
        dealerCards = [drawCard(), drawCard()];
        playerCards = [drawCard(), drawCard()];
        renderHands();
        resultDisplay.textContent = '';
    }

    function drawCard() {
        return deck.pop();
    }

    function renderHands() {
        dealerHand.innerHTML = '';
        playerHand.innerHTML = '';
        dealerCards.forEach((card, index) => {
            if (index === 0) {
                dealerHand.appendChild(renderCardBack());
            } else {
                dealerHand.appendChild(renderCard(card));
            }
        });
        playerCards.forEach(card => {
            playerHand.appendChild(renderCard(card));
        });
        updateHandValues();
    }

    function renderCard(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.style.backgroundImage = `url(images/${card.value}_of_${card.suit}.png)`;
        return cardDiv;
    }

    function renderCardBack() {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.style.backgroundImage = 'url(images/card-back.png)';
        return cardDiv;
    }

    function calculateHandValue(hand) {
        let value = 0;
        let numAces = 0;
        hand.forEach(card => {
            if (['J', 'Q', 'K'].includes(card.value)) {
                value += 10;
            } else if (card.value === 'A') {
                value += 11;
                numAces++;
            } else {
                value += parseInt(card.value);
            }
        });
        while (value > 21 && numAces > 0) {
            value -= 10;
            numAces--;
        }
        return value;
    }

    function updateHandValues() {
        const dealerValue = calculateHandValue(dealerCards);
        const playerValue = calculateHandValue(playerCards);
        dealerValueDisplay.textContent = `Dealer's Hand: ${dealerValue}`;
        playerValueDisplay.textContent = `Your Hand: ${playerValue}`;
    }

    function checkForBust(hand) {
        return calculateHandValue(hand) > 21;
    }

    function endGame() {
        const playerValue = calculateHandValue(playerCards);
        const dealerValue = calculateHandValue(dealerCards);
        if (playerValue > 21) {
            resultDisplay.textContent = 'You bust!';
        } else if (dealerValue > 21 || playerValue > dealerValue) {
            resultDisplay.textContent = 'You win!';
            balance += betAmount * 2;
        } else if (playerValue < dealerValue) {
            resultDisplay.textContent = 'You lose.';
        } else {
            resultDisplay.textContent = 'Push.';
            balance += betAmount;
        }
        balanceDisplay.textContent = balance.toFixed(2);
        betAmount = 0;
        updateHandValues();
    }

    betButton.addEventListener('click', function() {
        betAmount = parseFloat(betAmountInput.value);
        if (isNaN(betAmount) || betAmount <= 0) {
            resultDisplay.textContent = 'Please enter a valid bet amount.';
            return;
        }
        if (betAmount > balance) {
            resultDisplay.textContent = 'Insufficient balance.';
            return;
        }
        balance -= betAmount;
        balanceDisplay.textContent = balance.toFixed(2);
        initializeDeck();
        startGame();
    });

    hitButton.addEventListener('click', function() {
        if (betAmount === 0) return;
        playerCards.push(drawCard());
        renderHands();
        if (checkForBust(playerCards)) {
            endGame();
        }
    });

    standButton.addEventListener('click', function() {
        if (betAmount === 0) return;
        while (calculateHandValue(dealerCards) < 17) {
            dealerCards.push(drawCard());
        }
        renderHands();
        endGame();
    });
});