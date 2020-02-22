function getUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) {
        let a = decodeURIComponent(r[2]);
        return a;
    }
    return 'null';
}
let code = getUrl('code');

let name_nav = $('.inName'),
    account_nav = $('.inAccount'),
    type_nav = $('.inType'),
    grade_nav = $('.inGrade');
//获取学生信息
$(function () {

    $.ajax({
        url:'../user/findUser',
        type:'POST',
        contentType:'application/json',
        dataType:'json',

        success:function (result) {
            if(result.status) {
                name_nav.html(result.name);
                account_nav.html(result.studentID);
                type_nav.html(result.type);
                grade_nav.html(result.level);
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }
                console.log('!!!get user info error!!');
            }
        }
    })
})
//考核题目信息填充
$(function () {
    let data = {
        code: code
    };
    let a = JSON.stringify(data);
    console.log(a);
    $('.curtime').html((new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString());
    $.ajax({
        url:'../user/getWork',
        type:'POST',
        contentType:'application/json',
        dataType:'json',
        data:a,
        success:function (result) {
            let tem = result.work;
            if(result.status) {
                $('.tcName').html(tem.name);
                $('.tcCode').html(tem.code);
                $('.tcTime').html(tem.start);
                $('.tcTeacer').html(tem.teacher);
                $('.curtime').html((new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString());
                // $('.tcContent').html(tem.x);
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }
                console.log(result.error);
            }
        }
    })
    //获取考核内容
    $.ajax({
        url:'../user/getContent',
        type:'POST',
        contentType:'application/json',
        dataType:'json',
        data:a,
        success:function (result) {
            if(result.status){
                $('.tcContent').html(result.content);
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }

                $('.tcContent').html(result.content);
            }
        }
    })

})

$('.tcaret').click(function () {
    $('.tcContent').slideToggle('quick');
})

//全局禁止
document.body.ondrop = function(event) {
    event.preventDefault();
    event.stopPropagation();
}
let formData1 = new FormData;
let Space = $('.nameSpace');
let nameSpace = $('.info2');
let tip =$('.tip');

formData1.set('code',code);

/////////////////////////////////////拖拽上传
let contain = document.querySelector('.drag_box');
contain.ondragover = function (ev) {
//阻止浏览器默认打开文件的操作
    ev.preventDefault();
    this.style.borderColor = 'blue';
}
contain.ondragenter = function (ev) {
    ev.preventDefault();
}
contain.ondragleave = function () {
    this.style.borderColor = 'black';
}
contain.ondrop = function (ev) {
    //阻止浏览器默认打开文件的操作
    ev.preventDefault();
    this.style.borderColor = 'black';
    let files = ev.dataTransfer.files;
    let len = files.length;
    if(len == 1){
        tip.html('');
        Space.show();
        nameSpace.html(files[0].name);
    } else {
        tip.html('只能上传一个文件哦');
    }
    formData1.set('sfile',files[0]);
    console.log(formData1.get('sfile'));
}
/////////////////////////////////////点击上传

//获取文件
$('.upload1').change(function () {
    // console.log(this);
    tip.html('');
    Space.show();
    nameSpace.html(this.files[0].name);
    let File1 = this.files[0];
    formData1.set('sfile',File1);
    console.log(formData1.get('sfile'));
})



//////////////////////////////////点击上传///////////

//上传文件
$('.modify_btn').click(function () {
    $('.cancel_btn').trigger('click');
    if(nameSpace.html() == '' || nameSpace.html() == null || nameSpace.html().length == 0){
        confirm('请选择文件！');
        return;
    }
    $.ajax({
        url:"../user/onLineUpload",
        type: "POST",
        data:formData1,
        contentType: false,
        processData: false,
        dataType:'json',
        success: function(result) {
            if(result.status){
                confirm("提交成功");
                tip.html('');
                Space.hide();
                nameSpace.html('');
            } else {
                if(result.error == 'timeOut') {
                    window.location.href = '../error.html';
                }
                confirm(result.error);
            }
        },
        error:function () {
            console.log('error： 上传文件');
        }
    });
})





/////////////////////////////////////////////////////////
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    console.log(r);
    if (r != null) return unescape(r[2]);
    return null;
}

$('.get').click(function () {
    console.log('xxxxx');
    let a = getUrl('code');
    console.log(a);

});


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








////////////////////////////////////////////////////////////////////////////////////////////////////////
// let du = document.getElementById('drag_box');
// du.ondragover = function ( ev) {
//     ev.preventDefault();
//     this.style.borderColor = 'blue';
// }
//
// du.ondragleave = function () {
//     this.style.borderColor = 'black';
// }
// var Dragfiles=(function (){
//     var instance;
//     return function(){
//         if(!instance){
//             instance = new FormData();
//         }
//         return instance;
//     }
// }());
// du.ondrop = function (ev) {
//     this.style.borderColor = 'black';
//     ev.preventDefault();
//     var files = ev.dataTransfer.files;
//     var len=files.length,
//         i=0;
//     var frag=document.createDocumentFragment();  //为了减少js修改dom树的频度，先创建一个fragment，然后在fragment里操作
//     var tr,time,size;
//     var newForm=Dragfiles(); //获取单例
//     var it=newForm.entries(); //创建一个迭代器，测试用
//     while(i<len){
//         tr=document.createElement('tr');
//         //获取文件大小
//         size=Math.round(files[i].size * 100 / 1024) / 100 + 'KB';
//         //获取格式化的修改时间
//         time = files[i].lastModifiedDate.toLocaleDateString() + ' '+files[i].lastModifiedDate.toTimeString().split(' ')[0];
//         tr.innerHTML='<td>'+files[i].name+'</td><td>'+time+'</td><td>'+size+'</td><td>删除</td>';
//         console.log(size+' '+time);
//         frag.appendChild(tr);
//         //添加文件到newForm
//         newForm.append(files[i].name,files[i]);
//         //console.log(it.next());
//         i++;
//     }
//     this.childNodes[1].childNodes[1].appendChild(frag);
//     //为什么是‘1’？文档里几乎每一样东西都是一个节点，甚至连空格和换行符都会被解释成节点。
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////


