---
title: Vue 3.x 入门笔记
comments: true
description: Vue 3.x 入门笔记
keywords: Vue 3.x 
toc: true
toc_number:
aside:
categories: 大前端
cover: https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-9995d3018a2160dbebbd9e58ada2803f_1200x500.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619839093&t=b7cecab28cc5329c712a8ac129c2fd2a
top_img:
date:  2021-04-01
updated: 2021-04-01
tags: 前端,vue
---

# 前言

1、Vue.js 目前最火的的一个前端框架，三大主流前端框架之一。
2、Vue.js 是一套构建用户界面的框架（一套完整的解决方案，对项目侵入性大，中途需要跟换框架则需要重构整个项目），只关注视图层，易上手，有配套的第三方类库。
3、提高开发效率，帮助减少不必要的 dom 操作；双向数据绑定，通过框架提供的指令，前端只需要关注业务逻辑，不再关心 dom 如何渲染。

## 跑个 demo

```js
<div id="counter">Counter: {{ counter }}</div>;
const Counter = {
  data() {
    return {
      counter: 0,
    };
  },
};
// 2.x
new Vue(Counter).$mount('#counter');
// 3.x
Vue.createApp(Counter).mount('#counter');
```

旧版没有`app` 概念，3.0 引入新 API：createApp，调用 createApp 返回一个应用实例

| 2.x 全局 API               | 3.x 实例 API (app)         |
| -------------------------- | -------------------------- |
| Vue.config                 | app.config                 |
| Vue.config.productionTip   | 移除                       |
| Vue.config.ignoredElements | app.config.isCustomElement |
| Vue.component              | app.component              |
| Vue.directive              | app.directive              |
| Vue.mixin                  | app.mixin                  |
| Vue.use                    | app.use                    |

## 全局 API

```js
// 2.x
import Vue from 'vue';
Vue.nextTick(() => {
  // 一些和DOM有关的东西
});
// 3.0
import { nextTick } from 'vue';
nextTick(() => {
  // 一些和DOM有关的东西
});
```

---

- `createApp` 返回一个提供应用上下文的应用实例。应用实例挂载的整个组件树共享同一个上下文。
- `h` 返回一个”虚拟节点“，通常缩写为 VNode：一个普通对象，其中包含向 Vue 描述它应在页面上渲染哪种节点的信息，包括所有子节点的描述
- `defineComponent` 创建一个组件
- `defineAsyncComponent` 创建一个只有在需要时才会加载的异步组件
- `resolveComponent` 返回一个 Component。如果没有找到，则返回 undefined。
- `resolveDynamicComponent` 返回已解析的 Component 或新创建的 VNode，其中组件名称作为节点标签。如果找不到 Component，将发出警告
- `resolveDirective` 返回一个 Directive。如果没有找到，则返回 undefined。
- `withDirectives` 允许将指令应用于 VNode。返回一个包含应用指令的 VNode。
- `createRenderer` 创建 render
- `nextTick` 将回调推迟到下一个 DOM 更新周期之后执行

---

3.0 中全局 API 现在只能作为 ES 模块构建的命名导出进行访问，主要考虑到 `tree-shaking`的支持。

## 应用 API

---

const app = createApp({}) 基于 app

- `component` 注册或检索全局组件
- `config` 包含应用配置的对象
- `directive` 注册或检索全局指令
- `mixin` 在整个应用范围内应用混入
- `mount` 将应用实例的根组件挂载在提供的 DOM 元素上
- `provide` 设置一个可以被注入到应用范围内所有组件中的值， 组件应该使用 inject 来接收提供的值。
- `unmount` 在提供的 DOM 元素上卸载应用实例的根组件
- `use` 安装 Vue.js 插件

---

## 组件选项

```js
const vm = Vue.createApp({
  data() {
    return { a: 1 };
  },
  mixins: [],
  extends: {}, // 允许声明扩展另一个组件
  provide: {}, // 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的 property
  inject: [], // 注入父组件provide值
  props: {
    height: Number,
  },
  computed: {
    aDouble() {
      return this.a * 2;
    },
  },
  methods: {
    plus() {
      this.a++;
    },
  },
  watch: {
    a(val, oldVal) {
      console.log(`new: ${val}, old: ${oldVal}`);
    },
  },
  emits: ['check'], // 1.显式声明 2.运行时验证 3.类型推断 4.IDE支持

  // 新增重点setup函数是一个新的组件选项。它作为在组件内部使用组合式 API 的入口点
  // 在创建组件实例时，在初始 prop 解析之后立即调用 setup。在生命周期方面，它是在 beforeCreate 钩子之前调用的。
  setup() {
    return {};
  },
}).mount('#app');
```

