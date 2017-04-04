var $pswoginForm = $('.bt-pswf');
var $pswBtn = $pswoginForm.find('.bt-psw-submit');
var $pswText = $('.pswText');
$pswoginForm.on('submit', function (e) {
    e.preventDefault();
    var nickName = $pswoginForm.find('#nickname');
    if (!nickName) {
        $pswText.text('昵称必填');
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
                $pswText.text('用户名或密码错误');
            }
        }
    }).complete(function () {
        $pswBtn.attr('disabled', false);
    });
});