

/****************需要引入jquery**************/

/*
 * tab切换
 * @param { object } titleObj - tab标题元素选择器
 * @param { object } titleLineObj - 如果tab标题有下横线滑动效果 则传入下横线元素选择器
 * @param { object } contentObj - tab切换内容元素选择器
 */
function tabSwitch(titleObj,titleLineObj,contentObj){
    //改变下横线位置
    function changeLine(index){
        var left= $(titleObj).eq(index).offset().left
            -$(titleObj).parent().offset().left
            +($(titleObj).eq(index).outerWidth()/2)-$(titleLineObj).width()/2;
        $(titleLineObj).css('left',left);
    }

    //初始化
    $(titleObj).first().addClass('on');
    contentObj && $(contentObj).first().addClass('on');
    titleLineObj && changeLine(0);

    $(titleObj).on('click',function(){
        var _this=$(this),
            index_this = $(titleObj).index(_this);
        _this.addClass('on').siblings().removeClass('on');
        contentObj && $(contentObj).eq(index_this).addClass('on').siblings().removeClass('on');
        titleLineObj && changeLine(index_this);
    });
}

