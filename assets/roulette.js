/* script.js */
document.addEventListener('DOMContentLoaded', function() {
    const rouletteWheel = document.getElementById('roulette-wheel');
    const ball = document.getElementById('ball');
    const numbersGrid = document.getElementById('numbers-grid');
    const chips = document.querySelectorAll('.chip');
    const betAmountInput = document.getElementById('bet-amount');
    const placeBetButton = document.getElementById('place-bet');
    const resultDisplay = document.getElementById('result');
    const balanceDisplay = document.getElementById('balance');

    let balance = 1000;
    let bets = [];

    // Initialize roulette wheel numbers and colors
    const rouletteNumbers = [
        {number: '0', color: 'green'},
        {number: '32', color: 'red'},
        {number: '15', color: 'black'},
        {number: '19', color: 'red'},
        {number: '4', color: 'black'},
        {number: '21', color: 'red'},
        {number: '2', color: 'black'},
        {number: '25', color: 'red'},
        {number: '17', color: 'black'},
        {number: '34', color: 'red'},
        {number: '6', color: 'black'},
        {number: '27', color: 'red'},
        {number: '13', color: 'black'},
        {number: '36', color: 'red'},
        {number: '11', color: 'black'},
        {number: '30', color: 'red'},
        {number: '8', color: 'black'},
        {number: '23', color: 'red'},
        {number: '10', color: 'black'},
        {number: '5', color: 'red'},
        {number: '24', color: 'black'},
        {number: '16', color: 'red'},
        {number: '33', color: 'black'},
        {number: '1', color: 'red'},
        {number: '20', color: 'black'},
        {number: '14', color: 'red'},
        {number: '31', color: 'black'},
        {number: '9', color: 'red'},
        {number: '22', color: 'black'},
        {number: '18', color: 'red'},
        {number: '29', color: 'black'},
        {number: '7', color: 'red'},
        {number: '28', color: 'black'},
        {number: '12', color: 'red'},
        {number: '35', color: 'black'},
        {number: '3', color: 'red'},
        {number: '26', color: 'black'}
    ];

    // Add numbers to the roulette wheel
    rouletteNumbers.forEach((num, index) => {
        const numberElement = document.createElement('div');
        numberElement.classList.add('number');
        numberElement.textContent = num.number;
        numberElement.style.color = num.color;
        numberElement.style.transform = `rotate(${index * (360 / rouletteNumbers.length)}deg) translate(-50%, -50%)`;
        rouletteWheel.appendChild(numberElement);
    });

    // Create the betting grid
    for (let i = 0; i < 37; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = i;
        cell.setAttribute('data-number', i);
        if (i === 0) {
            cell.classList.add('green');
        } else if ([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(i)) {
            cell.classList.add('red');
        } else {
            cell.classList.add('black');
        }
        numbersGrid.appendChild(cell);

        cell.addEventListener('click', function() {
            this.classList.toggle('selected');
            const number = this.getAttribute('data-number');
            if (bets.includes(number)) {
                bets = bets.filter(bet => bet !== number);
            } else {
                bets.push(number);
            }
        });
    }

    // Chip selection logic
    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            const chipValue = parseFloat(this.getAttribute('data-value'));
            betAmountInput.value = chipValue;
        });
    });

    // Place bet button click handler
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

        const winningNumber = spinWheel();
        const win = bets.includes(String(winningNumber));
        animateResult(winningNumber, win, betAmount);
    });

    function spinWheel() {
        const randomIndex = Math.floor(Math.random() * rouletteNumbers.length);
        const winningNumber = rouletteNumbers[randomIndex].number;

        const rotationDegree = 3600 + randomIndex * (360 / rouletteNumbers.length);
        rouletteWheel.style.transform = `rotate(${rotationDegree}deg)`;

        return winningNumber;
    }

    function animateResult(winningNumber, win, betAmount) {
        setTimeout(() => {
            ball.style.transform = `rotate(${winningNumber * (360 / rouletteNumbers.length)}deg) translate(50%, 0)`;

            if (win) {
                const profit = betAmount * 36; // Assuming single number payout
                balance += profit;
                resultDisplay.textContent = `You win! Number: ${winningNumber}. Profit: ${profit.toFixed(2)}`;
            } else {
                resultDisplay.textContent = `You lose. Number: ${winningNumber}`;
            }

            updateBalance();
        }, 4000); // Wait for the wheel to stop spinning
    }

    function updateBalance() {
        balanceDisplay.textContent = `Balance: ${balance.toFixed(2)}`;
    }
});
