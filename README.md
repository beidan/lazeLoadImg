# lazeLoadImg
图片懒加载（图片出现在可视区域再加载）

#### 兼容性：兼容目前流行的全部浏览器，包括：IE、Firefox、Safari、Opera、Chrome）
##### 如果使用过程中有发现bug，请告诉我～谢谢！

#### 使用方法：
- 引入相应的js文件  
```<script src="js/lazeload.js"></script>```

- 初始化
```
var x = new lazyLoad();
x.init();
```

> **注意：**

```<img src="img/load.jpg" alt="img" lazy-src="img/goods001.jpg" height="640px">```

**src 属性放预加载的图片，lazy－src放实际展示的图片**

### **==优化：==**
#### 使用==函数节流==对滚动事件进行优化

**封装好的函数节流如下**
```
    /*
     * 函数功能：函数节流
     * fn  需要调用的函数
     * delay  函数需要延迟处理的时间
     * mustRunDelay  超过该时间，函数一定会执行
     * */
    var throttle = function (fn, delay, mustRunDelay) {
        var timer;  //使用闭包存储timer
        var t_start;
        //闭包返回的函数
        return function (val) {
            var args = arguments, t_curr = +new Date();  //使用+new Date() 将字符串转换成数字
            clearTimeout(timer);
            if (!t_start) {  // 使用!t_start 如果t_start=undefined或者null 则为true
                t_start = t_curr;
            }
            if (t_curr - t_start >= mustRunDelay) {
                fn.apply(null, args);
                t_start = t_curr;
            } else {
                timer = setTimeout(function () {
                    fn.apply(null, args);
                }, delay);
            }
        }
    };
    /*使用方法*/
    var throttle1 = throttle(fn, 500, 4000);
    //在该需要调用的函数内部调用此函数
    throttle1(val); //此处传人的参数为以上fn需要传人的参数
    
```



- 详细内容见博客地址
[博客园地址](http://www.cnblogs.com/beidan/p/5648240.html)
