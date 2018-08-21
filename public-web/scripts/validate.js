/**
 * Created by Administrator on 2017/7/2.
 */
//手机验证
function checkPhone(phone) {
    if(phone){
        phone = phone.replace(/\s/g,'');
    }
    return (/(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test(phone));
}
//手机号码实现3 4 4 空格显示
function phoneSpace(val){
    if(!val) return '';
    return val.replace(/[^\d]/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3');
}
//银行号码/号码 实现每4位空格显示
function numberEachFoureSpace(val){
    if(!val) return '';
    return val.replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");
}

/*
 * 判断是否是18位身份证号码格式
 * @param { string } strs - 待判断的字符串, 或者数字
 * return true 是
 * return false 否
 */
function checkIdCard18 (strs){
    var reg=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return reg.test(strs);
}

/*
 * 判断是否是15位身份证号码格式
 * @param { string } strs - 待判断的字符串, 或者数字
 * return true 是
 * return false 否
 */
function checkIdCard15 (strs){
    var reg=/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
    return reg.test(strs);
}

/*
 * 判断是否是身份证号码格式
 * @param { string } strs - 待判断的字符串, 或者数字
 * return true 是
 * return false 否
 */
function checkIdCard (strs){
    var result = false;
    if(strs.length==15){
        result=checkIdCard15(strs);
    }else if(strs.length==18){
        result=checkIdCard18(strs);
    }
    return result;
}

/*
 * 判断是否是数字或者英文字母
 * @param { string } strs - 待判断的字符串, 或者数字
 * return true 是
 * return false 否
 */
function checkNumAndLetter (strs){
    var reg=/^[A-Za-z0-9]+$/;
    return reg.test(strs);
}

/*
    * 判断是否是邮箱格式
    * @param { string } strs - 待判断的字符串, 或者数字
    * return true 是
    * return false 否
*/
function checkEmail(strs) {
    var reg =/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(strs);
}
