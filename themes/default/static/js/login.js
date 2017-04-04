var $loginForm = $('.loginForm');
var $loginBtn = $loginForm.find('.bt-login-submit');
var $loginText = $('.loginText');
$loginForm.on('submit', function (e) {
    e.preventDefault();
    $loginBtn.attr('disabled', true);
    var data = $loginForm.serialize();
    $.ajax({
        url: '/users/login',
        type: 'post',
        data: data
    }).done(function (d) {
        if (d.errno === 0) {
            if (d.status === 1) {
                $loginText.text('用户名或密码错误');
            }
            else {
                location.href = '/';
            }
        }
    }).complete(function () {
        $loginBtn.attr('disabled', false);
    });
});