/**原生js 公共方法****/

/**
 *
 * @returns {number} 返回屏幕宽度与设计稿的比例
 */
function getRemRatio(){
    var docEl = document.documentElement;
        designWidth=750,   //设计宽度
        rem = docEl.clientWidth,
        d=designWidth/100;

    if(rem>designWidth){
      rem =designWidth;
    }
    return rem/d;
}

/*
 * 手机类型判断
 * @param { string } type - 类型
 * return true 是此类型
 * return false 不是此类型
 */
function browserType(type) {
    switch (type) {
        case 'android':
            return navigator.userAgent.toLowerCase().indexOf('android') !== -1;
        case 'iphone':
            return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1;
        case 'ipad':
            return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;
        case 'weixin':
            return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
        case 'alipay':
            return navigator.userAgent.toLowerCase().indexOf('alipayclient') !== -1;
        default:
            return navigator.userAgent.toLowerCase();
    }
}
/*
	* 判断是是否有某个样式
	* @param { DOM }    obj - DOM元素
	* @param { string } sClass - css样式名
*/

function hasClass(obj, sClass)	{
	return obj.className.match(new RegExp('(\\s|^)' + sClass + '(\\s|$)'));
}
/*
	* 添加样式
	* @param { DOM }    obj - DOM元素
	* @param { string } sClass - 需要添加的样式
*/
function addClass(obj, sClass) {
	!hasClass(obj, sClass) && (obj.className += ' ' + sClass);
}

/*
 * 信息提示弹窗，自动消失
 * @param { string } tips - 提示的字符串
 * @param { Function } callback - 回调函数 [可选]
 */
function messagePrompt(tips,callback){
    var body = document.getElementsByTagName("BODY")[0],
        head = document.getElementsByTagName('head')[0],
        promptDiv = document.createElement("DIV"),
        promptContentDiv=document.createElement("DIV");

    promptDiv.className='message-prompt';
    promptDiv.style.webkitTransition = "0.5s ease -webkit-transform";
    promptDiv.style.webkitTransform = "translate3d(0,150%,0)";
    promptContentDiv.className='message-prompt-content';
    promptContentDiv.innerHTML=tips;
    promptDiv.appendChild(promptContentDiv);
    body.appendChild(promptDiv);

    setTimeout(function(){
        promptDiv.style.webkitTransform = "translate3d(0,-50%,0)";
    },30);

    setTimeout(function(){
        body.removeChild(promptDiv);
        if(callback){
            callback();
        }
    },1500);
}
/*
 * 信息提示弹窗确认框
 * @param { object } obj - obj参数
 */
function messageConfirm(obj){
    var param = {
            title:obj.title || "温馨提示",
            tips:obj.tips || '没有任何提示信息！',
            okStr:obj.okStr || '确定',
            noStr:obj.noStr || '取消',  //默认没有取消按钮 需要加的话值为true或者对应的文案
            icon:obj.icon  || 'warn',
            callbackOk:obj.callbackOk,  //确认回调
            callbackNo:obj.callbackNo   //取消回调
        },
        body = document.getElementsByTagName("BODY")[0],
        head = document.getElementsByTagName('head')[0],
        maskDiv = document.createElement("DIV"),
        confirmDiv = document.createElement("DIV"),
        confirmTitleDiv = document.createElement("DIV"),
        confirmTxtDiv = document.createElement("DIV"),
        confirmBtnDiv = document.createElement("DIV"),
        confirmBtnOkDiv = document.createElement("DIV"),
        confirmBtnNoDiv = document.createElement("DIV");

    maskDiv.className='mask';
    confirmDiv.className='message-confirm';
    confirmTitleDiv.className='message-confirm-title';
    confirmTxtDiv.className='message-confirm-txt';
    confirmBtnDiv.className='message-confirm-btn';
    confirmBtnOkDiv.className='okBtn';
    confirmBtnNoDiv.className='noBtn';
    confirmTitleDiv.innerHTML=param.title;
    confirmTxtDiv.innerHTML=param.tips;
    confirmBtnOkDiv.innerHTML=param.okStr;

    if(obj.noStr!=null){
        //不为null才添加取消按钮
        if(typeof obj.noStr == 'boolean' && obj.noStr){
            confirmBtnNoDiv.innerHTML='取消';
        }else{
            confirmBtnNoDiv.innerHTML=param.noStr;
        }
        confirmBtnDiv.appendChild(confirmBtnNoDiv);
    }
    confirmBtnDiv.appendChild(confirmBtnOkDiv);
    confirmDiv.appendChild(confirmTitleDiv);
    confirmDiv.appendChild(confirmTxtDiv);
    confirmDiv.appendChild(confirmBtnDiv);
    body.appendChild(maskDiv);
    body.appendChild(confirmDiv);

    maskDiv.onclick = function () {
        body.removeChild(maskDiv);
        body.removeChild(confirmDiv);
    };
    confirmBtnOkDiv.onclick = function () {
        if(param.callbackOk){
            param.callbackOk();
        }
        body.removeChild(maskDiv);
        body.removeChild(confirmDiv);
    };
    confirmBtnNoDiv.onclick = function () {
        if(param.callbackNo){
            param.callbackNo();
        }
        body.removeChild(maskDiv);
        body.removeChild(confirmDiv);
    };
}

