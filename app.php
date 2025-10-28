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

        .logo-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
        }

        .logo {
            display: flex;
            align-items: center;
        }

        .logo img {
            max-width: 140px;
            height: auto;
            filter: drop-shadow(0 4px 8px rgba(0, 231, 1, 0.3));
            transition: transform 0.3s ease;
        }

        .logo img:hover {
            transform: scale(1.05);
        }

        /* Telegram Button Fix */
        .telegram-login-wrapper {
            position: relative;
            display: inline-block;
            border: 2px solid #00e701;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 231, 1, 0.2);
            background: #0f212e;
        }

        .telegram-login-wrapper iframe {
            display: block;
            border: none;
            mix-blend-mode: screen;
            pointer-events: auto;
        }

        .telegram-login-wrapper::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: #0f212e;
            z-index: 1;
            pointer-events: none;
        }

        .telegram-login-wrapper iframe {
            position: relative;
            z-index: 2;
        }

        /* User Profile */
        .user-profile {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            background: linear-gradient(135deg, #1a2c38 0%, #2f4553 100%);
            border: 2px solid #00e701;
            border-radius: 12px;
            padding: 12px 20px;
            box-shadow: 0 4px 15px rgba(0, 231, 1, 0.2);
        }

        .user-avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: 2px solid #00e701;
            box-shadow: 0 2px 8px rgba(0, 231, 1, 0.3);
        }

        .user-info {
            text-align: left;
            flex-grow: 1;
        }

        .user-name {
            font-weight: 700;
            font-size: 15px;
            color: #fff;
            margin-bottom: 2px;
        }

        .user-balance {
            font-size: 14px;
            color: #00e701;
            font-weight: 600;
        }

        .logout-btn {
            background: rgba(255, 59, 48, 0.1);
            border: 1px solid rgba(255, 59, 48, 0.3);
            color: #ff3b30;
            padding: 8px 16px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s;
        }

        .logout-btn:hover {
            background: rgba(255, 59, 48, 0.2);
            border-color: rgba(255, 59, 48, 0.5);
        }

        /* Search */
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

        /* Promo Slider */
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

        /* Sections */
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
            margin-bottom: 24px;
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
            animation: slideIn 0.4s ease forwards;
        }

        .game:active {
            transform: scale(0.97);
        }

        .game-cover {
            width: 100%;
            height: 180px;
            object-fit: cover;
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

        @keyframes slideIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }

        .live-games-section {
            padding: 0 20px;
            margin: 24px 0;
            overflow: hidden;
        }

        .live-games-carousel {
            display: flex;
            gap: 12px;
            width: max-content;
            animation: scrollLeft 25s linear infinite;
            will-change: transform;
        }

        .live-game-card {
            min-width: 280px;
            background: linear-gradient(135deg, #1a2c38 0%, #2f4553 100%);
            border-radius: 12px;
            padding: 12px;
            border: 1px solid rgba(0, 231, 1, 0.2);
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            gap: 12px;
            flex-shrink: 0;
        }

        @keyframes scrollLeft {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-50%);
            }
        }

        /* Пауза при ховері */
        .live-games-section:hover .live-games-carousel {
            animation-play-state: paused;
        }

        .live-game-card {
            min-width: 280px;
            background: linear-gradient(135deg, #1a2c38 0%, #2f4553 100%);
            border-radius: 12px;
            padding: 12px;
            border: 1px solid rgba(0, 231, 1, 0.2);
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            gap: 12px;
            flex-shrink: 0;
            animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }

        .live-indicator {
            position: absolute;
            top: 8px;
            left: 8px;
            background: #ff3b30;
            color: #fff;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 4px;
            z-index: 2;
        }

        .live-pulse {
            width: 6px;
            height: 6px;
            background: #fff;
            border-radius: 50%;
            animation: pulse-dot 1.5s ease-in-out infinite;
        }

        @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
        }

        .live-game-image-wrapper {
            flex-shrink: 0;
        }

        .live-game-image {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
            border: 1px solid rgba(0,231,1,0.3);
        }

        .live-game-info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;
            font-size: 13px;
        }

        .live-game-name {
            font-weight: 700;
            color: #fff;
            margin-bottom: 4px;
        }

        .live-player {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #b1bad3;
            font-size: 12px;
        }

        .live-player-avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00e701 0%, #00a501 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 11px;
            color: #0f212e;
        }

        .live-win-amount {
            font-size: 16px;
            font-weight: 800;
            color: #00e701;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .win-badge {
            background: rgba(0, 231, 1, 0.1);
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 700;
            color: #00e701;
            text-transform: uppercase;
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

        @media (max-width: 360px) {
            .live-game-card { min-width: 260px; }
            .live-game-image { width: 70px; height: 70px; }
        }
    </style>
</head>
<body>
<div class="header">
    <div class="logo-wrapper">
        <div class="logo">
            <img src="./assets/images/logo/logo.png" alt="300Bucks Casino" />
        </div>

        <div class="auth-container">
            <?php if (!$user): ?>
                <div class="telegram-login-wrapper">
                    <script async src="https://telegram.org/js/telegram-widget.js?22"
                            data-telegram-login="threehunderedbucks_bot"
                            data-size="medium"
                            data-radius="8"
                            data-auth-url="https://frstshmn.top/casino/auth.php"
                            data-request-access="write">
                    </script>
                </div>
            <?php else: ?>
                <div class="user-profile">
                    <img src="<?= htmlspecialchars($user['photo_url']) ?>" alt="<?= htmlspecialchars($user['first_name']) ?>" class="user-avatar">
                    <div class="user-info">
                        <div class="user-name"><?= htmlspecialchars($user['first_name']) ?> <?= htmlspecialchars($user['last_name']) ?></div>
                        <div class="user-balance">Баланс: $<?= number_format($user['balance'], 2) ?></div>
                    </div>
                    <a href="logout.php" class="logout-btn">Вийти</a>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <div class="search-container">
        <input type="text" class="search-input" id="searchInput" placeholder="Пошук ігор...">
        <span class="search-icon">🔍</span>
    </div>
</div>

<!-- Promo Slider -->
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
<div class="games-grid" id="gamesGridTop">
    <a class="game" href="slots.php" data-name="slots слоти"><img class="game-cover" src="assets/images/slot.jpg" alt="Slots"><div class="game-overlay"><div class="game-name">🎰 Slots</div></div></a>
    <a class="game" href="mines.php" data-name="mines міни"><img class="game-cover" src="assets/images/mines.jpg" alt="Mines"><div class="game-overlay"><div class="game-name">💣 Mines</div></div></a>
    <a class="game" href="baccarat.php" data-name="baccarat баккара"><img class="game-cover" src="assets/images/baccarat.jpg" alt="Baccarat"><div class="game-overlay"><div class="game-name">🎴 Baccarat</div></div></a>
</div>

<div class="section-title">🔥 Зараз грають</div>

<div class="live-games-section">
    <div class="live-games-carousel" id="liveGamesCarousel"></div>
</div>

<div class="section-title">🎯 Більше ігор</div>

<div class="games-grid" id="gamesGridBottom">
    <a class="game" href="blackjack.php" data-name="blackjack блекджек"><img class="game-cover" src="assets/images/blackjack.jpg" alt="Blackjack"><div class="game-overlay"><div class="game-name">🃏 Blackjack</div></div></a>
    <a class="game" href="dice.php" data-name="dice дайс кубики"><img class="game-cover" src="assets/images/dice.jpg" alt="Dice"><div class="game-overlay"><div class="game-name">🎲 Dice</div></div></a>
</div>

<div class="no-results" id="noResults">
    😔 Нічого не знайдено<br>
    <small>Спробуйте інший запит</small>
</div>

<script>
    const slides = document.getElementById('slides');
    const slideDots = document.getElementById('slideDots');
    const slideCount = slides.children.length;
    let currentSlide = 0;

    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        slideDots.appendChild(dot);
    }

    function goToSlide(index) {
        currentSlide = index;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }

    function updateDots() {
        Array.from(slideDots.children).forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    }, 4000);

    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        const term = this.value.toLowerCase().trim();
        const games = document.querySelectorAll('.game');
        let visible = 0;
        games.forEach(game => {
            const name = game.dataset.name.toLowerCase();
            const show = name.includes(term);
            game.style.display = show ? 'block' : 'none';
            if (show) visible++;
        });
        document.getElementById('noResults').classList.toggle('show', visible === 0);
    });

    const liveGamesData = [
        { game: 'Slots', image: 'assets/images/slot.jpg', player: 'Олександр К.', amount: 245.50 },
        { game: 'Mines', image: 'assets/images/mines.jpg', player: 'Марія В.', amount: 189.00 },
        { game: 'Baccarat', image: 'assets/images/baccarat.jpg', player: 'Дмитро П.', amount: 567.25 },
        { game: 'Dice', image: 'assets/images/dice.jpg', player: 'Анна С.', amount: 92.80 },
        { game: 'Blackjack', image: 'assets/images/blackjack.jpg', player: 'Іван М.', amount: 412.15 },
        { game: 'Slots', image: 'assets/images/slot.jpg', player: 'Юлія Б.', amount: 678.90 },
        { game: 'Mines', image: 'assets/images/mines.jpg', player: 'Сергій Т.', amount: 234.50 },
        { game: 'Roulette', image: 'assets/images/roulette.jpg', player: 'Петро Л.', amount: 320.00 },
        { game: 'Poker', image: 'assets/images/poker.jpg', player: 'Олена Г.', amount: 890.75 },
        { game: 'Crash', image: 'assets/images/crash.jpg', player: 'Віктор Д.', amount: 156.30 },
    ];

    function censorName(name) {
        const [first, last] = name.split(' ');
        return last ? `${first} ${last[0]}.` : name;
    }

    function createCard(data) {
        const initials = data.player.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
        const card = document.createElement('div');
        card.className = 'live-game-card';
        card.innerHTML = `
            <div class="live-game-image-wrapper">
                <div class="live-indicator"><div class="live-pulse"></div> LIVE</div>
                <img class="live-game-image" src="${data.image}" alt="${data.game}">
            </div>
            <div class="live-game-info">
                <div class="live-game-name">${data.game}</div>
                <div class="live-player">
                    <div class="live-player-avatar">${initials}</div>
                    <div>${censorName(data.player)}</div>
                </div>
                <div class="live-win-amount"><span class="win-badge">WIN</span> $${data.amount.toFixed(2)}</div>
            </div>
        `;
        return card;
    }

    const carousel = document.getElementById('liveGamesCarousel');

    function renderEndlessCarousel() {
        carousel.innerHTML = '';

        liveGamesData.forEach(data => carousel.appendChild(createCard(data)));
        liveGamesData.forEach(data => carousel.appendChild(createCard(data)));
    }

    renderEndlessCarousel();


    // Додаємо інлайн-стилі для кнопки Telegram після завантаження
    document.addEventListener('DOMContentLoaded', function () {
        const checkAndStyleTelegramButton = setInterval(() => {
            const button = document.querySelector('.btn.tgme_widget_login_button');
            if (button) {
                // === ІНЛАЙН СТИЛІ ДЛЯ КНОПКИ ===
                button.style.cssText = `
                    background: #0f212e !important;
                    color: #fff !important;
                    border: 2px solid #00e701 !important;
                    border-radius: 12px !important;
                    padding: 0 !important;
                    font-family: 'Nunito Sans', sans-serif !important;
                    font-weight: 600 !important;
                    font-size: 15px !important;
                    box-shadow: 0 4px 15px rgba(0, 231, 1, 0.2) !important;
                    transition: all 0.3s ease !important;
                    overflow: hidden !important;
                    display: block !important;
                    width: 100% !important;
                    height: auto !important;
                `;

                // Додаємо ефект ховера
                button.addEventListener('mouseenter', () => {
                    button.style.boxShadow = '0 6px 20px rgba(0, 231, 1, 0.4)';
                    button.style.transform = 'translateY(-2px)';
                });
                button.addEventListener('mouseleave', () => {
                    button.style.boxShadow = '0 4px 15px rgba(0, 231, 1, 0.2)';
                    button.style.transform = 'translateY(0)';
                });

                clearInterval(checkAndStyleTelegramButton); // Зупиняємо перевірку
            }
        }, 100);

        // Запасний таймаут — якщо кнопка не з'явилася за 5 сек
        setTimeout(() => clearInterval(checkAndStyleTelegramButton), 5000);
    });
</script>
</body>
</html>