---
title: 理解RESTful没有那么难
categories:
  - 服务端
thumbnail: 'http://img.v5ant.com/images/2019/11/20/2.jpg'
comments: true
toc: true
layout: true
date: 2019-11-21 12:29:16
updated: 2019-11-21 12:29:16
tags:
---

## 什么是 RESTful ？

<!-- more -->

rest 不是重置哈，它标识缩写`Representational State Transfer`（表述性状态转移），这太学术了我也不懂了，
简单来说 `RESTful` 不是一种新技术，而是一种规范，对应应用程序交互，也就是我们平时接触最多的接口 `API` 定制规则，为的是让 API 理解更加直观，明了，规范，可以实现客户端无需借助任何文档即能调用到所有的服务器资源。
一般服务端设计接口不遵守规范的话可能是这样的：

```js
api/getGoods?id=xxx GET
api/setUGoods POST
api/updateGoods POST
api/deleteGoods?id=xxx GET/POST
```

这样的其实具体用什么`get，post`都一样没什么区别的,当然我们具体操作必须查看文档，你也无法推断出删除商品人家是 `delGoods` 还是 `deleteGoods` 还是其他,这完全取决于你后端老大的心情，而且但凡这类存在增删改查的接口都起码 4 个接口，而且接口的请求方式也是没有具体要求的，也是必须按照文档去一一比对
如果我们按照 `RESTful` 规范出接口会是什么样子的呢？

```js
api/Goods?id=xxx GET
api/Goods POST
api/Goods PUT
api/Goods?id=xxx DELETE
```

看到这里应该很明白了吧，规范完全按照 HTTP 请求规范类型一一对应，而且只有一个接口，那就是商品接口，拿到商品接口理论上我可以直接进行增删改查操作，是不是很直观，很方便？

> 以上完全是个人理解，切不可当做作为正经解释 😁

## RESTful 是最佳实践

### URL 接口设计

`RESTful` 的核心思想就是，客户端发出的数据操作指令都是"动词 + 宾语"的结构,比如 `GET /Goods`,这个命令，`GET` 是动词，`/articles` 是宾语。

- GET：获取（Get）
- POST：新建（Create）
- PUT：更新（Update）
- PATCH：更新（Update），通常是部分更新
- DELETE：删除（Delete）

根据 `HTTP` 规范，动词一律大写。

有些客户端只能使用 `GET` 和 `POST` 这两种方法。服务器必须接受 `POST` 模拟其他三个方法`（PUT、PATCH、DELETE）`。

这时，客户端发出的 `HTTP` 请求，要加上 `X-HTTP-Method-Override` 属性，告诉服务器应该使用哪一个动词，覆盖 POST 方法。

```js
POST /api/Goods/1 HTTP/1.1
X-HTTP-Method-Override: PUT
```

上面代码中，`X-HTTP-Method-Override` 指定本次请求的方法是 `PUT`，而不是 `POST`。
宾语是 `API` 中的 `URL` 部分 上面之前那种 `api/getGoods`就显然不合理,里面不要包含动词`get,put,post`之类，因为本身请求类型已经明确了需要什么操作的
而且，这里宾语尽量使用复数，毕竟你操作的是一个集合嘛

避免多级 `URL`
常见的情况是，资源需要多级分类，因此很容易写出多级的 URL，比如获取某个作者的某一类文章。

`GET /authors/12/categories/2`
这种 `URL` 不利于扩展，语义也不明确，往往要想一会，才能明白含义。

更好的做法是，除了第一级，其他级别都用查询字符串表达。

`GET /authors/12?categories=2`
下面是另一个例子，查询已发布的文章。你可能会设计成下面的 URL。

`GET /articles/published`
查询字符串的写法明显更好。

`GET /articles?published=true`

### 状态码 设计

1. `200` 状态码表示操作成功，但是不同的方法可以返回更精确的状态码。

```
GET: 200 OK
POST: 201 Created
PUT: 200 OK
PATCH: 200 OK
DELETE: 204 No Content
```

上面代码中，`POST` 返回 `201` 状态码，表示生成了新的资源；`DELETE`返回 `204` 状态码，表示资源已经不存在。

此外，`202 Accepted`状态码表示服务器已经收到请求，但还未进行处理，会在未来再处理，通常用于异步操作。下面是一个例子。

```js
// HTTP/1.1 202 Accepted
{
"task": {
"href": "/api/company/job-management/jobs/xxx",
"id": "xxx"
}
}
```

2. `3xx` 状态码
   API 用不到 `301` 状态码（永久重定向）和 `302` 状态码（暂时重定向，307 也是这个含义），因为它们可以由应用级别返回，浏览器会直接跳转，API 级别可以不考虑这两种情况。

