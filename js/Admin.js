$(document).ready(function()
{



    $("#date-requested").val(moment().format("YYYY-MM-DD"));
    $("#date-requested_history").val(moment().format("YYYY-MM-DD"));





    var date = moment().format("YYYY-MM-DD");

    var studentDataArray;

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







    var searchByID = function(id)
    {
        studentDataArray = [];



        $.ajax
            ({
                method: "POST",
                url: "searchStudents.php",
                data: {isValidRequest: true, searchType: "id", searchTerm: id}
            })
            .done(function (result) {

                result = $.parseJSON(result);

                if(result !== "Not found")
                {
                    studentDataArray.push(result[0]);
                    addToSigninTable(result[0]);
                }


            });
    };

    var searchByLastName = function(last_name)
    {
        studentDataArray = [];

        $.ajax
            ({
                method: "POST",
                url: "searchStudents.php",
                data: {isValidRequest: true, searchType: "name", searchTerm: last_name}
            })
            .done(function (result) {

                if(result !== "Not found")
                {
                    result = $.parseJSON(result);
                    for(var key in result)
                    {
                        studentDataArray.push(result[key]);
                        addToSigninTable(result[key]);
                    }
                }


            });

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

                    if (passArray[key][0].toLowerCase() === data[1].toLowerCase() && passArray[key][1].toLowerCase() === data[0].toLowerCase())
                    {
                        hasPass = "Yes";
                    }


                }

                $("#signin_table").show();
                $("#signin_table tbody").append("<tr><td>" + data[1] + "</td><td>" + data[0] + "</td><td>" + data[2] + "</td><td>" + data[3] + "</td><td>" + data[4] + "</td><td>" + hasPass + "</td><td><a id='" + data[3] + "' href='#' class='checkIn_btn btn-sm btn-success'>Check in</a></td></tr>");
            });


    };

    $("body").on("click", "a.checkIn_btn", function(e)
    {
        e.preventDefault();

        var id = this.id;
        var studentData;
        var currentPeriod = $("#period_signin").val();
        var hadAPass = false;


        for(var key in studentDataArray)
        {
            if(studentDataArray[key][3] === id)
            {
                studentData = studentDataArray[key];
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
                    if(passArray[key][0].toLowerCase() === studentData[1].toLowerCase() && passArray[key][1].toLowerCase() === studentData[0].toLowerCase())
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
                            first_name: studentData[1],
                            last_name: studentData[0],
                            student_id: id,
                            homeroom: studentData[2],
                            grade: studentData[4],
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

                            $("#signin_alert").html("<strong>Success</strong> " + studentData[1] + " " + studentData[0] + " has been checked in.");
                            $("#signin_alert").fadeIn(500).delay(1000).fadeOut(500);

                            $("#studentID").focus();


                        });
                };


                if(hadAPass === false)
                {
                    if(confirm(studentData[1] + " " + studentData[0] + " does not have a pass for this period. Would you like to check them in anyways?"))
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

        if(e.keyCode === 13)
        {
            $("#searchID").click();
        }
    });

    $("#searchID").click(function(e)
    {
        e.preventDefault();


        $("#last_name").val("");
        $("#signin_table tbody tr").remove();
        $("#signin_table").hide();

        var studentID = $("#studentID").val();
        if(studentID.length === 5 && isNaN(studentID) === false)
        {
            $("#signin_table tbody tr").remove();
            searchByID(studentID);
        }
        else
        {
            $("#signin_table").hide();
        }

    });

    $("#last_name").keyup(function(e)
    {
        $("#studentID").val("");
        $("#signin_table tbody tr").remove();
        $("#signin_table").hide();

        if(e.keyCode === 13)
        {
            $("#searchName").click();
        }
    });

    $("#searchName").click(function(e)
    {
        e.preventDefault();


        $("#studentID").val("");
        $("#signin_table tbody tr").remove();
        $("#signin_table").hide();

        var last_name = $("#last_name").val();

        if(last_name != "")
        {
            $("#signin_table tbody tr").remove();
            searchByLastName(last_name);
        }
        else
        {
            $("#signin_table").hide();
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

                for(var key in historyArray) {

                    if (historyArray[key][7] === "1")
                    {
                        hadAPass = "Yes";
                    }
                    else
                    {
                        hadAPass = "No";
                    }

                    var dateTime = moment(historyArray[key][2]).format('h:mm:ss a');
                    $("#history_table tbody").append("<tr><td>" + historyArray[key][0] + "</td><td>" + historyArray[key][1] + "</td><td>" + dateTime + "</td><td>" + historyArray[key][4] + "</td><td>" + historyArray[key][5] + "</td><td>" + historyArray[key][6] + "</td><td>" + hadAPass + "</td>");
                }

                $.bootstrapSortable({ applyLast: true });
                // $("#history_table").DataTable();


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
                         var date = moment(passArray[key][2]).format('MM/DD/YYYY');
                         var time = moment(passArray[key][2]).format('h:mm:ss a');
                         $("#admin_table tbody").append("<tr><td>" + passArray[key][0] + "</td><td>" + passArray[key][1] + "</td><td>" + date + "</td><td>" + time + "</td></tr>");
                     }

                    $.bootstrapSortable({ applyLast: true });

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

    $(".nav li a").click(function()
    {
        $(".nav li").removeClass("active");
        // $(this).addClass("active");
    });

    $("#pass_nav").click(function()
    {
        getPasses(date, period);
    });

    $("#history_nav").click(function()
    {
        getHistory(date_history, period_history);
    });

    // $("#admin_table").DataTable();

});