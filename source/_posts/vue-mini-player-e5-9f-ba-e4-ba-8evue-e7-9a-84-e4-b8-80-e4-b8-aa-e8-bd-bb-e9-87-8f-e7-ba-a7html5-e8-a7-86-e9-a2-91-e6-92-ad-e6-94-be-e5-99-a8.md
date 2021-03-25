---
title: vue-mini-player 基于Vue的一个轻量级HTML5视频播放器
tags:
  - player
  - video-player
  - 开源 GitHub Vue
url: 269.html
id: 269
categories:
  - 大前端
date: 2019-07-26 11:29:57
---

vue-mini-player
===============

> 基于 Vue 的一个轻量级视频播放组件，适配 PC 和移动端

![avatar](https://webweifeng.github.io/vue-mini-player/preview.jpg)

安装
--

    $ npm install vue-mini-player -S
    

使用
--

    # main.js
    import vueMiniPlayer from 'vue-mini-player'
    import 'vue-mini-player/lib/vue-mini-player.css'
    Vue.use(vueMiniPlayer)
    

在项目中使用 vueMiniPlayer

    <template>
      <vueMiniPlayer ref="vueMiniPlayer" :video="video" :mutex="true" @fullscreen="handleFullscreen" />
    </template>
    <script>
      export default {
        data () {
          return {
            video: {
                url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
                cover: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
                muted: false,
                loop: false,
                preload: 'auto',
                poster: '',
                volume: 1,
                autoplay: false
            }
          }
        },
        computed(){
          $video(){
            return this.$refs.vueMiniPlayer.$video;
          }
        },
        methods:{
          handleFullscreen(){
    
          }
        }
      }
    </script>
    

💡 特色
-----

1.轻量级 `HTML5` 播放器，精美 `UI` 控件，简单易上手 `Gzip` 压缩不足 `10k` 2.提供以 `npm` 的形式安装提供全局组件 3.多格式视频配置，移动端+PC 通用模式

*   多类型视频支持
*   自定义海报
*   多平台兼容
*   静音开关
*   播放时间进度
*   全屏支持
*   拖动播放
*   倍速播放
*   MSE 支持
*   弹幕支持

✈️ 参数
-----

名称

默认值

描述

mutex

false

互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器

video

-

视频相关参数

video.url

-

视频播放源，支持 Array 形式传入多种视频格式

video.cover

-

视频海报

video.muted

false

是否静音播放

video.loop

false

视频是否循环播放

video.preload

‘auto’

视频预加载，可选值: ‘none’, ‘metadata’, ‘auto’

video.poster

-

原生视频默认海报暂不设置，只设置 video.cover

video.volume

1

默认音量

video.autoplay

false

视频自动播放

🚀 事件
-----

名称

描述

fullscreen

全屏事件

ready

视频播放器准备好

clearMode

清洁模式执行

videoPlay

播放器执行 play 或者 pause

created

组件生命周期

mounted

组件生命周期

beforeDestroy

组件生命周期

destroyed

组件生命周期

GitHub：[https://github.com/webweifeng/vue-mini-player ](https://github.com/webweifeng/vue-mini-player)