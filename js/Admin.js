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


var xLimit;
$.ajax
({
    method: "POST",
    url: "../xLimit.txt",
    dataType: "text",
    success: function(data)
    {
        xLimit = data;

        $("#xLimit_input").attr("placeholder", "Current: " + xLimit);
    }
});

$("#setLimit").click(function(e)
{
    e.preventDefault();

    var inputtedLimit = $("#xLimit_input").val();



    if(inputtedLimit !== "" && $.isNumeric(inputtedLimit))
    {
        $.ajax
            ({
                method: "POST",
                url: "changeXLimit.php",
                data: {isValidRequest: true, inputtedLimit: inputtedLimit}
            })
            .done(function (result) {
                $("#xLimit_input").attr("placeholder", "Current: " + inputtedLimit);
                $("#xLimit_input").val("");
                $("#limit_alert").fadeIn(500).delay(1000).fadeOut(500);

            });
    }
});







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

        if(data[key].last_name.toLowerCase().replace("'", "").indexOf(last_name.toLowerCase()) == 0 && signInTableCount < 7)
        {
            signInTableCount++;
            csvDataArray.push(data[key]);
            addToSigninTable(data[key]);
        }

    }
}

var addToSigninTable = function(data)
{

    var currentPeriod = $("#period_signin").val();

    $.ajax
        ({
            method: "POST",
            url: "getPasses.php",
            data: {isValidRequest: true, period: currentPeriod, date: date}
        })
        .done(function (result) {
            var passArray = $.parseJSON(result);
            var hasPass = "No";

            for (var key in passArray)
            {

                if (passArray[key][0].toLowerCase() === data.first_name.toLowerCase() && passArray[key][1].toLowerCase() === data.last_name.toLowerCase())
                {
                    hasPass = "Yes";
                }


            }

            $("#signin_table").show();
            $("#signin_table tbody").append("<tr><td>" + data.first_name + "</td><td>" + data.last_name + "</td><td>" + data.homeroom + "</td><td>" + data.id + "</td><td>" + data.grade + "</td><td>" + hasPass + "</td><td><a id='" + data.id + "' href='#' class='checkIn_btn btn-sm btn-success'>Check in</a></td></tr>");
        });


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

                        $("#signin_table").hide();

                        $("#signin_alert").html("<strong>Success</strong> " + studentData.first_name + " " + studentData.last_name + " has been checked in.");
                        $("#signin_alert").fadeIn(500).delay(1000).fadeOut(500);

                        $("#studentID").focus();


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

$("#studentID").keyup(function(e)
{
    $("#last_name").val("");
    $("#signin_table tbody tr").remove();
    $("#signin_table").hide();

    if(e.which == 13)
    {
        $("#searchID").trigger("click");
    }
});

$("#searchID").click(function(e)
{
    e.preventDefault();

    signInTableCount = 0;

    $("#last_name").val("");
    $("#signin_table tbody tr").remove();
    $("#signin_table").hide();

    var studentID = $("#studentID").val();
    if(studentID.length === 5)
    {
        $("#signin_table tbody tr").remove();
        searchByID(csvData, studentID);
    }
    else
    {
        $("#signin_table").hide();
    }

});

$("#searchName").click(function(e)
{
    e.preventDefault();

    signInTableCount = 0;

    $("#studentID").val("");
    $("#signin_table tbody tr").remove();

    var last_name = $("#last_name").val();

    if(last_name != "")
    {
        $("#signin_table tbody tr").remove();
        searchByLastName(csvData, last_name);
    }
    else
    {
        $("#signin_table").hide();
    }

});

$("#last_name").keyup(function(e)
{
    $("#studentID").val("");

   if(e.which == 13)
   {
       $("#searchName").trigger("click");
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
            var historyArray = $.parseJSON(result);
            var hadAPass = "No";

            for(var key in historyArray)
            {
                hadAPass = "No";

                if(historyArray[key][7] === "1")
                {
                    hadAPass = "Yes";
                }

                var dateTime = moment(historyArray[key][2]).format('h:mm:ss a');
                $("#history_table tbody").append("<tr><td>" + historyArray[key][0] + "</td><td>" + historyArray[key][1] + "</td><td>" + dateTime + "</td><td>" + historyArray[key][3] + "</td><td>" + historyArray[key][4] + "</td><td>" + historyArray[key][5] + "</td><td>" + historyArray[key][6] + "</td><td>" + hadAPass + "</td>");
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
                     var dateTime = moment(passArray[key][2]).format('h:mm:ss a');
                     $("#admin_table tbody").append("<tr><td>" + passArray[key][0] + "</td><td>" + passArray[key][1] + "</td><td>" + dateTime + "</td></tr>");
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

$("#pass_nav").click(function()
{
    getPasses(date, period);
});

$("#history_nav").click(function()
{
    getHistory(date_history, period_history);
});