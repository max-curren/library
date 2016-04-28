$("#date-requested").val(moment().format("YYYY-MM-DD"));
$("#date-requested").attr("min", moment().format("YYYY-MM-DD"));

var csvData;

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




$("#signup-form").on("submit", function(event)
{


    event.preventDefault();

    var first_name = $("#first-name").val();
    var last_name = $("#last-name").val();
    var date_requested = $("#date-requested").val();
    var period = $("#period").val();

    if(isValidStudent(csvData, first_name, last_name) === true)
    {
        $.ajax
            ({
                method: "POST",
                url: "checkPeriod.php",
                data: {isValidRequest: true, first_name: first_name, last_name: last_name, period: period, date_requested: date_requested}
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
    }
    else
    {
        $("#xAlert").html("<strong>Sorry!</strong> Your name wasn't found in the student database. Please make sure that you entered your <span style='text-decoration: underline'>legal</span> first and last name correctly.");
        $("#xAlert").fadeIn(100);
    }





});


var isValidStudent = function(data, first_name, last_name)
{
    var foundStudent = false;

    for(var key in data)
    {
        if(data[key].first_name.toLowerCase().replace("'", "") === first_name.toLowerCase().replace("'", "") && data[key].last_name.toLowerCase().replace("'", "") === last_name.toLowerCase().replace("'", ""))
        {
            foundStudent = true;
        }

    }

    return foundStudent;
}