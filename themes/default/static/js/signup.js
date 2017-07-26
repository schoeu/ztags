var $signupForm = $('.signupForm');
var $signUpText = $('.signUpText');
var $signUpBtn = $('.bt-signup-submit');
$signupForm.on('submit', function (e) {
    var $target = $(this);
    e.preventDefault();
    var password = $target.find('#password').val();
    var repassword = $target.find('#repassword').val();
    if (password !== repassword) {
        $signUpText.text('两次密码不一致');
        return;
    }
    $signUpBtn.attr('disabled', true);
    var data = $signupForm.serialize();
    $.ajax({
        url: '/users/signup',
        type: 'post',
        data: data
    }).done(function (d) {
        if (d.errno === 0) {
            if (d.status === 1) {
                $signUpText.text('该用户已注册');
            }
            else if (d.status === 0) {
                location.href = '/users/login';
            }
        }
    }).complete(function () {
        $signUpBtn.attr('disabled', false);
    });
});