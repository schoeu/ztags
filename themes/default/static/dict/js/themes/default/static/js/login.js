var $loginForm=$(".loginForm"),$loginBtn=$loginForm.find(".bt-login-submit"),$loginText=$(".loginText");$loginForm.on("submit",function(n){n.preventDefault(),$loginBtn.attr("disabled",!0);var o=$loginForm.serialize();$.ajax({url:"/users/login",type:"post",data:o}).done(function(n){0===n.errno&&(1===n.status?$loginText.text("用户名或密码错误"):location.href="/")}).complete(function(){$loginBtn.attr("disabled",!1)})});