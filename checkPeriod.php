<?php

    $xLimit = 30;
    if(isset($_POST["isValidRequest"]) && $_POST["isValidRequest"] == true)
    {
        require "DB.php";

        $email = $conn->real_escape_string($_POST["email"]);
        $first_name = $conn->real_escape_string($_POST["first_name"]);
        $last_name = $conn->real_escape_string($_POST["last_name"]);
        $period = $conn->real_escape_string($_POST["period"]);
        $date_requested = $conn->real_escape_string($_POST["date_requested"]);

        $result = $conn->query("SELECT id FROM passes WHERE period_requested = '$period' AND date_requested = '$date_requested' AND email = '$email' AND first_name = '$first_name' AND last_name = '$last_name'");

        if($result == false)
        {
            echo "Error: " . $conn->error;
        }
        else
        {
            $rows_returned = $result->num_rows;
            if($rows_returned > 0)
            {
                echo "<strong>Sorry!</strong> You can only sign up for the same period once. Please try another date/period.";
            }
            else
            {
                if($period == "X")
                {
                    $result = $conn->query("SELECT id FROM passes WHERE period_requested = 'X' AND date_requested = '$date_requested'");

                    if($result == false)
                    {
                        echo "Error: " . $conn->error;
                    }
                    else
                    {
                        $rows_returned = $result->num_rows;

                        if($rows_returned >= $xLimit)
                        {
                            echo "<strong>Sorry!</strong> There are no more spots available for that X period. Please try another date/period.";
                        }
                        else
                        {
                            echo "Okay";
                        }
                    }
                }
                else
                {
                    echo "Okay";
                }
            }

        }







    }
    else
    {
        header("Location: index.html");
    }

?>