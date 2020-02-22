
//检查是否登录
$(function () {

    $.ajax({
        url:'../manager/updatePassword',
        type:'post',
        dataType: 'json',
        contentType: 'application/json',
        success:function (result) {
            if(result.status) {
                console.log('验证成功');
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }
                console.log('验证成功');
            }
        },
        error:function () {
            console.log('验证失败');
        }

    })

})



let isName = true,
    isCode = false,
    isPhone = true,
    isType = true;

$('#signInName').bind('blur',blurName);
$('#signInCode').bind('blur',blurAccount);
$('#signInPhone').bind('blur',blurPhone);
$('.type').bind('blur',blurType);

//显示ResultShow(RS)
function nameRS(result) {
    let icon = $('.nameResultShow');
    let item = $('.nameForm');
    icon.css('display','block');
    if(result){
        // icon.removeClass('glyphicon-remove');
        // icon.addClass('glyphicon-ok');
        item.removeClass('has-error');
        // item.addClass('has-success');
    } else {
        // icon.removeClass('glyphicon-ok');
        // icon.addClass('glyphicon-remove');
        item.removeClass('has-success');
        item.addClass('has-error');
    }
}
function phoneRS(result) {
    let icon = $('.phoneResultShow');
    let item = $('.phoneForm');
    if(result){
        // icon.removeClass('glyphicon-remove');
        // icon.addClass('glyphicon-ok');
        item.removeClass('has-error');
        // item.addClass('has-success');
    } else {
        // icon.removeClass('glyphicon-ok');
        // icon.addClass('glyphicon-remove');
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
function typeRS(result) {
    let item = $('.typeForm');
    if(result){
        item.removeClass('has-error');
        // item.addClass('has-success');
    } else {
        item.removeClass('has-success');
        item.addClass('has-error');
    }
}


// $('#signInName').bind('blur',blurNmae);
function blurName(isRight = true, info = "correct"){
    let val = $('#signInName').val();
    let hb = $('#nameHelpBlock');
    if(val == '' || val == null || val.length == 0 ) {
        nameRS(true);
        hb.html('');
        isName = true;
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
function blurPhone(isRight = true, info = "correct") {
    let reg = /\d/;
    let val = $('#signInPhone').val();
    let hb = $('#phoneHelpBlock');
    if(val == '' || val == null || val.length == 0 ) {
        phoneRS(true);
        hb.html('');
        isPhone = true;
    } else if(!reg.test(val)) {
        phoneRS(false);
        hb.html('学号全为数字！');
        isPhone = false;
    } else if(!isRight) {
        phoneRS(false);
        hb.html(info);
        isPhone = false;
    } else {
        phoneRS(true);
        hb.html('');
        isPhone = true;
    }
}
function blurAccount(isRight = true, info = "correct") {
    let reg = /\d/;
    let val = $('#signInCode').val();
    let hb = $('#codeHelpBlock');
    if(val == '' || val == null || val.length == 0 ) {
        codeRS(true);
        hb.html('');
        isCode = true;
    } else if(!reg.test(val)) {
        codeRS(false);
        hb.html('工号全为数字！');
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
        typeRS(true);
        hb.html('');
        isType = true;
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

$('.signInBtn').click(function () {
    if(isCode == false || isName == false || isPhone == false || isType == false ) {
        console.log('1'+isName+'2'+isCode+'3'+isType+'4'+isPhone);
        confirm('请正确填写信息，并至少填写工号');
    }
    let data = {
        name : $('#signInName').val(),
        code : $('#signInCode').val(),
        phone : $('#signInPhone').val(),
        type : $('.type').val()
    }
    let a = JSON.stringify(data);
    console.log(a);
    console.log(name);
    $.ajax({
        url:'../manager/create',
        dataType:'json',
        type:'post',
        contentType:'application/json',
        data:a,
        success:function (result) {
            if(result.status) {
                confirm('创建成功');
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }

                confirm(result.error);
            }
        },
        error:function () {
            console.log('error:提交错误');
        }
    })

})

$('.sign_out').click(function () {

    $.ajax({
        url:'../user/logout',
        type:'post',
        dataType:'json',
        contentType:'application/json',

        success:function (result) {
            if(result.status) {
                window.location.href = '../index.html';
            } else {
                console.log('退出失败');
            }
        },
        error:function () {
            console.log('error：退出失败');
        }
    })
})














