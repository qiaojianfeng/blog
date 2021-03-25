---
title: 前端小白入门之再学JavaScript (一)
tags:
  - 前端，JavaScript
url: 123.html
id: 123
categories:
  - 大前端
date: 2019-06-22 16:36:40
---

JavaScript（缩写：JS）是一门完备的 动态编程语言。当应用于 HTML 文档时，可为网站提供动态交互特性。由布兰登·艾克（ Brendan Eich，Mozilla 项目、Mozilla 基金会和 Mozilla 公司的联合创始人）发明。 JavaScript 的应用场合极其广泛。简单到幻灯片、照片库、浮动布局和响应按钮点击。复杂到游戏、2D 和 3D 动画、大型数据库驱动程序，等等。 JavaScript 相当简洁，却非常灵活。开发者们基于 JavaScript 核心编写了大量实用工具，可以使 开发工作事半功倍。其中包括：

*   浏览器应用程序接口（API）—— 浏览器内置的 API 提供了丰富的功能，比如：动态创建 HTML 和设置 CSS 样式、从用户的摄像头采集处理视频流、生成3D 图像与音频样本，等等。
*   第三方 API —— 让开发者可以在自己的站点中整合其它内容提供者（Twitter、Facebook 等）提供的功能。
*   第三方框架和库 —— 用来快速构建网站和应用。

\-\-\-\-\-\-\-[https://developer.mozilla.org](https://developer.mozilla.org/) \[MDN\] script标签简单介绍：

    所有浏览器都支持 <script> 标签。
    属性        值
    type       MIME-type   指示脚本的 MIME 类型。    
    async      async       规定异步执行脚本（仅适用于外部脚本）。    
    charset    charset     规定在外部脚本文件中使用的字符编码。    
    defer      defer       规定是否对脚本执行进行延迟，直到页面加载为止。    
    language   script      不赞成使用。规定脚本语言。请使用 type 属性代替它。    
    src        URL         规定外部脚本文件的 URL。    
    xml:space  preserve    规定是否保留代码中的空白。

上面属性简单了解一下就OK，因为html5以后标签的type不是不是必须所以新手的话只需要记住标签写法就可以，如果外链脚本加上src属性就好了。

写下我们第一个JavaScript脚本
===================

听起来是不是很兴奋????，学习js的前提我假设大家已经学习过了html+css后面不再做过多解释哈。 对于我们程序猿来说当然第一个代码就是输出一个hello world。 新建一个index.html，然后输入

    <!DOCTYPE html>
    <html>
        <head>
            <title>我的第一个JavaScript脚本</title>
        </head>
        <body>
            <h1>学习</h1>
            <script>
                document.write("Hello World!")
            </script>
        </body>
    </html>

这样我们一个就完成了万里长征的第一步，很简单是不是 下面我们再尝试一下js的dom（document object model文档对象模型，简单理解有一下可以操作问题的API）操作能力

    <script>
        var title = document.querySelector('titl

        title.innerHtml = '学习JavaScript';
        
    </script>

以上就是一个简单的js开发上手实践，后面文章我们正式学习js基础知识，后面每篇文章大致分为俩部分：基础概念和手写实践。