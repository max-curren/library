<?php

$DBServer = "localhost";
$DBUser = "root";
$DBPass = "";
$DBName = "library";

$conn = new mysqli($DBServer, $DBUser, $DBPass, $DBName);

if($conn->connect_error)
{
    echo 'Database connection failed: '  . $conn->connect_error;
}

?>