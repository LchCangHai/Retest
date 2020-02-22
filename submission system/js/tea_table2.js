
(function () {
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

//为获取已提交作业表格
    let nowPage = 0, //当前页
        count = 8, //每页显示多少条消息
        pageAll = 0; //总页数
    let testDataList = []; //创建一个存放数据的数组
    $('.nowPage1').html(nowPage+1);

    (function () {
        let data = {
            code:code
        }
        let a = JSON.stringify(data);
        $.ajax({
            url:'../teacher/judgeWork',
            type:'POST',
            dataType:'json',
            async:'false',
            contentType:'application/json',
            data:a,
            success:function (result) {
                if(result.status) {
                    let i = 0;
                    let n = result.teacherWork.length;
                    for(i = 0;i < n; i++) {
                        console.log(n);
                        let tem2 = result.teacherWork[i];
                        testDataList.push(`<tr class="_clone1">
                 <td class="Check1">
                    <label>
                        <input class="checkbox_" type="checkbox" name="beSelected" autocomplete="off">
                        <span></span>
                    </label>
                </td>
                <td class="Name1">` + tem2.name + `</td>
                <td class="Account1">` + tem2.studentID + `</td>
                <td class="Time1">` + tem2.date + `</td>
                <td class="Status1">
                    <button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#myModal">
                        <span class="status_content">` + tem2.status + `</span>
                    </button>
                </td>
                <td class="btn_a Dload">下载</td>
                </tr>`);
                    }
                    setTable();
                    pageAll = (testDataList.length) / count;
                    $('.totlePage1').html(parseInt(pageAll+0.5));
                } else {
                    console.log('获取学生已提交作业失败');
                }
            },
            error:function () {
                console.log('error:获取学生已提交作业');
            }

        })
    })();


    let setTable = function () { //数据渲染表格
        let onePageData = []; //用来存放一页的数据
        for (let i = 0;
             (i + nowPage * count < (nowPage + 1) * count) && i + nowPage * count < testDataList.length; i++) { //满足当前数据小于没到当前页的最后一条数据 ，并且当前数据没到最后一条数据
            {
                onePageData.push(testDataList[i + nowPage * count]);// 这个循环会循环五次  把五条数据放到列表里
            }
        }
        document.querySelector('.contain1').innerHTML = onePageData.join(''); //渲染当前页数据
    }
    setTable();
    $('#up1').click(function () {
        console.log('上一页');
        if (nowPage == 0) //当前页数是第一页则返回
            return
        nowPage--;
        setTable();
        $('.nowPage1').html(nowPage+1);
    })
    $('#down1').click(function () {
        console.log('下一页');
        if (nowPage >= pageAll-1) //当前页数是最后一页则返回  这么写是因为总页数不一定是整数
            return
        nowPage++;
        setTable();
        $('.nowPage1').html(nowPage+1);
        debugger
    })

})();

