<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Baccarat - Stake Style</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #0f212e, #1a2c38);
            color: #ffffff;
            overflow-x: hidden;
            min-height: 100vh;
            position: relative;
        }

        .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px 0;
        }

        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #00e701;
            text-shadow: 0 0 10px rgba(0, 231, 1, 0.3);
        }

        .balance {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 25px;
            border: 1px solid rgba(0, 231, 1, 0.2);
        }

        .balance-title {
            font-size: 14px;
            opacity: 0.7;
            margin-bottom: 5px;
        }

        .balance-amount {
            font-size: 24px;
            font-weight: bold;
            color: #00e701;
        }

        .game-table {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 25px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cards-area {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .hand {
            flex: 1;
            margin: 0 10px;
        }

        .hand-title {
            text-align: center;
            font-size: 14px;
            margin-bottom: 10px;
            opacity: 0.8;
        }

        .cards {
            display: flex;
            justify-content: center;
            gap: 5px;
            margin-bottom: 10px;
            min-height: 70px;
            align-items: center;
        }

        .card {
            width: 45px;
            height: 65px;
            background: #ffffff;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 12px;
            color: #000;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            animation: cardFlip 0.5s ease-in-out;
        }

        .card.red {
            color: #dc2626;
        }

        .card.black {
            color: #000000;
        }

        @keyframes cardFlip {
            0% { transform: rotateY(180deg); opacity: 0; }
            100% { transform: rotateY(0deg); opacity: 1; }
        }

        .hand-total {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: #00e701;
        }

        .betting-area {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 25px;
        }

        .bet-option {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .bet-option:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
        }

        .bet-option.selected {
            border-color: #00e701;
            background: rgba(0, 231, 1, 0.1);
            box-shadow: 0 0 20px rgba(0, 231, 1, 0.2);
        }

        .bet-option.tie {
            grid-column: span 2;
        }

        .bet-label {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .bet-payout {
            font-size: 12px;
            opacity: 0.7;
        }

        .bet-amount {
            font-size: 14px;
            color: #00e701;
            font-weight: bold;
            margin-top: 5px;
        }

        .bet-input {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 20px;
            color: #ffffff;
            font-size: 16px;
            width: 100%;
            text-align: center;
        }

        .bet-input:focus {
            outline: none;
            border-color: #00e701;
            box-shadow: 0 0 10px rgba(0, 231, 1, 0.3);
        }

        .deal-button {
            background: linear-gradient(45deg, #00e701, #00b801);
            border: none;
            border-radius: 12px;
            padding: 18px;
            font-size: 18px;
            font-weight: bold;
            color: #ffffff;
            cursor: pointer;
            width: 100%;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 231, 1, 0.3);
        }

        .deal-button:hover {
            background: linear-gradient(45deg, #00b801, #009601);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 231, 1, 0.4);
        }

        .deal-button:disabled {
            background: rgba(255, 255, 255, 0.2);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .modal.show {
            opacity: 1;
            visibility: visible;
        }

        .modal-content {
            background: linear-gradient(135deg, #1a2c38, #0f212e);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            max-width: 300px;
            width: 90%;
            border: 2px solid rgba(0, 231, 1, 0.3);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            animation: modalBounce 0.5s ease-out;
        }

        @keyframes modalBounce {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
        }

        .modal-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #00e701;
            text-shadow: 0 0 10px rgba(0, 231, 1, 0.3);
        }

        .modal-text {
            font-size: 16px;
            line-height: 1.5;
            opacity: 0.9;
        }

        .win {
            color: #00e701;
        }

        .lose {
            color: #ff4757;
        }

        .tie {
            color: #ffa726;
        }

        .game-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 20px;
        }

        .stat-item {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 10px;
            text-align: center;
        }

        .stat-label {
            font-size: 12px;
            opacity: 0.7;
            margin-bottom: 5px;
        }

        .stat-value {
            font-size: 16px;
            font-weight: bold;
            color: #00e701;
        }

        .loading-animation {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(0, 231, 1, 0.3);
            border-radius: 50%;
            border-top-color: #00e701;
            animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <div class="logo">BACCARAT</div>
    </div>

    <div class="balance">
        <div class="balance-title">Баланс</div>
        <div class="balance-amount">$<span id="balance">300</span></div>
    </div>

    <div class="game-stats">
        <div class="stat-item">
            <div class="stat-label">Виграші</div>
            <div class="stat-value" id="wins">0</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Програші</div>
            <div class="stat-value" id="losses">0</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Нічиї</div>
            <div class="stat-value" id="ties">0</div>
        </div>
    </div>

    <div class="game-table">
        <div class="cards-area">
            <div class="hand">
                <div class="hand-title">Гравець</div>
                <div class="cards" id="playerCards"></div>
                <div class="hand-total">Сума: <span id="playerTotal">0</span></div>
            </div>
            <div class="hand">
                <div class="hand-title">Банкір</div>
                <div class="cards" id="bankerCards"></div>
                <div class="hand-total">Сума: <span id="bankerTotal">0</span></div>
            </div>
        </div>
    </div>

    <div class="betting-area">
        <div class="bet-option" data-bet="player">
            <div class="bet-label">Гравець</div>
            <div class="bet-payout">2:1</div>
            <div class="bet-amount" id="playerBet">$0</div>
        </div>
        <div class="bet-option" data-bet="banker">
            <div class="bet-label">Банкір</div>
            <div class="bet-payout">1.95:1</div>
            <div class="bet-amount" id="bankerBet">$0</div>
        </div>
        <div class="bet-option tie" data-bet="tie">
            <div class="bet-label">Нічия</div>
            <div class="bet-payout">9:1</div>
            <div class="bet-amount" id="tieBet">$0</div>
        </div>
    </div>

    <input type="number" class="bet-input" id="betAmount" placeholder="Введіть ставку" min="10" max="1000">

    <button class="deal-button" id="dealButton">Роздати карти</button>
</div>

<div class="modal" id="resultModal">
    <div class="modal-content">
        <div class="modal-title" id="modalTitle"></div>
        <div class="modal-text" id="modalText"></div>
    </div>
</div>

<script>
    class BaccaratGame {
        constructor() {
            this.balance = 300;
            this.wins = 0;
            this.losses = 0;
            this.ties = 0;
            this.currentBet = { type: null, amount: 0 };
            this.deck = [];
            this.playerCards = [];
            this.bankerCards = [];
            this.gameInProgress = false;

            this.initializeGame();
        }

        initializeGame() {
            this.setupEventListeners();
            this.updateDisplay();
        }

        setupEventListeners() {
            document.querySelectorAll('.bet-option').forEach(option => {
                option.addEventListener('click', (e) => this.selectBet(e.target.closest('.bet-option')));
            });

            document.getElementById('dealButton').addEventListener('click', () => this.dealCards());
            document.getElementById('betAmount').addEventListener('input', () => this.updateBetDisplay());
        }

        selectBet(option) {
            if (this.gameInProgress) return;

            document.querySelectorAll('.bet-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            this.currentBet.type = option.dataset.bet;
            this.updateBetDisplay();
        }

        updateBetDisplay() {
            const betAmount = parseInt(document.getElementById('betAmount').value) || 0;
            this.currentBet.amount = betAmount;

            document.getElementById('playerBet').textContent = '$0';
            document.getElementById('bankerBet').textContent = '$0';
            document.getElementById('tieBet').textContent = '$0';

            if (this.currentBet.type && betAmount > 0) {
                document.getElementById(`${this.currentBet.type}Bet`).textContent = `$${betAmount}`;
            }
        }

        createDeck() {
            this.deck = [];
            const suits = ['♠', '♥', '♦', '♣'];
            const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

            for (let suit of suits) {
                for (let rank of ranks) {
                    this.deck.push({ suit, rank });
                }
            }

            this.shuffleDeck();
        }

        shuffleDeck() {
            for (let i = this.deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
            }
        }

        drawCard() {
            return this.deck.pop();
        }

        getCardValue(card) {
            if (card.rank === 'A') return 1;
            if (['J', 'Q', 'K'].includes(card.rank)) return 0;
            return parseInt(card.rank);
        }

        calculateHandValue(cards) {
            return cards.reduce((sum, card) => sum + this.getCardValue(card), 0) % 10;
        }

        displayCard(card) {
            const cardElement = document.createElement('div');
            cardElement.className = `card ${(['♥', '♦'].includes(card.suit)) ? 'red' : 'black'}`;
            cardElement.textContent = `${card.rank}${card.suit}`;
            return cardElement;
        }

        async dealCards() {
            if (this.gameInProgress) return;

            const betAmount = parseInt(document.getElementById('betAmount').value) || 0;
            if (!this.currentBet.type || betAmount <= 0) {
                this.showModal('Помилка', 'Виберіть тип ставки та введіть суму!', 'lose');
                return;
            }

            if (betAmount > this.balance) {
                this.showModal('Помилка', 'Недостатньо коштів!', 'lose');
                return;
            }

            this.gameInProgress = true;
            document.getElementById('dealButton').disabled = true;
            document.getElementById('dealButton').innerHTML = '<span class="loading-animation"></span> Роздача...';

            this.createDeck();
            this.playerCards = [];
            this.bankerCards = [];

            document.getElementById('playerCards').innerHTML = '';
            document.getElementById('bankerCards').innerHTML = '';

            await this.sleep(500);

            // Початкова роздача
            this.playerCards.push(this.drawCard());
            this.bankerCards.push(this.drawCard());
            this.playerCards.push(this.drawCard());
            this.bankerCards.push(this.drawCard());

            // Показуємо карти з анімацією
            for (let i = 0; i < 2; i++) {
                await this.sleep(300);
                document.getElementById('playerCards').appendChild(this.displayCard(this.playerCards[i]));
                await this.sleep(300);
                document.getElementById('bankerCards').appendChild(this.displayCard(this.bankerCards[i]));
            }

            this.updateTotals();

            const playerTotal = this.calculateHandValue(this.playerCards);
            const bankerTotal = this.calculateHandValue(this.bankerCards);

            // Правила третьої карти
            if (playerTotal <= 5 && bankerTotal <= 5) {
                await this.sleep(1000);

                if (playerTotal <= 5) {
                    this.playerCards.push(this.drawCard());
                    document.getElementById('playerCards').appendChild(this.displayCard(this.playerCards[2]));
                    await this.sleep(500);
                }

                if (bankerTotal <= 5) {
                    this.bankerCards.push(this.drawCard());
                    document.getElementById('bankerCards').appendChild(this.displayCard(this.bankerCards[2]));
                    await this.sleep(500);
                }

                this.updateTotals();
            }

            await this.sleep(1000);
            this.determineWinner();
        }

        updateTotals() {
            document.getElementById('playerTotal').textContent = this.calculateHandValue(this.playerCards);
            document.getElementById('bankerTotal').textContent = this.calculateHandValue(this.bankerCards);
        }

        determineWinner() {
            const playerTotal = this.calculateHandValue(this.playerCards);
            const bankerTotal = this.calculateHandValue(this.bankerCards);

            let result;
            let winnings = 0;

            if (playerTotal > bankerTotal) {
                result = 'player';
            } else if (bankerTotal > playerTotal) {
                result = 'banker';
            } else {
                result = 'tie';
            }

            if (this.currentBet.type === result) {
                if (result === 'player') {
                    winnings = this.currentBet.amount * 2;
                } else if (result === 'banker') {
                    winnings = Math.floor(this.currentBet.amount * 1.95);
                } else if (result === 'tie') {
                    winnings = this.currentBet.amount * 9;
                }

                this.balance += winnings;
                this.wins++;
                this.showModal('Перемога!', `Ви виграли ₴${winnings}!`, 'win');
            } else {
                this.balance -= this.currentBet.amount;
                this.losses++;
                this.showModal('Програш', `Ви програли ₴${this.currentBet.amount}`, 'lose');
            }

            if (result === 'tie') {
                this.ties++;
            }

            this.updateDisplay();
            this.resetGame();
        }

        showModal(title, text, type) {
            const modal = document.getElementById('resultModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalText = document.getElementById('modalText');

            modalTitle.textContent = title;
            modalText.textContent = text;
            modalTitle.className = `modal-title ${type}`;

            modal.classList.add('show');

            setTimeout(() => {
                modal.classList.remove('show');
            }, 3000);
        }

        resetGame() {
            this.gameInProgress = false;
            document.getElementById('dealButton').disabled = false;
            document.getElementById('dealButton').textContent = 'Роздати карти';
            document.querySelectorAll('.bet-option').forEach(opt => opt.classList.remove('selected'));
            this.currentBet = { type: null, amount: 0 };
            document.getElementById('betAmount').value = '';
            this.updateBetDisplay();
        }

        updateDisplay() {
            document.getElementById('balance').textContent = this.balance;
            document.getElementById('wins').textContent = this.wins;
            document.getElementById('losses').textContent = this.losses;
            document.getElementById('ties').textContent = this.ties;
        }

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }

    // Запуск гри
    document.addEventListener('DOMContentLoaded', () => {
        new BaccaratGame();
    });
</script>
</body>
</html>