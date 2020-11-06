'use strict';

$(function () {
    // NINJA.INIT();
});

var NINJA = {
    UI: {

        /* tabsType01 */
        tabsType01: function(target){
            var $target = $(target);
            var $tabItem = $target.find('.jsTabHead > li');
            var $tabCont = $target.find('.jsTabCont');
            var idx = 0;

            $tabItem.on('click', function(e){
                e.preventDefault();

                $(this).addClass('on').siblings().removeClass('on');
                idx = $(this).index();
                $tabCont.eq(idx).addClass('on').siblings().removeClass('on');
            });
        },

        /* tabsType02 */
        tabsType02: function(tabItem, tabCont){
            var $tabItem = $(tabItem);

            $(tabItem).addClass('on');
        }

    },

    INIT: function(){
        NINJA.UI.animationBottomNav();
    }
}

var Accordion = (function(){
    function Accordion(params) {
        // if(this.length === 0) return this;

        // options
        this.options = $.extend({
            wrap: null,
            btn: '.js-accordion__btn',
            item: '.js-accordion__item',
            panel: '.js-accordion__panel',
            active_class: 'active',
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
    
                // $panel[isOpen ? 'slideUp' : 'slideDown']().trigger(isOpen ? 'hide' : 'show');
    
                if (self.options.multiple == true) {
                    if(isOpen){
                        $item.removeClass(self.options.active_class);
                        $panel.slideUp();
                    }else{
                        $item.addClass(self.options.active_class);
                        $panel.slideDown();
                    }
                } else {
                    if(isOpen){
                        $item.removeClass(self.options.active_class);
                        $panel.slideUp();
                    }else{
                        $(self.options.wrap).find(self.options.item).removeClass(self.options.active_class);
                        $(self.options.wrap).find(self.options.panel).slideUp();
                        $item.addClass(self.options.active_class);
                        $panel.slideDown();
                    }
                }
            });
        });
        
    }
    return Accordion;
}());