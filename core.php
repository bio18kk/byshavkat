<?php
$name = $_POST['name'];
$email = $_POST['email'];

$token = '8210164553:AAGl1d34muRXyeCoB_y-MFC1ESeHomBFsZA';
$chat_id = '8472334933';

$text = "Новая регистрация!\nИмя: $name\nEmail: $email";
file_get_contents("https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=".urlencode($text));
echo 'ok';
?>
