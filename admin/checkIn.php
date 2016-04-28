<?php
if(isset($_POST["isValidRequest"]) && $_POST["isValidRequest"] == true)
{
    require "../DB.php";

    $first_name = $conn->real_escape_string($_POST["first_name"]);
    $last_name = $conn->real_escape_string($_POST["last_name"]);
    $student_id = $conn->real_escape_string($_POST["student_id"]);
    $homeroom = $conn->real_escape_string($_POST["homeroom"]);
    $grade = $conn->real_escape_string($_POST["grade"]);
    $hadAPass = $conn->real_escape_string($_POST["hadAPass"]);
    $period = $conn->real_escape_string($_POST["currentPeriod"]);
    $date = $conn->real_escape_string($_POST["date"]);

    if($hadAPass == "true")
    {
        $hadAPass = 1;
    }
    else
    {
        $hadAPass = 0;
    }

    $query = "INSERT INTO checkedin (first_name, last_name, date_created, period_created, student_id, hadAPass, homeroom, grade) VALUES ('$first_name', '$last_name', '$date', '$period', '$student_id', '$hadAPass', '$homeroom', '$grade')";

    if($conn->query($query) === false)
    {
        echo "Error: " . $conn->error;
    }
    else
    {
        echo "Success";
    }
}
else
{
    header("Location: index.html");
}

?>