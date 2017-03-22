<?php

    $file = fopen("students.csv", "r");
    $studentsArray = [];
    $studentCounter = 0;

    while(!feof($file))
    {
        $studentsArray[$studentCounter] = fgetcsv($file);

    }

    fclose($file);

?>