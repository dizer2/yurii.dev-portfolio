
(function($) {
  'use strict';

  /**  返回浏览器支持的动画css前缀  */
  var _prefix = (function(domNode) {
    var prefixs = ['webkit', 'Moz', 'o', 'ms'],
        props;

    for(var i in prefixs) {
      props = prefixs[i] + 'Transition';
      if(domNode.style[props] !== undefined) {
        return '-' + prefixs[i].toLowerCase() + '-';
      }
    }
    return false;
  })(document.createElement('div'));

  /** 默认配置参数 */
  var DEFAULT = {
    /** dom结构类名 */
    selectors: {
      sections: '.sections',
      section: '.section',
      page: '.page',
      active: '.active'
    },
    /** 当前页索引 */
    index: 0,
    /** 动画曲线 */
    timing: 'ease',
    /** 动画时间 */
    duration: 300,
    /** 是否循环播放 */
    loop: false,
    /** 是否显示分页dot */
    pagination: true,
    /** 是否支持键盘操作 */
    keyboard: false,
    /** 滑动方向 */
    direction: 'vertical',
    /** 滑动开始的事件 */
    beforeScroll: null,
    /** 滑动结束后的事件 */
    afterScroll: null
  };

  function FsScroll(element, options) {
    this.element = element;
    this.options = $.extend({}, DEFAULT, options || {});
    this.init();
  }

  FsScroll.prototype = {
    /** 初始化属性，事件入口 */
    init: function() {
      this.selectors = this.options.selectors;
      this.sections = this.element.find(this.selectors.sections);
      this.section = this.element.find(this.selectors.section);
      this.isVertical = this.options.direction === 'vertical' ? true : false;
      this.pagesCount = this.pagesCount();
      this.index = (this.options.index >=0 && this.options.index < this.pagesCount) ? this.options.index : 0;
      this.canScroll = true;

      this._addPosition();

      if(!this.isVertical || this.index) {
        this._initLayout();
      }

      if(this.options.pagination) {
        this._initPagination();
      }

      this._initEvent();
    },

    /** 获取滑动页面数量 */
    pagesCount: function() {
      return this.section.length;
    },

    /** 往前翻一页 */
    prev: function() {
      if(this.index) {
        this.index--;
      }else {
        this.index = this.pagesCount - 1;
      }
      this._scrollPage();
    },

    /** 往后翻一页 */
    next: function() {
      if(this.index === this.pagesCount - 1) {
        this.index = 0;
      }else {
        this.index++;
      }
      this._scrollPage();
    },

    /**
     * 获取每次滑动的距离
     */
    _getScrollLength: function() {
      return this.isVertical ? this.element.height() : this.element.width();
    },

    /** 为了正确的计算出每页的position，父亲容器要加上相对定位 */
    _addPosition: function() {
      var position = this.sections.css('position');
      if(!position || position !== 'relative') {
        this.sections.css('position', 'relative');
      }
    },

    /** 初始化水平滑动的布局 */
    _initLayout: function() {
      if(!this.isVertical) {
        var width = this.pagesCount * 100 + '%',
            pageWidth = (100/this.pagesCount).toFixed(2) + '%';
        this.sections.width(width);
        this.section.width(pageWidth).css('float', 'left');
      }

      if(this.index) {
        this._scrollPage(true);
      }
    },

    /** 初始化分页 */
    _initPagination: function() {
      var pageCls = this.selectors.page.substring(1),
          pageHtml = '<ul class=' + pageCls + '>';

      for(var i = 0; i < this.pagesCount; i++) {
        pageHtml += '<li></li>';
      }
      pageHtml += '</ul>';
      this.element.append(pageHtml);

      var pages = this.element.find(this.selectors.page);
      this.pageItem = pages.find('li');
      this.activeCls = this.selectors.active.substring(1);
      this.pageItem.eq(this.index).addClass(this.activeCls);

      if(this.isVertical) {
        pages.addClass('vertical');
        pages.addClass('vertical2');


      }else {
        pages.addClass('horizontal');
      }
    },

    /** 初始化事件 */
    _initEvent: function() {
      var self = this;

      /** 绑定鼠标滚轮事件
       * firefox 滚轮事件为 DOMMouseScroll
       */
      self.element.on('mousewheel DOMMouseScroll', function(e) {
        e.preventDefault();
        var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
        if(self.canScroll) {
          if(delta > 0 && (self.options.loop || self.index)) {
            self.prev();
          }else if(delta < 0 && (self.options.loop || self.index < self.pagesCount - 1)) {
            self.next();
          }
        }
      });

      /** 绑定键盘事件 */
      if(self.options.keyboard) {
        $(document).on('keyup', function(e) {
          var keyCode = e.keyCode;
          if(keyCode === 37 || keyCode === 38) {
            self.prev();
          }else if(keyCode === 39 || keyCode === 40) {
            self.next();
          }
        })
      }

      /**
       * 窗口resize事件
       * 获取当前的页面的offset，相对于视口的偏移，在偏移超过一半才滑动
       */
      var timer = null;
      $(window).on('resize', function(){
        clearTimeout(timer);
        timer = setTimeout(function() {
          // 处在第一页的偏移量在缩放过程中始终是0，不影响
          if(!self.index) {
            return;
          }

          var offset = self.section.eq(self.index).offset();
          var scrollLength = self._getScrollLength();
          var offsetDelta = self.isVertical ? offset.top : offset.left;
          if(Math.abs(offsetDelta) > scrollLength / 2) {
            if(offsetDelta > 0) {
              self.index--;
            }else {
              self.index++;
            }
          }
          self._scrollPage();
        }, 200)
      });

      /** 分页点击事件 */
      self.element.on('click', this.selectors.page + ' li', function(e) {
        self.index = $(this).index();
        self._scrollPage();
      });

      /** 过渡动画结束后触发 */
      if(_prefix) {
        self.sections.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', function() {
          self.canScroll = true;
          self._afterScroll();
        })
      }
    },

    /** 滑动到当前页面 */
    _scrollPage: function(init) {
      var self = this,
          dest = self.section.eq(self.index).position();

      if(!dest) return;

      self.canScroll = false;
      this._beforeScroll();

      if(_prefix) {
        var translate = self.isVertical ? 'translateY(-' + dest.top + 'px)' : 'translateX(-' + dest.left + 'px)';
        self.sections.css(_prefix + 'transition', 'all ' + self.options.duration + 'ms ' + self.options.timing);
        self.sections.css(_prefix + 'transform', translate);
      }else {
        // 不支持css3过渡动画的用jquery的动画函数兼容
        var animateCss = self.isVertical ? {top: -dest.top} : {left: -dest.left};
        self.sections.animate(animateCss, self.options.duration, function() {
          self.canScroll = true;
          self._afterScroll();
        })
      }

      if(self.options.pagination && !init) {
        self.pageItem.eq(self.index).addClass(self.activeCls).siblings('li').removeClass(self.activeCls);
      }
    },

    /** 滑动开始处理 */
    _beforeScroll: function() {
      var self = this;
      if(self.options.beforeScroll && $.type(self.options.beforeScroll) === 'function') {
        self.options.beforeScroll.call(self, self.section.eq(self.index), self.index);
      }
    },

    /** 滑动结束处理 */
    _afterScroll: function() {
      var self = this;
      if(self.options.afterScroll && $.type(self.options.afterScroll) === 'function') {
        self.options.afterScroll.call(self, self.section.eq(self.index), self.index);
      }
    }
  }

  /**
   * 绑定插件的jquery原型对象
   */
  $.fn.fsScroll = function(options) {
    return this.each(function() {
      var self = $(this),
          instance = self.data('fsScroll');

      if(!instance) {
        instance = new FsScroll(self, options);
        self.data('fsScroll', instance);
      }

      if(typeof options === 'string' && instance[options]) {
        return instance[options]();
      }
    })
  }

  $(function() {
    $('[data-fs-scroll]').fsScroll();
  })

})(jQuery);
