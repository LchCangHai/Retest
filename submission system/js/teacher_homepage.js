let name_1 = $('#Name'),
    account_1 = $('#Code'),
    phone_1 = $('#Phone'),
    major_1 = $('.Major');
let name_nav = $('.inName'),
    account_nav = $('.inAccount'),
    phone_nav = $('.inPhone'),
    major_nav = $('.inMajor');
//分页用
$(function() {
    // $('#otherInfoTab a:last').tab('show');//初始化显示哪个tab

    $('#otherInfoTab a').click(function(e) {
        e.preventDefault();//阻止a链接的跳转行为
        $(this).tab('show');//显示当前选中的链接及关联的content
    })
})
// 获取教师信息
$(function () {
    $.ajax({
        url:'../teacher/findTeacher',
        contentType:'application/json',
        dataType:'json',
        success:function (result) {
            if(result.status) {
                name_nav.html(result.name);
                name_1.val(result.name);
                account_nav.html(result.workID);
                account_1.val(result.workID);
                phone_nav.html(result.tel);
                phone_1.val(result.tel);
                major_nav.html(result.type);
                major_1.val(result.type);
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }

                console.log('!!!get user info error!!');
            }
        }
    })
})

//教师查看考核
// $(function () {
//     $.ajax({
//         url:'../teacher/selectWorks',
//
//         success:function (result) {
//             if(result.status) {
//                 let i = 0;
//                 let n = result.work.length;
//                 for(i = 0;i < n; i++) {
//                     let clone1 = $('.clone1').clone(true);
//                     let containt1 = $('.mytest_');
//                     let tem1 = result.work[i];
//                     clone1.removeClass('clone1');
//                     clone1.addClass('_clone1');
//                     clone1.children('.Nmae1').html(tem1.name);
//                     clone1.children('.Code1').html(tem1.code);
//                     clone1.children('.Grade1').html(tem1.grade);
//                     clone1.children('Type1').html(tem1.type);
//                     clone1.children('Deadline1').html(tem1.end);
//                     containt1.append(clone1);
//                 }
//             } else {
//                 console.log('获取可提交信息错误');
//             }
//         }
//     })
// })

//学生查询已提交作业
// $(function () {
//     $.ajax({
//         url:'../teacher/selectWorks',
//
//         success:function (result) {
//             if(result.status) {
//                 let i = 0;
//                 let n = result.userWork.length;
//                 for(i = 0;i < n; i++) {
//                     let clone2 = $('.clone2').clone(true);
//                     let containt2 = $('.mytest_');
//                     let tem2 = result.userWork[i];
//                     clone2.removeClass('clone1');
//                     clone2.addClass('_clone2');
//                     clone2.children('.Nmae2').html(tem2.name);
//                     clone2.children('.Code2').html(tem2.code);
//                     clone2.children('.Teacher2').html(tem2.teacher);
//                     clone2.children('.Grade2').html(tem2.grade);
//                     clone2.children('Type2').html(tem2.type);
//                     clone2.children('.Uptime').html(tem2.date);
//                     clone2.children('.State2').html(tem2.status);
//                     if(tem2.status == '已删除'){
//                         clone2.addClass('deleted');
//                     }
//                     containt2.append(clone2);
//                 }
//             } else {
//                 console.log('获取已提交考核失败');
//             }
//         }
//     })
// })








//修改按钮
$('.btnModify1').click(function () {
    $(this).hide();
    $('.btnConfirm1').show();
    $('.btnCancel1').show();
    name_1.removeAttr('readonly');
    phone_1.removeAttr('readonly');
    major_1.removeAttr('disabled');
})
// 确定修改，需要发送
$('.btnConfirm1').click(function () {
    let data = {
        name : name_1.val(),
        workID : account_nav.html(),
        tel : phone_1.val(),
        type : major_1.val()
    };
    let a = JSON.stringify(data);
    $.ajax({
        url:'../teacher/update',
        type:'POST',
        dataType:'json',
        data:a,
        contentType:'application/json',

        success:function (result) {
            if(result.status == false) {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }

                confirm(result.error);
            } else {
                confirm('修改成功');
                name_nav = data.name;
                account_nav = data.workID;
                phone_nav = data.tel;
                type_nav = data.type;
            }
        }
    })
    $(this).hide();
    $('.btnConfirm1').hide();
    $('.btnCancel1').hide();
    $('.btnModify1').show();
    name_1.attr('readonly','');
    phone_1.attr('readonly','');
    major_1.attr('disabled','');
})
// 取消发送
$('.btnCancel1').click(function () {
    name_1.val(name_nav.html());
    account_1.val(account_nav.html());
    phone_1.val(phone_nav.html());
    major_1.val(major_nav.html());
    $(this).hide();
    $('.btnConfirm1').hide();
    $('.btnCancel1').hide();
    $('.btnModify1').show();
    name_1.attr('readonly','');
    phone_1.attr('readonly','');
    major_1.attr('disabled','');
})



