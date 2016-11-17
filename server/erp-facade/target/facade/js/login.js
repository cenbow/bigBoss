var FACADE_URL = ""
$(function () {
    var inIframe;
    try {
        inIframe = window.self !== window.top;
    } catch (e) {
        // browsers can block access to window.top due to same origin policy
        inIframe = true;
    }
    if (inIframe) {
        parent.window.location.reload();
        return;
    }

    $(".formDl").find("input").focus(function () {
        $(this).parents("dd").addClass("lgHold");
    }).blur(function () {
        $(this).parents("dd").removeClass("lgHold");
    });
    /*$("#js_toggleRememberMe").click(function(){
     $(this).find("em").toggleClass("choose");
     });*/
    $('#js_btnLogin').click(loginSub);

    //var $company = $('#js_company'),
    var $username = $('#js_username'),
        $password = $('#js_password');
   /* $company.keydown(function () {
        $(".lg-error").hide();
    }).on('keypress', function (event) {
        if (event.keyCode == 13) loginSub();
    });*/
    $username.keydown(function () {
        $(".lg-error").hide();
    }).on('keypress', function (event) {
        if (event.keyCode == 13) loginSub();
    });
    $password.keydown(function () {
        $(".lg-error").hide();
    }).on('keypress', function (event) {
        if (event.keyCode == 13) loginSub();
    });

    function loginSub() {
        /*if (!$.trim($company.val())) {
            $company.parents("dd").addClass("lgHold");
            $company.focus();
            $(".lg-error").html('请输入公司名称');
            $(".lg-error").show();
            return false;
        }*/
        ;
        if (!$.trim($username.val())) {
            $username.parents("dd").addClass("lgHold");
            $username.focus();
            $(".lg-error").html('请输入用户名名称');
            $(".lg-error").show();
            return false;
        }
        ;
        if (!$.trim($password.val())) {
            $password.parents("dd").addClass("lgHold");
            $password.focus();
            $(".lg-error").html('请输入密码');
            $(".lg-error").show();
            return false;
        }
        ;
        $(".lg-error").html('');
        $.ajax({
            method: 'POST',
            url: 'account/login',
            data: {
                //company: $.trim($company.val()),
                username: $.trim($username.val()),
                password: $.trim($password.val())
                //rememberMe: $('#js_toggleRememberMe>em').hasClass('choose') ? 'Y' : 'N'
            },
            dataType: 'json'
        }).done(function (result) {
            if (result.success) {
                var accountId = result.data.accountId,
                    roleId = result.data.roleId;
                FACADE_URL = result.data.facade_url;
                localStorage.setItem("accountId",accountId);
                localStorage.setItem("roleId",roleId);
                localStorage.setItem("login",true);
                localStorage.setItem("userName",$.trim($username.val()));
                if(roleId == 1){
                    window.location.replace(FACADE_URL+'/index.html');
                }else{
                    //localStorage.setItem("commonLogin",true);
                    window.location.replace(FACADE_URL+'/mstp/index.html');
                }

            }else{
                $(".lg-error").html(result.error.message);
                $(".lg-error").show();
                $username.focus();
            }
        }).fail(function (xhr) {

            /*if (xhr.status == 401) {
                var message = '';
                try {
                    var result = JSON.parse(xhr.responseText);
                    message = result.error.message;
                } catch (e) {
                }
                $username.parents('dd').addClass('lgHold');
                $(".lg-error").html(message || '登录名或者密码错误');
                $(".lg-error").show();
                $username.focus();
            } else {
                alert('网络错误');
            }*/
        });
    }
});
