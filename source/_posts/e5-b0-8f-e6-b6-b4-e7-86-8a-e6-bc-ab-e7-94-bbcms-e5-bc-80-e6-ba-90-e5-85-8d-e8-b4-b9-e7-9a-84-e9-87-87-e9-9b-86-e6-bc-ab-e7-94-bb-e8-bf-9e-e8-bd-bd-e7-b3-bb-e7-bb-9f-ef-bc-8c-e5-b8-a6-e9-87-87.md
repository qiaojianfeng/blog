---
title: 小涴熊漫画CMS-开源免费的采集漫画连载系统，带采集API
url: 115.html
id: 115
categories:
  - 精选资源
date: 2019-06-22 15:43:42
tags:
---

源码简介
----

小涴熊漫画CMS，开源免费，基于ThinkPHP 5.1及Redis缓存，自带火车头api方便我们采集发布，功能就不多说了，可以看下面的截图，漫画系统都差不多。作者更新也积极，貌似还计划加入会员系统等其他功能，这里就发一下。

图片预览
----

[![小涴熊漫画CMS-开源免费的采集漫画连载系统，带采集API](https://www.mosq.cn/usr/uploads/sina/5cc3f8bea185f.jpg "小涴熊漫画CMS-开源免费的采集漫画连载系统，带采集API")](https://www.mosq.cn/usr/uploads/sina/5cc3f8bea185f.jpg) [![小涴熊漫画CMS-开源免费的采集漫画连载系统，带采集API](https://www.mosq.cn/usr/uploads/sina/5cc3f8beaecdc.jpg "小涴熊漫画CMS-开源免费的采集漫画连载系统，带采集API")](https://www.mosq.cn/usr/uploads/sina/5cc3f8beaecdc.jpg) [![小涴熊漫画CMS-开源免费的采集漫画连载系统，带采集API](https://www.mosq.cn/usr/uploads/sina/5cc3f8bebad18.jpg "小涴熊漫画CMS-开源免费的采集漫画连载系统，带采集API")](https://www.mosq.cn/usr/uploads/sina/5cc3f8bebad18.jpg) [![小涴熊漫画CMS-开源免费的采集漫画连载系统，带采集API](https://www.mosq.cn/usr/uploads/sina/5cc3f8becdac3.jpg "小涴熊漫画CMS-开源免费的采集漫画连载系统，带采集API")](https://www.mosq.cn/usr/uploads/sina/5cc3f8becdac3.jpg)

安装教程
----

环境要求：PHP 5.6-7.2、MySQL >= 5.7、Redis、Redis扩展 1、安装环境 这里依旧走简单路线，使用宝塔面板做演示，使用命令： CentOS系统

    if (!-e $request_filename) {    
          rewrite  ^(.*)$  /index.php?s=/$1  last;    
          break;    
        }

然后打开域名开始安装程序。 如果要开启404，而不让cms报错信息显示出来，需要修改config/app.php文件： 去掉第一排的//即可

    ‘exception_tmpl’         => Env::get(‘app_path’) . ‘index/view/pub/404.html’,  
    ‘exception_tmpl’         => Env::get(‘think_path’) . ‘tpl/think_exception.tpl’,

采集
--

通常情况下，漫画站图片资源分两种，一种本地化，一种盗链方式，这里建议将图片本地化，这样能保证网站资源稳定性，并且该程序还提供了火车头采集器的API，能够很简单的对接火车头采集器进行漫画和章节图片的采集。 首先我们需要一个火车采集器，官网→传送门，不过分为免费版和收费版，但免费版由于某些功能限制，没法满足图片本地化需求，所以暂时不适用，如果你有钱可以买一个收费版的，不过没钱也没事，可以直接使用火车头企业破解版，大概目前最新的一个破解版，也可以满足该程序的采集需求，具体怎么下载，就自行百度，很多网站提供下载链接。 注意：由于火车头V7和V8没有url编码解码功能，所以不能采集带有中文链接的漫画网站，但V9版本可以，有钱可以直接上。 采集api说明： 采集api地址：域名/api/index/save。 请求方式：post 表单字段及说明： book\_name 漫画名 nick\_name 漫画别名 tags 分类，多个分类用|隔开 author 作者名字 src 采集源 end 状态，1代表完结，0代表连载中 cover\_url 封面图远程地址 chapter\_name 章节名 images 由图片标签组成的字符串，示例：

    <img src=“http://www.m.com/1.jpg”>
    <img src=“http://www.m.com/2.jpg”>
    <img src=“http://www.m.com/3.jpg”>

api_key 用于身份验证，要和后台配置的api密钥相同 summary 漫画简介 由于采集过程有点复杂，不是很好发，所以有兴趣且不会采集的可以看下官方的使用教程[→传送门](https://www.kancloud.cn/hiliqi/xwx_comic_cms/962155)，大致步骤就是打开火车头采集器主界面-发布-新建-内容发布参数，然后发布模块编写完之后，开始找目标站并写采集规则，最后采集发布即可。 Github地址：[https://github.com/hiliqi/xiaohuanxiong](https://github.com/hiliqi/xiaohuanxiong)