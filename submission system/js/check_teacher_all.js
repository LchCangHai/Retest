function getUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) {
        let a = decodeURIComponent(r[2]);
        return a;
    } else {
        return 'null';
    }
}
let code = getUrl('code');

let one_account = {
    object : null,
    value : null
};
    // all_account;

let name_nav = $('.inName'),
    account_nav = $('.inAccount'),
    phone_nav = $('.inPhone'),
    major_nav = $('.inMajor');
// 获取教师信息
$(function () {
    $.ajax({
        url:'../teacher/findTeacher',
        type:'POST',
        contentType:'application/json',
        dataType:'json',
        success:function (result) {
            if(result.status) {
                name_nav.html(result.name);
                account_nav.html(result.workID);
                phone_nav.html(result.tel);
                major_nav.html(result.type);
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }

                console.log('!!!get user info error!!');
            }
        },
        error:function () {
            console.log('error! 获取教师信息');
        }
    })
})

//考核题目信息填充
$(function () {
    let data = {
        code:code
    }

    let a = JSON.stringify(data);
    // console.log(a);
    $.ajax({
        url:'../teacher/getWork',
        type:'POST',
        dataType:'json',
        contentType:'application/json',
        data:a,
        success:function (result) {
            let tem = result.work;
            if(result.status) {
                $('.tcName').html(tem.name);
                $('.tcCode').html(tem.code);
                $('.tcTime').html(tem.end);
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }

                console.log('获取失败');
            }
        },
        error:function () {
            console.log('error! 考核题目信息填充');
        }
    })
    //获取题目内容
    $.ajax({
        url:'../user/getContent',
        type:'POST',
        contentType:'application/json',
        dataType:'json',
        data:a,
        success:function (result) {
            if(result.status) {
                $('.tcContent').html(result.content);
            } else {
                if(result.error =='timeOut') {
                    window.location.href = '../error.html';
                }

                $('.tcContent').html(result.content);
                $('.tcContent').addClass('content_null');
            }
        },
        error:function () {
            console.log('error! 获取题目内容');
        }
    })


})

//获取题目的提交信息
// $(function () {
//     $.ajax({
//         url:'../teacher/judgeWork',
//         type:'POST',
//         dataType:'json',
//         contentType:'application/json',
//
//         success:function (result) {
//             if(result.status) {
//                 let n = result.teacherWork.length;
//                 let i = 0;
//                 for(i = 0; i < n; i++) {
//                     let tem2 = result.teacherWork[i];
//                     let clone1 = $('.clone1').clone(true);
//                     let contain1 = $('.content1');
//                     clone1.removeClass('clone1');
//                     clone1.addClass('_clone1');
//                     clone1.children('.name1').html(tem2.name);
//                     clone1.children('.account1').html(tem2.studentID);
//                     clone1.children('.time1').html(tem2.data);
//                     contain1.append(clone1);
//                 }
//             }
//         },
//         error:function () {
//             console.log('error! 获取题目的提交信息');
//         }
//     })
//
// })

$('.testDBtn').click(function () {
    $('.testDetail').slideToggle('slow');
})

$( document ).bind("click", function( e ) {
    // let delBtn = $('.delete_btn');
    let dload = $('.download_btn');
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
            // delBtn.show();
            dload.show();
            checkN.html('已选中 ' + cnt + ' 项');
        } else{
            // delBtn.hide();
            dload.hide();
            checkN.html('');
        }
    }
    if(ev.is('a') && ev.html() == '下载') {
        console.log(ev.closest('td'));
    }
    if(ev.is('span') && ev.has('status_content')){
        one_account.object = ev;
        one_account.value = ev.closest('tr').children('.Account1').html();
        // console.log(ev);
        // console.log(one_account.object.html());
    }
    // console.log(ev);
});



$('.modify_btn').click(function () {
    let datas = $('input:radio:checked').val();
    // console.log(datas);
    // console.log(one_account.value);

    let data = {
        studentID:one_account.value,
        status:datas,
        code:code
    }
    let a = JSON.stringify(data);
    $('.cancel_btn').trigger('click');
    // one_account.object.html(datas);
    $.ajax({
        url:'../teacher/judge',
        type:'POST',
        dataType:'json',
        contentType:'application/json',
        data:a,
        success:function (result) {
            if(result.status) {
                console.log('修改状态:success');
                one_account.object.html(datas);
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }

                console.log('修改失败');
            }
        },
        error:function () {
            console.log('error!');
        }
    })
})



// // 单项删除
// $('.delete').click(function () {
//     let data = $(this).closest('tr').children('.account1').html();
//     console.log(data);
//     // data.css('background-color','hotpink');
//     // data.remove();
//     let data1 = {
//         studentID : data
//     };
//     let a = JSON.stringify(data1);
//     console.log(a);
//     $.ajax({
//         url:'',
//         type:'POST',
//         dataType: 'json',
//         data:a,
//         contentType:'application/json',
//
//         success:function (result) {
//
//         }
//
//
//
//     })
// })
// // 批量删除
// $('.delete_btn').click(function () {
//     console.log('aaaadfd');
//     let ob = $('.selected');
//     let n = ob.length;
//     let allselected = new Array();
//     // console.log(ob);
//     for(let i = 0; i < n; i++) {
//         allselected[i] = {
//             studentID : $(ob[i]).children('.account1').html()
//         };
//     }
//     let tem2 = {
//         student:allselected
//     }
//     let a = JSON.stringify(tem2);
//     console.log(a);
//     $.ajax({
//         url:'',
//         dataType:'JSON',
//         type:'POST',
//         data:a,
//         contentType:'application/json',
//         success:function (result) {
//
//             ob.remove();
//         }
//     })
//
//
// })

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





































