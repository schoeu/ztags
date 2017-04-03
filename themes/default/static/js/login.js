$loginForm = $(".bt-login-form");
$loginBtn = $loginForm.find('.bt-login-submit');
$loginForm.on("submit", function () {
    $loginBtn.attr("disabled", true);
    var data = $smtBtn.serialize();
    $.ajax({
        url: "/login",
        type: "post",
        data: data
    }).done(function (d) {
        if (d.errorNo === 0) {
            console.log(d)
            $uname.text(d.username || "");
        }
    }).complete(function () {
        $loginBtn.attr("disabled", false);
    });
});