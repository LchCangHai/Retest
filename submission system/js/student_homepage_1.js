


let name_1 = $('#Name'),
    account_1 = $('#Code'),
    type_1 = $('.Type'),
    grade_1 = $('.Grade');
let name_nav = $('.inName'),
    account_nav = $('.inAccount'),
    type_nav = $('.inType'),
    grade_nav = $('.inGrade');
// 获取学生信息
$(function () {
    $.ajax({
        url:'../user/findUser',
        type:'POST',
        dataType:'json',
        contentType:'application/json',
        success:function (result) {
            if(result.status) {
                name_nav.html(result.name);
                name_1.val(result.name);
                account_nav.html(result.studentID);
                account_1.val(result.studentID);
                type_nav.html(result.type);
                type_1.val(result.type);
                grade_nav.html(result.level);
                grade_1.val(result.level);
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }
                console.log('!!!get user info error!!');
            }
        },
        error:function () {
            console.log('error! 获取学生信息');
        }
    })
})

//学生查询可提交作业
// $(function () {
//     $.ajax({
//         url:'../user/getWorks',
//         type:'POST',
//         dataType:'json',
//         contentType:'application/json',
//         success:function (result) {
//             if(result.status) {
//                 let i = 0;
//                 console.log(result.work);
//                 console.log('work' + result.work);
//                 console.log(result.work[1]);
//                 let n = result.work.length;
//                 for(i = 0;i < n; i++) {
//                     let clone1 = $('.clone1').clone(true);
//                     let containt1 = $('.mytest_');
//                     let tem1 = result.work[i];
//                     clone1.removeClass('clone1');
//                     clone1.addClass('_clone1');
//                     clone1.children('.Nmae1').html(tem1.name);
//                     clone1.children('.Code1').html(tem1.code);
//                     clone1.children('.Teacher1').html(tem1.teacher);
//                     clone1.children('.Grade1').html(tem1.grade);
//                     clone1.children('.Type1').html(tem1.type);
//                     clone1.children('.State1').html(tem1.end);
//                     containt1.append(clone1);
//                 }
//             } else {
//                 console.log('获取可提交信息错误');
//             }
//         },
//         error:function () {
//             console.log('error! 学生查询可提交作业');
//         }
//     })
// })

//学生查询已提交作业
// $(function () {
//     $.ajax({
//         // url:'../user/getMyWorks',
//         type:'POST',
//         dataType:'json',
//         contentType:'application/json',
//         success:function (result) {
//             if(result.status) {
//                 let i = 0;
//                 let n = result.userWork.length;
//                 for(i = 0;i < n; i++) {
//                     let clone2 = $('.clone2').clone(true);
//                     let containt2 = $('.submit_');
//                     let tem2 = result.userWork[i];
//                     clone2.removeClass('clone2');
//                     clone2.addClass('_clone2');
//                     clone2.children('.Nmae2').html(tem2.name);
//                     clone2.children('.Code2').html(tem2.code);
//                     clone2.children('.Teacher2').html(tem2.teacher);
//                     clone2.children('.Grade2').html(tem2.grade);
//                     clone2.children('.Type2').html(tem2.type);
//                     clone2.children('.Uptime2').html(tem2.date);
//                     clone2.find('.status_content').html(tem2.status);
//                     if(tem2.status == '已删除'){
//                         clone2.addClass('deleted');
//                         clone2.find('button').addClass('btn-error');
//                         clone2.find('button').removeClass('btn-primary');
//                     } else if(tem2.status == '通过') {
//                         clone2.find('button').removeClass('btn-primary');
//                         clone2.find('button').addClass('btn-success');
//                     }
//                     containt2.append(clone2);
//                 }
//             } else {
//                 console.log('获取已提交考核失败');
//             }
//         },
//         error:function () {
//             console.log('error! 学生查询已提交作业');
//         }
//     })
// })

//学生点击提交作业
$(document).on('click','.submit1',function () {
    let data = $(this).closest('tr').children('.Code1').html();
    // console.log(data);
    window.location.href = 'submit_student.html?'+'code='+data;
})


//分页用 跳转必备
$(function() {
    // $('#otherInfoTab a:last').tab('show');//初始化显示哪个tab

    $('#otherInfoTab a').click(function(e) {
        e.preventDefault();//阻止a链接的跳转行为
        $(this).tab('show');//显示当前选中的链接及关联的content
    })
})

$('.Grade').click(function () {
    console.log($(this).val());
})
//修改按钮
$('.btnModify1').click(function () {
    $(this).hide();
    $('.btnConfirm1').show();
    $('.btnCancel1').show();
    name_1.removeAttr('readonly');
    type_1.removeAttr('disabled');
    grade_1.removeAttr('disabled');
})
// 确定修改，需要发送
$('.btnConfirm1').click(function () {
    let data = {
        name : name_1.val(),
        studentID : account_nav.html(),
        type : type_1.val(),
        level : grade_1.val()
    };
    let a = JSON.stringify(data);
    $.ajax({
        url:'../user/update',
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
                name_nav.html(data.name);
                account_nav.html(data.studentID);
                type_nav.html(data.type);
                grade_nav.html(data.level);
            }
        },
        error:function () {
            console.log('error! 确定修改，需要发送');
        }
    })
    $(this).hide();
    $('.btnConfirm1').hide();
    $('.btnCancel1').hide();
    $('.btnModify1').show();
    name_1.attr('readonly','');
    type_1.attr('disabled','');
    grade_1.attr('disabled','');
})
// 取消发送
$('.btnCancel1').click(function () {
    name_1.val(name_nav.html());
    account_1.val(account_nav.html());
    type_1.val(type_nav.html());
    grade_1.val(grade_nav.html());
    $(this).hide();
    $('.btnConfirm1').hide();
    $('.btnCancel1').hide();
    $('.btnModify1').show();
    name_1.attr('readonly','');
    type_1.attr('disabled','');
    grade_1.attr('disabled','');
})



