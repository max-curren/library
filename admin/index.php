<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Success!</title>

    <link href="../css/bootstrap.min.css" rel="stylesheet" />
    <link href="../css/main.css" rel="stylesheet" />
</head>

<body>

<div class="navbar navbar-default">
    <div class="navbar-header">
        <a class="navbar-brand" href="../index.html">BFHS Library Admin</a>
    </div>
</div>

<div class="container tab-content">

    <div class="well">
        <form id="admin_form" class="form-inline">
            <fieldset class="form-group">
                <label for="date-requested">Date </label>
                <input type="date" class="form-control" id="date-requested" name="date-requested" />
            </fieldset>

            <fieldset id="admin_period" class="form-group">
                <label for="period">Period </label>
                <select id="period" class="form-control" name="period">
                    <option value="X">X</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                </select>
            </fieldset>
        </form>

        <table id="admin_table" class="table">
            <thead>
                <tr>
                    <th>
                        First Name
                    </th>

                    <th>
                        Last Name
                    </th>

                    <th>
                        Email
                    </th>

                    <th>
                        Date Created
                    </th>
                </tr>
            </thead>

            <tbody>

            </tbody>
        </table>
    </div>

</div>




<script src="../js/jquery.min.js"></script>
<script src="../js/moment.js"></script>
<script src="../js/Admin.js"></script>
<script src="../js/bootstrap.min.js"></script>
</body>

</html>
