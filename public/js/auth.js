$('document').ready(function(){

    $("#btn-signin").click(function(e){

        e.preventDefault();

        var reqPath = '/auth/signin'

        var email = $.trim($("#signin-email").val());
        var password = $.trim($("#signin-password").val());
    
        var reqData = {
            email : email,
            password : password
        }
        requestAuth(reqPath, reqData);
    });

    $("#btn-signup").click(function(e){

        e.preventDefault();
        var reqPath = '/auth/signup'

        /*
            0. validation
            1. request
        */
        var username = $.trim($("#signup_username").val());
        var email = $.trim($("#signup_email").val());
        var password = $.trim($("#signup_password").val());
        var password_confirm = $.trim($("#signup_password_confirm").val());

        

        var reqData = {
            username : username,
            email : email,
            password : password
        }
        

        requestAuth(reqPath, reqData);
    });

    $("#btn-send-chpass-code").click(function(){

        var reqPath = '/auth/findPassword'

        var email = $.trim($("#email-find-password").val());

        var reqData = {
            email : email
        }
        
        requestAuth(reqPath, reqData);
    });

    $("#btn-chpass").click(function(){
        
        var email = $.trim($("#chpass-email").val());
        var password = $.trim($("#chpass-password").val());
        var password_confirm = $.trim($("#chpass-password-confirm").val());

        var reqData = {

        }        
        requestAuth(reqData);
    });

});



function requestAuth(reqPath, reqData){

	$.ajax({
        type:'POST',
        url: reqPath,
        data : reqData,
        dataType: "json",
        success: function(data){
            console.log(data)
        }
      });
}