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
            tips:obj.tips || '没有任何提示信息！',
            okStr:obj.okStr || '确定',
            noStr:obj.noStr || '取消',
            icon:obj.icon  || 'warn',
            callbackOk:obj.callbackOk,  //确认回调
            callbackNo:obj.callbackNo   //取消回调
        },
        body = document.getElementsByTagName("BODY")[0],
        head = document.getElementsByTagName('head')[0],
        maskDiv = document.createElement("DIV"),
        confirmDiv = document.createElement("DIV"),
        confirmTxtDiv = document.createElement("DIV"),
        confirmBtnDiv = document.createElement("DIV"),
        confirmBtnOkDiv = document.createElement("DIV"),
        confirmBtnNoDiv = document.createElement("DIV");

    maskDiv.className='mask';
    confirmDiv.className='message-confirm';
    confirmTxtDiv.className='message-confirm-txt';
    confirmBtnDiv.className='message-confirm-btn';
    confirmBtnOkDiv.className='okBtn';
    confirmBtnNoDiv.className='noBtn';
    confirmTxtDiv.innerHTML=param.tips;
    confirmBtnOkDiv.innerHTML=param.okStr;

    if(obj.noStr!=null){
        //不为null才添加取消按钮
        confirmBtnNoDiv.innerHTML=param.noStr;
        confirmBtnDiv.appendChild(confirmBtnNoDiv);
    }
    confirmBtnDiv.appendChild(confirmBtnOkDiv);
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




