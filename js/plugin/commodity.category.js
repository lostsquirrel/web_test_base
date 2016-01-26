var CommodityWindow = function(opertions) {
    this.opertions = opertions;

    if (!opertions.id || opertions.id == '')
        return;

    this.mainMenu = jQ('#' + opertions.id); //commodityWindow

    CommodityWindow.clicked = true;

    CommodityWindow.items = [];

    creatItemFlag = true; //opertions.creatItemFlag || true;

    jQ('#submitCommodity').attr('disabled', true);

    //添加(加载中)遮挡面板
    CommodityWindow.mask = jQ('<div class="mask"></div>').appendTo(this.mainMenu);

    //添加左右滑动按钮
    this.createSlideMenu();

    //创建商品呈现窗口
    this.panel = jQ('<div class="commodityPanels"></div>').appendTo(this.mainMenu);

    //添加事件集(左右滑动按钮事件)
    this.addEvents();

    if(creatItemFlag)
    	new CommodityItem(this.panel,opertions);

    //清除浮动效果
    createClear(this.mainMenu);
}

CommodityWindow.prototype = {
    createSlideMenu: function() {
        this.mainMenu.append('<div class="leftMenu"></div><div class="rightMenu"></div>');
    },

    addEvents: function() {
        var self = this,
            left = this.mainMenu.find(".leftMenu"),
            right = this.mainMenu.find(".rightMenu");

        //为左滑动添加悬浮事件
        left.hover(
            function() {
                jQ(this).addClass("leftMenuHover");
            },
            function() {
                jQ(this).removeClass("leftMenuHover");
            }
        );

        //为右滑动添加悬浮事件
        right.hover(
            function() {
                jQ(this).addClass("rightMenuHover");
            },
            function() {
                jQ(this).removeClass("rightMenuHover");
            }
        );

        left.click(function() {

            var childs = self.panel.children();
            if (!childs) return;
            var first = jQ(self.panel.children()[0]);
            //判断是否右滑动
            if (first.offset().left < self.panel.offset().left && CommodityWindow.clicked) {
                childs.each(function() {
                    //右滑动
                    jQ(this).animate({
                        left: '+=' + first.width()
                    }, function() {
                        CommodityWindow.clicked = true;
                    })
                });
                CommodityWindow.clicked = false;
            }
        });

        right.click(function() {
            var childs = self.panel.children();
            if (!childs) return;
            var last = jQ(self.panel.children()[childs.length - 1]);
            //判断是否可以左滑动
            if (last.offset().left + last.width() > self.panel.offset().left + self.panel.width() && CommodityWindow.clicked) {
                childs.each(function() {
                    //左滑动
                    jQ(this).animate({
                        left: '-=' + last.width()
                    }, function() {
                        CommodityWindow.clicked = true;
                    })
                });
                CommodityWindow.clicked = false;
            }
        })
    },

    itemClick: function(fun) {
        CommodityWindow.itemClickFunction = fun;
    }
}

var createClear = function(jDom) {
    jDom.append('<div class="clear"></div>');
}

var CommodityItem = function(mainMenu, opertions) {
    this.opertions = opertions;
    this.parent = mainMenu;
    //请求后台数据（创建第一级分类）
    this.requestData();

    return this.container;
}

