# about js

<!-- TOC -->

- [about js](#about-js)
    - [函数节流和函数防抖](#函数节流和函数防抖)
    - [amd & cmd & commonjs模块机制](#amd--cmd--commonjs模块机制)
        - [为什么需要模块化](#为什么需要模块化)
        - [模块化是什么，怎么用：](#模块化是什么怎么用)
        - [三者的比较](#三者的比较)
    - [MVP MVC MVVM](#mvp-mvc-mvvm)
    - [浏览器的同源策略及跨域](#浏览器的同源策略及跨域)
    - [js event loop](#js-event-loop)
    - [vue router的原理（history）](#vue-router的原理history)
    - [浏览器的渲染过程 & contentLoad & load & readyState](#浏览器的渲染过程--contentload--load--readystate)
    - [前端性能优化的点](#前端性能优化的点)
        - [懒加载的实现](#懒加载的实现)
            - [懒加载的实现思路一](#懒加载的实现思路一)
    - [实现一个emit on](#实现一个emit-on)
    - [promise & async/await](#promise--asyncawait)

<!-- /TOC -->

##函数节流和函数防抖

下面是简单实现，关于underscore源码链接如下：

http://www.cnblogs.com/fsjohnhuang/p/4147810.html

```javascript
/**
* 简单实现 函数防抖
**/
function debounce(func, wait) {
    var timer;

    return function() {
        var args = arguments,
            context = this;

        clearTimeout(timer);

        timer = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    }
}
```

```javascript
/**
* 简单实现 函数节流
**/
function throttle(func, wait) {
    var lastTime,
        timer;

    return function() {
        var args = arguments,
            context = this,
            now = + new Date();

        if (lastTime && lastTime + wait > now) {
            clearTimeout(timer);

            timer = setTimeout(function() {
                lastTime = now;
                func.apply(context, args);
            }, wait);
        } else {
            lastTime = now;
            func.apply(context, args);
        }
    }
}
```

疑问： 为什么这里用settimeout，不用settimeout也能执行呀



## amd & cmd & commonjs模块机制

###为什么需要模块化

前端模块化的好处：模块化的开发方式可以提高代码复用率，方便进行代码的管理。通常一个文件就是一个模块，有自己的作用域，只向外暴露特定的变量和函数。

>* 有效防止命名冲突；
>* 声明不同的js文件之间的依赖，便于管理；
>* 提高代码复用效率；

单一入口，统一加载；

commonjs是同步加载；

amd采用异步加载；

amd更适合浏览器，因为支持异步加载模块依赖；

###模块化是什么，怎么用：

>* CMD是什么，哪些库使用了AMD规范实现，又怎么使用；原理是什么；
>* AMD是什么，哪些库使用了AMD规范实现，又怎么使用；原理是什么；
>* commonjs是什么，哪些库使用了AMD规范实现，又怎么使用；原理是什么；

CommonJS的使用:
同步方式加载模块。在服务端，模块文件都存在本地磁盘，读取非常快，所以这样不会有问题。但是在浏览器端，由于网络原因，更合理的方案是使用异步加载；

```javascript
    // 定义模块do.js
    function doSomething() {
        // do something
    }

    moudule.exports = {
        doSomething: doSomething
    }

    // 引用自定义的模块，参数包含路径，可省略.js
    var do = require('./do');
    do.doSomething();

    //引用核心模块时，不需要带路径
    var http = require('http');
    http.createService(...).listen(3000);
    
```

requirejs（AMD规范的实现）
异步加载模块，更适合browser端。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成后，这个回调函数才会运行。

```javascript
    <script src="js/require.js" data-main="js/main"> //指定网页程序的主模块
    require.config({
        paths: {
            "jquery", "jquery-3.0.1.min",
            "underscore": "underscore.min",
            "backbone": "backbone.min"
        }
    }); //配置模块名
    
    require.config({
        baseUrl: "js/lib",
        paths: {
            "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
            "underscore": "underscore.min",
            "backbone": "backbone.min"
        }
    }); //配置加载路径，也可以把父目录都写在paths的value中
    
    //入口函数
    require(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
        //do something here
    });

    //模块定义，不依赖其他模块
    define(function() {
        var doSomething = function (x, y) {
            //do something here
        };
        
        return {
            add: add
        };
    });
    
    //模块定义，依赖其他模块
    define(['anotherModule'], function(mouduleA) {
        var doSomething = function (x, y) {
            //使用moduleA dosomething
        };

        return {
            add: add
        };
    });

    //导出非AMD模块化的函数（模块化）
    function doSomething() {
        //do something
    }

    //导出一个方法
    requirejs.config({
        paths: {
            hello: "hello"
        },

        shim: {
            hello: {
                exports: "doSomething"
            }
        }
    });

    //导出多个方法
    requirejs.config({
        paths: {
            dosomething: "dosomething"
        },

        shim: {
            dosomething: {
                init: funtion() {
                    return {
                        dosomethingA: doSomethingA,
                        dosomethingB: doSomethingB
                    }
                }
            }
        }
    });
```

sea.js(CMD规范的实现)

```javascript
    // 定义模块do.js
    defefine(function(require, exports, module) {
        var $ = require('jquery');

        var doSomething = function() {
            // do something
        }

        exports.dosomething = doSomething;
    });

    //加载模块
    seajs.use(['do.js'], function(do) {
        //use do.js do something
    });
    
```

ES6 module

```javascript
    /** 定义模块 math.js **/
    var basicNum = 0;
    var add = function (a, b) {
        return a + b;
    };
    export { basicNum, add };

    /** 引用模块 **/
    import { basicNum, add } from './math';
    function test(ele) {
        ele.textContent = add(99 + basicNum);
    }

```
使用`import`命令的时候，用户需要知道所要加载的变量名或函数名。其实ES6还提供了`export default`命令，为模块指定默认输出，对应的`import`语句不需要使用大括号。这也更趋近于AMD的引用写法。

###三者的比较
参考文档：
https://juejin.im/post/5aaa37c8f265da23945f365c

**AMD推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行**

**CommonJS运行时加载, ES6编译时加载**

* 运行时加载： CommonJS模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上读取方法。
* 编译时加载：ES6模块不是对象，而是通过`export`命令显示指定输出的代码， `import`时采用静态命令的形式。即在`import`时可以指定加载某个输出值，而不是加载整个模块，这种加载成为 "编译时加载"。 

CommonJS加载的是一个对象（module.exports属性），该对象只有在脚本运行完才会生成。而ES6模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

**CommonJS输出的是一个值的拷贝， ES6模块输出的是值的引用**

CMD是另一种js模块化方案，它与AMD很类似，不同点在于：AMD 推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行。此规范其实是在sea.js推广过程中产生的。

ES6的模块不是对象，`import`命令会被 JavaScript 引擎静态分析，在编译时就引入模块代码，而不是在代码运行时加载，所以无法实现条件加载。也正因为这个，使得静态分析成为可能。



## MVP MVC MVVM

## 浏览器的同源策略及跨域



## js event loop



## vue router的原理（history）

## 浏览器的渲染过程 & contentLoad & load & readyState

渲染过程和各个钩子的关系

## 前端性能优化的点

### 懒加载的实现

####懒加载的实现思路一



## 实现一个emit on

## promise & async/await


