$(function () {
    jeDate("#dtime",{
        theme:{ bgcolor:"#00A1CB",color:"#ffffff", pnColor:"#00CCFF"},
        format:'YYYY/MM/DD hh:mm:ss ',
        // isShow: false,
        multiPane: true,
        festival:false,                             //是否显示农历节日
        fixed:true,                                 //是否静止定位，为true时定位在输入框，为false时居中定位
        zIndex:2099,
    })
});





let name_nav = $('.inName'),
    account_nav = $('.inAccount'),
    phone_nav = $('.inPhone'),
    major_nav = $('.inMajor');
// 获取教师信息
$(function () {
    $.ajax({
        url:'../teacher/findTeacher',
        dataType:'json',
        contentType:'application/json',
        success:function (result) {
            if(result.status) {
                name_nav.html(result.name);
                account_nav.html(result.studentID);
                phone_nav.html(result.tel);
                major_nav.html(result.type);
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }

                console.log('!!!get user info error!!');
            }
        }
    })
})


//验证
$('#testName').bind('blur',blurName);
$('.type').bind('blur',blurType);
$('.grade').bind('blur',blurGrade);
$('#newPw').bind('blur',blurDtime);
$('#renpw').bind('blur',blurContent);


function nameRS(result) {
    let icon = $('.nameResultShow');
    let item = $('.testNameForm');
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
function typeRS(result) {
    // let icon = $('.passwordResultShow');
    let item = $('.typeForm');
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
function gradeRS(result) {
    // let icon = $('.renpwResultShow');
    let item = $('.gradeForm');
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
function dtimeRS(result) {
    // let icon = $('.passwordResultShow');
    let item = $('.dtimeForm');
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
function contentRS(result) {
    // let icon = $('.renpwResultShow');
    let item = $('.testContentForm');
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

let isName = false,
    isType = false,
    isGrade = false,
    isDtime = false,
    isContent = false;
function blurName(isRight = true, info = "correct") {
    let val = $('#testName').val();
    let hb = $('#testNameHelpBlock');
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
function blurType(isRight = true, info = "correct") {
    let val = $('.type').val();
    let hb = $('#typeHelpBlock');
    if(val == '' || val == null || val.length == 0 ) {
        typeRS(false);
        hb.html('输入不能为空');
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
function blurGrade(isRight = true, info = "correct") {
    let val = $('.grade').val();
    let hb = $('#gradeHelpBlock');
    if(val == '' || val == null || val.length == 0 ) {
        gradeRS(false);
        hb.html('输入不能为空');
        isGrade = false;
    }  else if(!isRight) {
        gradeRS(false);
        hb.html(info);
        isGrade = false;
    } else {
        gradeRS(true);
        hb.html('');
        isGrade = true;
    }
}
function blurDtime(isRight = true, info = "correct") {
    let val = $('#dtime').val();
    let hb = $('#dtimeHelpBlock');
    if(val == '' || val == null || val.length == 0 ) {
        dtimeRS(false);
        hb.html('输入不能为空');
        isDtime = false;
    } else if(!isRight) {
        dtimeRS(false);
        hb.html(info);
        isDtime = false;
    } else {
        dtimeRS(true);
        hb.html('');
        isDtime = true;
    }
}
function blurContent(isRight = true, info = "correct") {
    let val = $('#tContent').val();
    let hb = $('#contentHelpBlock');
    if(val == '' || val == null || val.length == 0 ) {
        contentRS(false);
        hb.html('输入不能为空');
        isContent = false;
    } else if(!isRight) {
        contentRS(false);
        hb.html(info);
        isContent = false;
    } else {
        contentRS(true);
        hb.html('');
        isContent = true;
    }
}


let form = document.querySelector('.addForm');

$('.add').click(function () {
    let formData1 = new FormData(form);
    console.log(formData1.get('txt'));
})

//获取文件
$('.upload1').change(function () {
    // console.log(this);
    $('.tipContain').hide();

    $('#fileHelpBlock').html(this.files[0].name);
    let File1 = this.files[0];
    console.log(File1);
})

$('.add').click(function () {
    let form = document.querySelector('.addForm');
    let formData1 = new FormData(form);

    $.ajax({
        url:"../teacher/newWork",
        type: "POST",
        data:formData1,
        contentType: false,
        processData: false,
        dataType:'json',
        success: function(result) {
            if(result.status){
                confirm("提交成功,标识码为："+result.work);
                $('#fileHelpBlock').html('');
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }

                confirm(result.error);
            }
        },
        error:function () {
            console.log('error： 上传考核');
        }
    });

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































