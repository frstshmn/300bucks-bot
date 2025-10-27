<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Baccarat</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0f212e;
            color: #fff;
            overflow-x: hidden;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .header {
            background: #1a2c38;
            padding: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #2f4553;
        }

        .header h1 {
            font-size: 18px;
            font-weight: 600;
        }

        .balance {
            background: #213743;
            padding: 8px 15px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
        }

        .game-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 15px;
        }

        .cards-area {
            background: #1a2c38;
            border-radius: 12px;
            padding: 20px 15px;
            margin-bottom: 15px;
        }

        .hand {
            margin-bottom: 25px;
        }

        .hand-title {
            font-size: 12px;
            color: #b1bad3;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .cards {
            display: flex;
            gap: 8px;
            min-height: 85px;
            align-items: center;
        }

        .card {
            width: 60px;
            height: 85px;
            background: #fff;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            position: relative;
            animation: dealCard 0.3s ease-out;
        }

        @keyframes dealCard {
            from {
                transform: translateX(-50px) rotateY(-90deg);
                opacity: 0;
            }
            to {
                transform: translateX(0) rotateY(0);
                opacity: 1;
            }
        }

        .card.red {
            color: #e74c3c;
        }

        .card.black {
            color: #2c3e50;
        }

        .card-value {
            font-size: 20px;
        }

        .card-suit {
            font-size: 18px;
            margin-top: -5px;
        }

        .score {
            display: inline-block;
            background: #00c74d;
            color: #fff;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            margin-top: 10px;
        }

        .score.banker {
            background: #e74c3c;
        }

        .score.tie {
            background: #f39c12;
        }

        .betting-area {
            background: #1a2c38;
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 15px;
        }

        .bet-title {
            font-size: 14px;
            color: #b1bad3;
            margin-bottom: 12px;
            font-weight: 500;
        }

        .bet-options {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 10px;
            margin-bottom: 15px;
        }

        .bet-option {
            background: #213743;
            border: 2px solid transparent;
            border-radius: 10px;
            padding: 15px 10px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
        }

        .bet-option.active {
            border-color: #00c74d;
            background: #00c74d15;
        }

        .bet-option.win {
            border-color: #00c74d;
            background: #00c74d25;
            animation: winPulse 0.5s;
        }

        .bet-option.lose {
            opacity: 0.5;
        }

        @keyframes winPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        .bet-label {
            font-size: 12px;
            color: #b1bad3;
            margin-bottom: 5px;
        }

        .bet-multiplier {
            font-size: 18px;
            font-weight: 700;
            color: #fff;
        }

        .bet-amount-section {
            margin-bottom: 15px;
        }

        .bet-input-wrapper {
            display: flex;
            align-items: center;
            background: #213743;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 10px;
        }

        .bet-input {
            flex: 1;
            background: transparent;
            border: none;
            color: #fff;
            font-size: 16px;
            font-weight: 600;
            padding: 15px;
            outline: none;
        }

        .quick-bets {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
        }

        .quick-bet {
            background: #213743;
            border: none;
            border-radius: 8px;
            padding: 10px;
            color: #b1bad3;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .quick-bet:active {
            transform: scale(0.95);
            background: #2f4553;
        }

        .play-button {
            width: 100%;
            background: #00c74d;
            border: none;
            border-radius: 10px;
            padding: 18px;
            color: #fff;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .play-button:active {
            transform: scale(0.98);
        }

        .play-button:disabled {
            background: #2f4553;
            color: #5a6c7d;
            cursor: not-allowed;
        }

        .result-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: #1a2c38;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            z-index: 1000;
            min-width: 280px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            transition: transform 0.3s ease-out;
        }

        .result-popup.show {
            transform: translate(-50%, -50%) scale(1);
        }

        .result-icon {
            font-size: 60px;
            margin-bottom: 15px;
        }

        .result-text {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .result-text.win {
            color: #00c74d;
        }

        .result-text.lose {
            color: #e74c3c;
        }

        .result-amount {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 20px;
        }

        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            z-index: 999;
            display: none;
        }

        .overlay.show {
            display: block;
        }

        .history {
            display: flex;
            gap: 5px;
            overflow-x: auto;
            padding: 10px 0;
            margin-bottom: 15px;
        }

        .history-item {
            min-width: 30px;
            height: 30px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 600;
        }

        .history-item.player {
            background: #00c74d;
        }

        .history-item.banker {
            background: #e74c3c;
        }

        .history-item.tie {
            background: #f39c12;
        }
    </style>
</head>
<body>
<div class="header">
    <h1>🎴 Baccarat</h1>
    <div class="balance">₴<span id="balance">1000.00</span></div>
