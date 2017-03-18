<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
        <title>Success!</title>
    
        <link href="css/bootstrap.min.css" rel="stylesheet" />
        <link href="css/main.css" rel="stylesheet" />
        <link href="css/pass.css" rel="stylesheet" />
    </head>
    
    <body>

    <div class="header navbar navbar-default">
        <div class="navbar-header">
            <img id="shamrock" src="img/shamrock.png" />
            <a href="index.html" class="navbar-brand">BFHS Library Pass Sign-up</a>
        </div>
    </div>
    
        <div class="container">
            <?php
                echo "

                    <div class='alert alert-success'><strong>Success!</strong> Please screenshot/print the pass below to show to your study teacher.</div>
                    <div id='completed_pass' class='well'>
                        <h2>Library Pass</h2>
                        
                        <p class='pass_item'><strong>Student Name: </strong>" . ucfirst(strtolower($_COOKIE["first_name"])) . " " . ucfirst(strtolower($_COOKIE["last_name"])) . "</p>
                        <p class='pass_item'><strong>Date: </strong>" . $_COOKIE["date"] . "</span>
                        <p class='pass_item'><strong>Period: </strong>" . $_COOKIE["period"] . "</span>
                    </div>
                ";
            ?>
        </div>
    
    

    
    
    
    
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    </body>

</html>


    