## 生命周期

[详情](https://v3.cn.vuejs.org/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)
<img src="https://v3.cn.vuejs.org/images/lifecycle.png">

- `beforeCreate` 在实例初始化之后
- `created` 在实例创建完成后被立即调用
- `beforeMount` 在挂载开始之前被调用
- `mounted` 实例被挂载后调用
- `beforeUpdate` 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器
- `updated` 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子
- `activated` 被 keep-alive 缓存的组件激活时调用
- `deactivated` 被 keep-alive 缓存的组件停用时调用
- `beforeUnmount` 在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。
- `unmounted` 卸载组件实例后调用
- `errorCaptured` 当捕获一个来自子孙组件的错误时被调用
- `renderTracked` 跟踪虚拟 DOM 重新渲染时调用
- `renderTriggered` 当虚拟 DOM 重新渲染为 triggered.Similarly 为 renderTracked (此事件告诉你是什么操作触发了重新渲染，以及该操作的目标对象和键)

## 内置组件

新增组件 teleport,提供了一种干净的方法，允许我们控制在 DOM 中哪个父节点下呈现 HTML，而不必求助于全局状态或将其拆分为两个组件

- to - string。需要 prop，必须是有效的查询选择器或 HTMLElement (如果在浏览器环境中使用)。指定将在其中移动 <teleport> 内容的目标元素
- disabled - boolean。此可选属性可用于禁用 <teleport> 的功能，这意味着其插槽内容将不会移动到任何位置，而是在您在周围父组件中指定了 <teleport> 的位置渲染。

```js
<!-- 正确 -->
<teleport to="#some-id" />
<teleport to=".some-class" />
<teleport to="[data-teleport]" />
<teleport to="#popup" :disabled="displayVideoInline">
  <video src="./my-movie.mp4">
</teleport>

<!-- 错误 -->
<teleport to="h1" />
<teleport to="some-string" />
```

## 核心- 响应式 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

当把一个普通的 JavaScript 对象作为 data 选项传给应用或组件实例的时候，Vue 会使用带有 getter 和 setter 的处理程序遍历其所有 property 并将其转换为 Proxy。这是 ES6 仅有的特性，但是我们在 Vue 3 版本也使用了 Object.`defineProperty` 来支持 IE 浏览器。两者具有相同的 Surface API，但是 `Proxy` 版本更精简，同时提升了性能。

IE 支持程度:

Object.defineProperty IE9+ [详细兼容表](https://caniuse.com/?search=defineProperty)

Proxy IE 不支持 Edge 支持 [详细兼容表](https://caniuse.com/?search=Proxy)

## 核心二 组合式 API

vue2.x 都是基于 `Class-API`，vue3.0 推荐 `Composition-API`既 组合式 API

优点：

- 更好的逻辑复用与代码组织
- 更好的类型推导

```js
// 模版
<template>
  <div>{{ readersNumber }} {{ book.title }}</div>
</template>

<script>
  import { ref, reactive ,onMounted,provide, inject} from 'vue'

  export default {
    setup() {
      const readersNumber = ref(0)
      const book = reactive({ title: 'Vue 3 Guide' })
      onMounted(()=>{

      })
      return {
        readersNumber,
        book
      }
    }
  }
</script>
// 渲染函数
import { h, ref, reactive } from 'vue'

export default {
  setup() {
    const readersNumber = ref(0)
    const book = reactive({ title: 'Vue 3 Guide' })
    // 请注意，我们需要在这里显式地暴露ref值
    return () => h('div', [readersNumber.value, book.title])
  }
}
```

以上是俩种使用方式的案例，使用组合式 API 的话所有逻辑是放着 setup 里面的，需要用到的生命周期钩子函数，监听 watch，computed 等都通过 import 方式导入

需要注意一个概念就是 setup 不属于 vue 构建的一个生命周期,他是一个组件选项,在创建组件之前执行，一旦 props 被解析，并作为组合式 API 的入口点

#### 选项 API 生命周期选项和组合式 API 之间的映射

- beforeCreate -> use setup()

- created -> use setup()

- beforeMount -> onBeforeMount

- mounted -> onMounted

- beforeUpdate -> onBeforeUpdate

- updated -> onUpdated

- beforeUnmount -> onBeforeUnmount

- unmounted -> onUnmounted

- errorCaptured -> onErrorCaptured

- renderTracked -> onRenderTracked

- renderTriggered -> onRenderTriggered

### 组合式 API 详解

1. 响应性基础 API，reactive/ref

[reactive 相关 API](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive)

[ref 相关 API](https://v3.cn.vuejs.org/api/refs-api.html#ref)

```js
import { reactive，ref } from 'vue';

const obj = reactive({ count: 0 }); // 返回对象的响应式副本
const count = ref(0) // 返回一个响应式且可变的 ref 对象，
obj++
count.value++ //  通过ref绑定的响应数据需要使用.value 方式改变值

```

2. Computed

```js
import { ref, computed } from 'vue';

const count = ref(1);
// 1.
const plusOne = computed(() => count.value + 1);

console.log(plusOne.value); // 2

plusOne.value++; // error,使用getter方式不可写

// 2.
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1;
  },
});
plusOne.value = 1; // 使用get 和 set 函数可以创建可写ref对象
console.log(count.value); // 0
```

3. watch/watchEffect

```js
import { ref, watchEffect, watch } from 'vue';
const state = reactive({ count: 0 });
const count = ref(0);

// 1.watchEffect 不需要直接设置观测对象，只要内部调用了ref对象就自动响应式的监测触发
watchEffect(() => console.log(count.value));
// -> logs 0
setTimeout(() => {
  count.value++;
  // -> logs 1
}, 100);

// 2.watch 和之前的监测逻辑一致，具体写法如下
// 侦听一个getter
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
);
// 直接侦听一个ref
const count = ref(0);
watch(count, (count, prevCount) => {
  /* ... */
});
// 监听多个
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
});
```

4. Provide / Inject

```js
import { provide, inject } from 'vue';

provide('key', 'value'); // 提供非字符串值将导致错误

const foo = inject('key'); // foo 的类型: string | undefined
```

5. props/emit/slots/attrs

```js
export default {
  setup(props, context) {
    // setup 中this不是之前2.0的实例上下文，需要通过第二个参数拿到上下文对象
    const { attrs, slots, emit, parent, root } = context;
    // 对比2.0
    // context.parent === this.$parent
    // context.root === this
    // context.emit === this.$emit
    // context.refs === this.$refs
    // context.attrs === this.$attrs
    // context.slots === this.slots
    return {};
  },
};
```

## 核心三 `Virtual DOM` (虚拟 dom)

1.讨论虚拟 DOM 之前先了解一下真实 DOM 和其解析流程

不同浏览器的渲染引擎，可能有些差异，不过大流程差不多，大致分为 5 步：
<img title="webkit渲染引擎工作流程" src="https://upload-images.jianshu.io/upload_images/4345378-b7ccad3bc808783f.png?imageMogr2/auto-orient/strip|imageView2/2/w/624/format/webp">

---

- 1.创建 DOM 树： 用 HTML 分析器，分析 HTML 元素，构建一颗 DOM 树(标记化和树构建)
- 2.创建 StyleRules：用 CSS 分析器，分析 CSS 文件和元素上的 inline 样式，生成页面的样式表
- 3.创建 Render 树：将 DOM 树和样式表，关联起来，构建一颗 Render 树(这一过程又称为 Attachment)。每个 DOM 节点都有 attach 方法，接受样式信息，返回一个 render 对象(又名 renderer)。这些 render 对象最终会被构建成一颗 Render 树
- 4.布局 Layout：有了 Render 树，浏览器开始布局，为每个 Render 树上的节点确定一个在显示屏上出现的精确坐标
- 5.绘制 Painting：Render 树和节点显示坐标都有了，就调用每个节点 paint 方法，把它们绘制出来

---

2.Virtual DOM 可以看作是一个使用 javascript 模拟了 DOM 结构的树形结构，这个树结构包含整个 DOM 结构的信息

```html
<div id="app">
  <button class="btn">我是按钮</button>
</div>
```

```js
{
  tag:'div',
  attrs:{
    id:'app'
  },
  children:[{
    tag:'button',
    attrs:{
      className:'btn'
    },
    children:['我是按钮']
  }]
}
```

3.为什么要使用虚拟 DOM？

虚拟 DOM 就是为了解决浏览器性能问题而被设计出来的,频繁操作 dom 非常消耗性能,在整个前端项目中，浏览器的重绘和重排性能开销最大，因此尽量减少浏览器的重绘和重排是前端项目在做性能优化的时候的重点。

`snabbdom.js`一个非常优秀的虚拟 dom 库，vue 的虚拟 dom 就参考这个
<a href="https://github.com/snabbdom/snabbdom">GitHub 地址</a>

实现一个虚拟 DOM，需要如下三个步骤：

1. compile, 我们如何能把真实的 DOM 编译成 Vnode。
2. diff. 我们怎么样知道 oldVnode 和 newVnode 之间的不同。
3. patch. 通过第二步的比较知道不同点，然后把不同的虚拟 DOM 渲染到真实的 DOM 上去
