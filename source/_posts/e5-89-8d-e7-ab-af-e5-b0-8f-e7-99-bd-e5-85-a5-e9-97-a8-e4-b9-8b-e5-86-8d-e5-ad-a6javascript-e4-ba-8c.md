---
title: 前端小白入门之再学JavaScript (二)
tags:
  - 前端，JavaScript
url: 127.html
id: 127
categories:
  - 大前端
date: 2019-06-22 16:37:58
---

JavaScript 是一种**弱类型**或者说**动态**语言。这意味着你不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。这也意味着你可以使用同一个变量保存不同类型的数据：

    var foo = 42;    // foo is a Number 
    nowfoo = "bar"; // foo is a String 
    nowfoo = true;  // foo is a Boolean now

最新的 ECMAScript 规范，定义了7种数据类型

*   String
*   Number
*   Boolean
*   Undefined
*   Null
*   Symbol (ES6新定义类型)
*   Object

一般面试过过程中一般会问基础类型(简单类型)或者复杂类型(引用类型)，那么以上6种就是所谓的基本类型，Object属于复杂类型它包含有Object，Array，Function。 在计算机运算过程中变量的存放一般是俩种方式栈（stack）和堆（heap） **栈** stack是有结构的，先进后出，存放基本类型和对象的引用，每个区块的大小是明确的。如果你不太好理解，就想一想古时候客栈，计算机中的栈也类型一层一层，你想如果1楼最后来的人把门口堵住了2楼，3楼是不是无法出去必须等一楼出去才可以，这就是所谓的先进后出的原则????。 **堆** heap没有结构，数据任意存放，js中主要存放的是引用类型，比如：Array，Object对象 很容易看出来，如果进行数据查询速度比较的话stack效率远远高于heap，毕竟人家都是登记好的拿了本子就可以查到是不是???? 在实际开发过程中，偶尔遇到栈溢出的情况，stack overflow错误，一般在代码运行时会分配1M-2M空间，不同设备可能不同的。栈因为stack创建时候，大小是确定的，超过额度大小就会发生栈溢出【当js出现死循环或者错误的递归时候】。 heap大小是不确定的，需要可以一直累加。 js是单线程的，核心特征哈，那么怎么利用多核的CPU呢？H5的Web Worker标准，允许js脚本创建多个线程，但是子线程受主线程的控制，且不能操作DOM。 stack是线程独占的，heap是线程共有的。 好了回到正题继续讨论今天的数据类型

#### Undefined

Undefined类型只有一个值，即特殊的undefined。在使用var声明变量但未对其加以初始化时，这个变量的值就是undefined。不过，一般建议尽量给变量初始化，但是在早期的js版本中是没有规定undefined这个值的，所以在有些框架中为了兼容旧版浏览器，会给window对象添加undefined值。

    window['undefined'] = window['undefined'];  //或者
    window.undefined = window.undefined;

**Null** Null类型是第二个只有一个值的数据类型，这个特殊的值是null。从逻辑角度来看，null值表示一个空对象指针，而这也正是使用typeof操作符检测null时会返回object的原因。

      var car = null;  
      console.log(typeof car); // "object"

如果定义的变量准备在将来用于保存对象，那么最好将该变量初始化为null而不是其他值。这样一来，只要直接检测null值就可以知道相应的变量是否已经保存了一个对象的引用了。

     if(car != null){    
         //对car对象执行某些操作
     }

#### Boolean

该类型只有两个字面值：true和false。这两个值与数字值不是一回事，因此true不一定等于1，而false也不一定等于0。 虽然Boolean类型的字面值只有两个，但JavaScript中所有类型的值都有与这两个Boolean值等价的值。要将一个值转换为其对应的Boolean值，可以调用类型转换函数Boolean(),也可以使用小技巧!!俩个叹号转译为布尔类型

数据类型

转换为true的值

转换为false的值

Boolean

true

false

String

任何非空的字符串

""(空字符串)

Number

任何非0数值（包括无穷大）

0和NaN

Object

任何对象

null

Undefined

不适用

