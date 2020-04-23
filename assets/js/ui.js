$(function () {
    NINJA.INIT();
});

var NINJA = {
    UI: {

        /* animationBottomNav */
        animationBottomNav: function(){
            var $bottomNav = $('.hm-bottom-nav');
            var $service = $('.hm-bottom-nav__link--service');
            var serviceTalk = 'hm-bottom-nav__link--service-talk';
            var serviceVoice = 'hm-bottom-nav__link--service-voice';

            if (!$bottomNav.length) return;
            
            function intervalClass(){
                if ($service.hasClass(serviceTalk)) { //음성쇼핑
                    $service.removeClass(serviceTalk).addClass(serviceVoice);
                    $('.hm-bottom-nav__service-item--talk').fadeOut('fast');
                    $('.hm-bottom-nav__service-item--voice').fadeIn('fast');
                } else { //톡상담
                    $service.removeClass(serviceVoice).addClass(serviceTalk);
                    $('.hm-bottom-nav__service-item--voice').fadeOut('fast');
                    $('.hm-bottom-nav__service-item--talk').fadeIn('fast');
                }
            }

            setInterval(intervalClass, 3500);
        },

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
