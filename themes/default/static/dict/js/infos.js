var $pswoginForm=$(".bt-pswf"),$pswBtn=$pswoginForm.find(".bt-psw-submit"),$pswText=$(".pswText"),$thumb=$(".bt-userthum"),uploader=WebUploader.create({auto:!0,server:"/users/upload",pick:{id:".bt-userpic",multiple:!1},accept:{title:"Images",extensions:"gif,jpg,jpeg,bmp,png",mimeTypes:"image/*"}});uploader.on("uploadSuccess",function(e){var t=$('<div id="'+e.id+'" class="file-item thumbnail"><img></div>'),s=t.find("img");$thumb.empty().append(t),uploader.makeThumb(e,function(e,t){e?s.replaceWith("<span>不能预览</span>"):s.attr("src",t)},100,100)}),$pswoginForm.on("submit",function(e){if(e.preventDefault(),$pswoginForm.find("#nickname")){$pswBtn.attr("disabled",!0);var t=$pswoginForm.serialize();$.ajax({url:"/users/infos",type:"post",data:t}).done(function(e){0===e.errno&&(1===e.status?$pswText.text("更改出错,请重试"):$pswText.text("更改成功"))}).complete(function(){$pswBtn.attr("disabled",!1)})}else $pswText.text("昵称必填")});