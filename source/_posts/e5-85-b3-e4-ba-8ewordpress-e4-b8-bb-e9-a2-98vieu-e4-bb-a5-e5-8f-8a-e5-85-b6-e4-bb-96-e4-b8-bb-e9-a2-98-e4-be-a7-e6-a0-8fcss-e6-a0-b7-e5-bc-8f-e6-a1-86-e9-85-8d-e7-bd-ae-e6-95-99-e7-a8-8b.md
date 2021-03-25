---
title: 关于Wordpress主题Vieu以及其他主题侧栏css样式框配置教程
url: 341.html
id: 341
categories:
  - 杂谈
date: 2019-08-29 12:43:27
tags:
---

目前我用的也是 vieu 主题，后台配置起来比较方便。之前看到有的朋友对下面 👇 这个侧栏样式框感兴趣又不知道该如何添加，今天也就帮大家弄一个简单教程，会技术的绕道 😆 ![](https://www.v5ant.com/wp-content/uploads/2019/08/WX20190829-123259@2x.png)

## 第一步：复制结构代码

下面代码为一条，复制多个即多条自行配置（代码中‘zhan-link-z1’，z1,z2 这些类推对应不同颜色样式） 复制以下代码到主题设置-》小工具-》自定义 HTML，这个小工具添加到需要的页面 <span class="zhan-widget-link zhan-link-z1"> <span class="zhan-widget-link-count">一个低调的个人影院</span> <a href="https://imov.vip/" target="_blank" rel="noopener noreferrer"> <span class="zhan-widget-link-title">蚂蚁影院</span> </a> </span>

## 第二步：复制 css 样式代码

复制以下代码到主题设置-》自定义代码-》自定义 css 样式

.zhan-widget-link {
position:relative;
margin-bottom:10px;
position:relative;
display:block;
font-size:13px;
background:#fff;
color:#525252;
line-height:40px;
padding:0 14px;
border:1px solid #DDD;
border-radius:2px
}
.zhan-widget-link-count i {
margin-right:9px;
font-size:17px;
vertical-align:middle
}
.zhan-widget-link-title {
position:absolute;
top:-1px;
right:-1px;
bottom:-1px;
width:100px;
text-align:center;
background:rgba(255,255,255,.08);
transition:width .3s;
border-radius:0 3px 3px 0
}
.zhan-widget-link:hover .zhan-widget-link-title {
width:116px
}
.zhan-widget-link a {
position:absolute;
top:0;
left:0;
right:0;
bottom:0
}
.zhan-link-z1 {
border-color:rgba(236,61,81,.39)
}
.zhan-link-z1 i {
color:#FFF;
margin-right:3px
}
.zhan-link-z1 .zhan-widget-link-title {
background-color:#ec3d51;
color:#fff
}
.zhan-link-z2 {
border-color:rgba(18,170,232,.39)
}
.zhan-link-z2 i {
color:#FFF;
margin-right:3px
}
.zhan-link-z2 .zhan-widget-link-title {
background-color:#12aae8;
color:#fff
}
.zhan-link-z3 {
border-color:rgba(221,7,208,.39)
}
.zhan-link-z3 i {
color:#FFF;
margin-right:3px
}
.zhan-link-z3 .zhan-widget-link-title {
background-color:#dd07d0;
color:#fff
}
.zhan-link-z4 {
border-color:rgba(249,82,16,.39)
}
.zhan-link-z4 i {
color:#FFF;
margin-right:3px
}
.zhan-link-z4 .zhan-widget-link-title {
background-color:#f95210;
color:#fff
}
.zhan-link-z5 {
border-color:rgba(25,152,114,.39)
}
.zhan-link-z5 i {
color:#FFF;
margin-right:3px
}
.zhan-link-z5 .zhan-widget-link-title {
background-color:#199872;
color:#fff
}

# 搞定！

是不是很简单呢，赶紧搞起来。
