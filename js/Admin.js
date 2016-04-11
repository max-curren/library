$("#date-requested").val(moment().format("YYYY-MM-DD"));
$("#date-requested").attr("min", moment().format("YYYY-MM-DD"));

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
                console.log(result);

                 for(var key in passArray)
                 {
                     $("#admin_table tbody").append("<tr><td>" + passArray[key][0] + "</td><td>" + passArray[key][1] + "</td><td>" + passArray[key][2] + "</td><td>" + passArray[key][3] + "</td></tr>");
                     console.log(passArray[key][0]);
                 }
           // }


        });
}

var date = $("#date-requested").val();
var period = $("#period").val();

getPasses(date, period);

$("#date-requested").change(function()
{
    var date = $("#date-requested").val();
    var period = $("#period").val();

    getPasses(date, period);
});

$("#period").change(function()
{
    var date = $("#date-requested").val();
    var period = $("#period").val();

    getPasses(date, period);
});