</div>

<div class="game-container">
    <div class="history" id="history"></div>

    <div class="cards-area">
        <div class="hand">
            <div class="hand-title">Гравець</div>
            <div class="cards" id="playerCards"></div>
            <div id="playerScore"></div>
        </div>

        <div class="hand">
            <div class="hand-title">Банкір</div>
            <div class="cards" id="bankerCards"></div>
            <div id="bankerScore"></div>
        </div>
    </div>

    <div class="betting-area">
        <div class="bet-title">Оберіть ставку</div>
        <div class="bet-options">
            <div class="bet-option" data-bet="player">
                <div class="bet-label">Гравець</div>
                <div class="bet-multiplier">2.00×</div>
            </div>
            <div class="bet-option" data-bet="banker">
                <div class="bet-label">Банкір</div>
                <div class="bet-multiplier">1.95×</div>
            </div>
            <div class="bet-option" data-bet="tie">
                <div class="bet-label">Нічия</div>
                <div class="bet-multiplier">9.00×</div>
            </div>
        </div>

        <div class="bet-amount-section">
            <div class="bet-title">Сума ставки</div>
            <div class="bet-input-wrapper">
                <input type="number" class="bet-input" id="betAmount" value="10" min="1" step="1">
            </div>
            <div class="quick-bets">
                <button class="quick-bet" data-amount="10">10</button>
                <button class="quick-bet" data-amount="50">50</button>
                <button class="quick-bet" data-amount="100">100</button>
                <button class="quick-bet" data-amount="500">500</button>
            </div>
        </div>

        <button class="play-button" id="playButton">Грати</button>
    </div>
</div>

<div class="overlay" id="overlay"></div>
<div class="result-popup" id="resultPopup">
    <div class="result-icon" id="resultIcon"></div>
    <div class="result-text" id="resultText"></div>
    <div class="result-amount" id="resultAmount"></div>
</div>

