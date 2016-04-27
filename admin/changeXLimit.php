<?php
if(isset($_POST["isValidRequest"]) && $_POST["isValidRequest"] == true)
{
    file_put_contents("../xLimit.txt", $_POST["inputtedLimit"]);
}
else
{
    header("Location: index.html");
}

?>