//////////////////////////////////////part2/////////////////////////////////////////

$('#oldPw').bind('blur',blurOpw);
$('#newPw').bind('blur',blurPw);
$('#renpw').bind('blur',blurRepw);


//显示密码(旧密码)
//按下鼠标显示
// 松开则隐藏
$('.oldpasswordbtn').mousedown(function () {
    let icon = $('.oldpasswordspan');
    let inp = $('#oldPw');
    icon.removeClass('glyphicon-eye-close');
    icon.addClass('glyphicon-eye-open');
    inp.attr('type','text');
})
$('.oldpasswordbtn').mouseup(function () {
    let icon = $('.oldpasswordspan');
    let inp = $('#oldPw');
    icon.removeClass('glyphicon-eye-open');
    icon.addClass('glyphicon-eye-close');
    inp.attr('type','password');
})

//显示密码
//按下鼠标显示
// 松开则隐藏
$('.npasswordbtn').mousedown(function () {
    let icon = $('.npasswordspan');
    let inp = $('#newPw');
    icon.removeClass('glyphicon-eye-close');
    icon.addClass('glyphicon-eye-open');
    inp.attr('type','text');
})
$('.npasswordbtn').mouseup(function () {
    let icon = $('.npasswordspan');
    let inp = $('#newPw');
    icon.removeClass('glyphicon-eye-open');
    icon.addClass('glyphicon-eye-close');
    inp.attr('type','password');
})

//显示密码(再次输入)
//按下鼠标显示
// 松开则隐藏
$('.renpasswordbtn').mousedown(function () {
    let icon = $('.renpasswordspan');
    let inp = $('#renpw');
    icon.removeClass('glyphicon-eye-close');
    icon.addClass('glyphicon-eye-open');
    inp.attr('type','text');
})
$('.renpasswordbtn').mouseup(function () {
    let icon = $('.renpasswordspan');
    let inp = $('#renpw');
    icon.removeClass('glyphicon-eye-open');
    icon.addClass('glyphicon-eye-close');
    inp.attr('type','password');
})


