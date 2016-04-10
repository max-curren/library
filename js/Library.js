$("#date-requested").val(moment().format("YYYY-MM-DD"));
$("#date-requested").attr("min", moment().format("YYYY-MM-DD"));

$("#signup-form").on("submit", function(event)
{


    event.preventDefault();

    var email = $("#email").val();
    var first_name = $("#first-name").val();
    var last_name = $("#last-name").val();
    var date_requested = $("#date-requested").val();
    var period = $("#period").val();

        $.ajax
            ({
                method: "POST",
                url: "checkPeriod.php",
                data: {isValidRequest: true, email : email, first_name: first_name, last_name: last_name, period: period, date_requested: date_requested}
            })
            .done(function (msg) {
                if(msg !== "Okay")
                {
                    $("#xAlert").html(msg);
                    $("#xAlert").fadeIn(100);
                }
                else
                {
                    $("#signup-form")[0].submit();
                }
            });




});