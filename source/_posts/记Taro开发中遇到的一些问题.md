---
title: 记Taro开发中遇到的一些问题
comments: true
description: 记录入门Taro开发中遇到的一些问题，解决方案等
keywords: 前端,Taro，小程序，H5
toc: true
toc_number:
aside:
categories: 大前端
cover:   
top_img:  
date: 2021-09-01
updated: 2021-09-01
tags: 前端,Taro, 小程序
---

# 关于 H5 端常见问题与解决方案

版本 v3.2.8

## API 部分

- Taro.switchTab

  > 官方定义：跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面,实际使用:并未关闭其他已经打开过的非 tabBar 页面

- Taro.reLaunch

  > 官方定义：关闭所有页面，打开到应用内的某个页面 实际使用：没有关闭所有页面，只关闭所有非 tabbar 页面

  > 由于 switchTab 未能关闭非 tabbar 页面导致经常出现多页面共存 bug，样式混乱，所以开发中 h5 端使用 reLaunch 代替 switchTab

- Taro.getCurrentPages

  > getCurrentPages().router 有时候获取不到页面参数，使用 useRouter 代替

- Taro.pageScrollTo

  > 调用无响应,多半是调用时机过早，加个定时器延时就可以

- Taro.previewImage

  > 官方定义： 在新页面中全屏预览图片。实际使用 h5 并没有在新页面打开预览，只是以弹窗形式预览

  > 产品如果需要点击物理返回或者浏览器返回无法返回当前页面，h5 端目前解决方案是以页面的形式重写 previewImage

- Taro.showToast

  > toast 提示框在 iOS 设备中位置有问题，会被软键盘遮挡，暂时解决方案如下:

  ```scss
  .taro__toast > div {
    top: 40% !important;
  }
  ```

- enablePullDownRefresh

> 开启页面级下拉模式 和 Swiper 组件有冲突，会导致页面疯狂抖动，上滑再下拉容易导致下拉失效无法恢复

## 组件 部分

- Swiper

  > 设置 circular 属性 轮播模式会引起页面滑动抖动，和 指示器数字异常，目前处理结果就是 h5 禁用该模式

- ScrollView

  > 部分 iOS 设备滚动僵硬，解决方案如下：

  ```scss
  .taro-scroll-view__scroll-y {
    -webkit-overflow-scrolling: touch;
  }
  ```

- Input

  > 设置了 value 属性后 在 h5 端英文九宫格输入法输入出现 bug,表现为连续点击莫名其妙删除内容 ，解决方案为通过直接操作 dom 的方式进行 value 的设置与清空

  > inpu[type='passwword'] 当设置为密码模式获取焦点页面位置未知错误，反正就是尽量避免使用这个模式吧

## 关于页面结构

> taro h5 页面级滚动是多页面公用父级滚动（示意结构如下），意味着从列表跳转详情页面再返回列表页面无法记录之前列表滚动位置，解决方案是使用 ScrollView 组件代替页面滚动

```html
<div id="app" class="taro_router">
  <!-- 这层空的div不知道他什么作用 -->
  <div>
    <div id="/pages/goods/detail/index?ids=123" class="taro_page" style="display: none;"></div>
    <div id="/pages/home/index" class="taro_page" style="display: block;"></div>
    <!-- ....页面依次类似 -->
  </div>
</div>
```

- 页面设置 `height: 100%` 高度无效？

  > 由于结构上有一层空 div 默认父级高度为 0%所以继承到的高度也是 0，解决方案：设置 100Vh

- css 样式中 calc() 函数不生效?

  > calc 属于 css3 规范中的属性，在实际使用中 iOS 6.1+ ，android 5.0+ 所以低版本不兼容，谨慎使用。 解决方案：使用 js 去计算
