---
title: 初窥React-Native
comments: true
description: 初窥React-Native
keywords: 前端,react-native
toc: true
toc_number:
aside:
categories: 大前端
cover: https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.shevip.cn%2F201612211636316223.png&refer=http%3A%2F%2Fcdn.shevip.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619858956&t=b70273a6c0b1afc51abd9150cc9c9fa8
top_img: https://www.pxcodes.com/d/file/381123cdda562539beb7b05fbfbe62d5.jpg
date: 2021-04-02
updated: 2021-04-02
tags: 前端,React,React-Native
---

# React Native 简述

Facebook 在 2015 年就开源了 React Native,目前仍然一直再维护和使用中，核心为使用 `React`技术栈 来创建 `Android` 和 `iOS` 的原生应用，将 React 基础抽象组件渲染为原生平台 UI 组件

React Native 采用了 JavaScriptCore 作为 JS VM，中间通过 JSON 文件与 Bridge 进行通信,其实也是 Hybrid 的一种

流程：React => JavaScriptCore => Native

中间层涉及到的

- Fabric：React Native 的 UI 层重构
- TurboModules：与 React Native Modules 相关，基于 JSI
- JSI：JavaScript 与 Java/ObjeC/C++ 相互调用的一种机制

### 优势

- 热重载

  热重载允许开发人员将新代码直接注入正在运行的应用程序中，从而加快了开发过程。因此，开发人员可以立即看到更改，而无需重建应用程序。 热重载还[保留了应用程序的状态]，避免了在完全重载期间丢失它的风险（在基于状态的框架中这是一项关键优势），从而进一步加快了应用程序的开发速度。

- 一个代码库，两个移动平台（以及更多 WEB,TV,Windows）

  编写单个代码库为 2 个应用程序提供动力-涵盖 Android 和 iOS 平台。 更妙的是，JavaScript 通过与 Web 应用程序共享代码，在编写跨平台应用程序时为您提供了帮助。这是通过创建可编译为目标平台的抽象组件来完成的。

- 相对成熟度

  官方的 React Native 版本是 2015 年前发布的，因此 Facebook 团队有足够的时间来稳定 API，并专注于解决问题和解决问题。

- 活跃社区

  React Native 有庞大的开发者社区。

- 统一的 react 技术栈

# 环境搭建

