<?php

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
                $formattedDate = strtotime($date_requested);
                $expires =  time() + 604800;

                setcookie("first_name", $first_name, $expires);
                setcookie("last_name", $last_name, $expires);
                setcookie("date", date("l, F d", $formattedDate), $expires);
                setcookie("period", $period, $expires);

                header("Location: pass.php");
            }
        }
        else
        {
            header("Location: index.html");
        }


?>