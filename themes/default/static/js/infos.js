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
        url: '/users/infos',
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