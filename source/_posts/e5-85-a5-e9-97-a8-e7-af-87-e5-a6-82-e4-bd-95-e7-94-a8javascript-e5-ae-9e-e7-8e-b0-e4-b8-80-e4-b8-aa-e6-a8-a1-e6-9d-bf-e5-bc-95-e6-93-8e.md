---
title: 入门篇-如何用javascript实现一个模板引擎
url: 139.html
id: 139
categories:
  - 大前端
date: 2019-06-22 17:03:15
tags:
---

模板引擎简介
======

模板引擎是html渲染必不可少的工具，前端开发的同学经历了从最原始的字符串拼接、用数组push/join，发展到封装简单的string.format函数，再到功能更加强大的模板引擎，可以在模板中内嵌处理逻辑。 传统的页面开发语言技术asp.net,php,jsp都内置了模板引擎，javascrip常见的模板引擎有jquery的tmpl插件，underscore的template函数，ejs、jade、artTemplate等,以ejs为例，模板语法如下：

    function render(tpl,data){     
        tpl=tpl.replace(/(\r|\n)/ig,"");     
        var arr=tpl.split(/(\<%=?|%\>)/gm);//拆分模板     
        var funcBody=["with(this){\r\nvar result=[];"];     
        var item,codeType;     
        codeType=0;     
        for(var i=0;i<arr.length;i++){         
            item=arr[i];         //将代码片段分为3类         
            if(item=="<%"){            
                codeType=1;           
                continue;         
            }else if(item=="<%="){            
                codeType=2;            
                continue;         
            }else if(item=="%>"){             
                codeType=0;             
                continue;         
           }          //为3类代码片段生成最终可被eval的函数体         
           if(codeType==0){ //字符             
               funcBody.push("result.push(\"");             
               funcBody.push(item);             
               funcBody.push("\");\r\n");         
           }else if(codeType==1){ //代码             
               funcBody.push(item);             
               funcBody.push("\r\n");         
           }else if (codeType==2){ //代码输出             
               funcBody.push("result.push(");             
               funcBody.push(item);             
               funcBody.push(");\r\n");         
           }     
       }     
       funcBody.push("return result.join('')\r\n}");     
       var template_func=new Function(["renderData"],funcBody.join(""));     
       return template_func.apply(data,[data]);  
    }

测试一下

    var html=render("<% list.forEach(function (item,idx){ %>" +" <div><%=idx+1+
    '、'+item%></div>" +" <%})%>", {list:["javascript","css","node.js"]}) 
    document.write(html)

完美运行 ![WX20190506-153145@2x.png](http://cdn.v5ant.com/ueditor/images/1125301559559852032.png "undefined") 我们来看一下最终编译后生成的函数是什么样子的，如下图： ![WX20190506-153048@2x.png](http://cdn.v5ant.com/ueditor/images/1125301346816364544.png "undefined") 由于生成的函数是用apply调用的，template_inner.apply(data,\[data\]),所以函数内部的this指向传入的数据源(data变量)，因此可以在模板中直接使用传入的数据源对象

模板引擎与ES6模板字符串对比
===============

ES6新增了模板字符串功能，不同于普通字符串的单引号和双引号，模板字符用`符号定义，在模板字符中直接可以通过${变量名}访问当前作用域内的变量并直接输出该变量的值，并且在js文件中定义大段的html字符串时，一般是把html片段粘帖进来，包含很多换行符，而模板字符串可以直接兼容换行符，使用起来非常方便。上文中的模板，用ES6的模板字符串来实现，代码也非常精简，如下：

    var user={name:"windy"}; 
    var str=`<h2>${user.name}</h2>`

ES6模板字符串与普通的模板引擎相比，最大区别在于开发流程的不同，业务逻辑是在js中实现的，模板只实现纯净的变量替换功能，代码与逻辑分离，比较规范易用，可维护也较好，而普通的模板引擎不仅实现了变量替换，还可以内嵌js逻辑代码，更加灵活和强大。