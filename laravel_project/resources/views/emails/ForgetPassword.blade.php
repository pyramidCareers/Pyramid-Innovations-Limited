<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <body>
        <h4> {{ $mailData['title'] }}</h4>
        <p>  {{ $mailData['body'] }}</p>
        <p><b> {{ $mailData['link'] }}</b></p>
        <p> {{ $mailData['body2'] }} </p> <br>
        <p> {{ $mailData['thanks'] }}</p>
        <p><b> {{ $mailData['pyramid_name'] }}</b></p>
    </body>
</html>