undefined

  **Number** 这种类型用来表示整数和浮点数值，还有一种特殊的数值，即NaN（非数值 Not a Number）。这个数值用于表示一个本来要返回数值的操作数未返回数值的情况（这样就不会抛出错误了）。 NaN本身有两个非同寻常的特点。首先，任何涉及NaN的操作（例如NaN/10）都会返回NaN，这个特点在多步计算中有可能导致问题。其次，NaN与任何值都不相等，包括NaN本身。例如，下面的代码会返回false。 **String** String类型用于表示由零或多个16位Unicode字符组成的字符序列，即字符串。字符串可以由单引号(')或双引号(")表示。我建议在js中一律使用单引号,毕竟少按一个shift 而且很多权威规范也都是这样 string类型有些特殊，因为字符串具有可变的大小，所以显然它不能被直接存储在具有固定大小的变量中。由于效率的原因，我们希望JS只复制对字符串的引用，而不是字符串的内容。但是另一方面，字符串在许多方面都和基本类型的表现相似，而字符串是不可变的这一事实（即没法改变一个字符串值的内容），因此可以将字符串看成行为与基本类型相似的不可变引用类型 **Boolean、Number、String 这三个是Javascript中的基本包装类型，也就是这三个其实是一个构造函数，他们是Function的实例，是引用类型**，至于这里的String与以上说的String是同名，是因为其实上文说的String是指字符串，这里的String指的是String这个构造函数，上面那么写，是为了更好的理解，因为Javascript是松散类型的。我们可以看下String实例化的例子：

    var name = String("v5ant");
    alert(typeof name);//"string"
    var x=new String('12345')
    typeof x //object 
    x='12345'
    typeof x //string
    var author = "Tom";
    alert(typeof name);//"string"

**symbol** 新加入的一原始类型，表示独一无二的值 注意，`Symbol`函数前不能使用`new`命令，否则会报错。这是因为生成的Symbol是一个原始类型的值，不是对象 `Symbol`函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分 我们可以通过调用`Symbol()`函数来创建一个Symbol实例：

    let s1 = Symbol()
    let s2 = Symbol('another symbol')
    let s3 = Symbol('another symbol')
    
    s1 === s2 // false
    s2 === s3 // false

#### 应用场景1：使用Symbol来作为对象属性名(key)

    const PROP_NAME = Symbol()
    const PROP_AGE = Symbol()
    let obj = {
      [PROP_NAME]: "一斤代码"
    }
    obj[PROP_AGE] = 18
    
    obj[PROP_NAME] // '一斤代码'
    obj[PROP_AGE] // 18

随之而来的是另一个非常值得注意的问题：就是当使用了Symbol作为对象的属性key后，在对该对象进行key的枚举时，会有什么不同？在实际应用中，我们经常会需要使用`Object.keys()`或者`for...in`来枚举对象的属性名，那在这方面，Symbol类型的key表现的会有什么不同之处呢？来看以下示例代码：

    et obj = {
       [Symbol('name')]: '一斤代码',   
       age: 18,   
       title: 'Engineer'
    }
    Object.keys(obj)   // ['age', 'title']
    for (let p in obj) {   
        console.log(p)   
        // 分别会输出：'age' 和 'title'
    }
    Object.getOwnPropertyNames(obj)   // ['age', 'title']

由上代码可知，Symbol类型的key是不能通过`Object.keys()`或者`for...in`来枚举的，它未被包含在对象自身的属性名集合(property names)之中。所以，利用该特性，我们可以把一些不需要对外操作和访问的属性使用Symbol来定义。 也正因为这样一个特性，当使用`JSON.stringify()`将对象转换成JSON字符串的时候，Symbol属性也会被排除在输出内容之外： 然而，这样的话，我们就没办法获取以Symbol方式定义的对象属性了么？非也。还是会有一些专门针对Symbol的API，比如：

    // 使用Object的API
    Object.getOwnPropertySymbols(obj) // [Symbol(name)]
    // 使用新增的反射API
    Reflect.ownKeys(obj) // [Symbol(name), 'age', 'title']

应用场景2：使用Symbol来替代常量

#### 应用场景3：使用Symbol定义类的私有属性/方法