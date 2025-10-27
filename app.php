<?php
session_start();
require_once 'config.php';
require_once 'db.php';

$user = null;
if (isset($_SESSION['telegram_id'])) {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE telegram_id = ?");
    $stmt->execute([$_SESSION['telegram_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
}
?>

<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>⚣ 300Bucks Casino ⚣</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Nunito Sans', sans-serif;
            background: #0f212e;
            color: #fff;
            overflow-x: hidden;
            padding-bottom: 20px;
        }

        .header {
            background: #1a2c38;
            padding: 16px 20px;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .logo {
            font-size: 24px;
            font-weight: 800;
            text-align: center;
            background: linear-gradient(135deg, #00e701 0%, #00a8cc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 12px;
        }

        .search-container {
            position: relative;
            margin-top: 12px;
        }

        .search-input {
            width: 100%;
            padding: 12px 40px 12px 16px;
            background: #0f212e;
            border: 1px solid #2f4553;
            border-radius: 8px;
            color: #fff;
            font-size: 15px;
            font-family: 'Nunito Sans', sans-serif;
            transition: all 0.3s;
        }

        .search-input:focus {
            outline: none;
            border-color: #00e701;
            box-shadow: 0 0 0 2px rgba(0, 231, 1, 0.1);
        }

        .search-input::placeholder {
            color: #557086;
        }

        .search-icon {
            position: absolute;
            right: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #557086;
            font-size: 18px;
        }

        .promo-slider {
            padding: 20px;
            overflow: hidden;
        }

        .slider-container {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }

        .slides {
            display: flex;
            transition: transform 0.5s ease;
        }

        .slide {
            min-width: 100%;
            height: 160px;
            background: linear-gradient(135deg, #1a2c38 0%, #2f4553 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .slide::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(0,231,1,0.1) 0%, transparent 70%);
            animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }

        .slide h3 {
            font-size: 22px;
            margin-bottom: 8px;
            z-index: 1;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .slide p {
            font-size: 14px;
            color: #b1bad3;
            z-index: 1;
        }

        .slide-dots {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 12px;
        }

        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #2f4553;
            cursor: pointer;
            transition: all 0.3s;
        }

        .dot.active {
            background: #00e701;
            width: 24px;
            border-radius: 4px;
        }

        .section-title {
            padding: 0 20px;
            margin: 24px 0 16px;
            font-size: 20px;
            font-weight: 700;
            color: #fff;
        }

        .games-grid {
            padding: 0 20px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }

        .game {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            background: #1a2c38;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            transition: all 0.3s;
            cursor: pointer;
            text-decoration: none;
            display: block;
        }

        .game:active {
            transform: scale(0.97);
        }

        .game-cover {
            width: 100%;
            height: 180px;
            object-fit: cover;
            display: block;
        }

        .game-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(15,33,46,0.95) 0%, transparent 100%);
            padding: 40px 12px 12px;
        }

        .game-name {
            color: #fff;
            font-size: 16px;
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .no-results {
            text-align: center;
            padding: 60px 20px;
            color: #557086;
            font-size: 16px;
            display: none;
        }

        .no-results.show {
            display: block;
        }

        /* Пульсація для слайдера */
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .game {
            animation: slideIn 0.4s ease forwards;
        }

        .game:nth-child(1) { animation-delay: 0.05s; }
        .game:nth-child(2) { animation-delay: 0.1s; }
        .game:nth-child(3) { animation-delay: 0.15s; }
        .game:nth-child(4) { animation-delay: 0.2s; }
        .game:nth-child(5) { animation-delay: 0.25s; }

        /* Responsive */
        @media (max-width: 360px) {
            .games-grid {
                gap: 10px;
            }

            .game-cover {
                height: 160px;
            }
        }
    </style>
</head>
<body>
<div class="header">
    <div class="logo">⚣ 300Bucks Casino ⚣</div>
    <div class="search-container">
        <input type="text" class="search-input" id="searchInput" placeholder="Пошук ігор...">
        <span class="search-icon">🔍</span>
    </div>
    <div style="margin-top:12px; text-align:center;">
        <?php if (!$user): ?>
            <script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-login="threehunderedbucks_bot" data-size="medium" data-onauth="onTelegramAuth(user)" data-request-access="write"></script>
            <script type="text/javascript">
                function onTelegramAuth(user) {
                    alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
                }
            </script>
        <?php else: ?>
            <div style="display:flex; justify-content:center; align-items:center; gap:12px;">
                <img src="<?= htmlspecialchars($user['photo_url']) ?>" alt="Фото" style="width:40px; height:40px; border-radius:50%;">
                <div>
                    <div><?= htmlspecialchars($user['first_name']) ?> <?= htmlspecialchars($user['last_name']) ?></div>
                    <div>Баланс: $<?= $user['balance'] ?></div>
                </div>
                <a href="logout.php" style="color:#00e701; text-decoration:none;">Вийти</a>
            </div>
        <?php endif; ?>
    </div>
</div>

<div class="promo-slider">
    <div class="slider-container">
        <div class="slides" id="slides">
            <div class="slide">
                <h3>🎰 Вітаємо в казино!</h3>
                <p>Грайте та вигравайте на 300Bucks</p>
            </div>
            <div class="slide">
                <h3>🎁 Бонуси скоро</h3>
                <p>Слідкуйте за оновленнями</p>
            </div>
            <div class="slide">
                <h3>🔥 Гарячі ігри</h3>
                <p>Спробуйте наші топові слоти</p>
            </div>
            <div class="slide">
                <h3>💎 VIP програма</h3>
                <p>Ексклюзивні винагороди для гравців</p>
            </div>
        </div>
    </div>
    <div class="slide-dots" id="slideDots"></div>
</div>

<div class="section-title">🎮 Популярні ігри</div>

<div class="games-grid" id="gamesGrid">
    <a class="game" href="slots.php" data-name="slots слоти">
        <img class="game-cover" src="assets/images/slot.jpg" alt="Slots">
        <div class="game-overlay">
            <div class="game-name">🎰 Slots</div>
        </div>
    </a>

    <a class="game" href="mines.php" data-name="mines міни">
        <img class="game-cover" src="assets/images/mines.jpg" alt="Mines">
        <div class="game-overlay">
            <div class="game-name">💣 Mines</div>
        </div>
    </a>

    <a class="game" href="baccarat.php" data-name="baccarat баккара">
        <img class="game-cover" src="assets/images/baccarat.jpg" alt="Baccarat">
        <div class="game-overlay">
            <div class="game-name">🎴 Baccarat</div>
        </div>
    </a>

    <a class="game" href="dice.php" data-name="dice дайс кубики">
        <img class="game-cover" src="assets/images/dice.jpg" alt="Dice">
        <div class="game-overlay">
            <div class="game-name">🎲 Dice</div>
        </div>
    </a>

    <a class="game" href="blackjack.php" data-name="blackjack блекджек">
        <img class="game-cover" src="assets/images/blackjack.jpg" alt="Blackjack">
        <div class="game-overlay">
            <div class="game-name">🃏 Blackjack</div>
        </div>
    </a>
</div>

<div class="no-results" id="noResults">
    😔 Нічого не знайдено<br>
    <small>Спробуйте інший запит</small>
</div>

<script>
    // Slider functionality
    const slides = document.getElementById('slides');
    const slideDots = document.getElementById('slideDots');
    const slideCount = slides.children.length;
    let currentSlide = 0;

    // Create dots
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        slideDots.appendChild(dot);
    }

    function goToSlide(index) {
        currentSlide = index;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }

    function updateDots() {
        const dots = slideDots.children;
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('active', i === currentSlide);
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    }

    // Auto slide every 4 seconds
    setInterval(nextSlide, 4000);

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const gamesGrid = document.getElementById('gamesGrid');
    const noResults = document.getElementById('noResults');

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        const games = gamesGrid.querySelectorAll('.game');
        let visibleCount = 0;

        games.forEach(game => {
            const gameName = game.getAttribute('data-name').toLowerCase();
            if (gameName.includes(searchTerm)) {
                game.style.display = 'block';
                visibleCount++;
            } else {
                game.style.display = 'none';
            }
        });

        if (visibleCount === 0) {
            noResults.classList.add('show');
            gamesGrid.style.display = 'none';
        } else {
            noResults.classList.remove('show');
            gamesGrid.style.display = 'grid';
        }
    });

    // Touch swipe for slider
    let touchStartX = 0;
    let touchEndX = 0;

    slides.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slides.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        }
        if (touchEndX - touchStartX > 50) {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            goToSlide(currentSlide);
        }
    }
</script>
</body>
</html>