/*
 * 规则弹窗
 * @param { object } obj - obj参数
 */
function ruleDialog(obj) {
    var param = {
            title:obj.title,           //弹窗标题
            html:obj.html,             //弹窗内容html
        },
        body = document.getElementsByTagName("BODY")[0],
        head = document.getElementsByTagName('head')[0],
        ruleDialogDiv = document.createElement("DIV"),
        titleH2 = document.createElement("h2"),
        ruleDialogContentDiv = document.createElement("DIV"),
        ruleDialogCloseDiv = document.createElement("DIV"),
        maskDiv = document.createElement("DIV");

    maskDiv.className='mask';
    ruleDialogDiv.className='rule-dialog';
    ruleDialogDiv.style.webkitTransition = "0.5s ease -webkit-transform";
    ruleDialogDiv.style.webkitTransform = "translate3d(-50%,-500%,0)";
    ruleDialogContentDiv.className='rule-dialog-content';
    titleH2.innerHTML=obj.title;
    ruleDialogContentDiv.innerHTML=obj.html;
    ruleDialogCloseDiv.className='rule-dialog-close';
    ruleDialogCloseDiv.innerHTML='<a href="javascript:;"></a>';

    ruleDialogDiv.appendChild(titleH2);
    ruleDialogDiv.appendChild(ruleDialogContentDiv);
    ruleDialogDiv.appendChild(ruleDialogCloseDiv);
    body.appendChild(maskDiv);
    body.appendChild(ruleDialogDiv);

    setTimeout(function(){
        ruleDialogDiv.style.webkitTransform = "translate3d(-50%,-50%,0)";
    },30);

    function removeDialog(){
        ruleDialogDiv.style.webkitTransform = "translate3d(-50%,-500%,0)";
        body.removeChild(maskDiv);
        setTimeout(function(){
            body.removeChild(ruleDialogDiv);
        },500);
    }

    ruleDialogCloseDiv.onclick = function () {
        removeDialog();
    };
    maskDiv.onclick = function () {
        removeDialog();
    };
}

/*
 * 通过name获取url中的参数值
 * @param {string} name - 网址中对应的key
 * @param {url} url - 网址或者浏览器url [可选]
 * @return {string} 网址中name对应的值
 */
function getUrlParam(name, url) {
    url = url || window.location.href;
    var test=/^http$/
    var arr_url = /^[^\?]+\?([\w\W]+)$/.exec(url)
    if (arr_url && arr_url[1]) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = arr_url[1].match(reg);
        if (r != null) return unescape(r[2]);
    }
    return null;
}

/*
 * 链接跳转
 * @param {obj} obj - DOM对象
 */
function goToUrl(obj){
    var url=obj.getAttribute('data-href');
    window.location.href = url;
}
// 取消事件默认行为
function preventDefault (e) {
	var e = e || window.event;
	e.preventDefault ? e.preventDefault() : e.returnValue = false;
}

/*
 * 计算2个日期之间相差的 年份 或者月份或时间等
 * @param { date/string } date1 - 开始时间
 * @param { date/string } date2 - 结束时间时间
 * @param { string } type - 返回的类型  根据 timeType键值传入
 * @param { string } returnTYpe - 返回数据  round（四舍五入）,ceil（上舍入）,parseInt（取整）
 */
function dateDiffer(date1, date2,type,returnTYpe) {
    date1 = date1 instanceof Date ? date1 : new Date(date1);
    date1 = date1.getTime();
    date2 = date2 instanceof Date ? date2 : new Date(date2);
    date2 = date2.getTime();
    type = type || 'year';
    returnTYpe=returnTYpe || 'round'; //默认四舍五入

    var diffValue = Math.abs(date2 - date1);
    var second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        month = day * 30,
        year = month * 12;
    var timeType = {
        second: second,
        minute: minute,
        hour: hour,
        day: day,
        month: month,
        year: year
    };
    if(returnTYpe=="parseInt"){
        return parseInt( diffValue / timeType[type]);
    }else if(returnTYpe=="ceil"){
        return Math.ceil( diffValue / timeType[type]);
    }else{
        return Math.round( diffValue / timeType[type]);
    }
}



/**
 * 页面到达底部，加载更多
 *  * @param { function } callback - 回调函数
 */
function loadMoreHandle(callback){
    window.addEventListener('scroll',function() {
        if(isSlideToBottom()){
            callback();
        }
    }, false);
}

//判断是否滑到离底部5像素的距离
function isSlideToBottom(){
    var scrollTop=document.documentElement.scrollTop || document.body.scrollTop || 0,             //获取滚动条当前的位置
        clientHeight=document.documentElement.clientHeight || document.body.clientHeight || 0,    //获取网页可见区域高
        scrollHeight=document.documentElement.scrollHeight || document.body.scrollHeight || 0;    //获取网页总高度

    return scrollTop + clientHeight > scrollHeight-5;
}



