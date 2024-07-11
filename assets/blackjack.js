Telegram.WebApp.ready();

document.addEventListener("DOMContentLoaded", function() {
    const betButton = document.getElementById("betButton");
    const hitButton = document.getElementById("hitButton");
    const standButton = document.getElementById("standButton");
    const balanceDisplay = document.getElementById("balance");
    const betAmountInput = document.getElementById("betAmount__blackJack");
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
    let gameInProgress = false;

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
        updateHandValues();
        gameInProgress = true;
        toggleBetButton();
    }

    function drawCard() {
        return deck.pop();
    }

    function renderHands(showDealerFullHand = false) {
        dealerHand.innerHTML = '';
        playerHand.innerHTML = '';
        dealerCards.forEach((card, index) => {
            if (index === 0 && !showDealerFullHand) {
                dealerHand.appendChild(renderCardBack());
            } else {
                dealerHand.appendChild(renderCard(card, index));
            }
        });
        playerCards.forEach((card, index) => {
            playerHand.appendChild(renderCard(card, index));
        });
    }

    function renderCard(card, index) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card deal-animation';
        cardDiv.style.backgroundImage = `url(assets/images/cards/${card.value}_of_${card.suit}.png)`;
        cardDiv.style.animationDelay = `${index * 0.5}s`;
        cardDiv.style.width = '85px';
        cardDiv.style.height = '124px';
        console.log(`Rendering card: ${card.value} of ${card.suit}`);
        return cardDiv;
    }

    function renderCardBack() {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card-back deal-animation';
        cardDiv.style.backgroundImage = 'url(assets/images/cards/card-back.png)';
        cardDiv.style.width = '85px';
        cardDiv.style.height = '124px';
        cardDiv.style.animationDelay = `0s`;
        console.log('Rendering card back');
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
        const dealerValue = calculateHandValue(dealerCards.slice(1)); // Only show the dealer's second card
        const playerValue = calculateHandValue(playerCards);
        dealerValueDisplay.textContent = `Dealer's Hand: ${dealerValue}`;
        playerValueDisplay.textContent = `Your Hand: ${playerValue}`;
        if (playerValue === 21) {
            endGame(true);
        }
    }

    function checkForBust(hand) {
        return calculateHandValue(hand) > 21;
    }

    function endGame(playerBlackjack = false) {
        const playerValue = calculateHandValue(playerCards);
        let dealerValue = calculateHandValue(dealerCards);
        while (dealerValue < 17) {
            dealerCards.push(drawCard());
            dealerValue = calculateHandValue(dealerCards);
        }
        if (playerValue > 21) {
            resultDisplay.textContent = 'You bust!';
        } else if (playerBlackjack || dealerValue > 21 || playerValue > dealerValue) {
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
        dealerValueDisplay.textContent = `Dealer's Hand: ${dealerValue}`; // Show full dealer hand value
        renderHands(true); // Show full dealer hand
        gameInProgress = false; // End of game
        toggleBetButton();
    }

    function toggleBetButton() {
        betButton.disabled = gameInProgress;
        betAmountInput.disabled = gameInProgress;
    }

    betButton.addEventListener('click', function() {
        if (gameInProgress) return;
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
        if (betAmount === 0 || !gameInProgress) return;
        playerCards.push(drawCard());
        renderHands();
        updateHandValues();
        if (checkForBust(playerCards)) {
            endGame();
        }
    });

    standButton.addEventListener('click', function() {
        if (betAmount === 0 || !gameInProgress) return;
        renderHands(true); // Show full dealer hand after stand
        endGame();
    });
});
