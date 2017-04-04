var $loginForm = $('.loginForm');
var $loginBtn = $loginForm.find('.bt-login-submit');
$loginForm.on('submit', function (e) {
    e.preventDefault();
    $loginBtn.attr('disabled', true);
    var data = $loginForm.serialize();
    $.ajax({
        url: '/users/login',
        type: 'post',
        data: data
    }).done(function (d) {
        if (d.errorNo === 0) {
            console.log(d)
        }
    }).complete(function () {
        $loginBtn.attr('disabled', false);
    });
});