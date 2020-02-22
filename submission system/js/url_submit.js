function getUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) {
        let a = decodeURIComponent(r[2]);
        return a;
    }
    return 'null';
}
let codeVal = getUrl('code');


//主页需要与后端交互部分：
//      1.传出标识符，传入考核是否存在与考核名；
//      2.传出学号，传入是否存在与学号对应姓名；
//      3.上传文件；
//      4.姓名学号正确输入，文件正确上传后。提交按钮变为可用
let isName = false ,//验证提交按钮可用
    isCode = false ,
    isType = false ,
    isGrade = false;
document.querySelector('#signUpName').addEventListener('blur',blurName);
document.querySelector('#signUpCode').addEventListener('blur',blurCode);
$('.type').bind('blur',blurType);
$('.grade').bind('blur',blurGrade);





//RS
// 姓名
function nameRS(result) {
    let icon = $('.nameResultShow');
    let item = $('.nameForm');
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
// 账号
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


function blurName(isRight = true, info = 'correct') {
    let val = $("#signUpName").val();
    let hb = $("#nameHelpBlock");
    if(val == '' || val == null || val.length == 0 ) {
        nameRS(false);
        hb.html('输入不能为空');
        isName = false;
    } else if(val.length<2) {
        nameRS(false);
        hb.html('姓名字符数>=2');
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
//这里有调用函数验证输入的学号与姓名的匹配
//verifyCode(
// 学号工号验证 结果与显示
// 包括从数据库中比对学号再对比姓名！！
function blurCode(isRight = true, info = 'correct') {
    let reg =/\d/;
    let val = $('#signUpCode').val();
    let name = $("#signUpName").val();
    let hb = $('#codeHelpBlock');
    data = {
        code:val,
        name:name
    };
    if(val == '' || val == null || val.length == 0 ) {
        codeRS(false);
        hb.html('输入不能为空');
        isCode = false;
    } else if(!reg.test(val)) {
        codeRS(false);
        hb.html('学号/工号应全为数字');
        isCode = false;
    } else if(!verifyCode(data)) {
        codeRS(false);
        hb.html('学号已注册，所填姓名与注册号码不符！');
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
        isType = false;
    } else if(!isRight) {
        gradeRS(false);
        hb.html(info);
        isType = false;
    } else {
        gradeRS(true);
        hb.html('');
        isType = true;
    }
}


//这是被调用的函数
// 改变搜索标识符的结果显示的函数
// 改变巨幕的显示：搜索到则显示提交界面
//                未搜索到显示原界面
function searchResultShow(result,name){
    let show = $(".result")[0];
    let searchRS = $(".searchresultShow")[0];
    let tname = $(".testName")[0];
    // console.log(show);
    show.style.display = "block";
    if(result){//true时
        searchRS.classList.remove('glyphicon-remove');
        searchRS.classList.add('glyphicon-ok');
        tname.innerHTML = String(name);
        $(".submitWithoutSignIn")[0].style.display = "block";
        $(".beforeSearch")[0].style.display = "none";
    }
    else{
        searchRS.classList.remove('glyphicon-ok');
        searchRS.classList.add('glyphicon-remove');
        tname.innerHTML = '查无此题';
        $(".submitWithoutSignIn")[0].style.display = "none";
        $(".beforeSearch")[0].style.display = "block";
    }
}


$('#upLoadFile').change(function () {
    let a = $(this).files;
    console.log(' $(this).files' + a);
})


/////////////////////////////////////////////////////////////////////////////////////////

//全局禁止
document.body.ondrop = function(event) {
    event.preventDefault();
    event.stopPropagation();
}
let formData1 = new FormData;
let Space = $('.nameSpace');
let nameSpace = $('.info2');
let tip =$('.tip');

let contain = document.querySelector('.show_box');
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
        $('.tipContain').hide();
        tip.html('');
        Space.show();
        nameSpace.html(files[0].name);
    } else {
        $('.tipContain').show();
        tip.html('只能上传一个文件哦');
    }
    formData1.set('sfile',files[0]);
    console.log(formData1.get('sfile'));
}


/////////////////////////////////////点击上传

//获取文件
$('.upload1').change(function () {
    // console.log(this);
    $('.tipContain').hide();
    tip.html('');
    Space.show();
    nameSpace.html(this.files[0].name);
    let File1 = this.files[0];
    formData1.set('sfile',File1);
    console.log(formData1.get('sfile'));
})


//////////////////////////////////////////////////////////////////////////////////////////////
//上传文件
$('.modify_btn').click(function () {
    $('.cancel_btn').trigger('click');
    if(nameSpace.html() == '' || nameSpace.html() == null || nameSpace.html().length == 0){
        confirm('请选择文件！');
        return;
    }
    formData1.set('code',codeVal);
    formData1.set('name',$('#signUpName').val());
    formData1.set('studentID',$('#signUpCode').val());
    // formData1.set('type',$('.type').val());
    // formData1.set('level',$('.grade').val());
    $.ajax({
        url:"../user/offLineUpload",
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
                confirm(result.error);
            }
        },
        error:function () {
            console.log('error： 上传文件');
        }
    });
})