//////////////////////////////////开始part2/////////////////////////////

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
            url:'../user/updatePassword',
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
            },
            error:function () {
                console.log('error! 提交修改密码');
            }
        })
    }
})


//////////////////////////////////开始part3/////////////////////////////

//点击事件
// 添加selected属性
$( document ).bind("click", function( e ) {
    let delBtn = $('.delete');
    let loadBtn = $('.download');
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
            loadBtn.show();
            checkN.html('已选中 ' + cnt + ' 项');
        } else{
            delBtn.hide();
            loadBtn.hide();
            checkN.html('');
        }
    }
});

// 搜索
$('.search_btn1').click(function(){
    let val = $('.search_inp1').val();
    $("tr._clone1").hide().filter(":contains('" + val + "')").show();
})
$('.search_btn2').click(function(){
    let val = $('.search_inp2').val();
    $("tr._clone2").hide().filter(":contains('" + val + "')").show();
})

// 单项下载
// $(document).on('click','.Download2',function () {
//     let code = $(this).closest('tr').children('.Code2').html();
//     let data = {
//         work:code
//     };
//     let tem = {
//         work:[data]
//     }
//     let a = JSON.stringify(tem);
//     let fileName = name_nav.html() + code;
//     console.log(a);
//     console.log(fileName);
//     $.ajax({
//         url:'../user/download',
//         type:'post',
//         data:a,
//         responseType:'blob',
//         contentType:'application/json',
//         accept:'application/json',
//         //下载文件
//         success:function (result) {
//             if(result) {
//                 const tmpa = document.createElement('a');
//                 tmpa.download = '测试存储';
//                 tmpa.href = result; // 绑定a标签
//                 tmpa.click(); // 模拟点击实现下载
//                 setTimeout(() => { // 延时释放
//                     window.URL.revokeObjectURL(tmpa.href); // 用URL.revokeObjectURL()来释放这个object URL
//                 }, 100);
//             } else {
//                 confirm(result.error);
//             }
//         },
//         error:function () {
//             console.log('error! 单项下载');
//         }
//     })
// })

//单项删除
$(document).on('click','.delete2',function () {
    // console.log('xxxxxxxxxxxxxxxxxx');
    let code = $(this).closest('tr').children('.Code2').html();
    let ob = $(this).closest('tr');
    let data = {
        work : code
    };
    let tem = {
        work:[data]
    }
    let a = JSON.stringify(tem);
    console.log(a);
    $.ajax({
        url:'../user/deleteUserWorks',
        dataType:'json',
        type:'POST',
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
                confirm('删除失败');
            }
        },
        error:function () {
            console.log('error! 单项删除');
        }
    })
})

// // 批量下载
// $('.download').click(function () {
//     let ob = $('.selected');
//     let n = ob.length;
//     let allselected = new Array();
//     // console.log(ob);
//     for(let i = 0; i < n; i++) {
//         allselected[i] = {
//             work : $(ob[i]).children('.Code2').html()
//         };
//     }
//     let tem = {
//         work:allselected
//     }
//     let a = JSON.stringify(tem);
//     // console.log(allselected);
//     $.ajax({
//         url:'',
//         dataType:'JSON',
//         type:'POST',
//         data:a,
//         contentType:'application/json',
//         success:function (result) {
//             if(result.status) {
//
//             } else {
//                 if(result.error == 'timeOut') {
//                     window.location.href = '../error.html';
//                 }
//                 console.log(result.error);
//             }
//
//         },
//         error:function () {
//             console.log('error!  批量下载');
//         }
//     })
// })

// 批量删除
$('.delete').click(function () {
    let ob = $('.selected');
    let n = ob.length;
    let allselected = new Array();
    // console.log(ob);
    for(let i = 0; i < n; i++) {
        allselected[i] = {
            work : $(ob[i]).children('.Code2').html()
        };
    }
    let tem = {
        work:allselected
    }
    let a = JSON.stringify(tem);
    console.log(tem);
    $.ajax({
        url:'../user/deleteUserWorks',
        dataType:'JSON',
        type:'POST',
        data:a,
        contentType:'application/json',
        success:function (result) {
            if(result.status) {
                confirm('删除成功');
                ob.remove();
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }
                confirm('删除失败');
            }
        },
        error:function () {
            console.log('error! 批量删除');
        }
    })
})

$(document).on('click','.deleteUnvalid',function () {
    let ob1 = $('.status_content');
    let i = 0,
        n = ob1.length;
    // console.log(n);
    // console.log(ob1);
    // console.log($(ob1[1]).html());
    for(i = 0; i < n; i++) {
        if($(ob1[i]).html() == '已删除') {
            $(ob1[i]).closest('tr').addClass('has-deleted');
        }
    }
    // console.log($('.has-deleted'));
    $.ajax({
        url:'../user/deleteInvalidWorks',
        dataType:'json',
        type:'POST',
        contentType:'application/json',
        success:function (result) {
            if(result.status) {
                let ob = $('.has-deleted');
                ob.remove();
                confirm('删除成功');
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }
                confirm('删除失败');
            }
        },
        error:function () {
            console.log('error:删除已删除考核');
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

