CommodityItem.prototype = {

    requestData: function() {

        var url = this.opertions.requestUrl,
            self = this;

        //添加遮挡层
        CommodityWindow.mask.show();
        
        //请求后台数据
        var ajax = jQ.post(url, this.opertions, function(res) {

            if (!res.status) return;

            var data = res.data;

            if (!(data || data['data'].length == 0)) return;

            //递归解析JSON数据并放入窗口中
            temp = self.createList(self.parent, data)

            //删除二级类目的标题
            self.panel = (data.index > 1) ? self.removeUl(temp) : temp;
            // 
            self.parent.append(self.panel);

            // 去掉底边样式(虚线)
            jQ(self.parent.find('.likeUl').last()[0]).css({
                'border': '0px'
            });

            //设置显示的名字(你当前选择的类目)
            self.panel.commodityName = self.opertions.commodityName;

            //隐藏遮挡层
            CommodityWindow.mask.hide();

            //添加事件集
            self.addEvents();

            //存入数组
            self.setArray();

            //设置商品集的位置
            self.setPosition();

            //创建已选择的类目
            CommodityWindow.Selector.change(jQ('#selector'), CommodityWindow.items.slice(1));
        });

        ajax.error(function() {
            alert('网络异常请联系管理员！')
        });
    },

    removeUl: function(jDom) {
    	//删除二级类目的标题
        jDom.find('.category').remove();
        //删除Ul
        var items = jDom.find('.commodity').unwrap();

        return jDom.append(jQ('<div class="likeUl"></div>').append(items));
    },

    createList: function(parent, map) {
        var list = map.data,

        	//commodityItem
            self = this,

            //判断是否是子类目(返回对象index为一表示第一级分类（最高级）)
           //` isSub = (list && list.index !== 1),

            //创建包含的容器
            //返回对象，和分类或属性具体条目对象包含sid(大分类和首字母分类对象不包含sid)
            jDom = (map.sid == undefined) ? jQ('<div class="likeUl"></div>') : jQ('<div class="commodityPanel"></div>');

        if (jQ.isArray(map)) {

            jQ.each(map, function() {
                //继续拆分数组
                jDom.append(self.createList(jDom, this));
            })

        } else {

            if (jQ.isArray(map.data)) {
                if (jDom.hasClass('likeUl')) 
                	jDom.append('<div class="category">' + map.name + '</div>')

                //如果对象中还有数据继续拆分
                jQ.each(map.data, function() {
                    jDom.append(self.createList(jDom, this));
                })
            } else {
                //显示商品名称
                jDom = jQ('<div class="commodity"></div>');
                jDom.append('<span class="commodityName">' + map.name + '</span>' + '<span class="lead">></span>');

                //清除浮动效果
                createClear(jDom);
            }
            //设置缓存数据
            this.setCache(jDom, map);
        }

        return jDom;
    },

    setCache: function(jDom, object) {

        var cache = {};

        jQ.each(object, function(n, v) {
            if (n !== 'data' || jDom.hasClass('commodityPanel'))
                cache[n] = v;
        })

        jDom.data('cache', cache);
    },

    addEvents: function() {
        var self = this,
            btn,
            item;
        this.panel.delegate('.commodity', 'click', function(e) {
            //删除无关联的商品集
            self.removePanel();
            //设置需要提交的参数项
            self.setOpertions(jQ(this));
            self.panel.find('.commodityClick').removeClass('commodityClick');
            jQ(this).addClass('commodityClick');
            //提交按钮状态设置
            bnt = jQ('#submitCommodity');
            /* leaf = 0                当本项sid
             * leaf = 1 && pro == -1 　取当前项的sid
             * leaf = 1 && pro != -1 　取最上一级的sid
             * leaf = 2                不请求。
             */
            //判断是否显示提交按钮
            var itemCache = jQ(this).data('cache');
            var panelCache = self.panel.data('cache');
            if (itemCache.leaf == 0) {
                self.opertions.sid = itemCache.sid;
                bnt.removeClass('submit');
                jQ('#submitCommodity').attr('disabled', true);
                //创建新的窗口
                new CommodityItem(self.parent, self.opertions);

            } else if (itemCache.leaf == 1) {
                if (panelCache.pro * 1 == -1) {
                    self.opertions.sid = itemCache.sid;
                } else {
                    self.opertions.sid = panelCache.sid;
                }
                bnt.addClass('submit');
                jQ('#submitCommodity').attr('disabled', false);
                //创建新的窗口
                new CommodityItem(self.parent, self.opertions);
            } else {
            	// leaf == 2
                bnt.addClass('submit');
                jQ('#submitCommodity').attr('disabled', false);
            }
            var parm = jQ(this).data('cache');
            parm.pro = panelCache.pro;
            CommodityWindow.Submitor.setOpertions(bnt, self.opertions);
            if (jQ.isFunction(CommodityWindow.itemClickFunction)) CommodityWindow.itemClickFunction(parm);
        })

        this.panel.delegate('.commodity', 'hover', function() {
            jQ(this).toggleClass('commodityOver');
        })
    },
    setOpertions: function(jDom) {
        var pObj = this.panel.data('cache'),
            sObj = jDom.data('cache');
        //在选择的类目中显示的名称
        this.opertions.commodityName = jDom.find('.commodityName').text();
        this.opertions.pro = pObj.pro;
        this.opertions.index = pObj.index;
        this.opertions.sid = pObj.pro < 0 ? sObj.sid : pObj.sid;
    },
    removePanel: function() {
        var self = this,
            index = this.panel.index,
            temp = [];

        jQ.each(CommodityWindow.items, function() {
            //判断需要删除的商品集
            this.index > index ? this.remove() : temp.push(this);
        })
        CommodityWindow.items = null;
        CommodityWindow.items = temp;
    },
    setArray: function() {
        //将新的商品集对象放入数组中
        CommodityWindow.items.push(this.panel);
        //设置唯一标示符
        this.panel.index = CommodityWindow.items.length;
    },
    setPosition: function() {
        var p = this.panel,
            prev = CommodityWindow.items[(p.index - 2)],
            left = (p.index > 1) ? prev.position().left + prev.width() : (p.index - 1) * p.width();
        p.css('left', left);
        if (p.offset().left + p.width() > this.parent.offset().left + this.parent.width()) {
            right = this.parent.parent().find(".rightMenu").click();
        }
        var i = 1 + 1;
    }
}
CommodityWindow.Selector = {
    change: function(jDom, items) {
        this.panel = jDom;
        var jDom = jQ(this.panel.find('.selectItems')[0]);
        //清空已选择的类目
        jDom.html('');
        if ((!items) || items.length == 0) return;
        //显示已经选择的类目
        jQ.each(items, function() {
            var text = this.commodityName;
            jDom.append(jQ('<span></span>').text(text).append('<span>></span>'));
        })
    }
}
CommodityWindow.Submitor = {
    binded: false,


    setOpertions: function(jDom, opertions) {
        jDom.bind('click', function(event) {
            if (jDom.hasClass('submit')) {
                jDom.data('cache', opertions);
            } else {
                event.preventDefault();
            }
        })
    }
}
