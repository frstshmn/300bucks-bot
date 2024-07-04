document.addEventListener("DOMContentLoaded", () => {
    const rouletteWheel = document.getElementById("roulette-wheel");
    const ball = document.getElementById("ball");
    const numbersGrid = document.getElementById("numbers-grid");
    const chips = document.getElementById("chips");
    const placeBetButton = document.getElementById("place-bet");
    const resultDisplay = document.getElementById("result");
    const balanceDisplay = document.getElementById("balance");

    let balance = 1000;
    let selectedChipValue = 1;
    let bets = [];

    const rouletteNumbers = [
        { number: 0, color: "green" },
        { number: 32, color: "red" },
        { number: 15, color: "black" },
        { number: 19, color: "red" },
        { number: 4, color: "black" },
        { number: 21, color: "red" },
        { number: 2, color: "black" },
        { number: 25, color: "red" },
        { number: 17, color: "black" },
        { number: 34, color: "red" },
        { number: 6, color: "black" },
        { number: 27, color: "red" },
        { number: 13, color: "black" },
        { number: 36, color: "red" },
        { number: 11, color: "black" },
        { number: 30, color: "red" },
        { number: 8, color: "black" },
        { number: 23, color: "red" },
        { number: 10, color: "black" },
        { number: 5, color: "red" },
        { number: 24, color: "black" },
        { number: 16, color: "red" },
        { number: 33, color: "black" },
        { number: 1, color: "red" },
        { number: 20, color: "black" },
        { number: 14, color: "red" },
        { number: 31, color: "black" },
        { number: 9, color: "red" },
        { number: 22, color: "black" },
        { number: 18, color: "red" },
        { number: 29, color: "black" },
        { number: 7, color: "red" },
        { number: 28, color: "black" },
        { number: 12, color: "red" },
        { number: 35, color: "black" },
        { number: 3, color: "red" },
        { number: 26, color: "black" },
    ];

    function initializeWheel() {
        rouletteNumbers.forEach((entry, index) => {
            const numberDiv = document.createElement("div");
            numberDiv.classList.add("number");
            numberDiv.textContent = entry.number;
            numberDiv.style.transform = `rotate(${index * (360 / rouletteNumbers.length)}deg) translate(0, -180px)`;
            rouletteWheel.appendChild(numberDiv);
        });
    }

    function initializeBets() {
        document.querySelectorAll(".bet").forEach(bet => {
            bet.addEventListener("click", () => {
                if (bet.classList.contains("selected")) {
                    bet.classList.remove("selected");
                    bets = bets.filter(b => b !== parseInt(bet.textContent));
                } else {
                    bet.classList.add("selected");
                    bets.push(parseInt(bet.textContent));
                }
            });
        });

        chips.querySelectorAll(".chip").forEach(chip => {
            chip.addEventListener("click", () => {
                selectedChipValue = parseInt(chip.dataset.value);
                chips.querySelectorAll(".chip").forEach(c => c.classList.remove("selected"));
                chip.classList.add("selected");
            });
        });
    }

    placeBetButton.addEventListener("click", () => {
        if (bets.length === 0) {
            resultDisplay.textContent = "No bets placed.";
            return;
        }

        const randomIndex = Math.floor(Math.random() * rouletteNumbers.length);
        const winningNumber = rouletteNumbers[randomIndex];

        rouletteWheel.style.transform = `rotate(${(randomIndex * (360 / rouletteNumbers.length)) + (360 * 5)}deg)`;
        ball.style.transform = `rotate(${(randomIndex * (360 / rouletteNumbers.length)) + (360 * 5)}deg) translate(0, -180px)`;

        setTimeout(() => {
            resultDisplay.textContent = `Winning Number: ${winningNumber.number}`;
            if (bets.includes(winningNumber.number)) {
                const winnings = bets.length * selectedChipValue * 35;
                balance += winnings;
                resultDisplay.textContent += ` You win ${winnings}!`;
            } else {
                balance -= bets.length * selectedChipValue;
                resultDisplay.textContent += " You lose.";
            }
            balanceDisplay.textContent = `Balance: ${balance}`;
        }, 4000);
    });

    initializeWheel();
    initializeBets();
});
