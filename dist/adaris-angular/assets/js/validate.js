$('#contact-form').submit(function () {
    var name = $('#name').val();
    var email = $('#email').val();
    var message = $('#message').val();

    if (name == '' || message == '')
        return false;
    if (!(isEmail(email))) {
        $("#modalData").html("<div style='color:red;'>Please enter a valid mail...</div>");
        return false;
    }
    $("#modalData").html("<div style='color:red;'></div>Submitting your message..</div>");
});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}