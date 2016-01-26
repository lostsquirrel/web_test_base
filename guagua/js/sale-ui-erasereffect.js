(function ($) {
    var defaults = {
        fillStyle: 'rgba(0,0,0,1)',
        maskColor: "#ddd",
        lineWidth: 40,
        lineCap: "round",
        lineJoin: "round",
        globalCompositeOperation: 'destination-out',
        percentage: 0.6,
        imgUrl: './ggk_mask.jpg',
        maskText: '刮奖区',
        textColor: '#330000',
        textFont: '30px Arial',
        textX: 100,
        textY: 100,
        maskType: 'default',
        afterDone: function () {
            alert('ok');
        }
    };

    var EraserEffect = function (element, options) {
        this.el = $(element);
        this.options = $.extend({}, defaults, options);
        this.creatCanvas();
        this.fillMask();
        this.bindEvent();
    };

    EraserEffect.prototype = {
        creatCanvas: function () {
            this.canvas = $('<canvas>').appendTo(this.el);
            this.ctx = this.canvas.get(0).getContext('2d');
            this.canvas.get(0).width = this.el.width();
            this.canvas.get(0).height = this.el.height();
            return this.canvas;
        },
        fillMask: function () {
            if (this.options.maskType == 'text') {
                this.textMask();
            } else if (this.options.maskType == 'img') {
                this.imgMask();
            } else {
                this.defaultMask();
            }

        },
        defaultMask: function () {
            this.ctx.fillStyle = this.options.maskColor;
            this.ctx.fillRect(0, 0, this.el.width(), this.el.height());
        },
        textMask: function () {
            this.defaultMask();
            this.ctx.fillStyle = this.options.textColor;
            this.ctx.font = this.options.textFont;
            this.ctx.fillText(this.options.maskText, this.options.textX, this.options.textY);
        },
        imgMask: function () {
            var self = this;
            this.preImage(function () {
                self.ctx.drawImage(this, 0, 0, self.el.width(), self.el.height());
            });
        },
        preImage: function (callback) {
            var img = new Image(); //创建一个Image对象，实现图片的预下载  
            img.src = this.options.imgUrl;

            if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数  
                callback.call(img);
                return; // 直接返回，不用再处理onload事件  
            }

            img.onload = function () { //图片下载完毕时异步调用callback函数。  
                callback.call(img); //将回调函数的this替换为Image对象  
            };
        },
        bindEvent: function () {
            var self = this;
            this.canvas.bind('mousedown touchstart', function (e) {
            	e.preventDefault();
            	self.startEffect(e);
            });
            this.canvas.bind('mousemove touchmove', function (e) {
            	e.preventDefault();
                e.stopPropagation();
                self.keepEffect(e);
            });
            this.canvas.bind('mouseup touchend', function (e) {
            	e.preventDefault();
            	self.endEffect(e);
            });
            this.el.bind('touchmove',function(e){
            	alert('333')
            });
        },
        startEffect: function (e) {
            this.isDrawing = true;
            var eventObject = this.getPosition(e);

            this.lastX = eventObject.x;
            this.lastY = eventObject.y;
        },
        keepEffect: function (e) {

            if (!this.isDrawing)
                return;
            var eventObject = this.getPosition(e);
            this.log(eventObject.x + " : " + eventObject.y);
            this.draw(eventObject.x, eventObject.y);
        },
        endEffect: function (e) {
            this.isDrawing = false;
            this.finishDraw();
        },
        draw: function (x, y) {

            this.ctx.fillStyle = this.options.fillStyle;
            this.ctx.lineWidth = this.options.lineWidth;
            this.ctx.lineCap = this.options.lineCap;
            this.ctx.lineJoin = this.options.lineJoin;
            this.ctx.globalCompositeOperation = this.options.globalCompositeOperation;

            this.ctx.beginPath();
            this.ctx.moveTo(this.lastX, this.lastY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();

            this.lastX = x;
            this.lastY = y;
        },
        getPosition: function (e) {
            var eventObject = {};
            var event = e.originalEvent;
            event = event.targetTouches ? event.targetTouches[0] : e;
            eventObject.x = event.pageX - this.canvas.offset().left;
            eventObject.y = event.pageY - this.canvas.offset().top;

            return eventObject;
        },
        finishDraw: function () {
            var w = this.el.width();
            var h = this.el.height();
            var data = this.ctx.getImageData(0, 0, w, h).data;
            for (var i = 0, j = 0; i < data.length; i += 4) {
                if (data[i] && data[i + 1] && data[i + 2] && data[i + 3]) {
                    j++;
                }
            }
            if (j <= w * h * this.options.percentage) {
                this.options.afterDone();
            }
        },
        log: function (text) {
            $('#log').text(text);
        }
    };

    $.fn.erasereffect = function (option) {
        this.each(function () {
            var $this = $(this),
                data = $this.data('erasereffect'),
                options = typeof option == 'object' && option;
            if (!data)
                $this.data('erasereffect', (data = new EraserEffect(
                    this, options)));
        });
    };

})(jQuery);