/**
 * Created by Administrator on 2016/11/22.
 */

//封装了一个获取元素文本，和设置文本兼容性的对象

var Txt = {
    /**
     * 定义了一个没有兼容性的获取标签内容的函数
     * @param element
     * @returns {*}
     */
    getText:function(element){
        // 能力检测   就是要看当前的浏览器，是否支持此对象的属性或是方法
//        var b = typeof element.innerText;
        if(typeof element.innerText=="string"){
            return    element.innerText;
        }else {
            return   element.textContent; // 低版本的火狐浏览器支持
        }
    },
    /**
     * 定义了一个没有兼容性的设置标签内容的函数
     * @param element
     * @param value
     */
    setText:function(element,value){
        if(typeof element.innerText=="string"){
            element.innerText = value; //IE8及之前的低版本的浏览器
        }else {
            element.textContent = value;//低版本的火狐浏览器
        }
    }
}


//封装了一个获取元素节点方法的对象
var ele = {
    /**
     * 封装了一个兼容性版本的获取下一个相邻的标签节点的函数
     * @param element
     * @returns {*}
     */
    getNextElement:function(element){
        // 能力检测  就是要看当前的浏览器是否支持此对象的属性或是方法
        if(element.nextElementSibling) {
            return element.nextElementSibling;//高级浏览器支持的方式
        }else { // 是IE8及之前的低版本的浏览器支持的方式
            var ele = element.nextSibling;
            while(ele&&ele.nodeType!=1){ // 每一个条件是保证对象得真实存，不是undefined，再一个就是这个节点不是标签
                ele =  ele.nextSibling; //继续在当前标签对象往后找
            }
            return ele;
        }
    },
    /**
     * 封装了一个兼容版本的获取上一个标签节点的函数
     * @param element
     * @returns {*}
     */
    getPreviousElement:function(element){
        // 能力检测
        if(element.previousElementSibling){
            return element.previousElementSibling; // 高级浏览器支持的获取当前标签的上一个标签节点
        }else {
            var ele = element.previousSibling;
            while(ele&&ele.nodeType!=1){
                ele=  ele.previousSibling;
            }
            return ele;
        }
    },
    /**
     * 封装了一个兼容版本的获得第一个子标签节点的函数
     * @param element
     * @returns {element}
     */
    getFirstElement:function(element){
        // 能力检测
        if(element.firstElementChild){ // 高级浏览器支持的方式
            return element.firstElementChild;
        }else {
            //低版本的浏览器支持的方式
            var ele = element.firstChild;
            while(ele&&ele.nodeType!=1){
                ele= ele.nextSibling;
            }
            return ele;
        }
    },

    /**
     * 封装了一个兼容版本的获取父元素的最后一个子标签节点函数
     * @param element
     * @returns {*}
     */
    getLastElement:function(element){
        // 能力检测
        if(element.lastElementChild){
            return element.lastElementChild;
        }else {
            var ele = element.lastChild;
            while(ele&&ele.nodeType!=1){
                ele= ele.previousSibling;
            }
            return ele;
        }
    }
}


//封装了一个通过ID号获取对象的函数
function $$(id){
    return document.getElementById(id);
}

/**
 *
 * @param tag //元素==标签名
 * @param obj //相关属性的对象
 * @param fn  函数体 必须传，不传函数给你报错，活该
 */
function animate(tag, obj, fn) {
    clearInterval(tag.timer);
    tag.timer = setInterval(function () {
        var flag = true;
        for (var k in obj) {
            if (k == "opacity") {
                var target = obj[k] * 100;
                //获取结果可能是一个小数
                var leader = getStyle(tag, k) * 100 || 0;
                //缓动运动公式
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                //设置的时候
                tag.style[k] = leader / 100;
            } else if (k == "zIndex") {
                //直接设置层级，不需要渐变
                tag.style.zIndex = obj[k];
            } else {
                //普通的，带单位的样式
                //k - 属性名 - 字符串形式 - attr
                //obj[k] - 属性值 - target
                var target = obj[k];
                var leader = parseInt(getStyle(tag, k)) || 0;
                //缓动运动公式
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                //设置的时候
                tag.style[k] = leader + "px";
            }

            //检测，当前这个属性是否到达了指定位置
            if (leader != target) {
                //阻止清除定时器
                flag = false;
            }
        }

        //我们需要保证obj中每一个obj都运动到位置
        if (flag) {
            clearInterval(tag.timer);
            fn && fn();
            //如果没传undefined
        }
    }, 20);
}

//用于获取某个标签的某个样式属性值
//带单位
function getStyle(tag, attr) {
    //检测支持哪一个
    //box.currentStyle//如果不存在值为undefined
    //getComputedStyle如果浏览器不支持。相当于变量未声明，报错
    if (tag.currentStyle) {
        //ie支持
        return tag.currentStyle[attr];
    } else {
        //标准方法
        return getComputedStyle(tag, null)[attr];
    }
}


/**
 * 封装了一个获得驼峰命名法的函数
 * @param foo
 * @param split
 * @returns {string}
 */
function getNewName(foo,split){
    var arr = foo.split(split);
    for(var i=1;i<arr.length;i++){
        arr[i]= arr[i].charAt(0).toLocaleUpperCase()+arr[i].substr(1,arr[i].length-1);
    }
    return arr.join("");
}

/**
 * 封装了一个获取页面卷曲数据的对象，返回一个对象（包含顶部，和左侧）
 * @returns {{top: number, left: number}}
 */

function myScroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}
/**
 * 封装了一个获得页面可视区域的函数==返回对象使用.的方法获得
 * @returns {{wid: number, heit: number}}
 */
function myClient() {
    return {
        wid: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        heit: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}


/**
 *防止任意事件相互覆盖的额函数
 * @param tag
 * @param eventName  事件名，不需要加on
 * @param fn  事件处理程序
 */
function addEvent(tag, eventName, fn) {
    //2 取出tag的onclick属性值
    var oldEvent = tag["on" + eventName];
    //3 检测oldClick的类型
    if (typeof oldEvent == "function") {
        //说明tag以及添加过点击事件了
        //需要保证新的旧的代码都会执行
        //保证代码执行在点击事件的时候触发
        tag["on" + eventName] = function () {
            oldEvent();
            fn();
        };
    } else {
        //说明以前没添加过点击事件
        tag["on" + eventName] = fn;
    }
}