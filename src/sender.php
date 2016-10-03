<?php

if($_SERVER['REQUEST_METHOD']=='POST')
{
    if ( isset($_POST['modal_button']) ) {
        if ( empty($_POST['name']) || empty($_POST['tel']) ) {
            echo '<div class="sender">Заявка не отправлена, просим заполнить все поля</div>';
        } else {
            echo '<div class="sender sender--good">Спасибо за заявку!</div>';
            $to = 'sic4buisness@gmail.com, Grek_mister@mail.ru, grekmn@mail.ru';

            $headers = 'From: MrGrek <noreply@mrgrek.ru>' . "\r\n";
            $headers .= 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=utf-8';

            $subject = 'Заказ звонка с сайта "Mr.Grek"';

            $message = '<h3>Оформление заказа звонка</h3>';
            $message .= '<strong>Имя:</strong> ' . $_POST['name'] . '.<br>';
            $message .= '<strong>Номер телефона:</strong> ' . $_POST['tel'] . '.<br>';

            mail($to, $subject, $message, $headers);
        }
    } elseif ( isset($_POST['question_button']) ) {
        if ( empty($_POST['name']) || empty($_POST['tel']) || empty($_POST['question']) ) {
            echo '<div class="sender">Заявка не отправлена, просим заполнить все поля</div>';
        } else {
            echo '<div class="sender sender--good">Спасибо за заявку!</div>';
            $to = 'sic4buisness@gmail.com, Grek_mister@mail.ru, grekmn@mail.ru';

            $headers = 'From: MrGrek <noreply@mrgrek.ru>' . "\r\n";
            $headers .= 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=utf-8';

            $subject = 'Вопрос с сайта "Mr.Grek"';

            $message = '<h3>Оформление вопроса</h3>';
            $message .= '<strong>Имя:</strong> ' . $_POST['name'] . '.<br>';
            $message .= '<strong>Номер телефона:</strong> ' . $_POST['tel'] . '.<br>';
            $message .= '<strong>Вопрос:</strong> ' . $_POST['question'] . '.<br>';

            mail($to, $subject, $message, $headers);
        }
    } elseif ( isset($_POST['certificate_button']) ) {
        if ( empty($_POST['certificate']) || empty($_POST['congratulations']) || empty($_POST['tel']) ) {
            echo '<div class="sender">Заявка не отправлена, просим заполнить все поля</div>';
        } else {
            echo '<div class="sender sender--good">Спасибо за заявку!</div>';
            $to = 'sic4buisness@gmail.com, Grek_mister@mail.ru, grekmn@mail.ru';

            $headers = 'From: MrGrek <noreply@mrgrek.ru>' . "\r\n";
            $headers .= 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=utf-8';

            $subject = 'Заказ сертификата "Mr.Grek"';

            $message = '<h3>Оформление подарочного сертификата</h3>';
            $message .= '<strong>Номинал сертификата:</strong> ' . $_POST[ 'certificate' ] .'руб'. '.<br>';
            $message .= '<strong>Имя поздравляемого:</strong> ' . $_POST[ 'congratulations' ] . '.<br>';
            $message .= '<strong>Номер телефона:</strong> ' . $_POST[ 'tel' ] . '.<br>';

            mail($to, $subject, $message, $headers);
        }
    } elseif ( isset($_POST['card_button']) ) {
        if ( empty($_POST['tel']) || empty($_POST['card']) ) {
            echo '<div class="sender">Заявка не отправлена, просим заполнить все поля</div>';
        } else {
            echo '<div class="sender sender--good">Спасибо за заявку!</div>';
            $to = 'sic4buisness@gmail.com, Grek_mister@mail.ru, grekmn@mail.ru';

            $headers = 'From: MrGrek <noreply@mrgrek.ru>' . "\r\n";
            $headers .= 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=utf-8';

            $subject = 'Заказ дебетовой карты "Mr.Grek"';

            $message = '<h3>Оформление дебетовой карты</h3>';
            $message .= '<strong>Дебетовая карта:</strong> ' . $_POST[ 'card' ] . '.<br>';
            $message .= '<strong>Номер телефона:</strong> ' . $_POST[ 'tel' ] . '.<br>';

            mail($to, $subject, $message, $headers);
        }
    }
}

?>

