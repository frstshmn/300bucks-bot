document.addEventListener("DOMContentLoaded", () => {
    const rouletteWheel = document.getElementById("rouletteWheel");
    const ball = document.getElementById("ball");
    const placeBetButton = document.getElementById("placeBetButton");
    const resultDisplay = document.getElementById("resultDisplay");
    const balanceDisplay = document.getElementById("balance");

    let balance = 1000;
    let bets = [];
    let selectedChipValue = 1;

    const rouletteNumbers = [
        { number: 0, color: "green" },
        { number: 32, color: "black" },
        { number: 15, color: "red" },
        { number: 19, color: "black" },
        { number: 4, color: "red" },
        { number: 21, color: "black" },
        { number: 2, color: "red" },
        { number: 25, color: "black" },
        { number: 17, color: "red" },
        { number: 34, color: "black" },
        { number: 6, color: "red" },
        { number: 27, color: "black" },
        { number: 13, color: "red" },
        { number: 36, color: "black" },
        { number: 11, color: "red" },
        { number: 30, color: "black" },
        { number: 8, color: "red" },
        { number: 23, color: "black" },
        { number: 10, color: "red" },
        { number: 5, color: "black" },
        { number: 24, color: "red" },
        { number: 16, color: "black" },
        { number: 33, color: "red" },
        { number: 1, color: "black" },
        { number: 20, color: "red" },
        { number: 14, color: "black" },
        { number: 31, color: "red" },
        { number: 9, color: "black" },
        { number: 22, color: "red" },
        { number: 18, color: "black" },
        { number: 29, color: "red" },
        { number: 7, color: "black" },
        { number: 28, color: "red" },
        { number: 12, color: "black" },
        { number: 35, color: "red" },
        { number: 3, color: "black" },
        { number: 26, color: "red" }
    ];

    function rotateBall(number) {
        const angle = (rouletteNumbers.findIndex(n => n.number === number) * (360 / 37)) + (360 * 3);
        ball.style.transition = 'transform 4s ease-out';
        ball.style.transform = `rotate(${angle}deg)`;
    }

    function selectBet(e) {
        const bet = e.target;
        const number = bet.getAttribute("data-number");
        bets.push({ number: parseInt(number), value: selectedChipValue });
        bet.classList.add("selected");
    }

    function selectChip(e) {
        const chip = e.target;
        const value = chip.getAttribute("data-value");
        selectedChipValue = parseInt(value);
        document.querySelectorAll(".chip").forEach(chip => chip.classList.remove("selected"));
        chip.classList.add("selected");
    }

    function placeBet() {
        if (bets.length === 0) {
            alert("Please place a bet.");
            return;
        }

        let winningNumber = rouletteNumbers[Math.floor(Math.random() * 37)].number;
        rotateBall(winningNumber);

        setTimeout(() => {
            let winningBets = bets.filter(bet => bet.number === winningNumber);
            if (winningBets.length > 0) {
                let totalWinnings = winningBets.reduce((acc, bet) => acc + (bet.value * 36), 0);
                balance += totalWinnings;
                resultDisplay.innerHTML = `Winning Number: ${winningNumber}. You win: ${totalWinnings}. Balance: ${balance}`;
            } else {
                resultDisplay.innerHTML = `Winning Number: ${winningNumber}. You lose. Balance: ${balance}`;
            }
            balanceDisplay.textContent = balance;
            bets = [];
            document.querySelectorAll(".bet").forEach(bet => bet.classList.remove("selected"));
        }, 4000);
    }

    document.querySelectorAll(".bet").forEach(bet => bet.addEventListener("click", selectBet));
    document.querySelectorAll(".chip").forEach(chip => chip.addEventListener("click", selectChip));
    placeBetButton.addEventListener("click", placeBet);
});
