var lazyLoad = (function () {
    var element_obj = [],
        download_count = 0,
        doc_body;
    /*
     获取窗口的高度
     document.documentElement.clientHeight    IE/CH支持
     document.body.client    通过body元素获取内容的尺寸
     */
    /*获取当前元素相对于窗口顶部的距离*/
    /*
     获取元素属性
     elemnt.offsetWidth
     elemnt.offsetHeight
     仅IE5不支持，放心使用吧
     offsetHeight  可以获取元素的高度尺寸，包括：height + padding[top,bottom] + bottom[top,bottom]
     element.offsetTop  //获取元素与其偏移参考父元素顶部的间隔距离  可以获取元素距其上一级的偏移参考父元素顶部的距离。包括：margin[top] + top
     element.offsetLeft  //获取元素与其偏移参考父元素左边的间隔距离
     */
    function getViewport() {
        if (document.compatMode == "BackCompat") {
            var Height = document.body.clientHeight;
        } else {
            var Height = document.documentElement.clientHeight;
        }
        return Height;
    }

    function getScrollTop() {
        if (document.compatMode == "BackCompat") {
            var elementScrollTop = document.documentElement.scrollTop;
        } else {
            var elementScrollTop = document.body.scrollTop;
        }
        return elementScrollTop;
    }
    function getElementViewTop(element) {
        if (element) {
            var actualTop = element.offsetTop;
            var current = element.offsetParent;
            while (current !== null) {
                actualTop += current.offsetTop;
                current = current.offsetParent;
            }
            return actualTop - getScrollTop();
        }
    }

    //从所有相关元素中找出需要延时加载的元素
    function initElementMap() {
        var el = document.getElementsByTagName('img');
        for (var j = 0, len2 = el.length; j < len2; j++) {
            //判断当前的img是否加载过了，或者有lazy_src标志  [未完成]
            if (typeof (el[j].getAttribute("lazy_src"))) {
                element_obj.push(el[j]);
                download_count++;
            }
        }
    }

    //防止多次加载
    function lazy() {
        if (!download_count) return;
        var innerHeight = getViewport();
        for (var i = 0, len = element_obj.length; i < len; i++) {
            var t_index = getElementViewTop(element_obj[i]); //得到图片相对document的距上距离
            if (t_index - getScrollTop() < innerHeight) {
                element_obj[i].src = element_obj[i].getAttribute("lazy-src");
                delete element_obj[i];
                download_count--;
            }
        }
    }

    function init(tags) {
        initElementMap();
        lazy();
        window.onscroll = window.onload = function () {
            setTimeout(function () {
                lazy();
            }, 1000)
        }
    };
    return {
        init: init
    }
})();
lazyLoad.init();







