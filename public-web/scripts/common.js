

/*****
    * 全局公共方法
    * 在定义插件之前添加一个分号，可以解决js合并时可能会产生的错误问题；
    * @param undefined-在老一辈的浏览器是不被支持的，直接使用会报错，js框架要考虑到兼容性，
    因此增加一个形参undefined，就算有人把外面的 undefined 定义了，
    里面的 undefined 依然不受影响；
****/

;(function(undefined){

    "use strict"   //使用js严格模式检查
    var _global;
	var utils = {
		/*
			* 字符串去除空格
			* @param { string } str - 去空格的字符串
			* @param { string } type - 类型 (1-所有空格  2-前后空格  3-前空格 4-后空格) 默认2
		*/ 		   
	    trim: function(str, type=2) {
	        switch (type) {
	            case 1:
	                return str.replace(/\s+/g, "");
	            case 2:
	                return str.replace(/(^\s*)|(\s*$)/g, "");
	            case 3:
	                return str.replace(/(^\s*)/g, "");
	            case 4:
	                return str.replace(/(\s*$)/g, "");
	            default:
	                return str;
	        }
	    },
		// 取消传统事件冒泡
	    stopPropagation: function (e) {   	
		    var e = e || window.event;
		    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
	    },
	    // 取消事件默认行为
	    preventDefault: function (e) {  	
			var e = e || window.event;
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
	    }, 
		/*
			* 手机号码设置空格
			* @param { DOM } obj - DOM元素
		*/	    
	    phoneSpace: function(obj){
	        var value = obj.value;
	        value = value.replace(/\s*/g, "");
	        var result = [];
	        for(var i = 0; i < value.length; i++){
	            if (i==3||i==7){
	                result.push(" " + value.charAt(i));
	            }else{
	                result.push(value.charAt(i));
	            }
	        }
	        obj.value = result.join("");
	    },
		/*
		 * 通过name获取url中的参数值
		 * @param {string} name - 网址中对应的key
		 * @param {url} url - 网址或者浏览器url [可选]
		 * @return {string} 网址中name对应的值 
		*/
		getUrlParam: function (name,url) {
			url = url || window.location.href;
			var arr_url = /^[^\?]+\?([\w\W]+)$/.exec(url)
			if(arr_url && arr_url[1]){
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = arr_url[1].match(reg);
				if (r != null) return unescape(r[2]);
			}
			return null;
		},  
		/*
			* 手机类型判断
			* @param { string } type - 类型
			* return true 是此类型
			* return false 不是此类型		
		*/    
	    browserType: function(type) {
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
	    }, 
		/*
	     * 格式化日期时间
	     * @param {date} date - 需要格式化的日期时间
	     * @param {string} format - [可选],默认"yyyy-MM-dd hh:mm:ss"
	     * @return {string}
	     */
		dateFormat:function (date, format) {
			format = format || "yyyy-MM-dd hh:mm:ss";
	        var o = {
	            "M+":date.getMonth() + 1, //month 
	            "d+":date.getDate(), //day 
	            "h+":date.getHours(), //hour 
	            "m+":date.getMinutes(), //minute 
	            "s+":date.getSeconds(), //second 
	            "q+":Math.floor((date.getMonth() + 3) / 3), //quarter 
	            "S":date.getMilliseconds() //millisecond 
	        };

	        if (/(y+)/.test(format)) {
	            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	        }

	        for (var k in o) {
	            if (new RegExp("(" + k + ")").test(format)) {
	                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	            }
	        }
	        return format;
	    },
		/**
			* 动态添加style样式
			* @param { css } code - css样式代码
			* return style DOM元素
		*/      
	    addCssCode: function(code) {
		    var style = document.createElement('style');
		    style.type = 'text/css';
		    style.rel = 'stylesheet';
		    //for Chrome Firefox Opera Safari
		    style.appendChild(document.createTextNode(code));
		    //for IE
		    //style.styleSheet.cssText = code;
		    var head = document.getElementsByTagName('head')[0];
		    head.appendChild(style);
		    return  style;
	    },         
	    //DOM元素方法
		props:{	
			/*
				* 判断是是否有某个样式
				* @param { DOM }    obj - DOM元素
				* @param { string } sClass - css样式名
			*/				

		    hasClass: function(obj, sClass)	{
		    	return obj.className.match(new RegExp('(\\s|^)' + sClass + '(\\s|$)')); 
		    },
			/*
				* 添加样式
				* @param { DOM }    obj - DOM元素
				* @param { string } sClass - 需要添加的样式
			*/	    
		    addClass: function(obj, sClass) {    	
		    	!utils.props.hasClass(obj, sClass) && (obj.className += ' ' + sClass);
		    },	    
			/*
				* 移除样式
				* @param { DOM }    obj - DOM元素
				* @param { string } sClass - 需要移除的样式
			*/
		    removeClass: function(obj, sClass) {   	
		    	utils.props.hasClass(obj, sClass) && (obj.className = obj.className.replace(sClass, '').replace(/(^\s+|\s+$)/, ''));
		    },
			/*
				* 设置样式
				* @param { DOM}             obj - DOM元素
				* @param { string / object} attr - 样式属性/样式对象
				* @param { string }         val - 单个样式属性值
			*/	    
			setStyle: function (obj, attr, val) {
			    switch (typeof attr) {
			        case 'string':
			            return obj.style[attr] = val;
			        case 'object':
			            for (var i in attr) {
			                obj.style[i] = attr[i];
			            }
			    }
			}
		},
		//验证
		validate:{	
			/*
				* 判断输入的字符是否为中文
				* @param { string } strs - 带判断的字符串
				* return true 是
				* return false 否			
			*/
			isChinese: function(strs){
				if(strs && typeof(strs) == 'string'){
					reg=/^[\u4E00-\u9FA5]+$/; 
					return reg.test(strs);
				}
				return false;
			},
			/*
				* 判断是否是正整数
				* @param { string } strs - 待判断的字符串, 或者数字
				* return true 是
				* return false 否
			*/
			isPositive: function(strs){
				var reg = /^\d+$/;
				return reg.test(strs);
			},	
			/*
				* 判断是否是负整数
				* @param { string } strs - 待判断的字符串, 或者数字
				* return true 是
				* return false 否
			*/
			isNegative: function(strs){
				var reg = /^-\d+$/;
				return reg.test(strs);
			},
			/*
				* 判断是否是手机号码格式
				* @param { string } strs - 待判断的字符串, 或者数字
				* return true 是
				* return false 否
			*/
	        isPhone: function(strs) {
		        var n = strs.replace(/\s*/g, "");
		        var m = n.match(/^\s*(\S+(\s+\S+)*)\s*$/);
		        strs = (m == null) ? "" : m[1];
		        return (/(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test(strs));
	        },
			/*
				* 判断是否是固话
				* @param { string } strs - 待判断的字符串, 或者数字
				* return true 是
				* return false 否
			*/	        
			isTel: function(str) {
			    var reg = /^0[\d]{2,3}-[\d]{7,8}$/;
			    return reg.test(str);
			},	       
			/*
				* 判断是否是邮箱格式
				* @param { string } strs - 待判断的字符串, 或者数字
				* return true 是
				* return false 否
			*/
	        isEmail: function(strs) {
		        var reg =/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		        return reg.test(strs);
	       },            
			/*
				* 判断是否是18位身份证号码格式
				* @param { string } strs - 待判断的字符串, 或者数字
				* return true 是
				* return false 否
			*/       
	       isIdCard18: function(strs){
	       	 var reg=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	       	 return reg.test(strs);
	       },
	 		/*
				* 判断是否是15位身份证号码格式
				* @param { string } strs - 待判断的字符串, 或者数字
				* return true 是
				* return false 否
			*/       
	        isIdCard15: function(strs){
				var reg=/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
				return reg.test(strs);
	        },
	 		/*
				* 判断是否是身份证号码格式
				* @param { string } strs - 待判断的字符串, 或者数字
				* return true 是
				* return false 否
			*/          
	        isIdCard: function(strs){
				var result = false;
				if(strs.length==15){
					result=utils.validate.isIdCard15(strs);
				}else if(strs.length==18){
					result=utils.validate.isIdCard18(strs);
				}
				return result;
	        },
	 		/*
				* 判断是否是银行卡或信用卡号
				* @param { string } strs - 待判断的字符串, 或者数字
				* return true 是
				* return false 否
			*/  	        
			isBankCard: function(str) {
				//15位或19位银行卡或信用卡号
				str=utils.trim(str,1);
			    var reg =/^([1-9]{1})(\d{14}|\d{18})$/; 
			    return reg.test(str);
			},	            
		},
		//消息提示  消息确认取消
		message:{
			/*
				* 信息提示弹窗，自动消失
				* @param { string } tips - 提示的字符串
				* @param { Function } callback - 回调函数 [可选]
				* @param { string } className - //外层容器样式名 [可选]
				* @param { CSS } css - css样式 	[可选]	
			*/	
			prompt: function(tips,callback,className,css){
				
				var body = document.getElementsByTagName("BODY")[0],
				    head = document.getElementsByTagName('head')[0],
				    cssCode='.message-prompt{position:fixed;max-width:750px;margin:0 auto;left:0;right:0;top:30%;z-index:10;text-align:center}.message-prompt .message-prompt-content{display:inline-block;min-width:30%;max-width:70%;margin:0 auto;background-color:rgba(0,0,0,0.8);border-radius:5px;padding:.2rem;font-size:.3rem;text-align:center;color:#FFF;word-wrap:break-word}',						
					styleDom=utils.addCssCode(cssCode),
					promptDiv = document.createElement("DIV"),
					promptContentDiv=document.createElement("DIV");

				if(css){
					cssCode+=css;
				}				
				promptDiv.className='message-prompt';
				if(className){
					utils.props.addClass(promptDiv,className);
				}

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
					head.removeChild(styleDom);
					if(callback){
						callback();
					}
				},1500);
			},
			/*
				* 信息提示弹窗确认框
				* @param { object } obj - obj参数		
			*/			
			confirm: function(obj){
		        var param = {
		            tips:obj.tips || '没有任何提示信息！',
		            okStr:obj.okStr || '确定',     
		            noStr:obj.noStr || '取消',
					icon:obj.cancelStr  || 'warn',  
					className:obj.className,    //外层容器样式名 
					callbackOk:obj.callbackOk,  //确认回调
					callbackNo:obj.callbackNo   //取消回调
		        },	             
				cssCode='.message-confirm{position:fixed;z-index:10;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;width:4.8rem;background-color:#fff;border-radius:.05rem;margin:0 auto;left:0;right:0;top:30%}.message-confirm .message-confirm-txt{font-size:.26rem;color:#666;line-height:150%;padding:.4rem;text-align:center;min-height:1.4rem;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.message-confirm .message-confirm-btn{font-size:.24rem;color:#666;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;border-top:1px solid #dddddd}.message-confirm .message-confirm-btn div{border-right:1px solid #dddddd;text-align:center;padding:.3rem 0;-webkit-box-flex:1;-webkit-flex:1;-moz-box-flex:1;-ms-flex:1;flex:1}.message-confirm .message-confirm-btn div:last-child{border-right:none}.message-confirm .message-confirm-btn div.okBtn{color:#da004c}',					
				styleDom=utils.addCssCode(cssCode),
				body = document.getElementsByTagName("BODY")[0],
				head = document.getElementsByTagName('head')[0],
				maskDiv = document.createElement("DIV"),
				confirmDiv = document.createElement("DIV"),
				confirmTxtDiv = document.createElement("DIV"),
				confirmBtnDiv = document.createElement("DIV"),
				confirmBtnOkDiv = document.createElement("DIV"),
				confirmBtnNoDiv = document.createElement("DIV");
				
				maskDiv.className='mask';
				maskDiv.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;z-index:4;display:block;background:rgba(0,0,0,0.5);';
				confirmDiv.className='message-confirm';
                if(param.className){
                	utils.props.addClass(confirmDiv,param.className);
                }				
				confirmTxtDiv.className='message-confirm-txt';
				confirmBtnDiv.className='message-confirm-btn';
				confirmBtnOkDiv.className='okBtn';
				confirmBtnNoDiv.className='noBtn';
				confirmTxtDiv.innerHTML=param.tips;
				confirmBtnOkDiv.innerHTML=param.okStr;
				confirmBtnNoDiv.innerHTML=param.noStr;
				confirmBtnDiv.appendChild(confirmBtnNoDiv);
				confirmBtnDiv.appendChild(confirmBtnOkDiv);		
				confirmDiv.appendChild(confirmTxtDiv);
				confirmDiv.appendChild(confirmBtnDiv);
				body.appendChild(maskDiv);
				body.appendChild(confirmDiv);						
	            
			    maskDiv.onclick = function () {
			        body.removeChild(maskDiv);
			        body.removeChild(confirmDiv);
			        head.removeChild(styleDom);
			    };
			    confirmBtnOkDiv.onclick = function () {
			    	if(param.callbackOk){
			    		param.callbackOk();
			    	}
			    	body.removeChild(maskDiv);
			        body.removeChild(confirmDiv);	
			        head.removeChild(styleDom);	    	
			    };
			    confirmBtnNoDiv.onclick = function () {
			    	if(param.callbackNo){
			    		param.callbackNo();
			    	}
			    	body.removeChild(maskDiv);
			        body.removeChild(confirmDiv);
			        head.removeChild(styleDom);
			    };
			}
		},  
		//弹窗
		dialog:{
			/*
				* 规则弹窗
				* @param { object } obj - obj参数		
			*/				
			ruleDialog: function(obj) {
		        var param = {
		        	title:obj.title,           //弹窗标题
		        	html:obj.html,             //弹窗内容html
					className:obj.className,   //外层容器样式名 
		        },
		        cssCode='.rule-dialog{position:fixed;top:50%;left:50%;z-index:5;padding:.25rem;width:6.2rem;background:#fff;border-radius:5px}.rule-dialog h2{font-size:.36rem;line-height:150%;color:#333;text-align:center;margin-bottom:.2rem}.rule-dialog .rule-dialog-content{padding:.3rem;background-color:#f5f5f5;border-radius:5px}.rule-dialog .rule-dialog-content p{font-size:.24rem;line-height:150%;color:#333}.rule-dialog .rule-dialog-close{position:absolute;bottom:-1.5rem;left:50%;width:.8rem;height:.8rem;border:1px solid #fff;border-radius:100%;background:rgba(0,0,0,0.2);-webkit-transform:translate(-50%, 0);-ms-transform:translate(-50%, 0);transform:translate(-50%, 0);display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.rule-dialog .rule-dialog-close a{display:inline-block;width:.5rem;height:1px;background:#fff;line-height:0;font-size:0;vertical-align:middle;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.rule-dialog .rule-dialog-close a:after{content:"/";display:block;width:.5rem;height:1px;background:#fff;-webkit-transform:rotate(-90deg);-ms-transform:rotate(-90deg);transform:rotate(-90deg)}',
				styleDom=utils.addCssCode(cssCode),
				body = document.getElementsByTagName("BODY")[0],
				head = document.getElementsByTagName('head')[0],
				ruleDialogDiv = document.createElement("DIV"),
				titleH2 = document.createElement("h2"),
				ruleDialogContentDiv = document.createElement("DIV"),
				ruleDialogCloseDiv = document.createElement("DIV"),
				maskDiv = document.createElement("DIV");

				maskDiv.className='mask';
				maskDiv.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;z-index:4;display:block;background:rgba(0,0,0,0.5);';
				ruleDialogDiv.className='rule-dialog';
				if(param.className){
                	utils.props.addClass(ruleDialogDiv,param.className);
                }
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
				        head.removeChild(styleDom);					
					},500);
				}				

			    ruleDialogCloseDiv.onclick = function () {
			    	removeDialog();
			    };
			    maskDiv.onclick = function () {
			        removeDialog();		
			    };					
			}

		},	
	}

	//将插件对象暴露给全局对象
	//_global赋值当前上下文this对象
	_global = (function(){ 
		return this || (0, eval)('this'); 
	})();
    
    //如果存在模块加载器，就使用加载器 
	if (typeof module !== "undefined" && module.exports) {
        module.exports = utils;
    } else if (typeof define === "function" && define.amd) {
        define(function(){
        	return utils;
        });
    } else {
        !('utils' in _global) && (_global.utils = utils);
    }

})();



