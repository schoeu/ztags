var $signupForm=$(".signupForm"),$signUpText=$(".signUpText"),$signUpBtn=$(".bt-signup-submit");$signupForm.on("submit",function(t){var s=$(this);if(t.preventDefault(),s.find("#password").val()===s.find("#repassword").val()){$signUpBtn.attr("disabled",!0);var n=$signupForm.serialize();$.ajax({url:"/users/signup",type:"post",data:n}).done(function(t){0===t.errno&&(1===t.status?$signUpText.text("该用户已注册"):0===t.status&&(location.href="/"))}).complete(function(){$signUpBtn.attr("disabled",!1)})}else $signUpText.text("两次密码不一致")});