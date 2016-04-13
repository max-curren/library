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

    <div class="alert alert-success">
        <?php

        if(isset($_POST["email"]))
        {
            require "DB.php";

            $email = $conn->real_escape_string($_POST["email"]);
            $first_name = $conn->real_escape_string($_POST["first-name"]);
            $last_name = $conn->real_escape_string($_POST["last-name"]);
            $date_requested = $conn->real_escape_string($_POST["date-requested"]);
            $period = $conn->real_escape_string($_POST["period"]);

            $query = "INSERT INTO passes (first_name, last_name, date_requested, period_requested, email) VALUES ('$first_name', '$last_name', '$date_requested', '$period', '$email')";

            if($conn->query($query) === false)
            {
                echo "Error: " . $conn->error;
            }
            else
            {
                $formattedDate = strtotime($date_requested);
                echo "Success! You are scheduled to visit the library on " . date("l, F d", $formattedDate) . " during Period " . $period . ". <a href='index.html'>Click here to go back.</a>";
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

