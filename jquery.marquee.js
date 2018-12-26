    //文字滚动跑马灯
    $.fn.marquee = function(opt) {
        return $(this).each(function() {
            var $me = $(this);
            var $wrap = $me.parent('.marquee-container');
            var itemsHeight = $me.outerHeight(true);
            var $items = $me.find('.marquee-item');
            var defaults = {
                speed: 30, //滚动每个元素所耗毫秒时间，即速度,值越小越快
                direction: 'top', //滚动方向bottom|top|left|right
                visible: 1, //容器可见数量
                height: null //容器像素高度
            };
            opt = $.extend({}, defaults, opt);
            var cssRelative = {
                position: 'relative',
                zIndex: 1,
                overflow: 'hidden'
            };
            $wrap.css(cssRelative);
            $me.css(cssRelative);

            var isHorizontal = opt.direction === 'left' || opt.direction === 'right';
            var isVertical = opt.direction === 'bottom' || opt.direction === 'top';
            var isReverse = opt.direction === 'bottom' || opt.direction === 'right';

            //复制一份插入首尾
            var $copy = $me.children().clone().addClass('marquee-item-copy');
            isReverse ? $me.prepend($copy) : $me.append($copy);

            // 容器宽度高度样式设置
            if (isHorizontal) {
                var $itemsAll = $me.find('li');
                $wrap.css({
                    height: $items.outerHeight(true),
                    width: $items.outerWidth(true) * opt.visible
                });
                $itemsAll.css({
                    float: 'left'
                });
                var $clear = $('<div style="clear:both;height:0;visibility:hidden;"></div>');
                $me.append($clear).css({
                    width: $items.outerWidth(true) * $itemsAll.length
                });
            } else {
                $wrap.css('height', $items.outerHeight(true) * opt.visible);
            }
            opt.height && $wrap.css('height', opt.height);

            var itemsWidth = $me.outerWidth(true) / 2; //宽度需要除去复制的

            //整体偏移$items.length个元素高或宽度(bottom|right)
            if (opt.direction === 'bottom') {
                $me.css('marginTop', -itemsHeight);
            }
            if (opt.direction === 'right') {
                $me.css('marginLeft', -itemsWidth);
            }

            var cssObj = {};
            var cssStyle = isVertical ? 'top' : 'left';
            var cssValue = isReverse ? '+=1' : '-=1';
            cssObj[cssStyle] = cssValue;
            //滚动函数
            var loop = function() {
                $me.animate(cssObj, opt.speed, 'linear', function() {
                    var moveValue = Math.abs(parseInt($me.css(cssStyle)));
                    if (moveValue > (isVertical ? itemsHeight : itemsWidth)) {
                        $me.css(cssStyle, 0);
                    }
                });
                //IE 不能执行
                /*$me.css(cssObj);
                var moveValue = Math.abs(parseInt($me.css(cssStyle)));
                if (moveValue > (isVertical ? itemsHeight : itemsWidth)) {
                    $me.css(cssStyle, 0);
                }*/
            };

            clearInterval(t);
            var t = window.setInterval(loop, 1);
            $me.hover(function() {
                $me.stop(true, false);
                clearInterval(t);
            }, function() {
                t = setInterval(loop, opt.speed);
            });
        });
    };
    $('.marquee-list1').marquee({
        speed: 20,
        direction: 'top',
        visible: 1
    });
    $('.marquee-list2').marquee({
        speed: 20,
        direction: 'bottom',
        visible: 2
    });
    $('.marquee-list3').marquee({
        speed: 20,
        direction: 'left',
        visible: 1
    });
    $('.marquee-list4').marquee({
        speed: 20,
        direction: 'right',
        visible: 1
    });
