<?php
    if(isset($_POST["isValidRequest"]))
    {
        require "DB.php";

        $first_name = $conn->real_escape_string(ucfirst(strtolower($_POST["first_name"])));
        $last_name = $conn->real_escape_string(ucfirst(strtolower($_POST["last_name"])));



        $query = "SELECT first_name FROM students WHERE last_name = '$last_name' AND first_name = '$first_name'";
        $result = $conn->query($query);

        if($result == true)
        {
            $rows_returned = $result->num_rows;


            if($rows_returned > 0)
            {
                echo "true";
            }
            else
            {
                echo "false";
            }
        }
        else
        {
            echo "Error: " . $conn->error;
        }
    }
?>