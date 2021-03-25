---
title: 如何何纯代码为WordPress文章页添加面包屑导航
url: 1.html
id: 1
categories:
  - 杂谈
date: 2019-06-20 07:15:17
tags:
---

如何纯代码为 WordPress 文章页添加面包屑导航，我们主要通过修改主题 functions.php、single.php、main.css 三个文件来实现。

以下方法转自@蝈蝈要安静。注意以下并非本站所用的面包屑，无法于本站一样，但基本原理相同，经供参考

## 一、修改 functions.php

首先在自己的主题文件中找到 functions.php，并在文件中添加下面代码。

//面包屑导航生成函数
function qgg_breadcrumbs(){
if( !is_single() ) return false; $categorys = get\_the\_category(); $category = $categorys\[0\];
 return '当前位置：<a href="'.get_bloginfo('url').'">'.get_bloginfo('name').'</a> <small>></small> '.get\_category\_parents($category->term_id, true, ' <small>></small> ').get_the_title();
}

## 二、修改 single.php

这里是把面包屑导航显示到文章页面，所以我们第二步是修改主题 single.php 文件，把下面代码加到自己想显示的位置即可。
这里是把面包屑导航显示到文章页面，所以我们第二步是修改主题 single.php 文件，把下面代码加到自己想显示的位置即可。

<!\-\- 面包屑导航前端显示代码 -->

<div class="breadcrumbs">
 <div class="container"><?php echo qgg_breadcrumbs() ?></div>
</div>

如果是想显示到文章内容页面的导航栏下，请把上面代码添加到“<?php get_header(); ?>”下即可。
![纯代码为WordPress文章页添加面包屑导航](http://img.viapi.cn/wp/uploads/2018/04/20180405083159.jpg '纯代码为WordPress文章页添加面包屑导航')

## 三、添加样式代码

完成上面两个步骤后，清理下浏览器缓存，我们就可以看到正常显示面包屑导航了，但是不美观。所以我们还需进行添加显示样式代码步骤。一般得人主题是把下面这段代码添加到 style.css 文件，DUX 主题是添加到 main.css 文件。

```css
.breadcrumbs {
  padding: 15px 0;
  font-size: 12px;
  line-height: 1;
  text-align: left;
  background-color: #fff;
  margin-bottom: 15px;
  margin-top: -15px;
  border-bottom: 1px solid #ebebeb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  color: #999;
}
.breadcrumbs small {
  font-size: 12px;
  font-family: serif;
  color: #bbb;
  margin: 0 2px;
  font-weight: bold;
}
.breadcrumbs a {
  color: #999;
}
.breadcrumbs a:hover {
  color: #666;
}
@media (max-width: 640px) {
  .breadcrumbs {
    margin-top: 1px;
    margin-bottom: 0;
    padding: 10px 15px;
    border-bottom: none;
    margin-bottom: 1px;
  }
}
```
