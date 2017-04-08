var $tagsForm = $('.bt-tagsf');
var $tagsText = $('.tagsText');
var $tagsBtn = $tagsForm.find('.bt-tags-submit');
var $addItemBtn = $('.bt-item-add');
var $dialog = $('.bt-site-dialog');
$tagsForm.on('submit', function (e) {
    e.preventDefault();
    $tagsBtn.attr('disabled', true);
    var data = $tagsForm.serialize();
    $.ajax({
        url: '/tags/add',
        type: 'post',
        data: data
    }).done(function (d) {
        if (d.errno === 0 && d.status === 1) {
            $tagsText.text('添加出错');
        }
    }).complete(function () {
        $tagsBtn.attr('disabled', false);
    });
});

$addItemBtn.on('click', function () {
    $dialog.toggle();
});