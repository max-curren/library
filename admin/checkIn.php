<?php
if(isset($_POST["isValidRequest"]) && $_POST["isValidRequest"] == true)
{
    require "../DB.php";

    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];
    $student_id = $_POST["student_id"];
    $homeroom = $_POST["homeroom"];
    $grade = $_POST["grade"];
    $hadAPass = $_POST["hadAPass"];
    $period = $_POST["currentPeriod"];

    if($hadAPass == "true")
    {
        $hadAPass = 1;
    }
    else
    {
        $hadAPass = 0;
    }

    $query = "INSERT INTO checkedIn (first_name, last_name, period_created, student_id, hadAPass, homeroom, grade) VALUES ('$first_name', '$last_name', '$period', '$student_id', '$hadAPass', '$homeroom', '$grade')";

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