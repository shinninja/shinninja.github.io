$(function () {
    NINJA.INIT();
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
