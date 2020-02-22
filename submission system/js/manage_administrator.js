
$('.search_btn').click(function(){
    let iden = $('.iden');
    if(iden.html() == '学生') {
        let val = $('.search_inp').val();
        $("._clone1").hide().filter(":contains('" + val + "')").show();
        $('._clone2').hide();
    } else if(iden.html() == '教师') {
        let val = $('.search_inp').val();
        $("._clone2").hide().filter(":contains('" + val + "')").show();
        $('._clone1').hide();
    }
})

// $(function () {
//     $('.teacher').click();
// })();

$( document ).bind("click", function( e ) {
    let iniBtn = $('.initial_btn');
    let delBtn = $('.delete_btn');
    let checkN = $('.checkedNum');
    let iden = $('.iden');
    // $( e.target ).closest("tr").addClass('selected');
    let ev = $(e.target);
    // console.log(ev.prop('checked'));
    // console.log(ev);
    if(ev.is('input') && ev.prop('type') == 'checkbox'){
        if(ev.prop('checked') == true){
            // console.log(ev);
            // console.log(ev.hasClass('_clone1'));
            if(ev.closest('tr').hasClass('_clone1')) {
                ev.closest("tr").addClass('selected1');
            } else if(ev.closest('tr').hasClass('_clone2')) {
                ev.closest("tr").addClass('selected2');
            }
        } else {
            ev.closest("tr").removeClass('selected1');
            ev.closest("tr").removeClass('selected2');
        }

        let cnt1 = $('.selected1').length;
        let cnt2 = $('.selected2').length;
        if(iden.html() == '学生') {
            if (cnt1) {
                delBtn.show();
                iniBtn.show();
                checkN.html('已选中 ' + $('.selected1').length + ' 项');
            } else {
                delBtn.hide();
                iniBtn.hide();
                checkN.html('');
            }
        } else if(iden.html() == '教师'){
            if (cnt2) {
                delBtn.show();
                iniBtn.show();
                checkN.html('已选中 ' + $('.selected2').length + ' 项');
            } else {
                delBtn.hide();
                iniBtn.hide();
                checkN.html('');
            }
        }
    }
    if(ev.is('a') && ev.html() == '下载') {
        console.log(ev.closest('td'));
    }
});

$('.student').click(function () {
    let iniBtn = $('.initial_btn');
    let delBtn = $('.delete_btn');
    let checkN = $('.checkedNum');
    $('.iden').html($(this).html());
    $('._clone1').show();
    $('._clone2').hide();
    let cnt1 = $('.selected1').length;
    let cnt2 = $('.selected2').length;
    if (cnt1) {
        delBtn.show();
        iniBtn.show();
        checkN.html('已选中 ' + $('.selected1').length + ' 项');
    } else {
        delBtn.hide();
        iniBtn.hide();
        checkN.html('');
    }

    let ob = $('._clone2');
    let n = ob.length,
        i = 0;
    for(i = 0; i < n; i++) {
        // ob[i].prop('checked',false);
    }
})

$('.teacher').click(function () {
    let iniBtn = $('.initial_btn');
    let delBtn = $('.delete_btn');
    let checkN = $('.checkedNum');
    $('.iden').html($(this).html());
    $('._clone2').show();
    $('._clone1').hide();

    let cnt1 = $('.selected1').length;
    let cnt2 = $('.selected2').length;
    if (cnt2) {
        delBtn.show();
        iniBtn.show();
        checkN.html('已选中 ' + $('.selected1').length + ' 项');
    } else {
        delBtn.hide();
        iniBtn.hide();
        checkN.html('');
    }
    let ob = $('._clone1')
    let n = ob.length,
        i = 0;
    for(i = 0; i < n; i++) {
        // ob[i].attr('checked',false);
    }
})

//获取账号信息
// 账号，姓名
//学生，教师
$(function () {
    //学生   _clone1
    $.ajax({
        url:'../manager/selectUsers',
        type:'POST',
        dataType:'json',
        contentType:'application/json',
        success:function (result) {
            if(result.status) {
                let n = result.student.length;
                let i = 0;
                for(i = 0; i < n; i++) {
                    let tem = result.student[i];
                    let clone1 = $('.clone1').clone(true);
                    let containt1 = $('.manage');
                    clone1.removeClass('clone1');
                    clone1.addClass('_clone1');
                    clone1.children('.account').html(tem.studentID);
                    clone1.children('.name').html(tem.name);
                    containt1.append(clone1);
                }
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }
                console.log('获取学生信息失败'+result.error);
            }
        },
        error:function () {
            console.log('error:获取学生信息失败');
        }
    })
// 教师   _clone2
    $.ajax({
        url:'../manager/selectTeachers',
        type:'POST',
        dataType:'json',
        contentType:'application/json',
        success:function (result) {
            if(result.status) {
                let n = result.teacher.length;
                let i = 0;
                for(i = 0; i < n; i++) {
                    let tem = result.teacher[i];
                    let clone1 = $('.clone1').clone(true);
                    let containt1 = $('.manage');
                    clone1.removeClass('clone1');
                    clone1.addClass('_clone2');
                    clone1.children('.account').html(tem.workID);
                    clone1.children('.name').html(tem.name);
                    containt1.append(clone1);
                }
            } else {
                if(result.error =='timeOut') {
                    window.location.href = '../error.html';
                }
                console.log('获取教师信息失败'+result.error);
            }
        },
        error:function () {
            console.log('error:获取教师信息失败');
        }
    })

    $('.student').click();
})


