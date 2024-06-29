<?php

class Bot {

    private $bot_token;
    private $chat_id;

    public function __construct($path = "json/config.json") {
        $this->chat_id = "-1001453539385";
        $this->bot_token = '7069299807:AAHsdX8PXeUxiX30d1kkXNuq9wBzJiJG3Uw';
    }

    public function getToken() {
        return $this->bot_token;
    }

    public function getData() {
        $data = file_get_contents('php://input');
        $data = json_decode($data, true);

        return array(
            "chat_id" => $data['message']['from']['id'],
            "username" => $data['message']['from']['username'],
            "text" => trim($data['message']['text'])
        );
    }

    public function sendMessage($text) {
        $ch = curl_init();
        $ch_post = [
            CURLOPT_URL => 'https://api.telegram.org/bot' . $this->bot_token . '/sendMessage',
            CURLOPT_POST => TRUE,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_POSTFIELDS => [
                'chat_id' => $this->chat_id,
                'parse_mode' => 'HTML',
                'text' => $text,
                'reply_markup' => '',
            ]
        ];
        curl_setopt_array($ch, $ch_post);
        curl_exec($ch);
    }
}