function opwRS(result) {
    let icon = $('.opwResultShow');
    let item = $('.opasswordForm');
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
function pwRS(result) {
    let icon = $('.passwordResultShow');
    let item = $('.npasswordForm');
    if(result){
        // icon.removeClass('glyphicon-remove');
        // icon.addClass('glyphicon-ok');
        item.removeClass('has-error');
        item.addClass('has-success');
    } else {
        // icon.removeClass('glyphicon-ok');
        // icon.addClass('glyphicon-remove');
        item.removeClass('has-success');
        item.addClass('has-error');
    }
}
function repwRS(result) {
    let icon = $('.renpwResultShow');
    let item = $('.renpwForm');
    if(result){
        // icon.removeClass('glyphicon-remove');
        // icon.addClass('glyphicon-ok');
        item.removeClass('has-error');
        item.addClass('has-success');
    } else {
        // icon.removeClass('glyphicon-ok');
        // icon.addClass('glyphicon-remove');
        item.removeClass('has-success');
        item.addClass('has-error');
    }
}


let isOpw = false,
    isNpw = false,
    isRenpw = false;
function blurOpw() {
    let val = $('#oldPw').val();
    let hb = $('#opwHelpBlock');
    if(val == '' || val == null || val.length == 0 ) {
        opwRS(false);
        hb.html('输入不能为空');
        isOpw = false;
    }else {
        opwRS(true);
        hb.html('');
        isOpw = true;
    }
}
// $('#signInPw').bind('blur',blurPw);
function blurPw() {
    let val = $('#newPw').val();
    let hb = $('#npwHelpBlock');
    let oval = $('#oldPw').val();
    let reval = $('#renpw').val();
    if(reval != '' && reval != null && reval.length != 0 && val != reval) {
        repwRS(false);
        hb.html('两次输入密码不一致！');
        isRenpw = false;
    }
    if(val == '' || val == null || val.length == 0 ) {
        pwRS(false);
        hb.html('输入不能为空');
        isNpw = false;
    } else if(val.length < 6) {
        pwRS(false);
        hb.html('密码长度至少6位！!');
        isNpw = false;
    } else if(val == oval) {
        pwRS(false);
        hb.html('新密码与旧密码相同!');
        isNpw = false;
    }  else {
        pwRS(true);
        hb.html('');
        isNpw = true;
    }
}
// $('#signInRepw').bind('blur',blurRepw);
function blurRepw(isRight = true, info = "correct") {
    let pval = $('#newPw').val();
    let val = $('#renpw').val();
    let hb = $('#renpwHelpBlock');
    let oval = $('#oldPw').val();
    if(val == '' || val == null || val.length == 0 ) {
        repwRS(false);
        hb.html('输入不能为空');
        isRenpw = false;
    } else if(val.length < 6) {
        repwRS(false);
        hb.html('密码长度至少6位！');
        isRenpw = false;
    } else if(val != pval) {
        repwRS(false);
        hb.html('两次输入密码不一致！');
        isRenpw = false;
    } else if(val == oval) {
        pwRS(false);
        hb.html('新密码与旧密码相同!');
        isRenpw = false;
    } else {
        repwRS(true);
        hb.html('');
        isRenpw = true;
    }
}



//提交修改密码
$('.signInBtn').click(function () {
    if(isOpw == false || isNpw == false || isRenpw == false) {
        confirm('请输入正确后提交！');
    } else {
        let pwData = {
            old_password : $('#oldPw').val(),
            new_password1 : $('#newPw').val(),
            new_password2 : $('#renpw').val()
        };
        let a = JSON.stringify(pwData);
        $.ajax({
            url:'../teacher/updatePassword',
            type:'POST',
            dataType:'json',
            data:a,
            contentType:'application/json',

            success:function (result) {

                if(result.status == false) {
                    if(result.error == 'timeOut') {
                        window.location.href = '../error.html';
                    }

                    confirm(result.error);
                } else {
                    confirm('修改密码成功');
                    // console.log('修改密码成功');
                }
            }
        })
    }
})



/////////////////////////////////////part3////////////////////////////////////////


$( document ).bind("click", function( e ) {
    let delBtn = $('.delete');
    let dload = $('.dload');
    let checkN = $('.checkedNum');
    // $( e.target ).closest("tr").addClass('selected');
    let ev = $(e.target);
    // console.log(ev.prop('checked'));
    // console.log(ev);
    if(ev.is('input') && ev.prop('type') == 'checkbox'){
        if(ev.prop('checked') == true){
            ev.closest("tr").addClass('selected');
        } else {
            ev.closest("tr").removeClass('selected');
        }
        let cnt = $('.selected').length;
        if(cnt){
            delBtn.show();
            checkN.html('已选中 ' + cnt + ' 项');
        } else{
            delBtn.hide();
            checkN.html('');
        }
    }
    if(ev.is('a') && ev.html() == '下载') {
        console.log(ev.closest('td'));
    }
});

//教师点击编辑考核
$(document).on('click','.Edit1',function () {
    let data = $(this).closest('tr').children('.Code1').html();
    // console.log(data);
    window.location.href = 'edit_teacher.html?'+'code='+data;
})

//教师点击查看提交
$(document).on('click','.correct1',function () {
    let data = $(this).closest('tr').children('.Code1').html();
    // console.log(data);
    window.location.href = 'check_teacher_all.html?'+'code='+data;
})

// 批量删除考核
$('.delete').click(function () {
    let ob = $('.selected');
    let n = ob.length;
    let allselected = new Array();
    // console.log(ob);
    for(let i = 0; i < n; i++) {
        allselected[i] = {
            work : $(ob[i]).children('.Code1').html()
        };
    }
    let tem = {
        work:allselected
    }
    let a = JSON.stringify(tem);
    console.log(a);
    $.ajax({
        url:'../teacher/deleteWork',
        dataType:'JSON',
        type:'POST',
        data:a,
        contentType:'application/json',

        success:function (result) {
            if (result.status) {
                confirm('删除成功');
                ob.remove();
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }

                confirm(result.error);
            }
        },
        error: function () {
            confirm('error:批量删除考核');
        }
    })
})

// 跳转添加页面
$('.add').click(function () {
    window.location.href = 'add_teacher.html';
})
//单项删除考核
$(document).on('click','.delete1',function () {
    let code = $(this).closest('tr').children('.Code1').html();
    let ob = $(this).closest('tr');
    let data = {
        work : code
    };
    let tem = {
        work:[data]
    }
    let a = JSON.stringify(tem);
    $.ajax({
        url:'../teacher/deleteWork',
        dataType:'json',
        type:'JSON',
        data:a,
        contentType:'application/json',

        //下载文件
        success:function (result) {
            if (result.status) {
                confirm('删除成功');
                ob.remove();
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }

                confirm(result.error);
            }
        },
        error:function () {
            confirm('error:单项删除考核');
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






















