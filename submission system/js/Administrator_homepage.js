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
                    confirm('1');
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

$('.signin').click(function () {
    window.location.href = 'sign_in_administrator.html';
})
$('.manage').click(function () {
    window.location.href = 'manage_administrator.html';
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











































