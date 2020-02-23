
(function () {
    //为获取已提交作业表格

    let nowPage = 0, //当前页
        count = 8, //每页显示多少条消息
        pageAll = 0; //总页数
    let testDataList = []; //创建一个存放数据的数组
    $('.nowPage2').html(nowPage+1);

    (function () {
        $.ajax({
            url:'../user/getMyWorks',
            type:'POST',
            dataType:'json',
            async:'false',
            contentType:'application/json',
            success:function (result) {
                if(result.status) {
                    let i = 0;
                    let n = result.userWork.length;
                    for(i = 0;i < n; i++) {
                        console.log(n);
                        let tem2 = result.userWork[i];
                        testDataList.push(`<tr class="_clone2">
                <td>
                      <label>
                          <input class="checkbox_" type="checkbox" name="beSelected" autocomplete="off">
                          <span></span>
                     </label>
                 </td>
                <td class="Name2">` + tem2.name + `</td>
                <td class="Code2">` + tem2.code + `</td>
                <td class="Teacher2">` + tem2.teacher + `</td>
                <td class="Grade2">` + tem2.grade + `</td>
                <td class="Type2">` + tem2.type + `</td>
                <td class="Uptime2">` + tem2.date + `</td>
                <td class="State2">
                     <button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#myModal">
                           <span class="status_content">`+ tem2.status +`</span>
                     </button>
                </td>
                <td class="Download2 btn_a">下载</td>
                <td class="delete2 btn_a">删除</td>
                </tr>`);
                    }
                    setTable();
                    pageAll = (testDataList.length) / count;
                    let tem = parseInt(pageAll);
                    if(tem < pageAll) {
                        tem += 1;
                    }
                    $('.totlePage1').html(tem);
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
        document.querySelector('.submit_').innerHTML = onePageData.join(''); //渲染当前页数据
    }
    setTable();
    $('#up2').click(function () {
        console.log('上一页');
        if (nowPage == 0) //当前页数是第一页则返回
            return
        nowPage--;
        setTable();
        $('.nowPage2').html(nowPage+1);
    })
    $('#down2').click(function () {
        console.log('下一页');
        if (nowPage >= pageAll-1) //当前页数是最后一页则返回  这么写是因为总页数不一定是整数
            return
        nowPage++;
        setTable();
        $('.nowPage2').html(nowPage+1);
        debugger
    })
})();
