<?php

header('Content-Type: text/html; charset=utf-8');

require_once("app/Bot.php");

$bot = new Bot();
$data = $bot->getData();

if (strtolower($data['username']) == 'hammerai') {
    $string = "Саунтрес лудоманам 🎰\n";
    $string .= "Ваш результат: \n\n ";
    $string .= "💩 | 💩 | 💩 \n\n";
    $string .= "HUUUUUGE SHIIIIIT 🤨???";
    $bot->sendMessage($string);
    exit();
}

$reel_1_symbols = ['🍒', '🍋', '🍇', '🍀','🍀','🍀','🍀','🍀','🍀','🍀','🍀','🍉', '🍓', '🍌', '7️⃣', '7️⃣','7️⃣','7️⃣','7️⃣','7️⃣','7️⃣', '💰','💰','💰','💰','💰','💰','💰','💰','🧲', '💰', '🍀'];
$reel_2_symbols = ['7️⃣', '🍒', '🍋', '🍀','🍀','🍀','🍀','🍀','🍀','🍀','🍀','🍇', '🍉', '🍓', '🍌', '🧲', '💰', '🍀', '7️⃣','7️⃣','💰','💰','💰','💰','💰','💰','💰','💰','7️⃣','7️⃣','7️⃣','7️⃣'];
$reel_3_symbols = ['🍀','🍀','🍀','🍀','🍀','🍀','🍀','🍀','🍒', '🍋', '🍇', '💰','💰','💰','💰','💰','💰','💰','💰','🧲', '7️⃣','7️⃣','7️⃣','7️⃣','7️⃣','7️⃣', '💰', '🍀', '🍉', '🍓', '🍌', '7️⃣'];

if (str_contains($data['text'], 'spin')) {
    $spinner_1 = $reel_1_symbols[rand(0, count($reel_1_symbols) - 1)];
    $spinner_2 = $reel_2_symbols[rand(0, count($reel_2_symbols) - 1)];
    $spinner_3 = $reel_3_symbols[rand(0, count($reel_3_symbols) - 1)];

    $string = '';

    $string .= "Саунтрес лудоманам 🎰\n";
    $string .= "Ваш результат: \n\n ";
    $string .= "{$spinner_1} | {$spinner_2} | {$spinner_3} \n\n";

    if ($spinner_1 == $spinner_2 && $spinner_2 == $spinner_3) {
        $string .= "HUUUUUGE WIIIIIN! 🎉🎉🎉";
    } elseif ($spinner_1 == $spinner_2 || $spinner_2 == $spinner_3 || $spinner_1 == $spinner_3) {
        $string .= "Чіназес 🎉";
    } else {
        $string .= "Бери кредит і грай дальше! 💸💸💸";
    }
    $bot->sendMessage($string);
}