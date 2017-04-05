var $pswoginForm = $('.bt-pswf');
var $pswBtn = $pswoginForm.find('.bt-psw-submit');
var $pswText = $('.pswText');
$pswoginForm.on('submit', function (e) {
    e.preventDefault();
    var opsw = $pswoginForm.find('#opsw').val();
    var repassword = $pswoginForm.find('#repassword').val();
    var password = $pswoginForm.find('#password').val();
    if (!opsw) {
        $pswText.text('请输入原密码.');
        return;
    }
    if (repassword !== password) {
        $pswText.text('两次密码不匹配.');
        return;
    }
    $pswBtn.attr('disabled', true);
    var data = $pswoginForm.serialize();
    $.ajax({
        url: '/users/password',
        type: 'post',
        data: data
    }).done(function (d) {
        if (d.errno === 0) {
            if (d.status === 1) {
                $pswText.text('更改出错,请重试');
            }
            else {
                $pswText.text('更改成功');
            }
        }
    }).complete(function () {
        $pswBtn.attr('disabled', false);
    });
});