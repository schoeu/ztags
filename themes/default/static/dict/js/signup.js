var $signupForm=$(".signupForm"),$signUpText=$(".signUpText"),$signUpBtn=$(".bt-signup-submit");$signupForm.on("submit",function(s){var t=$(this);if(s.preventDefault(),t.find("#password").val()===t.find("#repassword").val()){$signUpBtn.attr("disabled",!0);var n=$signupForm.serialize();$.ajax({url:"/users/signup",type:"post",data:n}).done(function(s){0===s.errno&&(1===s.status?$signUpText.text("该用户已注册"):0===s.status&&(location.href="/users/login"))}).complete(function(){$signUpBtn.attr("disabled",!1)})}else $signUpText.text("两次密码不一致")});