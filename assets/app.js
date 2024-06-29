$(document).ready(function() {
    let emojis = ['♥️', '♠️', '♦️', '♣️', '🍋', '🍒', '7️⃣', '🔔', '🍇', '🍉', '🍀', '💰'];
    let intervalId1, intervalId2, intervalId3;
    let status = 0; // 0: not spinning, 1: spinning
    let spintime = 250;
    let balance = 300;
    let bet = parseInt($('input[name="bet"]:checked').val());

    $('input[name="bet"]').change(function() {
        bet = parseInt($(this).val());
    });

    $('#spin').click(function() {
        if (status === 1) {
            Telegram.WebApp.showAlert('Please wait for the current spin to finish');
            return;
        }

        if (balance < bet) {
            Telegram.WebApp.showAlert('Not enough balance to spin');
            return;
        }

        status = 1;
        $('#spin').prop('disabled', true);
        $('#stop').prop('disabled', false);
        $('input[name="bet"]').prop('disabled', true);
        balance -= bet;
        $('#balance').text(balance);

        startReels();
    });

    $('#stop').click(function() {
        stopReels();
    });

    function startReels() {
        if (intervalId1) clearInterval(intervalId1);
        if (intervalId2) clearInterval(intervalId2);
        if (intervalId3) clearInterval(intervalId3);

        $('#reel-1').addClass('reel-spinning');
        intervalId1 = setInterval(() => {
            $('#reel-1').text(emojis[Math.floor(Math.random() * emojis.length)]);
        }, spintime);

        setTimeout(() => {
            $('#reel-2').addClass('reel-spinning');
            intervalId2 = setInterval(() => {
                $('#reel-2').text(emojis[Math.floor(Math.random() * emojis.length)]);
            }, spintime);
        }, 500);

        setTimeout(() => {
            $('#reel-3').addClass('reel-spinning');
            intervalId3 = setInterval(() => {
                $('#reel-3').text(emojis[Math.floor(Math.random() * emojis.length)]);
            }, spintime);
        }, 1000);
    }

    function stopReels() {
        setTimeout(() => {
            clearInterval(intervalId1);
            $('#reel-1').removeClass('reel-spinning');
        }, 0);

        setTimeout(() => {
            clearInterval(intervalId2);
            $('#reel-2').removeClass('reel-spinning');
        }, 500);

        setTimeout(() => {
            clearInterval(intervalId3);
            $('#reel-3').removeClass('reel-spinning');

            checkResults();
            resetSpinButtons();
        }, 1000);
    }

    function checkResults() {
        let reel1 = $('#reel-1').text();
        let reel2 = $('#reel-2').text();
        let reel3 = $('#reel-3').text();

        if (reel1 === reel2 && reel2 === reel3) {
            balance += bet * 10;
        } else if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
            balance += bet * 1.5;
        } else if (emojis.slice(0, 4).includes(reel1) && emojis.slice(0, 4).includes(reel2) && emojis.slice(0, 4).includes(reel3)) {
            balance += bet * 5;
        }

        $('#balance').text(balance);
    }

    function resetSpinButtons() {
        status = 0;
        $('input[name="bet"]').prop('disabled', false);
        $('#spin').prop('disabled', false);
        $('#stop').prop('disabled', true);
    }

    // Mines game code
    const rows = 8;
    const cols = 8;
    let minesCount = 10;
    let gemsFound = 0;
    let multiplier = 1;
    let betAmount = 1;
    let balanceMine = 100;
    let gameStarted = false;

    function getMultiplier(mines) {
        const multipliers = {
            1: 1.03, 2: 1.08, 3: 1.12, 4: 1.18, 5: 1.24, 6: 1.30,
            7: 1.37, 8: 1.46, 9: 1.55, 10: 1.65, 11: 1.77, 12: 1.90,
            13: 2.06, 14: 2.25, 15: 2.47, 16: 2.75, 17: 3.09, 18: 3.54,
            19: 4.12, 20: 4.95, 21: 6.19, 22: 8.00, 23: 12.37, 24: 24.75
        };
        return multipliers[mines] || 1;
    }

    function resetGame() {
        gemsFound = 0;
        minesCount = parseInt($("#mines").val());
        multiplier = getMultiplier(minesCount);
        betAmount = parseInt($("#bet").val());
        gameStarted = true;

        if (balanceMine >= betAmount) {
            balanceMine -= betAmount;
            updateBalance();
        } else {
            $("#result").text("Insufficient balance to place the bet.");
            return;
        }

        $("#result").text('');
        $("td").removeClass("mine gem").addClass("hidden").text('');
        placeItems();
        $("td.hidden").off("click").on("click", cellClickHandler);
        $("#cashout").show();
        $("#restart").hide();
    }

    function updateBalance() {
        $("#balance").text(`Balance: ${balanceMine.toFixed(2)}`);
    }

    function placeItems() {
        const totalCells = rows * cols;
        let allPositions = Array.from(Array(totalCells).keys());
        let minePositions = [];

        while (minePositions.length < minesCount) {
            let minePosition = Math.floor(Math.random() * allPositions.length);
            minePositions.push(allPositions.splice(minePosition, 1)[0]);
        }

        $("td.hidden").each(function(index) {
            if (minePositions.includes(index)) {
                $(this).addClass("mine");
            } else {
                $(this).addClass("gem");
            }
        });
    }

    function cellClickHandler() {
        if ($(this).hasClass("mine")) {
            $(this).removeClass("hidden").addClass("mine").text("💣");
            $("#result").text("Game Over! You hit a mine.");
            $("td.hidden").off("click");
            $("#cashout").hide();
            $("#restart").show();
            gameStarted = false;
        } else if ($(this).hasClass("gem")) {
            $(this).removeClass("hidden").addClass("gem").text("💎");
            gemsFound++;
            $("#result").text(`Gems found: ${gemsFound}. Current multiplier: ${multiplier.toFixed(2)}`);
        } else {
            $(this).removeClass("hidden");
        }
    }

    $("#cashout").click(function() {
        if (gameStarted) {
            let winnings = betAmount * multiplier;
            balanceMine += winnings;
            updateBalance();
            $("#result").text(`You cashed out with ${winnings.toFixed(2)}. Your balance is now ${balanceMine.toFixed(2)}.`);
            $("#cashout").hide();
            $("#restart").show();
            gameStarted = false;
        }
    });

    $("#restart").click(resetGame);
    $("#start").click(resetGame);

    updateBalance();
});
