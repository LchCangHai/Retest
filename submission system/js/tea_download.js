
function downByBlob_1(parameters , FileName) {
    var downloadURL = "../user/download";
    let xhr = new XMLHttpRequest()
    let fileName = FileName + '.zip' // 文件名称
    xhr.open('post', downloadURL, true);
    xhr.responseType = 'arraybuffer';
    //xhr.setRequestHeader('xx', 'xxxxx') // 请求头中添加信息
    xhr.onload = function () {
        if (this.status === 200) {
            let type = xhr.getResponseHeader('Content-Type')

            let blob = new Blob([this.response], { type: type })
            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                /*
                 * IE workaround for "HTML7007: One or more blob URLs were revoked by closing
                 * the blob for which they were created. These URLs will no longer resolve as
                 * the data backing the URL has been freed."
                 */
                window.navigator.msSaveBlob(blob, fileName);
            } else {
                let URL = window.URL || window.webkitURL;
                let objectUrl = URL.createObjectURL(blob);
                console.log(objectUrl);
                //"blob:http://localhost:10614/3e48b856-fca6-4e4c-b780-1c4a7066f42e"
                if (fileName) {
                    var a = document.createElement('a');
                    // safari doesn't support this yet
                    if (typeof a.download === 'undefined') {
                        window.location = objectUrl
                    } else {
                        a.href = objectUrl;
                        a.download = fileName;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    }
                } else {
                    window.location = objectUrl;
                }
            }
        }
    }
    xhr.send(parameters);
}

function downByBlob_2(parameters , FileName) {
    var downloadURL = "../user/downloadAll";
    let xhr = new XMLHttpRequest()
    let fileName = FileName + '.zip' // 文件名称
    xhr.open('post', downloadURL, true);
    xhr.responseType = 'arraybuffer';
    //xhr.setRequestHeader('xx', 'xxxxx') // 请求头中添加信息
    xhr.onload = function () {
        if (this.status === 200) {
            let type = xhr.getResponseHeader('Content-Type')

            let blob = new Blob([this.response], { type: type })
            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                /*
                 * IE workaround for "HTML7007: One or more blob URLs were revoked by closing
                 * the blob for which they were created. These URLs will no longer resolve as
                 * the data backing the URL has been freed."
                 */
                window.navigator.msSaveBlob(blob, fileName);
            } else {
                let URL = window.URL || window.webkitURL;
                let objectUrl = URL.createObjectURL(blob);
                console.log(objectUrl);
                //"blob:http://localhost:10614/3e48b856-fca6-4e4c-b780-1c4a7066f42e"
                if (fileName) {
                    var a = document.createElement('a');
                    // safari doesn't support this yet
                    if (typeof a.download === 'undefined') {
                        window.location = objectUrl
                    } else {
                        a.href = objectUrl;
                        a.download = fileName;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    }
                } else {
                    window.location = objectUrl;
                }
            }
        }
    }
    xhr.send(parameters);
}
//单项下载
$(document).on('click','.Dload',function () {
    let testCode = $(this).closest('tr').children('.Account1').html();
    let name = $(this).closest('tr').children('.name1').html();
    // let code = $(this).closest('tr').children('.Code2').html();
    let data = {
        studentID:testCode
    };
    let tem = {
        studentID:[data],
        work: code
    };
    let a = JSON.stringify(tem);
    let fileName = name + testCode;
    console.log(a);
    downByBlob_1(a , fileName);
})
// 批量下载
$('.download_btn').click(function () {
    let ob = $('.selected');
    let n = ob.length;
    let allselected = new Array();
    // console.log(ob);
    for(let i = 0; i < n; i++) {
        allselected[i] = {
            studentID : $(ob[i]).children('.Account1').html()
        };
    }
    let tem = {
        studentID : allselected,
        work : code
    }
    let a = JSON.stringify(tem);
    console.log(a);
    let fileName = '教师批量下载' +
        '(' + (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString() + ')';
    downByBlob_2(a , fileName);

})











