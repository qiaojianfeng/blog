/**
 * Created by Administrator on 2016/11/22.
 */

//��װ��һ����ȡԪ���ı����������ı������ԵĶ���

var Txt = {
    /**
     * ������һ��û�м����ԵĻ�ȡ��ǩ���ݵĺ���
     * @param element
     * @returns {*}
     */
    getText:function(element){
        // �������   ����Ҫ����ǰ����������Ƿ�֧�ִ˶�������Ի��Ƿ���
//        var b = typeof element.innerText;
        if(typeof element.innerText=="string"){
            return    element.innerText;
        }else {
            return   element.textContent; // �Ͱ汾�Ļ�������֧��
        }
    },
    /**
     * ������һ��û�м����Ե����ñ�ǩ���ݵĺ���
     * @param element
     * @param value
     */
    setText:function(element,value){
        if(typeof element.innerText=="string"){
            element.innerText = value; //IE8��֮ǰ�ĵͰ汾�������
        }else {
            element.textContent = value;//�Ͱ汾�Ļ�������
        }
    }
}


//��װ��һ����ȡԪ�ؽڵ㷽���Ķ���
var ele = {
    /**
     * ��װ��һ�������԰汾�Ļ�ȡ��һ�����ڵı�ǩ�ڵ�ĺ���
     * @param element
     * @returns {*}
     */
    getNextElement:function(element){
        // �������  ����Ҫ����ǰ��������Ƿ�֧�ִ˶�������Ի��Ƿ���
        if(element.nextElementSibling) {
            return element.nextElementSibling;//�߼������֧�ֵķ�ʽ
        }else { // ��IE8��֮ǰ�ĵͰ汾�������֧�ֵķ�ʽ
            var ele = element.nextSibling;
            while(ele&&ele.nodeType!=1){ // ÿһ�������Ǳ�֤�������ʵ�棬����undefined����һ����������ڵ㲻�Ǳ�ǩ
                ele =  ele.nextSibling; //�����ڵ�ǰ��ǩ����������
            }
            return ele;
        }
    },
    /**
     * ��װ��һ�����ݰ汾�Ļ�ȡ��һ����ǩ�ڵ�ĺ���
     * @param element
     * @returns {*}
     */
    getPreviousElement:function(element){
        // �������
        if(element.previousElementSibling){
            return element.previousElementSibling; // �߼������֧�ֵĻ�ȡ��ǰ��ǩ����һ����ǩ�ڵ�
        }else {
            var ele = element.previousSibling;
            while(ele&&ele.nodeType!=1){
                ele=  ele.previousSibling;
            }
            return ele;
        }
    },
    /**
     * ��װ��һ�����ݰ汾�Ļ�õ�һ���ӱ�ǩ�ڵ�ĺ���
     * @param element
     * @returns {element}
     */
    getFirstElement:function(element){
        // �������
        if(element.firstElementChild){ // �߼������֧�ֵķ�ʽ
            return element.firstElementChild;
        }else {
            //�Ͱ汾�������֧�ֵķ�ʽ
            var ele = element.firstChild;
            while(ele&&ele.nodeType!=1){
                ele= ele.nextSibling;
            }
            return ele;
        }
    },

    /**
     * ��װ��һ�����ݰ汾�Ļ�ȡ��Ԫ�ص����һ���ӱ�ǩ�ڵ㺯��
     * @param element
     * @returns {*}
     */
    getLastElement:function(element){
        // �������
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


//��װ��һ��ͨ��ID�Ż�ȡ����ĺ���
function $$(id){
    return document.getElementById(id);
}

/**
 *
 * @param tag //Ԫ��==��ǩ��
 * @param obj //������ԵĶ���
 * @param fn  ������ ���봫�������������㱨�����
 */
function animate(tag, obj, fn) {
    clearInterval(tag.timer);
    tag.timer = setInterval(function () {
        var flag = true;
        for (var k in obj) {
            if (k == "opacity") {
                var target = obj[k] * 100;
                //��ȡ���������һ��С��
                var leader = getStyle(tag, k) * 100 || 0;
                //�����˶���ʽ
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                //���õ�ʱ��
                tag.style[k] = leader / 100;
            } else if (k == "zIndex") {
                //ֱ�����ò㼶������Ҫ����
                tag.style.zIndex = obj[k];
            } else {
                //��ͨ�ģ�����λ����ʽ
                //k - ������ - �ַ�����ʽ - attr
                //obj[k] - ����ֵ - target
                var target = obj[k];
                var leader = parseInt(getStyle(tag, k)) || 0;
                //�����˶���ʽ
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                //���õ�ʱ��
                tag.style[k] = leader + "px";
            }

            //��⣬��ǰ��������Ƿ񵽴���ָ��λ��
            if (leader != target) {
                //��ֹ�����ʱ��
                flag = false;
            }
        }

        //������Ҫ��֤obj��ÿһ��obj���˶���λ��
        if (flag) {
            clearInterval(tag.timer);
            fn && fn();
            //���û��undefined
        }
    }, 20);
}

//���ڻ�ȡĳ����ǩ��ĳ����ʽ����ֵ
//����λ
function getStyle(tag, attr) {
    //���֧����һ��
    //box.currentStyle//���������ֵΪundefined
    //getComputedStyle����������֧�֡��൱�ڱ���δ����������
    if (tag.currentStyle) {
        //ie֧��
        return tag.currentStyle[attr];
    } else {
        //��׼����
        return getComputedStyle(tag, null)[attr];
    }
}


/**
 * ��װ��һ������շ��������ĺ���
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
 * ��װ��һ����ȡҳ��������ݵĶ��󣬷���һ�����󣨰�������������ࣩ
 * @returns {{top: number, left: number}}
 */

function myScroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}
/**
 * ��װ��һ�����ҳ���������ĺ���==���ض���ʹ��.�ķ������
 * @returns {{wid: number, heit: number}}
 */
function myClient() {
    return {
        wid: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        heit: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}


/**
 *��ֹ�����¼��໥���ǵĶ��
 * @param tag
 * @param eventName  �¼���������Ҫ��on
 * @param fn  �¼��������
 */
function addEvent(tag, eventName, fn) {
    //2 ȡ��tag��onclick����ֵ
    var oldEvent = tag["on" + eventName];
    //3 ���oldClick������
    if (typeof oldEvent == "function") {
        //˵��tag�Լ���ӹ�����¼���
        //��Ҫ��֤�µľɵĴ��붼��ִ��
        //��֤����ִ���ڵ���¼���ʱ�򴥷�
        tag["on" + eventName] = function () {
            oldEvent();
            fn();
        };
    } else {
        //˵����ǰû��ӹ�����¼�
        tag["on" + eventName] = fn;
    }
}