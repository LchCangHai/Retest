
let isName = false,
    isCode = false,
    isType = false,
    isGrade = false,
    isPw = false,
    isRepw = false;

$('#signInName').bind('blur',blurName);
$('#signInCode').bind('blur',blurAccount);
$('#signInPw').bind('blur',blurPw);
$('#signInRepw').bind('blur',blurRepw);
$('.type').bind('blur',blurType);
$('.grade').bind('blur',blurGrade);

//显示密码
//按下鼠标显示
// 松开则隐藏
$('.passwordbtn').mousedown(function () {
    let icon = $('.passwordspan');
    let inp = $('#signInPw');
    icon.removeClass('glyphicon-eye-close');
    icon.addClass('glyphicon-eye-open');
    inp.attr('type','text');
})
$('.passwordbtn').mouseup(function () {
    let icon = $('.passwordspan');
    let inp = $('#signInPw');
    icon.removeClass('glyphicon-eye-open');
    icon.addClass('glyphicon-eye-close');
    inp.attr('type','password');
})

//显示密码(再次输入)
//按下鼠标显示
// 松开则隐藏
$('.repasswordbtn').mousedown(function () {
    let icon = $('.repasswordspan');
    let inp = $('#signInRepw');
    icon.removeClass('glyphicon-eye-close');
    icon.addClass('glyphicon-eye-open');
    inp.attr('type','text');
})
$('.repasswordbtn').mouseup(function () {
    let icon = $('.repasswordspan');
    let inp = $('#signInRepw');
    icon.removeClass('glyphicon-eye-open');
    icon.addClass('glyphicon-eye-close');
    inp.attr('type','password');
})

//显示ResultShow(RS)
function nameRS(result) {
    let icon = $('.nameResultShow');
    let item = $('.nameForm');
    icon.css('display','block');
    if(result){
       icon.removeClass('glyphicon-remove');
       icon.addClass('glyphicon-ok');
       item.removeClass('has-error');
       item.addClass('has-success');
    } else {
        icon.removeClass('glyphicon-ok');
        icon.addClass('glyphicon-remove');
        item.removeClass('has-success');
        item.addClass('has-error');
    }
}
function codeRS(result) {
    let icon = $('.codeResultShow');
    let item = $('.codeForm');
    if(result){
        icon.removeClass('glyphicon-remove');
        icon.addClass('glyphicon-ok');
        item.removeClass('has-error');
        item.addClass('has-success');
    } else {
        icon.removeClass('glyphicon-ok');
        icon.addClass('glyphicon-remove');
        item.removeClass('has-success');
        item.addClass('has-error');
    }
}
// 类别
function typeRS(result) {
    let item = $('.typeForm');
    if(result){
        item.removeClass('has-error');
        item.addClass('has-success');
    } else {
        item.removeClass('has-success');
        item.addClass('has-error');
    }
}
// 年级
function gradeRS(result) {
    let item = $('.gradeForm');
    if(result){
        item.removeClass('has-error');
        item.addClass('has-success');
    } else {
        item.removeClass('has-success');
        item.addClass('has-error');
    }
}
function pwRS(result) {
    let icon = $('.pwResultShow');
    let item = $('.passwordForm');
    if(result){
        icon.removeClass('glyphicon-remove');
        icon.addClass('glyphicon-ok');
        item.removeClass('has-error');
        item.addClass('has-success');
    } else {
        icon.removeClass('glyphicon-ok');
        icon.addClass('glyphicon-remove');
        item.removeClass('has-success');
        item.addClass('has-error');
    }
}
function repwRS(result) {
    let icon = $('.repwResultShow');
    let item = $('.repwForm');
    if(result){
        icon.removeClass('glyphicon-remove');
        icon.addClass('glyphicon-ok');
        item.removeClass('has-error');
        item.addClass('has-success');
    } else {
        icon.removeClass('glyphicon-ok');
        icon.addClass('glyphicon-remove');
        item.removeClass('has-success');
        item.addClass('has-error');
    }
}

