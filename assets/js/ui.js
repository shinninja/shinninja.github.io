'use strict';

$(function () {
});

/* Accordion */
var Accordion = (function(){
    function Accordion(params){
        // if(this.length === 0) return this;

        // options
        this.options = $.extend({
            wrap: null,
            btn: '.js-accordion__btn',
            item: '.js-accordion__item',
            panel: '.js-accordion__panel',
            activeClass: 'active',
            multiple: false
        }, params);
        this.$wrap = $(this.options.wrap);
        this.init();
    } 

    Accordion.prototype.init = function(){
        var self = this;

        this.$wrap.find(self.options.btn).each(function(){
            $(this).on('click', function(){
                var $item = $(this).parent(self.options.item);
                var $panel = $(this).next(self.options.panel);
                var isOpen = $panel.is(':visible');

                if (self.options.multiple == true) {
                    if(isOpen){
                        self.hide($item, $panel);
                    }else{
                        self.show($item, $panel);
                    }
                } else {
                    if(isOpen){
                        self.hide($item, $panel);
                    }else{
                        $(self.options.wrap).find(self.options.item).removeClass(self.options.activeClass);
                        $(self.options.wrap).find(self.options.panel).slideUp();
                        self.show($item, $panel);
                    }
                }
            });
        });
        
    }
    Accordion.prototype.hide = function($item, $panel){
        $item.removeClass(this.options.activeClass);
        $panel.slideUp();
    }
    Accordion.prototype.show = function($item, $panel){
        $item.addClass(this.options.activeClass);
        $panel.slideDown();
    }
    return Accordion;
}());

/* Tabs */
var Tabs = (function(){
    function Tabs(params){
        // options
        this.options = $.extend({
            wrap: null,
            btn: '.js-tabs__btn',
            panel: '.js-tabs__panel',
            activeClass: 'active',
            activePanel: 0
        }, params);
        this.$wrap = $(this.options.wrap);
        this.init();
    }

    Tabs.prototype.init = function(){
        var self = this;

        this.set();

        self.$wrap.find(self.options.btn).on('click', function(e){
            e.preventDefault();

            var tabBtn = $(this);
            self.initEvt(tabBtn);
        });

    }

    Tabs.prototype.set = function(){
        this.$wrap.find(this.options.btn).parent().eq(this.options.activePanel).addClass(this.options.activeClass);
        this.$wrap.find(this.options.panel).eq(this.options.activePanel).addClass(this.options.activeClass);
    }

    Tabs.prototype.initEvt = function(tabBtn){
        var idx = tabBtn.parent().index();

        this.$wrap.find(this.options.btn).parent().siblings().removeClass(this.options.activeClass);
        tabBtn.parent().addClass(this.options.activeClass);

        this.$wrap.find(this.options.panel).removeClass(this.options.activeClass).eq(idx).addClass(this.options.activeClass);
    }
    return Tabs;
}());