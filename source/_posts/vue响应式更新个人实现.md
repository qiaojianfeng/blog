---
title: 你能简单谈谈什么是 vue 的响应式更新？
categories:
  - 大前端
thumbnail: 'http://img.v5ant.com/images/2019/12/13/timg.md.jpg'
comments: true
toc: true
layout: true
date: 2019-11-22 14:42:57
updated: 2019-11-22 14:42:57
tags:
---

现在面试官随随便便都会问一句：请简单说一下 `vue` 的响应式原理是如何实现的？
答：使用 ES5 的`Object.defineProperty`！地球人都知道
再问：那你能简单的讲一下具体的实现流程吗？
答：。。。。。（好像知道但是好像又张嘴说不上来 😆 尴哩个尬）

<!-- more -->

看十遍不如上手做一遍，赶紧动手跟我撸一遍试试，免得再面试又被打脸。

## 第一步先熟悉 `Object.defineProperty`

`Object.defineProperty`方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象，先来看一下它的语法：

```js
Object.defineProperty(obj, prop, descriptor);
```

`obj` 是要在其上定义属性的对象；`prop` 是要定义的属性或者修改的名称；`descriptor` 是将被定义或者修改的属性描述符

比较核心的是 `descriptor`，它有很多可选键值。这里我们最关心的是 `get` 和 `set`，`get` 是一个给属性提供的 `getter` 方法，当我们访问了该属性的时候会触发 `getter` 方法；`set` 是一个给属性提供的 `setter` 方法，当我们对该属性做修改的时候会触发 `setter` 方法。详细参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

## 第二步了解响应式流程

很重要的一个概念是`发布订阅模式`发布订阅模式是设计模式中比较常见的一种，其中有两个角色：发布者和订阅者。多个订阅者可以向同一发布者订阅一个事件，当事件发生的时候，发布者通知所有订阅该事件的订阅者。
写个小例子了解一下

```js
// 一般命名为dep作为订阅者的依赖也就是我们所说的发布者
class Dep {
  constructor() {
    this.subs = [];
  }
  // 增加订阅者
  addSubs(sub) {
    Array.from(arguments).forEach(v => {
      if (!this.subs.includes(v)) {
        this.subs.push(v);
      }
    });
  }
  // 通知订阅者
  notify() {
    this.subs.forEach(v => v.update());
  }
}
const dep = new Dep();
const sub1 = {
  update() {
    console.log('sub1接收到通知');
  }
};
const sub2 = {
  update() {
    console.log('sub2接收到通知');
  }
};
dep.addSubs(sub1, sub2);
dep.notify();
// 通过notify发送通知订阅者
```

小总结:

1.`vue.js` 首先通过 `Object.defineProperty`来对要监听的数据进行 `getter` 和 `setter` 劫持，当数据的属性被赋值/取值的时候，`vue.js` 就可以察觉到并做相应的处理。

2.通过订阅发布模式，我们可以为对象的每个属性都创建一个发布者，当有其他订阅者依赖于这个属性的时候，则将订阅者加入到发布者的队列中。利用 `Object.defineProperty` 的数据劫持，在属性的 `setter` 调用的时候，该属性的发布者通知所有订阅者更新内容。

## 第三步动手实践

```js
// 简单的一个监听函数用来给对象添加setter 和 getter，用于收集依赖和派发订阅消息,基本上流程参考vue源码
class Observer {
  constructor(data) {
    this.data = data;
    this.walk();
  }
  // walk是用来遍历对象设置setter和getter,
  walk() {
    const keys = Object.keys(this.data);
    keys.forEach(key => {
      defineReactive(this.data, keys, this.data[key]);
    });
  }
  // 创建实例化当前属性的一个发布者，劫持属性，收集和派发
  defineReactive(obj, key, value) {
    // 实例化一个新的发布者
    const dep = new Dep();
    // 这里主要是针对多层级的对象需要进行递归劫持所有属性
    new Observer(value);
    Objec.defineProperty({ obj, key,
      {
        get(){
          // 若当前有对该属性的依赖项，则发布者收集依赖
          if (Dep.target) {
            dep.addSub(Dep.target);
          }
          return value;
        },
        set(newValue){
          // 值没有变化return不做任何操作
           if (value === newValue) return;
          // 当对属性进行设置时候就可以去派发订阅消息，通知到所有的订阅者
          value = newValue;
          // 对新设置的值进行递归劫持
          new Observer(newVal);
          dep.notify()
        }
      }
    });
  }
}
// 发布者,将依赖该属性的watcher都加入subs数组，当该属性改变的时候，则调用所有依赖该属性的watcher的更新函数，触发更新
class Dep {
  constructor() {
    this.subs = [];
  }
  // 增加订阅者
  addSubs(sub) {
    Array.from(arguments).forEach(v => {
      if (!this.subs.includes(v)) {
        this.subs.push(v);
      }
    });
  }
  // 通知订阅者
  notify() {
    this.subs.forEach(v => v.update());
  }
}
Dep.target = null;

// 观察者
class Watcher {
  constructor(data, key, cb) {
    this.data = data;
    this.key = key;
    this.cb = cb;
    this.value = null;
    this.get();
  }
  get(){
    // 绑定依赖对象，确认订阅
    Dep.target = this;
    this.value= this.data[key];
    return this.data;
  }
  update(){
    const oldValue = this.value;
    const newValue = this.get();
    if (oldValue !== newValue) {
      this.cb(oldValue, newValue);
    }
  }
}
let data = {
  a:0,
  b:1
}
// 初始化Observer劫持绑定所有set/get
new Observer(data);
// 监听属性 a 的值如果发现变化执行回调函数
new Watcher(data, 'a', (oldValue, newValue) => {
  console.log('这个是watch',oldValue, newValue);
})


```

简单的响应式更新就是这样的了，当然 vue 源码比这复杂的多还要处理其他数据类型，有兴趣可以再看看源码。
