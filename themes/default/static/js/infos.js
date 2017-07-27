var $pswoginForm = $('.bt-pswf');
var $pswBtn = $pswoginForm.find('.bt-psw-submit');
var $pswText = $('.pswText');
var $thumb = $('.bt-userthum');

// 初始化Web Uploader
var uploader = WebUploader.create({
    // 选完文件后，是否自动上传。
    auto: true,

    // 文件接收服务端。
    server: '/users/upload',

    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: {
        id: '.bt-userpic',
        multiple: false
    },

    // 只允许选择图片文件。
    accept: {
        title: 'Images',
        extensions: 'gif,jpg,jpeg,bmp,png',
        mimeTypes: 'image/*'
    }
});

uploader.on('uploadSuccess', function( file ) {
    var $li = $('<div id="' + file.id + '" class="file-item thumbnail"><img></div>'),
        $img = $li.find('img');

    // $thumb为容器jQuery实例
    $thumb.empty().append($li);

    // 创建缩略图
    // 如果为非图片文件，可以不用调用此方法。
    // thumbnailWidth x thumbnailHeight 为 100 x 100
    uploader.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }

        $img.attr( 'src', src );
    }, 100, 100);
});


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