let cxt = '../';
$(function () {
    $('.verifyImg').css('background','url(' + cxt + 'verifyCode' + ')');
    $('.verifyImg').css('background-size','cover');
    let a = $('.verifyImg').css('background');
    console.log(a);
})




// 要实现功能有：
//     1.判空显示错误（blur即时显示）
//     2.验证码，开始时未出现，点击位置出现验证码图片（刷新也是点击得到），
//         验证码blur后，出现加载图片，显示正确与否；
//     3.登录按钮， 点击后出现遮罩层。
//         1）通过验证，跳转至对应界面；
//         2）未通过，显示错误信息；
//     4.错误信息显示：
//         1）学号未注册（不存在）；
//         2）密码错误；
//     5.有错误便要直接刷新验证码；

$('#signUpCode').bind('blur',blurCode);
$('#signUpPassword').bind('blur',blurPassword);
$('#verifycode').bind('blur',blurVerify);

// let isIdenity = false;
let isAccount = false;
let isPassword = false;
let isVerify = false;

//是否选中身份判断


//显示密码
//按下鼠标显示
// 松开则隐藏
$('.passwordbtn').mousedown(function () {
    let icon = $('.passwordspan');
    let inp = $('#signUpPassword');
    icon.removeClass('glyphicon-eye-close');
    icon.addClass('glyphicon-eye-open');
    inp.attr('type','text');
})
$('.passwordbtn').mouseup(function () {
    let icon = $('.passwordspan');
    let inp = $('#signUpPassword');
    icon.removeClass('glyphicon-eye-open');
    icon.addClass('glyphicon-eye-close');
    inp.attr('type','password');
})

//显示信息的图标与颜色
function codeRS(result) {
    // == true则为正确,不显示出来；
    // == false为错误，有显示；
    if(!result) {
        $('.codeForm').addClass('has-error');
    }
    //需求是为判断错误的情况下，不显示信息；
    // true效果为空；
    if(result) {
        $('.codeForm').removeClass('has-error');
    }
}
function passwRS(result) {
    // == true则为正确,不显示出来；
    // == false为错误，有显示；
    if(!result) {
        $('.passwordForm').addClass('has-error');
    }
    //需求是为判断错误的情况下，不显示信息；
    // true效果为空；
    if(result) {
        $('.passwordForm').removeClass('has-error');
    }
}
function verifyRS(result) {
    let item = $('.verifyForm');
    let icon = $('.verifyResultShow');
    if(!result) {
        item.addClass('has-error');
        item.removeClass('has-success');
    }
    //需求是为判断错误的情况下，不显示信息；
    // true效果为空；
    if(result) {
        item.removeClass('has-error');
        // item.addClass('has-success');
    }
}

// $('#signUpCode').bind('blur',blurCode);
function blurCode() {
    let val = $('#signUpCode').val();
    let codeHB = $('#codeHelpBlock');
    let reg = /\d/;
    let isCodeE = true;
    if(val == '' || val == null || val.length == 0 ) {
        codeRS(false);
        codeHB.html('输入不能为空');
        isAccount = false;
    }
    else if(!reg.test(val)) {
        codeRS(false);
        codeHB.html('账号为纯数字');
        isAccount = false;
    } else {
        codeRS(true);
        codeHB.html('');
        isAccount = true;
    }
}
// $('#signUpPassword').bind('blur',blurPassword);
function blurPassword(isPasswordRight = true) {
    let val = $('#signUpPassword').val();
    let psHB = $('#passwordHelpBlock');
    if(val == '' || val == null || val.length == 0 ) {
        passwRS(false);
        psHB.html('输入不能为空');
        isPassword = false;
    } else if(!isPasswordRight){
        passwRS(false);
        psHB.html('密码错误！');
        isPassword = false;
    } else {
        passwRS(true);
        psHB.html('');
        isPassword = true;
    }
}
// $('#verifycode').bind('blur',blurVerify);
function blurVerify() {
    let val = $('#verifycode').val();
    let vcHB = $('#verifyHelpBlock');
    if(val == '' || val == null || val.length == 0 ) {
        verifyRS(false);
        vcHB.html('输入不能为空');
        isVerify = false;
    } else {
        verifyRS(true);
        vcHB.html('');
        isVerify = true;
    }
}

//点击刷新验证码
$('.verifyImg').click(function () {
    let verifData = $('#verifycode').val();
    $('.verifyImg').css('background','url("' + cxt + 'verifyCode' + "?t=" + Math.random() + '")');
    $('.verifyImg').css('background-size','cover');
    let a = $('.verifyImg').css('background');
    console.log()
})

$('.signUpBtn').click(function () {
    let btnsuhb = $('#signUpHelpBlock');
    let a = $('input:radio:checked').val();
    if(isVerify == false || isPassword == false || isAccount == false) {
        btnsuhb.html('填写不正确不能登录哦');
    } else if(a == undefined){
        confirm('未选择身份');
    } else {
        btnsuhb.html('');
        let formData = {
            idenity : $('input:radio:checked').val(),
            id : $('#signUpCode').val(),
            Password : $('#signUpPassword').val(),
            verifyCod : $('#verifycode').val()
        };
        let a = JSON.stringify(formData);
        console.log(a);
        // console.log(a.id);
        // console.log(JSON.parse(a));
        let iden = formData.idenity;
        $.ajax({
            type:'POST',
            url: cxt + 'login',
            dataType: 'json',
            contentType:'application/json',
            data: a,
            success: function (result) {
                console.log(result);
                if(result.status) {
                    if(iden == 1) {
                        window.location.href = 'student_homepage.html';
                    } else if(iden == 2) {
                        window.location.href = 'teacher_homepage.html';
                    } else if(iden == 3) {
                        window.location.href = 'Administrator_homepage.html';
                    }
                } else {
                    confirm(result.error);
                    $('.verifyImg').css('background','url("' + cxt + 'verifyCode' + "?t=" + Math.random() + '")');
                    $('.verifyImg').css('background-size','cover');
                }
            }
        });
    }
})





















