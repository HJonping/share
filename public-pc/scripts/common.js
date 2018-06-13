/*内部加载中提示*/
function loadingIn(obj,msg){
    var html='';
    html+='<div class="loading-in">';
    html+='<div class="spinner">';
    html+=' <div class="bounce1"></div>';
    html+=' <div class="bounce2"></div>';
    html+=' <div class="bounce3"></div>';
    html+='</div>';
    html+='<p>'+msg+'</p>';
    html+='</div>';
    $(obj).append(html);
    $(obj).css({
        position:'relative',
    });
}
/*关闭内部加载中提示*/

function closeLoadingIn(obj){
    $(obj).find(".loading-in").remove();
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
        confirmCloseDiv = document.createElement("DIV"),
        confirmTitleDiv = document.createElement("DIV"),
        confirmTxtDiv = document.createElement("DIV"),
        confirmBtnDiv = document.createElement("DIV"),
        confirmBtnOkDiv = document.createElement("DIV"),
        confirmBtnNoDiv = document.createElement("DIV");

    maskDiv.className='mask';
    confirmDiv.className='message-confirm';
    confirmDiv.style.marginTop='-'+document.documentElement.clientHeight+'px';
    confirmCloseDiv.className='message-confirm-close';
    confirmTitleDiv.className='message-confirm-title';
    confirmTxtDiv.className='message-confirm-txt';
    confirmBtnDiv.className='message-confirm-btn';
    confirmBtnOkDiv.className='okBtn';
    confirmBtnNoDiv.className='noBtn';
    confirmCloseDiv.innerHTML='<div class="close-inner"><a href="javascript:void(0)"></a></div>';
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
    confirmDiv.appendChild(confirmCloseDiv);
    confirmDiv.appendChild(confirmTitleDiv);
    confirmDiv.appendChild(confirmTxtDiv);
    confirmDiv.appendChild(confirmBtnDiv);
    body.appendChild(maskDiv);
    body.appendChild(confirmDiv);

    setTimeout(function(){
        confirmDiv.style.marginTop = 0;
    },30);

    function removeConfirmDiv() {
        confirmDiv.style.marginTop = '-'+document.documentElement.clientHeight+'px';
        body.removeChild(maskDiv);
        setTimeout(function(){
            body.removeChild(confirmDiv);
        },500);
    }

    maskDiv.onclick = function () {
        removeConfirmDiv();
    };
    confirmBtnOkDiv.onclick = function () {
        if(param.callbackOk){
            param.callbackOk();
        }
        removeConfirmDiv();
    };
    confirmBtnNoDiv.onclick = function () {
        if(param.callbackNo){
            param.callbackNo();
        }
        removeConfirmDiv();
    };
    confirmCloseDiv.onclick=function () {
        removeConfirmDiv();
    }
}