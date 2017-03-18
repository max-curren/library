$("#date-requested").val(moment().format("YYYY-MM-DD"));
$("#date-requested").attr("min", moment().format("YYYY-MM-DD"));


var isValidStudent = function(first_name, last_name)
{
    var foundStudent = false;


};

$("#signup-form").on("submit", function(event)
{


    event.preventDefault();

    var first_name = $("#first-name").val();
    var last_name = $("#last-name").val();
    var date_requested = $("#date-requested").val();
    var period = $("#period").val();


    var val_date = moment($("#date-requested").val(), "YYYY-MM-DD");
    var val_year = val_date.format("YYYY");
    var val_day = val_date.format("d");

    var currentYear = moment().format("YYYY");

    console.log(val_year);
    console.log(val_day);
    console.log(currentYear);
    // debugger;

    if(val_year !== currentYear)
    {
        $("#xAlert").html("<strong>Sorry!</strong> You can only make a pass for this year. Please try another date.");
        $("#xAlert").fadeIn(100);
    }
    else if(val_day === "0" || val_day === "6") //if the requested date is on a Saturday or a Sunday
    {
        $("#xAlert").html("<strong>Sorry!</strong> You can't make a pass for when school isn't in session. Please try another date.");
        $("#xAlert").fadeIn(100);
    }
    else
    {

        $.ajax
        ({
            method: "POST",
            url: "getStudents.php",
            data: {isValidRequest: true, first_name: first_name, last_name: last_name, year: val_year, day: val_day}
        })
            .done(function (data) {
                if (data === "true") {
                    $.ajax
                    ({
                        method: "POST",
                        url: "checkPeriod.php",
                        data: {
                            isValidRequest: true,
                            first_name: first_name,
                            last_name: last_name,
                            period: period,
                            date_requested: date_requested
                        }
                    })
                        .done(function (msg) {
                            if (msg !== "Okay") {
                                $("#xAlert").html(msg);
                                $("#xAlert").fadeIn(100);
                            }
                            else {
                                $("#signup-form")[0].submit();
                            }
                        });
                }
                else if (data === "false") {
                    $("#xAlert").html("<strong>Sorry!</strong> Your name wasn't found in the student database. Please make sure that you entered your <span style='text-decoration: underline'>legal</span> first and last name correctly.");
                    $("#xAlert").fadeIn(100);
                }
                else {
                    console.log(data);
                    return false;
                }
            });
    }








});


