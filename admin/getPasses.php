<?php
if(isset($_POST["isValidRequest"]) && $_POST["isValidRequest"] == true)
{
    require "../DB.php";

    $period = $conn->real_escape_string($_POST["period"]);
    $date = $conn->real_escape_string($_POST["date"]);


    $result = $conn->query("SELECT first_name, last_name, date_created FROM passes WHERE period_requested = '$period' AND date_requested = '$date'");

    if($result === false)
    {
        echo "Error: " . $conn->error;
    }
    else
    {
        $passArray = $result->fetch_all();
        echo json_encode($passArray);
    }
}
else
{
    header("Location: index.html");
}

?>