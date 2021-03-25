---
title: Mongo入门-2-基本操作
url: 151.html
id: 151
categories:
  - 服务端
date: 2019-06-22 17:12:57
tags:
---

创建数据库
=====

    db.student.insert{
    stuid : 1,
    stuname : "xxx"
    }

删除数据库

    sue sdkb
    db.dropDatabase()

#### 插入文档

若不存在,插入新文档时会自动创建一个新的集合,再插入.

    db.collection.insertOne():向指定的集合插入一条数据
    db.collection.insertMany():向指定的集合中插入多条数据12

    db.users.insertOne(
    {
    	name:"sue",
    	age:22,
    	status:"xxx"
    }
    )

向users插入多条文档

    db.users.insertMany(
    [{
    name:"zzxb",
    age:18,
    status:"xxx"
    },
    {
    name:"ilyj",
    age:38,
    status:"stop"
    }
    ]
    )

#### 更新文档

    db.collection.update(
    <query>,
    <update>,
    {
    	upsert:<boolean>,
    	multi:<boolean>,
    	writeConcern:<documnet>
    }
    )

参数说明:

*   query:update的查询条件,类似sql update查询内where后面的
*   update:update的对象和一些更新的操作符号
*   upsert:可选 若不存在update的记录,是否插入objNew,true为插入,默认为false,不插入
*   multi:可选,只更新找到的第一条记录,true:把按条件查出来的多条记录全部更新
*   writeConcern:可选 抛出异常的级别

**3.2版本开始 MongoDB提供以下更新集合文档的方法**

    db.collention.updateOne()
    db.collection.updateMany()

**范例** 将name为zzxb的文档,更新年龄为40

    db.user.update(
    {"name":"zzxb"},
    {$set:{"age":40}}
    )

将年龄小于30的文档,更新状态为stop

    db.users.update(
    {"age":{$lt:30},
    {$set:{"status":"stop"}}
    }
    )

**大于小于**

*   lt : 小于
*   gt: 大于
*   lte : 小于等于
*   gte : 大于等于
*   ne: 不等于

**save语法** save()方法通过传入的文档来替换已有的文档

    db.collection.save(
    <document>,
    {
    writeConcern:<document>
    }
    )

*   document:文档数据
*   writeConcern:可选的,抛出异常的级别

替换id为5a67ea03fd6b999d262bae2c的文文档内容

    db.users.save({
    	_id:ObjectId("5a67..."),
    	name:"myzzxb",
    	age:28,
    	status:"starting"
    })

**修改器** 通常文档只会有一部分要更细,使用原子性的更新,指定文档的某些字段进行更新 更新修改器是钟特殊的键.用来指定复杂的更新操作:修改,增加 删除,还可能是操作数据或内嵌文档