// $('#signInName').bind('blur',blurNmae);
function blurName(isRight = true, info = "correct"){
    let val = $('#signInName').val();
    let hb = $('#nameHelpBlock');
    if(val == '' || val == null || val.length == 0 ) {
        nameRS(false);
        hb.html('输入不能为空');
        isName = false;
    } else if(!isRight) {
        nameRS(false);
        hb.html(info);
        isName = false;
    } else {
        nameRS(true);
        hb.html('');
        isName = true;
    }
}
// $('#signInCode').bind('blur',blurAccount);
function blurAccount(isRight = true, info = "correct") {
    let reg = /\d/;
    let val = $('#signInCode').val();
    let hb = $('#codeHelpBlock');
    if(val == '' || val == null || val.length == 0 ) {
        codeRS(false);
        hb.html('输入不能为空');
        isCode = false;
    } else if(!reg.test(val)) {
        codeRS(false);
        hb.html('学号全为数字！');
        isCode = false;
    } else if(!isRight) {
        codeRS(false);
        hb.html(info);
        isCode = false;
    } else {
        codeRS(true);
        hb.html('');
        isCode = true;
    }
}
function blurType(isRight = true, info = 'correct') {
    let val = $('.type').val();
    let hb = $('#typeHelpBlock');
    if(val == '' || val == null || val.length == 0 ) {
        typeRS(false);
        hb.html('请选择类别');
        isType = false;
    } else if(!isRight) {
        typeRS(false);
        hb.html(info);
        isType = false;
    } else {
        typeRS(true);
        hb.html('');
        isType = true;
    }
}

function blurGrade(isRight = true, info = 'correct') {
    let val = $('.grade').val();
    let hb = $('#gradeHelpBlock');
    if(val == '' || val == null || val.length == 0 ) {
        gradeRS(false);
        hb.html('请选择年级');
        isGrade = false;
    } else if(!isRight) {
        gradeRS(false);
        hb.html(info);
        isGrade = false;
    } else {
        gradeRS(true);
        hb.html('');
        isGrade = true;
    }
}
// $('#signInPw').bind('blur',blurPw);
function blurPw(isRight = true, info = "correct") {
    let val = $('#signInPw').val();
    let hb = $('#pwHelpBlock');
    if(val == '' || val == null || val.length == 0 ) {
        pwRS(false);
        hb.html('输入不能为空');
        isPw = false;
    } else if(!isRight) {
        pwRS(false);
        hb.html(info);
        isPw = false;
    } else {
        pwRS(true);
        hb.html('');
        isPw = true;
    }
}
// $('#signInRepw').bind('blur',blurRepw);
function blurRepw(isRight = true, info = "correct") {
    let pval = $('#signInPw').val();
    let val = $('#signInRepw').val();
    let hb = $('#repwHelpBlock');
    if(val == '' || val == null || val.length == 0 ) {
        repwRS(false);
        hb.html('输入不能为空');
        isRepw = false;
    }  else if(val != pval) {
        repwRS(false);
        hb.html('两次输入密码不一致！');
        isRepw = false;
    } else if(!isRight) {
        repwRS(false);
        hb.html(info);
        isRepw = false;
    } else {
        repwRS(true);
        hb.html('');
        isRepw = true;
    }
}

$('.signInBtn').click(function () {
    if(isCode == false || isName == false || isPw == false || isRepw == false || isType == false ||isGrade == false) {
        confirm('请正确填写后注册！');
        return ;
    } else {
        let data = {
            name :$('#signInName').val(),
            studentID:$('#signInCode').val(),
            type:$('.type').val(),
            level:$('.grade').val(),
            password:$('#signInPw').val(),
        };
        let a = JSON.stringify(data);
        $.ajax({
            url:'../user/create',
            type:'post',
            dataType:'json',
            contentType:'application/json',
            data:a,

            success:function (result) {
                if(result.status) {
                    let b = confirm('注册成功,去登录吧');
                    if(b) {
                        window.location.href = 'sign_up.html';
                    }
                } else {
                    confirm(result.error);
                }
            }
        })
    }
})




















