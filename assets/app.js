Telegram.WebApp.ready();

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
        } else {
            status = 1;
            $('#spin').prop('disabled', true);
            $('#stop').prop('disabled', false);
        }

        if (balance < bet) {
            Telegram.WebApp.showAlert('Not enough balance to spin');
            return;
        }

        $('input[name="bet"]').prop('disabled', true);

        balance -= bet;
        $('#balance').text(balance);

        if (intervalId1) {
            clearInterval(intervalId1);
        }
        if (intervalId2) {
            clearInterval(intervalId2);
        }
        if (intervalId3) {
            clearInterval(intervalId3);
        }

        setTimeout(function () {
            $('#reel-1').addClass('reel-spinning');
            intervalId1 = setInterval(function () {
                $('#reel-1').text(emojis[Math.floor(Math.random() * emojis.length)]);
            }, spintime);
        }, 0); // Start spinning immediately

        setTimeout(function () {
            $('#reel-2').addClass('reel-spinning');
            intervalId2 = setInterval(function () {
                $('#reel-2').text(emojis[Math.floor(Math.random() * emojis.length)]);
            }, spintime);
        }, 500); // Start spinning after 500 milliseconds

        setTimeout(function () {
            $('#reel-3').addClass('reel-spinning');
            intervalId3 = setInterval(function () {
                $('#reel-3').text(emojis[Math.floor(Math.random() * emojis.length)]);
            }, spintime);
        }, 1000); // Start spinning after 1000 milliseconds
    });

    $('#stop').click(function() {
        setTimeout(function() {
            $('#reel-1').removeClass('reel-spinning');
            if (intervalId1) {
                clearInterval(intervalId1);
            }
        }, 0); // Stop spinning immediately

        setTimeout(function() {
            $('#reel-2').removeClass('reel-spinning');
            if (intervalId2) {
                clearInterval(intervalId2);
            }
        }, 500); // Stop spinning after 500 milliseconds

        setTimeout(function() {
            $('#reel-3').removeClass('reel-spinning');
            if (intervalId3) {
                clearInterval(intervalId3);
            }

            setTimeout(function() {
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
                $('input[name="bet"]').prop('disabled', false);

                status = 0;
                $('#spin').prop('disabled', false);
                $('#stop').prop('disabled', true);

            }, 500); // Stop spinning after 1000 milliseconds
        }, 1000); // Stop spinning after 1000 milliseconds
    });
});