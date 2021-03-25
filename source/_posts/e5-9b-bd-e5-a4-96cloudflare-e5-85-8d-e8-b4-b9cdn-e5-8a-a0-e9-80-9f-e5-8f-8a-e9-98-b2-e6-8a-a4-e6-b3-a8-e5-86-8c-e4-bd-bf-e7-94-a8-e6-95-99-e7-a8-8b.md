---
title: 国外CloudFlare免费CDN加速及防护注册使用教程
tags:
  - CDN
url: 291.html
id: 291
categories:
  - 服务端
date: 2019-08-14 15:59:18
---

国内也有很多免费 CDN 工具，都是需要网站备案后才能使用。网站没有备案的站长可以选择使用国外 CDN 工具，操作起来也没有我们想象的那么麻烦。 cloudflare 是一款免费的 CDN 工具，CloudFlare 可以帮助受保护站点抵御包括拒绝服务攻击(DenialofService)在内的大多数网络攻击，确保该网站长期在线，同时提升网站的性能、访问速度以改善访客体验。 这个教程教大家怎么简单注册和使用 cloudflare。 **1，注册登录 cloudflare 这里都是英文界面，但是不难读懂** ![国外免费CDN加速及防护:CloudFlare注册使用教程 主机 网站安全 网站运营 站长 建站教程 第1张](https://images.lusongsong.com/upload/1492-1.jpg '国外免费CDN加速及防护:CloudFlare注册使用教程 主机 网站安全 网站运营 站长 建站教程 第1张') cloudflare 注册教程 **2，"add websites"添加网站域名，这里不要带 www** ![国外免费CDN加速及防护:CloudFlare注册使用教程 主机 网站安全 网站运营 站长 建站教程 第2张](https://images.lusongsong.com/upload/1492-2.jpg '国外免费CDN加速及防护:CloudFlare注册使用教程 主机 网站安全 网站运营 站长 建站教程 第2张') **3, cloudflare 扫描网站后或自动扫描出 dns 解析条目，可以再额外增加和删除解析。嫌麻烦的就直接点击"continue"** ![国外免费CDN加速及防护:CloudFlare注册使用教程 主机 网站安全 网站运营 站长 建站教程 第3张](https://images.lusongsong.com/upload/1492-3.jpg '国外免费CDN加速及防护:CloudFlare注册使用教程 主机 网站安全 网站运营 站长 建站教程 第3张') **4，选择"free plan"，使用免费版本的 cloudflare** ![国外免费CDN加速及防护:CloudFlare注册使用教程 主机 网站安全 网站运营 站长 建站教程 第4张](https://images.lusongsong.com/upload/1492-4.jpg '国外免费CDN加速及防护:CloudFlare注册使用教程 主机 网站安全 网站运营 站长 建站教程 第4张') **5，修改 dns 服务**器 ![国外免费CDN加速及防护:CloudFlare注册使用教程 主机 网站安全 网站运营 站长 建站教程 第5张](https://images.lusongsong.com/upload/1492-5.jpg '国外免费CDN加速及防护:CloudFlare注册使用教程 主机 网站安全 网站运营 站长 建站教程 第5张') 如我现在使用的是万网域名，我的域名解析服务器是"dns9.hichina.com",现在需要将服务器修改为 cloudflare 服务器。 需要到[万网后台去修改](https://lusongsong.com/blog/post/305.html)，这里需要注意的是：不是增加或者修改解析条目，而是修改解析服务器。所以在万网后台选择的是"管理"而不是"解析" ![国外免费CDN加速及防护:CloudFlare注册使用教程 主机 网站安全 网站运营 站长 建站教程 第6张](https://images.lusongsong.com/upload/1492-6.jpg '国外免费CDN加速及防护:CloudFlare注册使用教程 主机 网站安全 网站运营 站长 建站教程 第6张') ![国外免费CDN加速及防护:CloudFlare注册使用教程 主机 网站安全 网站运营 站长 建站教程 第7张](https://images.lusongsong.com/upload/1492-7.jpg '国外免费CDN加速及防护:CloudFlare注册使用教程 主机 网站安全 网站运营 站长 建站教程 第7张') **6，cloudflare 域名解析服务器** 修改解析服务器后大约需要几分钟就能生效。 解析成功后，会显示"status:active" 据网站行业权威人士数据，世界上 90%以上的网站很容易遭受攻击。我们小站更是轻而易举的就会被黑，未雨绸缪防范于未然是每个站长必须考虑的事情，除非你不想把网站做大做强做持久。cloudflare 防止攻击的一个方式就是隐藏网站真实 ip 地址。 在安装 cloudflare 以后仍然遭受攻击，页面经常会出现 508 错误，一个很大的原因就是网站 ip 已经暴露。 这里提醒下大家，如果你网站未做任何防护请行动起来，如果你也要使用 cloudflare，，请先安装软件后再更换服务器，而不是更换服务器后再安装防护软件。也只有做好了防范工作，我们的网站才能长治久安。 原文地址：https://lusongsong.com/reed/1492.html
