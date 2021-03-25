---
title: 教你快速撸一个免费HTTPS证书
url: 154.html
id: 154
categories:
  - 服务端
date: 2019-06-22 17:16:03
tags:
---

HTTPS 已成为业界标准，这篇博客将教你申请[Let’s Encrypt](https://letsencrypt.org/)的免费 HTTPS 证书。 本文的操作是在 Ubuntu 16.04 下进行，使用 nginx 作为 Web 服务器。【[蚂蚁号](https://www.v5ant.com/ "蚂蚁号")】

### 1\. 安装 Certbot

[Certbot](https://certbot.eff.org/)可以用于管理(申请、更新、配置、撤销和删除等)Let’s Encrypt 证书。这里安装的是带 nginx 插件的 certbot：

    sudo apt-get update
    sudo apt-get install software-properties-common
    sudo add-apt-repository -y ppa:certbot/certbot
    sudo apt-get update
    sudo apt-get install -y python-certbot-nginx

### 2\. 配置 Nginx

    server
    {
        listen 80;
        server_name www.v5ant.com;
    }

重启 nginx:

    IMPORTANT NOTES:
     - Congratulations! Your certificate and chain have been saved at:
       /etc/letsencrypt/live/www.v5ant.com/fullchain.pem
       Your key file has been saved at:
       /etc/letsencrypt/live/www.v5ant.com/privkey.pem
       Your cert will expire on 2018-09-29. To obtain a new or tweaked
       version of this certificate in the future, simply run certbot again
       with the "certonly" option. To non-interactively renew *all* of
       your certificates, run "certbot renew"
     - If you like Certbot, please consider supporting our work by:
    
       Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
       Donating to EFF:                    https://eff.org/donate-le

HTTPS 证书相关的文件在/etc/letsencrypt/目录中：

    find /etc/letsencrypt/ -name "*www.v5ant.com*"
    /etc/letsencrypt/renewal/www.v5ant.com.conf
    /etc/letsencrypt/archive/www.v5ant.com
    /etc/letsencrypt/live/www.v5ant.com

certbot 会自动修改 nginx 配置文件：

    server
    {
        listen 80;
        server_name www.v5ant.com;
    
        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/www.v5ant.com/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/www.v5ant.com/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    }

### 参考

*   [Certbot 文档：Nginx on Ubuntu 16.04 (xenial)](https://certbot.eff.org/lets-encrypt/ubuntuxenial-nginx)