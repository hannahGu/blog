//页面特效，这里用到jquery最简单的插件写法
$.extend({
    /******************************* 手机幻灯片特效开始***************************/
    banner: function (ele) {
        // 1.0 获取幻灯片的个数
        var imgSize = $(ele).find("img").size();
 
        // 2.0 获取幻灯片的宽度和宽度
        var imgHeight = 0;
        var imgWidth = 0;

            imgWidth = $(ele).width();
            imgHeight = $(ele).outerHeight(true);

        // 3.0 设置 <ul> 标签的宽度为：个数*单个宽度，及阻止li继承父类，这样为了让<li>有足够的空间浮动成行排列，并显示所有幻灯片
        $(ele).children("ul").width(imgSize * imgWidth).children("li").width(imgWidth).show();
 
        // 4.0 根据幻灯片个数生成按钮
 
        // 4.0.1 创建按钮容器并添加样式
        $btn = $("<div class='btn position-absolute'></div>");
        $btn.css({
            "z-index": "100",
            "width": "100%",
            "height": "20px",
            "left": "0",
            "top": (imgHeight - 20) + "px",
            "line-height": "20px",
            "text-align": "center"
        });
 
        // 4.0.2 生成按钮，特别声明：以下的样式大可在css文件中定义，在这里我就不定义了。
        for (var i = 0; i < imgSize; i++) {
            $dot = $("<span class='dot display-inline-block'></span>");
            $dot.css({
                "width": "12px",
                "height": "12px",
                "border-radius": "50%",
                "background": "#ccc",
                "margin-right": "8px"
            });
            $btn.append($dot);
        }
 
        // 4.0.3 设置第一个选中，选中样式为active，
        $btn.find("span:eq(0)").attr("id", "active").css({ "background": "#f00" });
 
        // 4.0.4 添加到容器中
        $(ele).append($btn);
 
        var isEnd = true;   // 定义标识，判断是否滑动完成
 
        // 5.0 为生成的按钮绑定点击事件
        $btn.children("span").on({
            click: function () {
                // 5.0.1 获取点击的索引
                var index = $(this).index();
 
                // 5.0.2 为点击的按钮添加选中样式，并滑动幻灯片
                $(this).attr("id", "active").css({ "background": "#f00" }).siblings("span").removeAttr("id").css({ "background": "#ccc" });
 
                // 5.0.3 滑动幻灯片
//                if (isEnd == true) {
//                    isEnd == false;
//                    $(ele).children("ul").animate({
//                        marginLeft: -index * imgWidth
//                    }, 300, function () {
//                        isEnd = true;
//                    });
//                }
//////////////////////加isEnd的作用是？ 没发现不同
                $(ele).children("ul").animate({
                        marginLeft: -index * imgWidth
                    }, 300, function () {
                        isEnd = true;
                    });
                
            }
        });
 
        // 6.0 为幻灯片添加触摸事件，前台必须引用hammer.js
 
        // 6.0.1 创建一个新的hammer对象并且在初始化时指定要处理的dom元素
        var hammertime = new Hammer($(ele)[0]);
        //hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });　　// 此代码会导致滚动条不能滑动，请注释后再使用
 
        // 向左滑动
        hammertime.on("swipeleft", function (e) {
            // 6.0.2 判断当前幻灯片的索引
            var currentIndex = $btn.find("span#active").index();
 
            // 6.0.3 判断是否是最后一张
            if (currentIndex + 1 < imgSize) {
                // 主动点击按钮
                $btn.children("span").eq(currentIndex + 1).click();
            }
        });
        // 向右滑动
        hammertime.on("swiperight", function (e) {
            // 6.0.2 判断当前幻灯片的索引
            var currentIndex = $btn.find("span#active").index();
 
            // 6.0.4 判断是否是第一张
            if (currentIndex > 0) {
                $btn.children("span").eq(currentIndex - 1).click();
            }
        });
 
        /******************************* 手机幻灯片特效结束***************************/
        /*
         * 注：完善版应该还有自动滑动，和监控浏览器时间，在这里我就不详细写了，除非有朋友要求
         */
    }
});
