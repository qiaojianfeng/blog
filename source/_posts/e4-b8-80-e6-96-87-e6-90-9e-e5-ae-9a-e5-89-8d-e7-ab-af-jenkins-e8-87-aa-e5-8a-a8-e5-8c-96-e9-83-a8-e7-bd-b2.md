---
title: 一文搞定前端 Jenkins 自动化部署
tags:
  - JavaScript
  - 前端
url: 369.html
id: 369
categories:
  - 大前端
date: 2019-08-30 18:49:32
---

> 作者： 前端下午茶 公号 / SHERlocked93

这两天折腾了一下 Jenkins 持续集成，由于公司使用自己搭建的 svn 服务器来进行代码管理，因此这里 Jenkins 是针对 svn 服务器来进行的配置，Git 配置基本一致，后面也介绍了下针对 Github 管理的项目的 Jenkins 配置

之前项目每次修改之后都需要本地 `npm run build `一次手动发布到服务器上方便测试和产品查看，有了Jenkins持续集成之后只要 svn 或者 git 提交之后就会自动打包，很方便，此次记录以备后询。

声明：

1.  后面的项目地址与打包地址都是使用 `my-demo`，自行修改；
    
2.  另外还有路径等，根据自己情况自行修改；
    

1\. 安装
------

### 1.1 安装 Nginx

可以直接去官网下直接下载，解压缩 `start nginx`就可以使了，常用命令：

1.  `start nginx # 启动`
    
2.  `nginx -s reload # 修改配置后重新加载生效`
    
3.  `nginx -s reopen # 重新打开日志文件`
    
4.  `nginx -t # 配置文件检测是否正确`
    

### 1.2 安装**Jenkins**

从官网下载文件安装之后，我这里安装到 `C:Jenkins`（Mac 不用在意），默认端口 8080，这时候浏览器访问 `localhost:8080` 就能访问 Jenkins 首页，这里注意如果不安装到 C 盘根目录有些插件安装会出错![一文搞定前端 Jenkins 自动化部署](https://www.v5ant.com/wp-content/uploads/2019/08/frc-04d712c9d2881abd201c30bbb4fc7c99.jpeg)

这里会让你去某个地方找一个初始密码文件打开并填到下面的密码框里，验证成功之后进入页面，选择 `Installsuggested plugins` 推介安装的插件

![一文搞定前端 Jenkins 自动化部署](https://www.v5ant.com/wp-content/uploads/2019/08/frc-d75244e7e6eb65a190f21f1c1a1c481b.jpeg)

插件都安装完成之后进入用户登录界面，设定用户名、密码及邮箱。  

然后提示 Jenkins is ready！→ Start using Jenkins ~

![一文搞定前端 Jenkins 自动化部署](https://www.v5ant.com/wp-content/uploads/2019/08/frc-508f8521d15f43ca9301b5fdb57a85d6.jpeg)

注意这里因为要使用node的命令来执行创建后操作，所以还需要安装插件：`NodeJSPlugin`、 `Deployto container`、 `Github`、 `Postbuild task`  

这里顺便记录一下启动和关闭Jenkins服务的命令行：

1.  `net start jenkins            // 启动Jenkins服务`
    
2.  `net stop jenkins             // 停止Jenkins服务`
    

2\. 创建svn项目的Jenkins任务
---------------------

### 2.1 新建

左边栏新建一个任务，输入一个任务名称，这里随便写一个

![一文搞定前端 Jenkins 自动化部署](https://www.v5ant.com/wp-content/uploads/2019/08/frc-2bb2930c2d64b455c8b97327d40670d9.jpeg)

### 2.2 配置

#### General

这里才是重头戏，进入刚刚创建的任务的配置页面的 **General**

![一文搞定前端 Jenkins 自动化部署](https://www.v5ant.com/wp-content/uploads/2019/08/frc-0ddc6e604eabe70e4d2a93f602459f0a.png)

丢弃旧的构建就是检测到新的版本之后把旧版本的构建删除

#### 源码管理

这里采用的是 svn 来管理代码，![一文搞定前端 Jenkins 自动化部署](https://www.v5ant.com/wp-content/uploads/2019/08/frc-1277443c4bba685796ff9079bb31d2be.png)

#### 构建触发器

![一文搞定前端 Jenkins 自动化部署](https://www.v5ant.com/wp-content/uploads/2019/08/frc-ced8af3d53e7baed8c3bcc4142edddf8.png)

这里的 Poll SCM 表示去检测是否更新构建的频率， `*****` 表示每分钟， `H****` 表示每小时  

#### 构建

1.  `cd cd C:Jenkinsworkspacemy-demo`
    
2.  `node -v`
    
3.  `npm -v`
    
4.  `cnpm i`
    
5.  `npm run build`
    

#### 构建后操作

安装插件 `Postbuild task` 后，可以在 增加构建后操作步骤中选择 `Postbuild task` 选项，增加构建后执行的script，具体也可以参考文章：jenkins部署maven项目构建后部署前执行shell脚本 - https://blog.csdn.net/minebk/article/details/73294785

我这里的 `Logtext` 是 `Buildcomplete`

Script：

1.  `rmdir /q/s C:nginx-1.14.0htmlmy-demo`
    
2.  `xcopy /y/e/i C:Jenkinsworkspacemy-demomy-demo C:nginx-1.14.0htmlmy-demo`
    

复制生成好的文件到Nginx的目录下，路径自行修改

3\. 创建Github项目的Jenkins任务
------------------------

Jenkins 不仅可以持续集成 svn 项目，Git 项目也是可以的，这里以 Github 上的项目为例：

![一文搞定前端 Jenkins 自动化部署](https://www.v5ant.com/wp-content/uploads/2019/08/frc-a189fed635dfa2cf96b36545fce55f3d.jpeg)

其他配置和上面一章一样

这样如果 github 有新的 push 请求，都会自动化部署到之前的服务器上，可以说很方便了。

### 试一试

配置好了我们试一试，在刚刚 github 项目中随便 commit 一版到 github ：

![一文搞定前端 Jenkins 自动化部署](https://www.v5ant.com/wp-content/uploads/2019/08/frc-99bbd4b2df388c5ec95b7cfb609531ef.png)

稍等片刻去本地 Jenkins 地址 `http://localhost:8080/job/vue-element-template/` 就能看到 Jenkins 已经在构建中了

![一文搞定前端 Jenkins 自动化部署](https://www.v5ant.com/wp-content/uploads/2019/08/frc-d7e3cc5ca7574e5eed11784c6ef31e18.png)

50秒之后：

![一文搞定前端 Jenkins 自动化部署](https://www.v5ant.com/wp-content/uploads/2019/08/frc-4d8b2454dc78e83ad8768a028739d0aa.png)

构建成功！构建用时 54 秒，现在访问本地服务器地址 `http://localhost:8282/vue-element-template`，已经能看到编译后的发布版本啦~  

如果你希望发布的是测试版本，可以自行修改构建后操作的 script

* * *

网上的帖子大多深浅不一，甚至有些前后矛盾，在下的文章都是学习过程中的总结，如果发现错误，欢迎留言指出~

> 参考：
> 
> 1.  使用Jenkins自动编译部署web应用
>     
> 2.  Jenkins+github 前端自动化部署
>     
> 3.  配置Jenkins邮件通知
>     
> 4.  jenkins部署maven项目构建后部署前执行shell脚本
>