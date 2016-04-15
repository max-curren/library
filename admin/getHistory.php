<?php
if(isset($_POST["isValidRequest"]) && $_POST["isValidRequest"] == true)
{
    require "../DB.php";

    $period = $conn->real_escape_string($_POST["period"]);
    $date = $conn->real_escape_string($_POST["date"]);


    $result = $conn->query("SELECT first_name, last_name, date_created, period_created, homeroom, student_id, grade, hadAPass FROM checkedin WHERE period_created = '$period' AND date_created = '$date'");

    if($result === false)
    {
        echo "Error: " . $conn->error;
    }
    else
    {
        $historyArray = $result->fetch_all();
        echo json_encode($historyArray);
    }
}
else
{
    header("Location: index.html");
}

?>