下面以 macOs 为例子，window，Linux 类似查看相关文档[传送门](https://reactnative.cn/docs/environment-setup)

> 在开始环境搭建前建议用 2 分钟简要浏览本 ReactGuide 第一章节[《基础开发环境》](http://wiki.bigeye.top/document/index?document_id=136 '《基础开发环境》')

### 开发 Android

必须安装的依赖有：Node、JDK 和 Android Studio。

> 强烈建议使用 nvm 管理 node。Homebrew 和 nvm 的安装使用请看[这里](http://wiki.bigeye.top/document/index?document_id=136 '这里')

```bash
# Homebrew
brew install node # 安装node
brew install watchman # 安装watchman
brew cask install adoptopenjdk/openjdk/adoptopenjdk8 # 安装JDK 暂不支持 1.9 及更高版本，注意 1.8 版本官方也直接称 8 版本
```

安装 Android Studio [传送门](https://developer.android.google.cn/studio/)

安装界面中选择"Custom"选项，确保选中了以下几项：

- Android SDK

- Android SDK Platform

- Android Virtual Device

### 开发 iOS

必须安装的依赖有：Node、Watchman、Xcode 和 CocoaPods。

> 强烈建议使用 nvm 管理 node。Homebrew 和 nvm 的安装使用请看[这里](http://wiki.bigeye.top/document/index?document_id=136 '这里')

```bash
# Homebrew
brew install node # 安装node
brew install watchman # 安装watchman
brew install cocoapods #  CocoaPods是用 Ruby 编写的包管理器（可以理解为针对 iOS 的 npm）用来管理依赖
```

安装 Xcode (去 App Store 或者 [Apple 开发者官网](https://developer.apple.com/xcode/downloads/))

> 注：新版 Xcode 需要更新 macOS 版本

# 创建项目

```bash
npx react-native init myapp # npm 从5.2版开始，增加了 npx 命令,主要用来调用项目内部安装的模块

cd myapp
yarn ios
# 或者
yarn react-native run-ios
```

运行 `yarn ios`会对项目的原生部分进行编译，同时在另外一个命令行中启动 Metro 服务对 js 代码进行实时打包处理（类似 webpack）。Metro 服务也可以使用 yarn start 命令单独启动。

metro 是一种支持 ReactNative 的打包工具

> 注：如果长时间无响应建议切换 npm 下载源 `npm config set registry http://registry.npm.taobao.org/` 如果切换完下载源仍然无法响应可以先下载 `react-native` 再执行 `react-native init AwesomeProject`

# 目录结构（个人暂定）

- src (开发统一源码目录)
  - api ( HTTP 接口，网络请求服务相关 )
  - components (组件类)
  - views (视图类)
  - utils (基础工具类)
  - assets (资源类)
  - router (路由类包含 tabbar，抽屉等)
  - index.js (程序入口)
  - Splash.js （闪屏）

# react native 规则

- 不管组件中是否用到 react 都必须引入，否则会报错。

```javascript
import React from 'react';
```

- 当我们开发时，需要调用的原生组件都是通过 react-native 引入。
- 其他使用基本同 React 和 JSX 语法一样。

# 常用组件

- View： 属于容器组件。只能用于组件嵌套。
- Text： 文本必须写在 Text,否则报错。会自动换行。设置行数（numberOflines = {3}）更多功能 请查找 API.
- Image: 凡是 uri: 加载必须设置高度和宽度。
- ImageBackground 作为背景图片。可以作为容器。
- Textinput 边框必须设置宽度不然没有颜色。multiline 多行输入。
- 一般用 TouchableOpacity 进行封装按钮 Button 在 IOS 是白色。
- ScrollView 组件滚动视图 水平方向 horizontal：true; 滚动, 数据多的话滚动会卡顿。
- FlatList 适合做滚动列表。它里面根据 key 做优化了，做了重用机制，优化性能。
- 官方推荐使用 fetch 来获取数据。我们也可以用 axios 来获取。

# Style

RN 布局统一采用 flex ，[传送门](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

样式名基本上是遵循了 web 上的 CSS 的命名，只是按照 JS 的语法要求使用了驼峰命名法，例如将 background-color 改为 backgroundColor。 样式可以写成内联样式,也可以通过一个变量接收 StyleSheet.create({....})来创建你想要的样式。单位的话不需要加，直接写数字，表示的是与设备像素密度无关的逻辑像素点,通过下面方法可以取到相关尺寸。

```js
import { Dimensions, StatusBar, PixelRatio } from 'react-native';
// PixelRatio：可以获取到设备的像素密度和字体缩放比。
// Dimensions:  来获取设备的宽高
// StatusBar:控制应用状态栏的组件,可以获取相关尺寸
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
```

[文档参考](https://github.com/doyoe/react-native-stylesheet-guide)

# 关于静态图片资源

目前原生支持的图片格式有 png、jpg、jpeg、bmp、gif、webp (仅 Android)、psd (仅 iOS)。

可以使用@2x，@3x 这样的文件名后缀，来为不同的屏幕精度提供图片,Packager 会打包所有的图片并且依据屏幕精度提供对应的资源

默认情况下 Android 是不支持 GIF 和 WebP 格式的。你需要在 android/app/build.gradle 文件中根据需要手动添加以下模块：

```js
dependencies {
  // 如果你需要支持Android4.0(API level 14)之前的版本
  implementation 'com.facebook.fresco:animated-base-support:1.3.0'

  // 如果你需要支持GIF动图
  implementation 'com.facebook.fresco:animated-gif:2.0.0'

  // 如果你需要支持WebP格式，包括WebP动图
  implementation 'com.facebook.fresco:animated-webp:2.1.0'
  implementation 'com.facebook.fresco:webpsupport:2.0.0'

  // 如果只需要支持WebP格式而不需要动图
  implementation 'com.facebook.fresco:webpsupport:2.0.0'
}
```

```jsx
<Image source={require('./my-icon.png')} />
<Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
```

# React Native 0.60 Autolinking(第三方库使用)

旧版第三方依赖库是需要执行 `react-native link` 来关联原生程序，新版 0.6 以后统一使用 `cd ios && pod install && cd ..`

有了 `autolinking` 特性后，我们不需要再手动执行 `link` 命令来链接原生库。但是在 `ios` 平台上，我们需要使用 `pod install` 命令来安装原生依赖。也就是说，在安卓平台上，RN 会自动帮我们处理原生依赖，ios 则使用了 pod 来管理。

# 网络请求

React Native 推荐使用 `fetch`，当然也支持 xhr ，和 axios 库

[fetch 文档](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

支持 WebSocket

# 路由

```bash
yarn add @react-navigation/native
```

文档地址：https://reactnavigation.org/

# 多环境配置

```bash
yarn add react-native-config
```

> 开发 iOS 记得执行上面 cd ios && pod install 关联程序根目录配置文件：

- .env.development（开发）
- .env.release（测试）
- .env.production（生产）

  [参考教程](https://www.dazhuanlan.com/2019/12/27/5e059d94b0a42/)

```js
import Config from 'react-native-config
// Config 对象即为根配置环境参数
```

# 开发调试

React Developer Tools

```bash
npm install -g react-devtools
export ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/" # 环境变量中添加 electron 专用的国内镜像源
```

> react-devtools 依赖于 electron，而 electron 需要到国外服务器下载二进制包，然后再尝试安装 react-devtools。

安装完成后在命令行中执行 react-devtools 即可启动此工具：

```bash
react-devtools
```

# 构建 APP