<script>
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    let balance = 1000;
    let selectedBet = null;
    let isPlaying = false;
    let history = [];

    const betOptions = document.querySelectorAll('.bet-option');
    const playButton = document.getElementById('playButton');
    const betAmountInput = document.getElementById('betAmount');
    const quickBets = document.querySelectorAll('.quick-bet');
    const balanceEl = document.getElementById('balance');

    betOptions.forEach(option => {
        option.addEventListener('click', () => {
            if (isPlaying) return;
            betOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            selectedBet = option.dataset.bet;
        });
    });

    quickBets.forEach(btn => {
        btn.addEventListener('click', () => {
            betAmountInput.value = btn.dataset.amount;
        });
    });

    playButton.addEventListener('click', playGame);

    function createDeck() {
        const deck = [];
        for (let i = 0; i < 8; i++) {
            for (let suit of suits) {
                for (let value of values) {
                    deck.push({ suit, value });
                }
            }
        }
        return shuffle(deck);
    }

    function shuffle(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    function getCardValue(card) {
        if (card.value === 'A') return 1;
        if (['J', 'Q', 'K'].includes(card.value)) return 0;
        return parseInt(card.value);
    }

    function calculateScore(cards) {
        return cards.reduce((sum, card) => sum + getCardValue(card), 0) % 10;
    }

    function displayCard(card) {
        const isRed = ['♥', '♦'].includes(card.suit);
        return `
                <div class="card ${isRed ? 'red' : 'black'}">
                    <div class="card-value">${card.value}</div>
                    <div class="card-suit">${card.suit}</div>
                </div>
            `;
    }

    function displayScore(score, type) {
        const className = type === 'player' ? 'score' : type === 'banker' ? 'score banker' : 'score tie';
        return `<span class="${className}">Очки: ${score}</span>`;
    }

    async function playGame() {
        if (!selectedBet) {
            alert('Оберіть тип ставки!');
            return;
        }

        const betAmount = parseFloat(betAmountInput.value);
        if (betAmount <= 0 || betAmount > balance) {
            alert('Невірна сума ставки!');
            return;
        }

        isPlaying = true;
        playButton.disabled = true;
        balance -= betAmount;
        updateBalance();

        betOptions.forEach(o => {
            o.classList.remove('win', 'lose');
        });

        const deck = createDeck();
        const playerCards = [deck.pop(), deck.pop()];
        const bankerCards = [deck.pop(), deck.pop()];

        document.getElementById('playerCards').innerHTML = '';
        document.getElementById('bankerCards').innerHTML = '';
        document.getElementById('playerScore').innerHTML = '';
        document.getElementById('bankerScore').innerHTML = '';

        await delay(200);
        document.getElementById('playerCards').innerHTML = displayCard(playerCards[0]);
        await delay(200);
        document.getElementById('bankerCards').innerHTML = displayCard(bankerCards[0]);
        await delay(200);
        document.getElementById('playerCards').innerHTML += displayCard(playerCards[1]);
        await delay(200);
        document.getElementById('bankerCards').innerHTML += displayCard(bankerCards[1]);

        let playerScore = calculateScore(playerCards);
        let bankerScore = calculateScore(bankerCards);

        document.getElementById('playerScore').innerHTML = displayScore(playerScore, 'player');
        document.getElementById('bankerScore').innerHTML = displayScore(bankerScore, 'banker');

        if (playerScore < 8 && bankerScore < 8) {
            if (playerScore <= 5) {
                await delay(500);
                const newCard = deck.pop();
                playerCards.push(newCard);
                document.getElementById('playerCards').innerHTML += displayCard(newCard);
                playerScore = calculateScore(playerCards);
                document.getElementById('playerScore').innerHTML = displayScore(playerScore, 'player');
            }

            const playerThirdCard = playerCards[2] ? getCardValue(playerCards[2]) : null;
            let bankerDraws = false;

            if (playerThirdCard === null) {
                bankerDraws = bankerScore <= 5;
            } else {
                if (bankerScore <= 2) bankerDraws = true;
                else if (bankerScore === 3) bankerDraws = playerThirdCard !== 8;
                else if (bankerScore === 4) bankerDraws = [2,3,4,5,6,7].includes(playerThirdCard);
                else if (bankerScore === 5) bankerDraws = [4,5,6,7].includes(playerThirdCard);
                else if (bankerScore === 6) bankerDraws = [6,7].includes(playerThirdCard);
            }

            if (bankerDraws) {
                await delay(500);
                const newCard = deck.pop();
                bankerCards.push(newCard);
                document.getElementById('bankerCards').innerHTML += displayCard(newCard);
                bankerScore = calculateScore(bankerCards);
                document.getElementById('bankerScore').innerHTML = displayScore(bankerScore, 'banker');
            }
        }

        await delay(800);

        let result;
        let winAmount = 0;

        if (playerScore > bankerScore) {
            result = 'player';
            if (selectedBet === 'player') {
                winAmount = betAmount * 2;
                balance += winAmount;
            }
        } else if (bankerScore > playerScore) {
            result = 'banker';
            if (selectedBet === 'banker') {
                winAmount = betAmount * 1.95;
                balance += winAmount;
            }
        } else {
            result = 'tie';
            if (selectedBet === 'tie') {
                winAmount = betAmount * 9;
                balance += winAmount;
            } else {
                balance += betAmount;
            }
        }

        updateBalance();
        addToHistory(result);
        showResult(result, winAmount, betAmount);

        betOptions.forEach(option => {
            if (option.dataset.bet === result) {
                option.classList.add('win');
            } else if (result !== 'tie' || option.dataset.bet !== selectedBet) {
                option.classList.add('lose');
            }
        });

        isPlaying = false;
        playButton.disabled = false;
    }

    function updateBalance() {
        balanceEl.textContent = balance.toFixed(2);
    }

    function addToHistory(result) {
        history.unshift(result);
        if (history.length > 20) history.pop();

        const historyEl = document.getElementById('history');
        historyEl.innerHTML = history.map(r =>
            `<div class="history-item ${r}">${r[0].toUpperCase()}</div>`
        ).join('');
    }

    function showResult(result, winAmount, betAmount) {
        const overlay = document.getElementById('overlay');
        const popup = document.getElementById('resultPopup');
        const icon = document.getElementById('resultIcon');
        const text = document.getElementById('resultText');
        const amount = document.getElementById('resultAmount');

        if (winAmount > betAmount) {
            icon.textContent = '🎉';
            text.textContent = 'Виграш!';
            text.className = 'result-text win';
            amount.textContent = `+₴${(winAmount - betAmount).toFixed(2)}`;
            amount.style.color = '#00c74d';
        } else if (winAmount === betAmount && result === 'tie') {
            icon.textContent = '↩️';
            text.textContent = 'Повернення';
            text.className = 'result-text';
            amount.textContent = `₴${winAmount.toFixed(2)}`;
            amount.style.color = '#f39c12';
        } else {
            icon.textContent = '😔';
            text.textContent = 'Програш';
            text.className = 'result-text lose';
            amount.textContent = `-₴${betAmount.toFixed(2)}`;
            amount.style.color = '#e74c3c';
        }

        overlay.classList.add('show');
        popup.classList.add('show');

        setTimeout(() => {
            overlay.classList.remove('show');
            popup.classList.remove('show');
        }, 2500);
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
</script>
</body>
</html>