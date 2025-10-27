<?php
session_start();

require_once 'config.php';
require_once 'db.php';

function checkTelegramAuthorization($auth_data) {
    $check_hash = $auth_data['hash'];
    unset($auth_data['hash']);

    $data_check_arr = [];
    foreach ($auth_data as $key => $value) {
        $data_check_arr[] = $key . '=' . $value;
    }
    sort($data_check_arr);
    $data_check_string = implode("\n", $data_check_arr);
    $secret_key = hash('sha256', BOT_TOKEN, true);
    $hash = hash_hmac('sha256', $data_check_string, $secret_key);

    if (strcmp($hash, $check_hash) !== 0) {
        return false;
    }
    if ((time() - $auth_data['auth_date']) > 86400) {
        return false;
    }
    return true;
}

if (isset($_GET['id'])) {
    if (checkTelegramAuthorization($_GET)) {
        $telegram_id = $_GET['id'];
        $username = $_GET['username'] ?? '';
        $first_name = $_GET['first_name'] ?? '';
        $last_name = $_GET['last_name'] ?? '';
        $photo_url = $_GET['photo_url'] ?? '';

        $stmt = $pdo->prepare("SELECT * FROM users WHERE telegram_id = ?");
        $stmt->execute([$telegram_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            $insert = $pdo->prepare("INSERT INTO users (telegram_id, username, first_name, last_name, photo_url, balance) VALUES (?, ?, ?, ?, ?, 300.00)");
            $insert->execute([$telegram_id, $username, $first_name, $last_name, $photo_url]);
        }

        $_SESSION['telegram_id'] = $telegram_id;
        header("Location: app.php");
        exit;
    } else {
        echo "Невірна авторизація Telegram.";
    }
} else {
    echo "Немає даних Telegram.";
}
?>