API 用到的 `3xx` 状态码，主要是 `303 See Other`，表示参考另一个 `URL`。它与 `302` 和 `307` 的含义一样，也是"暂时重定向"，区别在于 `302` 和 `307` 用于 `GET` 请求，而 `303` 用于 `POST、PUT` 和 `DELETE` 请求。收到 `303` 以后，浏览器不会自动跳转，而会让用户自己决定下一步怎么办。下面是一个例子。

```js
HTTP/1.1 303 See Other
Location: /api/orders/12345
```

3. `4xx` 状态码
   `4xx` 状态码表示客户端错误，主要有下面几种。

```js
// 400 Bad Request：服务器不理解客户端的请求，未做任何处理。

// 401 Unauthorized：用户未提供身份验证凭据，或者没有通过身份验证。

// 403 Forbidden：用户通过了身份验证，但是不具有访问资源所需的权限。

// 404 Not Found：所请求的资源不存在，或不可用。

// 405 Method Not Allowed：用户已经通过身份验证，但是所用的 HTTP 方法不在他的权限之内。

// 410 Gone：所请求的资源已从这个地址转移，不再可用。

// 415 Unsupported Media Type：客户端要求的返回格式不支持。比如，API 只能返回 JSON 格式，但是客户端要求返回 XML 格式。

// 422 Unprocessable Entity ：客户端上传的附件无法处理，导致请求失败。

// 429 Too Many Requests：客户端的请求次数超过限额。
```

4. `5xx` 状态码
   `5xx` 状态码表示服务端错误。一般来说，`API` 不会向用户透露服务器的详细信息，所以只要两个状态码就够了。

```js
// 500 Internal Server Error：客户端请求有效，服务器处理时发生了意外。

// 503 Service Unavailable：服务器无法处理请求，一般用于网站维护状态。
```

### 服务端响应的一些注意

1. 不要返回纯本文
   `API` 返回的数据格式，不应该是纯文本，而应该是一个 `JSON` 对象，因为这样才能返回标准的结构化数据。所以，服务器回应的 `HTTP` 头的 `Content-Type` 属性要设为 `application/json`。客户端请求时，也要明确告诉服务器，可以接受 `JSON` 格式，即请求的 `HTTP` 头的 `ACCEPT` 属性也要设成 `application/json`。下面是一个例子。

```js
GET /orders/2 HTTP/1.1
Accept: application/json
```

2. 发生错误时，不要返回 `200` 状态码
   有一种不恰当的做法是，即使发生错误，也返回 `200` 状态码，把错误信息放在数据体里面，就像下面这样。

```js
// HTTP/1.1 200 OK
// Content-Type: application/json
{
"status": "failure",
"data": {
"error": "Expected at least two items in list."
}
}
```

上面代码中，解析数据体以后，才能得知操作失败。

这张做法实际上取消了状态码，这是完全不可取的。正确的做法是，状态码反映发生的错误，具体的错误信息放在数据体里面返回。下面是一个例子。

```js
// HTTP/1.1 400 Bad Request
// Content-Type: application/json

{
"error": "Invalid payoad.",
"detail": {
"surname": "This field is required."
}
}
```

3. 提供链接
   `API` 的使用者未必知道，`URL` 是怎么设计的。一个解决方法就是，在回应中，给出相关链接，便于下一步操作。这样的话，用户只要记住一个`URL`，就可以发现其他的 `URL`。这种方法叫做 `HATEOAS`。

举例来说，`GitHub` 的 `API` 都在 `api.github.com` 这个域名。访问它，就可以得到其他 `URL`。

```js
{
...
"feeds_url": "https://api.github.com/feeds",
"followers_url": "https://api.github.com/user/followers",
"following_url": "https://api.github.com/user/following{/target}",
"gists_url": "https://api.github.com/gists{/gist_id}",
"hub_url": "https://api.github.com/hub",
...
}
```

上面的回应中，挑一个 `URL` 访问，又可以得到别的 `URL`。对于用户来说，不需要记住`URL` 设计，只要从 `api.github.com` 一步步查找就可以了。

`HATEOAS` 的格式没有统一规定，上面例子中，`GitHub` 将它们与其他属性放在一起。更好的做法应该是，将相关链接与其他属性分开。

```js
// HTTP/1.1 200 OK
// Content-Type: application/json

{
"status": "In progress",
"links": {[
{ "rel":"cancel", "method": "delete", "href":"/api/status/12345" } ,
{ "rel":"edit", "method": "put", "href":"/api/status/12345" }
]}
}
```

听说好的规范可以提升编码的幸福感，是吗？

> 参考文章： 阮一峰老师文章=> http://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html
