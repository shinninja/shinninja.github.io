

 /**
* bottom nav service animation
*
* @author : 신다혜
*/
animationBottomNav: function(){
if (!$('.hm-bottom-nav').length) return;

var $service = $('.hm-bottom-nav__link--service');
var serviceTalk = 'hm-bottom-nav__link--service-talk';
var serviceVoice = 'hm-bottom-nav__link--service-voice';

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