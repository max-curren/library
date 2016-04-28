<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Success!</title>

    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/main.css" rel="stylesheet" />
</head>

<body>

<div class="navbar navbar-default">
    <div class="navbar-header">
        <a class="navbar-brand" href="index.html">BFHS Library Signup</a>
    </div>
</div>

<div class="container tab-content">


        <?php

        session_start();

        if(isset($_POST["first-name"]))
        {
            require "DB.php";

            $first_name = $conn->real_escape_string($_POST["first-name"]);
            $last_name = $conn->real_escape_string($_POST["last-name"]);
            $date_requested = $conn->real_escape_string($_POST["date-requested"]);
            $period = $conn->real_escape_string($_POST["period"]);
            
            $query = "INSERT INTO passes (first_name, last_name, date_requested, period_requested) VALUES ('$first_name', '$last_name', '$date_requested', '$period')";

            if($conn->query($query) === false)
            {
                echo "Error: " . $conn->error;
            }
            else
            {
                $_SESSION["submitted"] = "true";
                $formattedDate = strtotime($date_requested);
                echo "

                <div class='alert alert-success'><strong>Success!</strong> Please screenshot/print the pass below to show to your study teacher.</div>
                <div id='completed_pass' class='well'>
                    <h2>Library Pass</h2>
                    
                    <p class='pass_item'><strong>Student Name: </strong>" . $first_name . " " . $last_name . "</p>
                    <p class='pass_item'><strong>Date: </strong>" . date("l, F d", $formattedDate) . "</span>
                    <p class='pass_item'><strong>Period: </strong>" . $period . "</span>
                </div>
                ";
            }
        }
        else
        {
            header("Location: index.html");
        }


        ?>
    </div>



</div>




<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
</body>

</html>

