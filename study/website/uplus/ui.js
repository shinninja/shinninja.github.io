var UPLUS = {
    /* http://www.cu.co.kr/cu/main.do#firstPage */
    UI : {
        GNB: {
            $header: null,
            $gnbbg: null,
            $gnbSub: null,
            $gnbTarget: null,

            init: function(){
                $header = $('header');
                $gnbbg = $header.find('.gnbbg');
                $gnbSub = $('.gnb_sub');
                $gnbTarget = $('.gnb > li > a');
            },

            active: function(){
                var gnbSubMaxHeight = $gnbSub.map(function(){
                    return $(this).height();
                }).get();
                gnbSubMaxHeight = Math.max.apply(null, gnbSubMaxHeight);
    
                $gnbTarget.on('focusin mouseenter', function(){
                    $header.addClass('gnbActive');
                    $gnbSub.stop().fadeIn();
                    $gnbbg.css({height:gnbSubMaxHeight + 100}, 50);
                    // $(this).addClass('on');
                });

                $header.on('mouseleave', function(){
                    UPLUS.UI.GNB.inactive();
                });

                $gnbTarget.on('focusout', function(){
                    UPLUS.UI.GNB.inactive();	
                });
            },
    
            inactive: function(){
                $header.removeClass('gnbActive');
                $gnbSub.hide();
                $gnbbg.css({height:'0px'}, 100);
                // $gnbTarget.removeClass('on');
            },

            initEvt: function(){
                this.init();
                this.active();
            }
        }
    },

    INIT: function(){
        UPLUS.UI.GNB.initEvt();
    }
}

$(function () {
    UPLUS.INIT();
});