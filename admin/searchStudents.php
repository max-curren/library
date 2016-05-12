<?php

    if(isset($_POST["isValidRequest"]))
    {
        $searchType = $_POST["searchType"];
        require "../DB.php";
        
        if($searchType == "id")
        {
            $id = $conn->real_escape_string($_POST["searchTerm"]);
            $query = "SELECT * FROM students WHERE id = $id";

            $result = $conn->query($query);
            if($result != false)
            {
                $num_rows = $result->num_rows;

                if($num_rows > 0)
                {
                    $studentArray = $result->fetch_all();
                    echo json_encode($studentArray);
                }
                else
                {
                    echo "Not found";
                }

            }
            else
            {
                echo "Error: " . $conn->error;
            }
            
        }
        else if($searchType == "name")
        {
            $name = $conn->real_escape_string($_POST["searchTerm"]);
            $query = "SELECT * FROM students WHERE (last_name LIKE '%". $name ."%') LIMIT 7";

            $result = $conn->query($query);
            if($result != false)
            {

                //print_r($result->fetch_all());
                
                $num_rows = $result->num_rows;

                if($num_rows > 0)
                {
                    $studentArray = $result->fetch_all();
                    echo json_encode($studentArray);
                }
                else
                {
                    echo "Not found";
                }

                
            }
            else
            {
                echo "Error: " . $conn->error;
            }
        }

    }

?>