// script.js

document.addEventListener('DOMContentLoaded', function() {
    const numbers = document.querySelectorAll('.number');
    const balanceDisplay = document.getElementById('balance');
    const betAmountInput = document.getElementById('bet-amount');
    const placeBetButton = document.getElementById('place-bet');
    const resultDisplay = document.getElementById('result');
    const ball = document.getElementById('ball');

    let balance = 1000;
    let bets = [];

    numbers.forEach(number => {
        number.addEventListener('click', function() {
            this.classList.toggle('selected');
            const number = this.getAttribute('data-number');
            if (bets.includes(number)) {
                bets = bets.filter(bet => bet !== number);
            } else {
                bets.push(number);
            }
        });
    });

    placeBetButton.addEventListener('click', function() {
        const betAmount = parseFloat(betAmountInput.value);

        if (isNaN(betAmount) || betAmount <= 0) {
            resultDisplay.textContent = 'Please enter a valid bet amount.';
            return;
        }

        if (betAmount > balance) {
            resultDisplay.textContent = 'Insufficient balance.';
            return;
        }

        balance -= betAmount;
        updateBalance();

        const winningNumber = Math.floor(Math.random() * 37);
        moveBall(winningNumber);

        if (bets.includes(winningNumber.toString())) {
            const profit = betAmount * 35;
            balance += profit;
            resultDisplay.textContent = `You win! Number: ${winningNumber}. Profit: ${profit.toFixed(2)} $`;
        } else {
            resultDisplay.textContent = `You lose. Number: ${winningNumber}`;
        }

        updateBalance();
        bets = [];
        document.querySelectorAll('.selected').forEach(cell => cell.classList.remove('selected'));
    });

    function updateBalance() {
        balanceDisplay.textContent = balance.toFixed(2);
    }

    function moveBall(number) {
        // Simplified animation for the ball
        const angle = number * 360 / 37;
        ball.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    }
});