$('.delete_btn').click(function () {
    let data = $('.selected');
    // console.log(data);
    // data.css('background-color','hotpink');
    // data.remove();
    $('.checkedNum').html('已选中 ' + $('.selected').length + ' 项');

})

$('.initial').click(function () {
    let data = $(this).closest('tr');
    console.log(data);
})

//初始化
$(document).on('click','.initial',function () {
    // console.log('xxxxxxxxxxxxxxxxxx');
    let code = $(this).closest('tr').children('.account').html();
    let ob = $(this).closest('tr');
    let key;
    if(ob.hasClass('_clone1')) {
        key = 'student';
    } else if(ob.hasClass('_clone2')){
        key = 'teacher';
    }
    let data = {
        id : code
    };
    let tem = {
        key:key,
        id:[data]
    }
    let a = JSON.stringify(tem);
    console.log(a);
    $.ajax({
        url:'../manager/updatePassword',
        dataType:'json',
        type:'post',
        data:a,
        contentType:'application/json',
        //下载文件
        success:function (result) {
            if (result.status) {
                confirm('初始化成功');
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }
                confirm('初始化失败');
            }
        },
        error:function () {
            console.log('error! 单项初始化');
        }
    })
})

// 删除
$(document).on('click','.delete',function () {
    // console.log('xxxxxxxxxxxxxxxxxx');
    let code = $(this).closest('tr').children('.account').html();
    let ob = $(this).closest('tr');
    let key;
    if(ob.hasClass('_clone1')) {
        key = 'student';
    } else if(ob.hasClass('_clone2')){
        key = 'teacher';
    }
    let data = {
        id : code
    };
    let tem = {
        key:key,
        id:[data]
    }
    let a = JSON.stringify(tem);
    console.log(a);

    $.ajax({
        url:'../manager/delete',
        dataType:'json',
        type:'JSON',
        data:a,
        contentType:'application/json',
        //下载文件
        success:function (result) {
            if (result.status) {
                ob.remove();
                confirm('删除成功');
                let iden = $('.iden');
                let cnt1 = $('.selected1').length,
                    cnt2 = $('.selected2').length;
                let key,id;
                let iniBtn = $('.initial_btn');
                let delBtn = $('.delete_btn');
                if(iden.html() == '学生') {
                    if(cnt1) {
                        $('.checkedNum').html('已选中 ' + $('.selected1').length + ' 项');
                    } else {
                        delBtn.hide();
                        iniBtn.hide();
                        $('.checkedNum').html('');
                    }
                } else if(iden.html() == '教师') {
                    if(cnt2) {
                        $('.checkedNum').html('已选中 ' + $('.selected2').length + ' 项');
                    }else {
                        delBtn.hide();
                        iniBtn.hide();
                        $('.checkedNum').html('');
                    }
                }
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

//批量初始化
$('.initial_btn').click(function () {
    let iden = $('.iden');
    let ob,n;
    let allselected = new Array();
    let key;
    if(iden.html() == '学生') {
        ob = $('.selected1');
        n = ob.length;
        key = 'student';
    } else if(iden.html() == '教师') {
        ob = $('.selected2');
        n = ob.length;
        key = 'teacher';
    }
    // console.log(ob);
    for(let i = 0; i < n; i++) {
        allselected[i] = {
            id : $(ob[i]).children('.account').html()
        };
    }
    let tem = {
        key : key,
        id:allselected
    }
    let a = JSON.stringify(tem);
    console.log(a);
    $.ajax({
        url:'../manager/updatePassword',
        dataType:'JSON',
        type:'POST',
        data:a,
        contentType:'application/json',
        success:function (result) {
            if(result.status) {
                confirm('初始化成功');
            }else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }
            }
        },
        error:function () {
            console.log('error! 初始化失败');
        }
    })
})

// 批量删除
$('.delete_btn').click(function () {
    let iden = $('.iden');
    let ob,n;
    let allselected = new Array();
    let key;
    if(iden.html() == '学生') {
        ob = $('.selected1');
        n = ob.length;
        key = 'student';
    } else if(iden.html() == '教师') {
        ob = $('.selected2');
        n = ob.length;
        key = 'teacher';
    }
    // console.log(ob);
    for(let i = 0; i < n; i++) {
        allselected[i] = {
            id : $(ob[i]).children('.account').html()
        };
    }
    let tem = {
        key : key,
        id:allselected
    }
    let a = JSON.stringify(tem);
    console.log(a);
    $.ajax({
        url:'../manager/delete',
        dataType:'JSON',
        type:'POST',
        data:a,
        contentType:'application/json',
        success:function (result) {
            if(result.status) {
                ob.remove();
                confirm('删除成功');
                $('.checkedNum').html('已选中 ' + $('.selected').length + ' 项');
            }else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }
                confirm('删除失败'+ result.error);
            }
        },
        error:function () {
            console.log('error! 删除失败');
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





























