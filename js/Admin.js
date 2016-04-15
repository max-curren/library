$("#date-requested").val(moment().format("YYYY-MM-DD"));
$("#date-requested_history").val(moment().format("YYYY-MM-DD"));

var csvData;
var csvDataArray = [];
var date = moment().format("YYYY-MM-DD");
var signInTableCount = 0;

$.ajax
({
    method: "GET",
    url: "StudentFile.csv",
    dataType: "text",
    success: function(data){processData(data)}
});


var processData = function(csv)
{
    csvData = $.csv.toObjects(csv);
};


var searchByID = function(data, id)
{
    //var resultsArray = [];
    csvDataArray = [];

    for(var key in data)
    {
        if(data[key].id === id)
        {
            csvDataArray.push(data[key]);
            addToSigninTable(data[key]);
        }

    }

    //console.log(resultsArray);
};

var searchByLastName = function(data, last_name)
{
    csvDataArray = [];

    for(var key in data)
    {

        if(data[key].last_name.toLowerCase().replace("'", "").indexOf(last_name.toLowerCase()) == 0 && signInTableCount < 10)
        {
            signInTableCount++;
            csvDataArray.push(data[key]);
            addToSigninTable(data[key]);
        }

    }
}

var addToSigninTable = function(data)
{
    /*
    var currentPeriod = $("#period_signin").val();
    $.ajax
        ({
            method: "POST",
            url: "getPasses.php",
            data: {isValidRequest: true, period: currentPeriod, date: date}
        })
        .done(function (result) {
            var passArray = $.parseJSON(result);

            for (var key in passArray)
            {
                hasPass = "No";
                if (passArray[key][0].toLowerCase() === data.first_name.toLowerCase() && passArray[key][1].toLowerCase() === data.last_name.toLowerCase())
                {
                    hasPass = "Yes";
                }


            }


        });
*/
    $("#signin_table tbody").append("<tr><td>" + data.first_name + "</td><td>" + data.last_name + "</td><td>" + data.homeroom + "</td><td>" + data.id + "</td><td>" + data.grade + "</td><td><a id='" + data.id + "' href='#' class='checkIn_btn btn-sm btn-success'>Check in</a></td></tr>");
};

$("body").on("click", "a.checkIn_btn", function(e)
{
    e.preventDefault();
    signInTableCount = 0;

    var id = this.id;
    var studentData;
    var currentPeriod = $("#period_signin").val();
    var hadAPass = false;


    for(var key in csvDataArray)
    {
        if(csvDataArray[key].id === id)
        {
            studentData = csvDataArray[key];
        }
    }

    $.ajax
        ({
            method: "POST",
            url: "getPasses.php",
            data: {isValidRequest: true, period: currentPeriod, date: date}
        })
        .done(function (result) {
            var passArray = $.parseJSON(result);

            for(var key in passArray)
            {
                if(passArray[key][0].toLowerCase() === studentData.first_name.toLowerCase() && passArray[key][1].toLowerCase() === studentData.last_name.toLowerCase())
                {
                    hadAPass = true;
                }
            }

            var checkIn = function()
            {
                var date = moment().format("YYYY-MM-DD");
                
                $.ajax
                ({
                    method: "POST",
                    url: "checkIn.php",
                    data: {
                        isValidRequest: true,
                        first_name: studentData.first_name,
                        last_name: studentData.last_name,
                        student_id: id,
                        homeroom: studentData.homeroom,
                        grade: studentData.grade,
                        hadAPass: hadAPass,
                        currentPeriod: currentPeriod,
                        date: date
                    }
                })
                    .done(function (result) {

                        console.log(result);
                        $("#last_name").val("");
                        $("#studentID").val("");
                        $("#signin_table tbody tr").remove();

                        $("#signin_alert").html("<strong>Success</strong> " + studentData.first_name + " " + studentData.last_name + " has been checked in.");
                        $("#signin_alert").fadeIn(500).delay(1000).fadeOut(500);


                    });
            };


            if(hadAPass === false)
            {
                if(confirm(studentData.first_name + " " + studentData.last_name + " does not have a pass for this period. Would you like to check them in anyways?"))
                {
                    checkIn();
                }
            }
            else
            {
                checkIn();
            }




        });




});

$("#studentID").keyup(function()
{
    signInTableCount = 0;

    $("#last_name").val("");
    $("#signin_table tbody tr").remove();

    var studentID = $("#studentID").val();
    if(studentID.length === 5)
    {
        searchByID(csvData, studentID);
    }

});

$("#last_name").keyup(function()
{
    signInTableCount = 0;

    $("#studentID").val("");
    $("#signin_table tbody tr").remove();

    var last_name = $("#last_name").val();

    if(last_name !== "")
    {
        searchByLastName(csvData, last_name);
    }

});

var getHistory = function(date, period)
{
    $("#history_table tbody tr").remove();

    $.ajax
        ({
            method: "POST",
            url: "getHistory.php",
            data: {isValidRequest: true, period: period, date: date}
        })
        .done(function (result) {
            console.log(result);
            var historyArray = $.parseJSON(result);
            var hadAPass = "No";

            for(var key in historyArray)
            {
                hadAPass = "No";
                if(historyArray[7] === "1")
                {
                    hadAPass = "Yes";
                }

                $("#history_table tbody").append("<tr><td>" + historyArray[key][0] + "</td><td>" + historyArray[key][1] + "</td><td>" + historyArray[key][2] + "</td><td>" + historyArray[key][3] + "</td><td>" + historyArray[key][4] + "</td><td>" + historyArray[key][5] + "</td><td>" + historyArray[key][6] + "</td><td>" + hadAPass + "</td>");
            }
            // }


        });
}

var getPasses = function(date, period)
{
    $("#admin_table tbody tr").remove();

    $.ajax
        ({
            method: "POST",
            url: "getPasses.php",
            data: {isValidRequest: true, period: period, date: date}
        })
        .done(function (result) {
            //if(typeof result != "object")
            //{
               // console.log(result + "lol");
            //}
            //else
            //{
                var passArray = $.parseJSON(result);

                 for(var key in passArray)
                 {
                     $("#admin_table tbody").append("<tr><td>" + passArray[key][0] + "</td><td>" + passArray[key][1] + "</td><td>" + passArray[key][2] + "</td><td>" + passArray[key][3] + "</td></tr>");
                 }
           // }


        });
}








var date = $("#date-requested").val();
var period = $("#period").val();

getPasses(date, period);

$("#date-requested").change(function()
{
    date = $("#date-requested").val();
    period = $("#period").val();

    getPasses(date, period);
});

$("#period").change(function()
{
    date = $("#date-requested").val();
    period = $("#period").val();

    getPasses(date, period);
});







var date_history = $("#date-requested_history").val();
period_history = $("#period_history").val();

getHistory(date_history, period_history);

$("#date-requested_history").change(function()
{
    date_history = $("#date-requested_history").val();
    period_history = $("#period_history").val();

    getHistory(date_history, period_history);
});

$("#period_history").change(function()
{
    date_history = $("#date-requested_history").val();
    period_history = $("#period_history").val();

    getHistory(date_history, period_history);
});