// Analysys
var pubMode 		= false; // �쇰툝由ъ떛 紐⑤뱶
var winH 			= 0; 	 // Window Height
var oldIE 			= false; // IE 9�댄븯
var ie8 			= false; // IE8
var isMobile		= false; // 紐⑤컮��
var isIOS			= false; // IOS
var isIE;					 // Edge �ы븿 �듭뒪�뚮줈��
var isChrome		= false; // Chrome 泥댄겕
var ieV;					 // IE version

//================================================================================ ui function
(function(t){
	var layout = {
			state : false, // layout init �ㅽ뻾 �곹깭
			// Layout 以�鍮�
			ready : function(){
				if( pubMode == false ){// 媛쒕컻紐⑤뱶
					//layout.init();
				} else {// �쇰툝由ъ떛 紐⑤뱶
					layout.winPop();
					var url = '../../html_h1/ajax/gnb.html';
					if( window.location.href.indexOf('_h3') > -1 ){
						url = '../../html_h1/ajax/gnb_h3.html';
					}
					if( $('.header').length > 0 && $('.header *').length == 0 ){// Header �놁쓣��
						$('.header').load(url + ' header > *',function(){// Header 濡쒕뱶
							layout.readyChk();
						});
					} else if( $('.header .gnbArea').length > 0 ){
						layout.init();
					}
					if( $('.footer').length > 0 && $('.footer *').length == 0 ){// Footer �놁쓣��
						$('.footer').load(url + ' footer > *',function(){// Footer 濡쒕뱶
							layout.readyChk();
						});
					}
					if( $('.quick').length > 0 && $('.quick *').length == 0 ){// Quick �놁쓣��
						$('.quick').load(url + ' .quick > *',function(){// Quick 濡쒕뱶
							layout.readyChk();
						});
					}
				}
			},
			// ready �꾨즺�� �ㅽ뻾
			init : function(){
				if( layout.state == false ){
					layout.state = true;
					if( $('#pageWrap').length == 0 ){
						$('.wrapper').attr('id','pageWrap');
						$('html').addClass('ready');
					}
					if( $('#content.main').length > 0 ){
						try{
							mainSecInit();
						} catch(e){
							console.log(e);
						}
						if( $('.crumbArea').length > 0 ){
							$('.crumbArea').remove();
							$('.menu li.active').removeClass('active');
						}
					}
					if( isIE ){
						$('footer').attr('tabindex','0');
					}
					layout.resizeEvent();
					gnb.init();
					layout.footerInit();
					layout.quickInit();
					layout.curtain();
					lp.move();
					ui.init();
					wa.focusCenterAlign();
					wa.chromeFocus();
				}
			},
			readyChk : function(){
				if( $('.header *').length > 0 && $('.footer *').length > 0 ){
					if( $('.quick').length > 0 ){
						if( $('.quick *').length > 0 ){
							if( $('.certContain').length == 0 ){
								layout.init();
							} else {
								layout.certInit();
							}
						}
					} else {
						if( $('.certContain').length == 0 ){
							layout.init();
						} else {
							layout.certInit();
						}
					}
				}
			},
			// resizeEvent
			resizeEvent : function(){
				$(window).resize(function(){
					resizeFunc();
				})
				function resizeFunc(){
					clearInterval( gnb.barmoveInterval );
					gnb.barmoveInterval = setInterval( function(){gnb.barMove()}, gnb.delay );
					console.log('resizeEvent');
					layout.quickResize();
				}
				resizeFunc();
			},
			// footer init
			footerInit : function(){
				console.log('footerInit');
			},
			// quick init
			quickTimeout : new Object(),
			quickInit : function(){
				var quickIcoPos = [];
				$('.quick li a, .quick li button').attr('tabindex', -1);
				for(var i = 0 ; i < 10 ; ++i){
					quickIcoPos.push( i*58 );
				}
				$('.quick ul, .quick li, .quick .openBtn').addClass('easeInOutCirc');
				quickClose();
				var maxW = 160;
				$('.quick ul .txt').each(function(){
					if( $(this).outerWidth() + 46 > 160 ){
						maxW = $(this).outerWidth() + 46;
					} 
				});
				$('.quick li').css( 'width', maxW ); 
				$('.quick .openBtn').bind({
					'click':function(){
						$(this).closest('.quick').toggleClass('on');
						if( $('aside.quick').hasClass('on') ){
							quickOpen();
						} else {
							quickClose();
						}
					}
				});
				$('.quick ul').on('transitionend webkitTransitionEnd oTransitionEnd msTransitionEnd', quickMotionEnd );
				function quickOpen(){
					for(var i = 0 ; i <  $('.quick li').length ; ++i){
						var time = 0.1*i+'s';
						$('.quick li:eq('+i+')').css({'transition-delay': time, 'top': 0 });
					}
					$('.quick li a, .quick li button').removeAttr('tabindex');
					$('.quick ul').css('height', $('.quick li').length * 58 + 12 );
					$('.crdQuick .btnArea a, .crdQuick .btnArea button').attr('tabindex', -1);
					$('.quick .openBtn .waTxt').text('�묎린');
				}
				function quickClose(){
					for(var i = $('.quick li').length -1 ; i >= 0 ; --i){
						var time = 0.08*($('.quick li').length - 1 - i)+'s';
						$('.quick li:eq('+i+')').css({'transition-delay': time, 'top': 0 });
						$('.quick li:eq('+i+')').css('top', ($('.quick li').length-i)*58 + 6 );
					}
					$('.quick li a, .quick li button').attr('tabindex',-1);
					$('.quick ul').css('height', 0 );
					clearInterval( layout.quickTimeout );
					$('.quick').removeClass('active');
					$('.quick .openBtn .waTxt').text('�쇱튂湲�');
				}
				function quickMotionEnd(e){
					if( $(e.target).is('ul') ){
						if( $('.quick').hasClass('on') ){
							$('.quick').removeClass('active');
							layout.quickTimeout = setTimeout(function(){
								$('.quick').addClass('active');
								$('.quick ul').attr('tabindex','-1').focus()
							},500);
						} else {
							console.log("quick has not on");
						}
					}
				}
				$('.quickTopBtn').bind({
					'click':function(){
						if( $('.parallax').length == 0 ){
							$('body,html').animate({scrollTop: 0},300);
						} else {
							$('.pxNavi li:eq(0) a').trigger('click');
							
						}
					}
				});
				layout.chatInit();
			},
			quickMenuTimeout : new Object(),
			quickResize : function(){
				var quickOriginalRight = 54; // 理쒖큹 right媛�
				var winW = $(window).width(); 
				var winH = $(window).height(); 
				var bodyLeft = (winW - 1224);
				$('body').removeClass('fit');
				if(winW < 1142){ // �붿씠�� 以꾩뼱�ㅼ닔 �녿뒗 援ш컙 1080 + 52 + 10 = 1142; 1080�� 而⑦뀗痢�, 52�� �듬찓�� �볦씠, 10�� �듬찓�댁� 而⑦뀗痢� �ъ씠 嫄곕━.
					$('body').addClass('hScroll fit');
					$('body').css({ 'left': 0 });
					$('.quick').css({'left': 'auto', 'right':winW-1142+$(window).scrollLeft()});
					$('.hScroll .header.sticky').css({"left":-$(window).scrollLeft(), "right":0});
				// body媛� 醫뚯륫�쇰줈 遺숈뼱�� �섎뒗 援ш컙. 1080 + (52 + 10 + 10 )*2 = 1224; 1080�� 而⑦뀗痢�, 52�� �듬찓�� �볦씠, 54�� �� right 媛�, 10�� �듬찓�댁� 而⑦뀗痢� �ъ씠 嫄곕━, 10�� 醫뚯슦 �щ갚
				} else if(winW < 1224){
					$('body').addClass('hScroll');
					$('body').css({ 'left': bodyLeft });
					$('.hScroll .header.sticky').css({"left":parseInt($('.hScroll').css('left')), "right":'0'});
					$('.quick').css({'left': 'auto' , 'right': '10px'});
				// body媛� 媛��대뜲 �뺣젹�대㈃�� �붿옄�몄뿉 �댁튂吏� �딅뒗 援ш컙. 1080 + (52 + 54 +10)*2 = 1312; 1080�� 而⑦뀗痢�, 52�� �듬찓�� �볦씠, 54�� �� right 媛�, 10�� �듬찓�댁� 而⑦뀗痢� �ъ씠 嫄곕━
				} else if(winW < 1312){ 
					$('body').removeClass('hScroll');
					var rightPos = winW - 1080 - (winW - 1080)*0.5 - 10 - 52;
					$('.quick').css({'left': 'auto', 'right': rightPos});
				} else {
					$('body').removeClass('hScroll');
					$('.quick').css({'left': "auto", 'right': quickOriginalRight});
				}
			},
			chatInit : function(){
				$('.chatbot').addClass('on');
				setTimeout(function(){
					$('.chatbot').removeClass('on');
					$('.chatbot').bind({
						'mouseover':function(){
							$(this).addClass('on');
						},
						'mouseout':function(){
							$(this).removeClass('on');
						}
					});
				},4000);
			},
			// cert init
			certInit : function(){
				var certURL = '../../html_h1/ajax/cert.html';
				$('.certContain > a').remove();
				var btnHTML = $('.certContain').html();
				$('.certContain').empty();
				$('.certContain').load(certURL + ' .loadHTML > *',function(){// Quick 濡쒕뱶
					$('.certContain').prepend('<!-- 怨듯넻 �몄쬆 怨듯넻媛쒕컻 �곸뿭 (s) -->');
					$('.certContain').append('<!-- 怨듯넻 �몄쬆 怨듯넻媛쒕컻 �곸뿭 (e) -->');
					var lastSection = $('.certContain > div').last();
					$(lastSection).append( btnHTML );
					$('.certContain section').unwrap();
					layout.init();
				});
			},
			winPop : function(){
				if( $('.winPop').length > 0 ){
					$('.popHead, .popBody, .popInner, .popCont, .popContain, .popup, .popWrap').addClass('winDef')
					$(window).resize(function(){
						$('.popBody.winDef').height( $(window).height()-200 );
					})
					$('html, body').addClass('windowPop');
					$('.popBody.winDef').height( $(window).height()-200 );
				}
			},
			loadingInterval : new Object(),
			loadingInit : function(_txt, _target){
				var txt = _txt;
				if( _target != '' && _target != undefined ){
					var target = _target;
				} else {
					var target = 'body';
				}
				
				if( _txt != '' && _txt != undefined ){
					var resultTxt = '<p class="txt">'+txt+'</p>'
					$(target).append('<div class="loadingWrap"><span></span><p class="blind">濡쒕뵫以�</p>'+resultTxt+'</div>');
				} else {
					$(target).append('<div class="loadingWrap"><span></span><p class="blind">濡쒕뵫以�</p></div>');
				}
				if( oldIE == true ){
					var position = ['center 0','center -90px','center -180px',' center -270px','center -360px'];
					var posCnt = 0;
					layout.loadingInterval = setInterval(function(){
						posCnt++;
						if( posCnt >= position.length ){
							posCnt = 0;
						}
						$('.loadingWrap > span').css('background-position', position[posCnt] );
					},200)
				}
			},
			loadingRemove:function(){
				console.log('loadingRemove');
				if( $('.loadingWrap .txt').length == 0 ){
					$('.loadingWrap').remove();
				}
				if( oldIE == true ){
					clearInterval( layout.loadingInterval );
				}
			},
			curtain : function(){
				if( $('.noticePop').length > 0 ){
					$('.noticePop').addClass('uiAct');
					$('.noticePop').prependTo( $('.header') )
				}
				$('.noticePop .btn_close').bind({
					'click':function(){
						$('.noticePop').slideUp(300, function(){
							$(this).remove();
						});
					}
				});
			},
			compareBoxInit : function(){
				var cardArry = [];
				var feeArry = [];
				var benefitArry = [];
				for( var i = 0 ; i < $('.compareBox > li').length ; ++i ){
					$('.compareBox > li:eq('+i+') .card').css('height','auto');
					$('.compareBox > li:eq('+i+') .fee').css('height','auto');
					$('.compareBox > li:eq('+i+') .benefit').css('height','auto');
					cardArry.push( $('.compareBox > li:eq('+i+')').find('.card').outerHeight() );
					feeArry.push( $('.compareBox > li:eq('+i+')').find('.fee').outerHeight() );
					benefitArry.push( $('.compareBox > li:eq('+i+')').find('.benefit').outerHeight() );
					var cardH = Math.max.apply( null, cardArry );
					var feeH = Math.max.apply( null, feeArry );
					var benefitH = Math.max.apply( null, benefitArry );
				}
				$('.compareBox > li .card').each(function(){$(this).css('height', cardH );})
				$('.compareBox > li .fee').each(function(){$(this).css('height', feeH );})
				$('.compareBox > li .benefit').each(function(){$(this).css('height', benefitH + 20 );})
			}
	}
	var gnb = {
			delay : 200,
			openState : false,
			openInterval : new Object(),
			outInterval : new Object(),
			barmoveInterval : new Object(),
			contentTopPos : 0, // content top offset
			targetHeader : 0, // target header height
			stickyState : null, // GNB Sticky State
			defContentTop : 0,
			init : function(){
				gnb.skipInit();
				gnb.headerInit();
				gnb.menuFilter();
				gnb.oneDepthInit();
				gnb.crumbInit();
				gnb.barInit();
				gnb.dimmedInit();
				gnb.disabledInit();
				gnb.activeDisplay();
				$('.header .gnb .menu > li.active .subArea').stop().hide();
				gnb.stickyInit();
				$('.header').addClass('onLoad');
				wa.gnbSrchInit();
			},
			skipInit : function(){
				$('#skipNavi a').bind({
					'click':function(){
						$( $(this).attr('href') ).attr('tabindex','-1').css('outline', 'rgba(0,0,0,0)').focus();
						if( $(this).attr('href') == '#gnb' ){
							$('.cateTit').attr('tabindex','-1'); 
						}
					}
				});
			},
			// header Control
			headerInit : function(){
				$('.header h1.logo a').bind({
					'focusin':function(){
						if( $('.header').hasClass('sticky') ){
							$('.header').removeClass('sticky');
							$('html, body').scrollTop(0);
						}
					}
				});
				if( $('.header').hasClass('onLoad') == false ){
					$('.header .gnb .subArea').hide();
					$('.header .cateTit').hide().addClass('easeSineOut');
					$('.header .gnbArea').prepend('<div class="naviOut focusSet blind first" tabindex="0"></div><div class="naviOut focusSet blind last" tabindex="0"></div>');
					$('.header').bind({
						'mouseleave': function(e){
							outInterval = setTimeout( function(){gnb.out();}, gnb.delay*2);
						},
						'mouseenter': function(e){
							$('.header').addClass('init');
							clearInterval( gnb.barmoveInterval );
							clearTimeout( gnb.outInterval );
						}
					});
					$('.header .gnbArea .naviOut.first').bind({
						'focusin': function(e){
							gnb.out();
							$('.header .menu').find(':input, a').first().focus();
						}
					});
					$('.header .gnbArea .naviOut.last').bind({
						'focusin': function(e){
							gnb.out();
							$('.header').removeClass('sticky');
							$(window).scrollTop(0);
							$('.header .topArea').find(':input, a').last().focus();
						}
					});
					// GNB right Menu
					$('.header .topArea').append('<div class="sitemapTit"><h2><span>�꾩껜硫붾돱</span></h2></div>');
					$('.header .gnbArea .right [class^=gnb_]').addClass('easeOutBack');
					$('.header .gnbArea .right [class^=gnb_]').bind({
						'mouseover focusin':function(){
							clearTimeout(gnb.openInterval);
							gnb.out();
						}
					});
					gnb.utilBtnInit();
				}
			},
			// �④�硫붾돱 愿�由�
			menuFilter : function(){
				$('.header .gnb .menu li').each(function(){
					if( $(this).data('blind') == true ){
						$(this).addClass('hiddenMenu');
					}
				});
			},
			
			// 1李� 硫붾돱 Init
			oneDepthInit : function(){
				$('.header .gnb .menu > li > a').bind({
					'mouseover focusin': function(e){
						clearTimeout(gnb.openInterval);
						var target = $(this).parent();
						if( gnb.openState == false ){
							gnb.openInterval = setTimeout( function(){gnb.oneDepthOver( target );}, gnb.delay);
						} else {
							gnb.openInterval = setTimeout( function(){gnb.oneDepthOver( target );}, gnb.delay*0.5);
						}
					},
					'mouseout focusout': function(e){
						clearTimeout(gnb.openInterval);
					},
					'click': function(e){
						if( $('.sitemapOpen').length > 0 ){
							e.preventDefault();
							gnb.sitemapAniState = true;
							$('.header .gnb .menu > li').removeClass('on active');
							$(this).parent().addClass('active');
							gnb.sitemapMove( $(this).parent().index() );
							$('.sitemapWrap h3:eq('+$(this).parent().index()+')').attr('tabindex', '0').focus(); 
						}
					}
				});
			},
			
			// GNB Open
			oneDepthOver : function(target){
				if( $('.sitemapOpen').length == 0 ){
					$('.header .gnb .menu > li .subArea').hide();
					$('.header .gnb .menu > li').removeClass('on');
					if( gnb.openState == false ){
						$(target).addClass('on');
						$(target).find('.subArea').stop().slideDown(300,'easeInOutQuad');
						//$('.d1.dimmed').stop().fadeIn(0, 'easeOutQuad');
						$('.d1.dimmed').show();
					} else {
						$(target).addClass('on');
						$(target).find('.subArea').show();
					}
					gnb.openState = true;
					gnb.barMove();
				} else {
					$('.header .gnb .menu > li').removeClass('on');
					$(target).addClass('on');
					gnb.barMove();
				}
			},
			
			// dimmed over
			dimmedInit : function(){
				$('.header').after('<div class="d1 dimmed"/>');
			},
			
			// GNB Out
			out : function(){
				$('.header .gnb .menu > li.on .subArea').stop().slideUp(250,'easeOutQuad');
				//$('.d1.dimmed').stop().fadeOut(0, 'easeOutQuad');
				if( $('.sitemapOpen').length == 0 ){
					$('.d1.dimmed').hide();
				}
				$('.header .gnb .menu > li').removeClass('on');
				$('.header').removeClass('init');
				gnb.openState = false;
				gnb.activeDisplay();
			},
			
			// BarMove
			barInit : function(){
				$('.header .gnbArea').append('<span class="d1bar"></span>');
				gnb.barmoveInterval = setInterval( function(){gnb.barMove()}, gnb.delay );
			},
			barMove : function (){
				var target;
				if( $('.header .gnb .menu > li.on').length > 0 ){
					target = $('.header .gnb .menu > li.on');
				} else {
					target = $('.header .gnb .menu > li.active');
				}
				if( $('body').hasClass('sitemapOpen') == false ){
					if( $(target).data('blind') == true ){
						target = null;
					}
				}
				if( $(target).length > 0 ){
					var barL = $(target).offset().left + parseInt( $(target).find('a').css('padding-left') ) - 6 - parseInt( $('body').css('left') );
					var barW = $(target).find('a').width() + 12;
					$('.header .gnbArea .d1bar').css({"left":barL + barW*0.5, "width":barW});
				} else {
					$('.header .gnbArea .d1bar').css({"width":0});
				}
			},
			
			// Gnb �쒖꽦��
			activeDisplay : function(){
				$('.header .gnb .active').addClass('on');
				gnb.barMove();
				gnb.openState = false;
			},
			
			// BreadCrumb Init
			crumbInit : function(){
				if($('.crumbArea').length > 0){
					$('.header').addClass('hasCrumb');
					$('.crumbArea').addClass('clfix');
					$('.crumbArea .dropMenu').append('<div class="blind focusSet" tabindex="0"></div>');
					$('.crumbArea .dropBtn').append('<i class="blind">�� 媛숈� �곸뒪�� 硫붾돱紐⑸줉</i><i class="blind off">�쇱튂湲�</i><i class="blind on">�묎린</i>');
					$('.crumbArea .dropBtn').bind({
						'click':function(e){
							e.preventDefault();
							var target = $(this).closest('li');
							if($(target).hasClass('on')){
								$(target).removeClass('on');
								$(target).find('.dropMenu').stop().slideUp(250);
							} else {
								$('.crumbArea .crumb > li.on').removeClass('on').find('.dropMenu').stop().slideUp(250);
								$(target).addClass('on');
								$(target).find('.dropMenu').stop().slideDown(250);
							}
							gnb.bodyBind();
						}
					});
					$('.crumbArea .dropMenu .focusSet').bind({
						'focusin':function(){
							var target = $(this).closest('li');
							$(target).find('>a').trigger('click');
							if( $(target).index() != $('.crumbArea .crumb > li').length - 1 ){
								$(target).next('li').find('a').focus();
							} else {
								$(target).find('>a').focus();
							}
						}
					});
					$('.header').after( $('.crumbArea') );
				}
			},
			bodyBind : function (){
				$('body').bind({
					'mousedown':function(e){
						if( $(e.target).closest('.crumbArea').length == 0 ){
							$('.crumbArea .crumb > li.on').removeClass('on').find('.dropMenu').slideUp(250);
							$('body').unbind('mousedown');
						}
					}
				});
			},
			
			// gnb sticky Settting
			stickyInit : function(){
				gnb.defContentTop = 0;
				gnb.contentTopPos = 138;///*$('.gnbArea').outerHeight()*/60 + $('.header').outerHeight(); // 60�� GNB �곗깋 硫붾돱 �곸뿭 sticky �꾩뿉 �뷀뤃�� �믪씠 媛�
				gnb.targetHeader = 78;//$('.header .topArea').outerHeight() - 2;
				var scrLeft = 0;
				$(window).scroll(function(){
					if( $('body').hasClass('popOn') == false && $('body').hasClass('notice') == false ){
						if( $('.sitemapOpen').length == 0 ){
							gnb.addGnbSticky();
						} else {
							if( gnb.sitemapAniState == false ){
								gnb.sitemapActive();
							}
						}
					}
					if( $(window).scrollLeft() != scrLeft && $('.quick').length > 0 ){
						clearTimeout( layout.quickMenuTimeout );
						scrLeft = $(window).scrollLeft();
						layout.quickMenuTimeout = setTimeout(function(){
							layout.quickResize();
						},50)
					}
				});
			},
			addGnbSticky : function(){
				if ($(window).scrollTop() >= gnb.targetHeader){
					var nowSticky = true;
					if( nowSticky != gnb.stickyState )gnb.stickyState = true; gnb.stickyCtrl(true);
				} else {
					nowSticky = false;
					if( nowSticky != gnb.stickyState )gnb.stickyState = false; gnb.stickyCtrl(false);
				}
				if( $(window).scrollLeft() != 0 ){
					//$('.header.sticky, .header.main').css({"left":-$(window).scrollLeft(), "right":'auto'});
					//$('.header.sticky').css({"left":-$(window).scrollLeft(), "right":'auto'});
					$('body.hScroll.fit .quick').css('left', 1080-$(window).scrollLeft());
				} else {
					//$('.header.sticky').css({"left":0, "right":0});
				}
				//$('.hScroll .header.sticky').css({"left":parseInt($('.hScroll').css('left')), "right":'0'});
			},
			stickyCtrl : function(sticky){
				if( sticky == true ){
					$('.header').addClass('sticky');
					$('.d1bar').addClass('easeOutQuint');
					$('.header .cateTit').fadeIn(200,function(){gnb.barMove();$('.d1bar').removeClass('easeOutQuint');});
					if( $('.hasCrumb ').length == 0 ){
						$('#content').css('padding-top', gnb.contentTopPos );
					} else {
						$('.crumbArea').css('padding-top', gnb.contentTopPos );
					}
					$('.quick').addClass('topVisible');
					layout.quickResize();
				//sticky release
				} else {
					$('.d1bar').addClass('easeOutQuint');
					$('.header').removeClass('sticky');
					$('.header .cateTit').fadeOut(200,"easeOutExpo", function(){gnb.barMove();$('.d1bar').removeClass('easeOutQuint');});
					if( $('.hasCrumb').length == 0 ){
						$('#content').css('padding-top', gnb.defContentTop );
					} else {
						$('.crumbArea').css('padding-top', 0 );
					}
					$('.header').css({"left":0, "right":0});
					$('.quick').removeClass('topVisible');
					layout.quickResize();
				}
			},
			utilBtnInit : function(){
				if( $('.header .gnb_search span').length < 2 ){
					$('.header .gnb_search span').wrap('<span/>');
				}
				if( $('.header .gnb_sitemap span').length < 2 ){
					$('.header .gnb_sitemap span').wrap('<span/>');
				}
				$('.header .gnb_sitemap').closest('li').siblings().addClass('notSitemap');
				$('.header .gnb_search').bind({
					'click' : function(e){
						e.preventDefault();
						if( $('.srchOpen').length == 0 ){
							gnb.searchOpen();
						} else {
							gnb.searchClose();
						}
					}
				});
				$('.header .srchContain .btnIco_close').bind({
					'click' : function(e){
						e.preventDefault();
						gnb.searchClose();
					}
				});
				$('.header .gnb_sitemap').bind({
					'click' : function(e){
						e.preventDefault();
						if( gnb.sitemapAniState == false ){
							if( $('.srchOpen').length > 0 ){
								$('.header .gnb_search').trigger('click');
							}
							if( $('.sitemapOpen').length == 0 ){
								gnb.sitemapOpen();
							} else {
								gnb.sitemapClose();
							}
						}
					}
				});
			},
			searchOpen : function(){
				$('body').addClass('srchOpen');
				$('.srchContain').stop().slideDown(500,'easeInOutQuint', function(){gnb.srchRotateAnal();});
				gnb.srchRotateAnal();
				$('.d1.dimmed').delay(500).show();
				$('.gnb_search .blind').text('寃��� �リ린');
			},
			searchClose : function(){
				$('body').removeClass('srchOpen');
				$('.srchContain').stop().slideUp(250,'easeOutQuad');
				$('.d1.dimmed').hide();
				$('.gnb_search .blind').text('寃���');
			},
			srchRotateAnal : function(){
				$('.header .srchContain .cardImg:not(.rotate) img').each(function(){
					if( $(this).height() > $(this).width() ){
						$(this).closest('.cardImg').addClass('rotate');
					}
				});
			},
			sitemapAniState : false,
			sitemapOpen : function(){
				gnb.sitemapAniState = true;
				$('.gnb_sitemap .blind').text('�꾩껜硫붾돱 �リ린');
				$('body').addClass('sitemapOpen zIndex');
				if( $('.sitemapContain').length == 0 ){
					gnb.sitemapMake();
				}
				$('.header .gnbArea .right li.notSitemap').stop().fadeOut(100);
				$('.sitemapContain').show();
				$('#content, .footer').hide();
				$('body,html').scrollTop(0);
				gnb.stickyCtrl(false);
				if( $('.gnbArea .menu > li').length >= 10 ){
					$('.gnbArea .gnb').addClass('smallFont');
				}
				$('#pageWrap').css('min-height', $('.sitemapContain').outerHeight() + 200 );
				$('.crumbArea').stop().fadeOut(100);
				$('.sitemapTit').stop().fadeIn(200, function(){
					gnb.sitemapAniState = false;
				});
				// �묎렐�� 愿���
				$('.sitemapFocusSet').remove();
				$('.gnb_sitemap').before('<div class="sitemapFocusSet btnB" tabindex="0"></div>');
				$('.gnb_sitemap').after('<div class="sitemapFocusSet btnA" tabindex="0"></div>');
				$('.sitemapTit').before('<div class="sitemapFocusSet titB" tabindex="0"></div>');
				$('.sitemapTit').after('<div class="sitemapFocusSet titA" tabindex="0"></div>');
				$('.gnb .menu').before('<div class="sitemapFocusSet menuB" tabindex="0"></div>');
				$('.gnb .menu').after('<div class="sitemapFocusSet menuA" tabindex="0"></div>');
				$('.sitemapContain').prepend('<div class="sitemapFocusSet first" tabindex="0"></div>');
				$('.sitemapContain').append('<div class="sitemapFocusSet last" tabindex="0"></div>');
				$('.sitemapFocusSet').bind({
					'focusin':function(){
						if( $(this).hasClass('btnA') ){ // �꾩껜硫붾돱踰꾪듉�먯꽌 �뺣갑��
							$('.sitemapTit h2 > span').attr('tabindex','-1').focus(); // �꾩껜硫붾돱 �띿뒪�몃줈 �ъ빱��
						} else if( $(this).hasClass('titA') ){ // �꾩껜硫붾돱 �띿뒪�몄뿉�� �뺣갑��
							$('.gnb .menu > li:eq(0) a').first().focus(); // gnb 泥ル쾲吏� 硫붾돱濡� �ъ빱��
						} else if( $(this).hasClass('menuA') ){ // gnb 留덉�留� 硫붾돱�먯꽌 �뺣갑��
							//$('.sitemapWrap h3:eq(0)').attr('tabindex', '-1').focus(); // sitemapWrap 泥ル쾲吏� 硫붾돱 h3濡� �ъ빱��
							$( wa.getEnabledFocus('.sitemapContain .subWrap:eq(0)') ).first().focus(); // sitemapWrap 泥ル쾲吏� 硫붾돱 h3濡� �ъ빱��
							$('body,html').scrollTop(0);
						} else if( $(this).hasClass('last') ){ // sitemapWrap 留� 留덉�留� 硫붾돱�먯꽌 �뺣갑��
							$('.gnb_sitemap').focus(); // �꾩껜硫붾돱踰꾪듉�쇰줈 �ъ빱��
						} else if( $(this).hasClass('first') ){ // sitemapWrap�먯꽌 ��갑��
							$('.gnb .menu > li:last-child a').first().focus(); // gnb 留덉�留� 硫붾돱濡� �ъ빱��
						} else if( $(this).hasClass('menuB') ){ // gnb 泥ル쾲吏� 硫붾돱�먯꽌 ��갑��
							$('.sitemapTit h2 > span').attr('tabindex','-1').focus(); // �꾩껜硫붾돱 �띿뒪�몃줈 �ъ빱��
						} else if( $(this).hasClass('titB') ){  // �꾩껜硫붾돱 �띿뒪�몄뿉�쒖뿉�� ��갑��
							$('.gnb_sitemap').focus(); // �꾩껜硫붾돱踰꾪듉�쇰줈 �ъ빱��
						} else if( $(this).hasClass('btnB') ){ // �꾩껜硫붾돱踰꾪듉�먯꽌 ��갑��
							$( wa.getEnabledFocus('.sitemapContain .subWrap:last-child ') ).last().focus(); // sitemapWrap 留� 留덉�留� 硫붾돱濡� �ъ빱��
						}
					}
				});
				
				// �쒖꽦�� 愿���
				$('.gnb .menu > li.active').attr('data-active', true).removeClass('active on');
				$('.gnb .menu > li:eq(0)').addClass('active on');
				gnb.barMove();
				// code init
				$('.sitemapContain .subWrap').each(function(){
					var nowTxt = $(this).find('.tit').text();
					for( var i = 0 ; i < $('.header .gnb .menu > li').length ; ++i ){
						if( $('.header .gnb .menu > li:eq('+i+') > a').text() == nowTxt ){
							$(this).data('index', i );
							break;
						}
					}
				});
			},
			sitemapClose : function(){
				$('body').removeClass('sitemapOpen');
				$('.sitemapFocusSet').remove();
				$('.gnb_sitemap .blind').text('�꾩껜硫붾돱');
				$('.header .gnbArea .right li.notSitemap').stop().fadeIn();
				$('.sitemapContain').hide();
				$('#content, .footer').show();
				$('.d1.dimmed').hide();
				$('body,html').scrollTop(0);
				if( $('.parallax').length > 0 ){
					if( nowSection != 0 ){
						gnb.stickyCtrl(true);
					}
				}
				$('#pageWrap').css('min-height', '0' );
				$('.crumbArea').stop().fadeIn(100);
				$('.sitemapTit').stop().fadeOut(200,function(){
					setTimeout(function(){
						if( $('.sitemapOpen').length == 0 ){
							$('body').removeClass('zIndex');
						}
					},100);
				});
				// �쒖꽦�� 愿���
				$('.gnb .menu > li').removeClass('active on');
				$('.gnb .menu > li[data-active]').removeAttr('data-active').addClass('active on');
				gnb.barMove();
			},
			sitemapMake : function(){
				$('.header').after('<div class="sitemapContain"><div class="sitemapWrap gnb">');
				$('.gnbArea .menu .subWrap').each(function(){
					$('.sitemapWrap').append( '<div class="subWrap">'+$(this).html() + '</div>' ); 
				});
				gnb.disabledInit();
				$('.sitemapWrap .banner').remove();
				$('.sitemapWrap .leftBanner .tit').each(function(){
					$(this).wrap('<h3></h3>');
				});
			},
			sitemapActive : function(){
				for( var i = $('.sitemapWrap .subWrap').length-1 ; i >=0 ; --i ){
					var targetYPos = $('.sitemapWrap .subWrap:eq('+i+')').offset().top - $( window ).scrollTop() - 176;
					if( targetYPos < -50 ){
						gnbActiveChange( $('.sitemapWrap .subWrap:eq('+i+')').data('index') + 1 );
						break;
					}
				}
				if( $( window ).scrollTop() == 0 ){
					gnbActiveChange(0);
				}
				if( $(window).scrollTop() + $(window).height() == $(document).height() ){
					gnbActiveChange( $('.header .gnb .menu > li').length - 1 );
				}
				function gnbActiveChange(_idx){
					var idx = _idx;
					$('.header .gnb .menu > li.active').removeClass('on active');
					$('.header .gnb .menu > li:eq('+idx+')').addClass('active on');
					gnb.barMove();
				}
			},
			sitemapMove : function(_idx){
				var idx = _idx;
				for( var i = 0 ; i < $('.sitemapWrap .subWrap').length ; ++i ){
					if( $('.sitemapWrap .subWrap:eq('+i+')').data('index') == idx ){
						var posY = $('.sitemapWrap .subWrap:eq('+i+')').offset().top - 176;
						$( analysis.getBody() ).stop().animate({scrollTop: posY},300, function(){
							gnb.sitemapAniState = false;
						});
						break;
					}
				}
			},
			disabledInit : function(){
				$('.subWrap li.disabled > a').attr({'role':'button','aria-disabled':true, 'tabindex':-1});
				$('.subWrap li.disabled > a').bind({
					'click':function(e){
						e.preventDefault();
					}
				});
			}
	}
	var ui = {
			init : function(){
				dp.init();
				ui.formTblInit();
				ui.tabInit();
				ui.iptInit();
				ui.accoInit();
				ui.cardSelInit();
				ui.customSltInit();
				ui.dataListInit();
				ui.cardListInit();
				ui.conEllipInit();
				ui.scollMove();
				ui.swiperInit();
				ui.eventListInit();
				ui.conBlockInit();
				ui.tblScrollInit();
				ui.autocompleteInit();
				ui.cmsAddClass();
				ui.crdSticky();
				ui.cardLinkInit();
				tip.init();
				wa.update();
			},
			// FormTable init
			formTblInit : function(){
				$('.formTbl .th').each(function(){
					if( $(this).hasClass('req') ){
						if( $(this).find('.required').length == 0 ){
							$(this).append('<span class="required">*<span>�꾩닔</span></span>');
						}
					}
				});
				$('span.sign').attr('aria-hidden',true);
			},
			// input init
			iptInit : function(){
				$('.setCard .ipt[type=tel], .ipt.date, .ipt.month, .ipt:checkbox, .ipt:radio, select.ipt, textarea.ipt, .ipt[type=password], .ipt[type=email], .asSlt.ipt').addClass('notDel');
				$('.btnIco_keypad').each(function(){
					$(this).attr({'tabindex':-1,'aria-hidden':true});
					if( $(this).prev().is('.ipt') ){
						 $(this).prev().addClass('notDel');
					}
				});
				$('.keypad').each(function(){
					$(this).find('.ipt[type=password]').each(function(){
						if( $(this).attr('maxlength') != undefined ){
							$(this).closest('.keypad').addClass( 'letter'+$(this).attr('maxlength') );
						}
					});
				})
				for(var i = 0; i < $('.ipt').length ; ++i ){
					if( $('.ipt').eq(i).hasClass('uiAct') == false ){
						$('.ipt').eq(i).addClass('uiAct');
						// month picker
						if( $('.ipt').eq(i).hasClass('month') ){
							mp.init( $('.ipt').eq(i) );
						}
						// Delete
						if( $('.ipt').eq(i).hasClass('notDel') == false ){
							ui.iptDelInit( $('.ipt').eq(i) );
						}
					}
					// Unit
					if( $('.ipt').eq(i).data('unit') != undefined ){
						ui.iptUnitInit( $('.ipt').eq(i) );
					}
				}
				
				$('.isIE input:file').bind({
					'focusin':function(){
						$(this).next('label').addClass('on');
					},
					'focusout':function(){
						$(this).next('label').removeClass('on');
					}
					
				});
				$('.isIE .fileWrap input').bind({
					'click':function(){
						$(this).prev('input').trigger('click');
					}
				});
				// E-mail auto Complete
				ui.emailInit();
			},
			// ipt Delete init
			iptDelInit : function( target ){
				var delTxt = '�대떦 �꾨뱶 �낅젰媛� ��젣';
				$(target).wrap('<div class="iptWrap">');
				$(target).after('<button class="btnIco_del"><span class="blind">'+delTxt+'</span></button>');
				if( $(target).hasClass('full') ) $(target).parent().addClass('full'); 
				var delBtn = $(target).parent().find('.btnIco_del');
				if( parseInt($(target).css('margin-right')) != 0 && $(target).hasClass('full') == false ){
					$(delBtn).addClass('hasMargin');
				}
				$(delBtn).attr('tabindex',-1);
				$(delBtn).bind({
					'mousedown':function(e){
						e.preventDefault();
						$(this).closest('.iptWrap').find('.ipt').val("").focus();
						$(this).parent().removeClass("on");
						// 蹂댁븞�붾（�� 愿��� 肄붾뱶
						/*if( $(this).closest('.delete').find('.ipt').attr('e2e_type') != undefined ){
							var obj = $(this).closest('.delete').find('.ipt');
							$ASTX2.clearE2EText( document.getElementById(obj[0].id) );
						}*/
					},
					'focusout':function(){
						$(this).parent().removeClass("on");
					}
				});
				
				if( $(target).data('unit') != '留뚯썝' ){
					$(target).bind({
						'change paste keydown keyup':function(e){
							if( $(this).val() != "" ){
								$(this).parent().addClass("on");
							} else {
								$(this).parent().removeClass("on");
							}
							
						},
						'focusin':function(){
							if( $(this).val() != "" ){
								var target = $(this);
								setTimeout(function(){target.parent().addClass("on");},10);
							}
						},
						'focusout':function(){
							setTimeout(function(){
								var elem = $('*:focus');
								if( $( elem ).hasClass('btnIco_del') == false ){
									$(this).parent().removeClass("on");
								}
								if( $( elem ).attr('class') != 'btnIco_del' ){
									$('.iptWrap').removeClass('on');
								}
							},10);
						}
					});
				}
			},
			// input has unit case
			iptUnitInit : function( target ){
				$(target).addClass('unit');
				if( $(target).closest('.iptWrap').find('span.unit').length == 0 ){
					var txt = $(target).data('unit');
					$(target).closest('.iptWrap').append('<span class="unit">'+txt+'</span>');
				}
				if($(target).hasClass('front')){
					var type = 'padding-left';
				} else {
					type = 'padding-right';
				}
				var pdR = $(target).closest('.iptWrap').find('span.unit').outerWidth();
				if( pdR > 20 ){
					$(target).css(type, pdR);
				}
			},
			// email
			emailInit : function (){
				$('.ipt[type=email]').each(function(){
					$(this).addClass('uiAct');
					if( $(this).is(':visible') ){
						if( $(this).hasClass('mailtipAct') == false ){
							$(this).addClass('mailtipAct');
							$(this).mailtip({
								onselected: function (mail){}
							});
							if( $(this).closest('.popCont').length > 0 ){
								$(this).bind({
									'focusin':function(){
										$('.nowOpen .popCont, .nowOpen .scroll:not(.on)').addClass('overV');
									},
									'focusout':function(){
										$('.nowOpen .popCont, .nowOpen .scroll').removeClass('overV');
									}
								})
							}
						}
					}
				});
			},
			// accordian init Make
			accoInit : function(){
				//faq
				$('.faqList').each(function(){
					$(this).find('span[class^=ico] span:not(.blind)').attr('aria-hidden', true);
					$(this).find('.icoQ').append('<span class="blind">吏덈Ц</span>');
					$(this).find('.icoA').append('<span class="blind">�듬�</span>');
				});
				
				for( var i = 0 ; i < $('.accoBtn').length ; ++i ){
					if( $('.accoBtn:eq('+i+')').hasClass('uiAct') == false ){
						$('.accoBtn:eq('+i+')').addClass('uiAct');
						if( $('.accoBtn:eq('+i+')').attr('href') == undefined && $('.accoBtn:eq('+i+')').is('a') ){
							$('.accoBtn:eq('+i+')').attr('href' , '#');
						}
						//�쎄� 湲곕낯�뗮똿
						$('.termsWrap').addClass('accoItem');
						$('.termsWrap .accoBody').each(function(){
							if( $(this).hasClass('notInner') == false && $(this).find('.inner').length == 0 && $(this).find('.accoBody').length == 0 ){
								$(this).wrapInner('<div class="inner"/>');
							}
						});
						
						if( $('.accoBtn:eq('+i+')').closest('.accoTbl').length == 0 ){ // accoTable �좊Т 泥댄겕
							$('.accoBtn:eq('+i+')').closest('ul').find(' > *').addClass('accoItem');
						} else {
							$('.accoBtn:eq('+i+')').closest('.accoTbl').find('tbody > tr').addClass('accoItem');
							$('.accoBtn:eq('+i+')').closest('tr').next().addClass('accoBodyWrap');
						}
						$('.accoBtn:eq('+i+')').attr({'role':'button', 'tabindex':'0', 'aria-expanded': false, 'aria-controls':'acco_'+i});
						$('.accoBtn:eq('+i+')').find('.waTxt').text('�쇱튂湲�');
						if( $('.accoBody:eq('+i+')').attr('id') == undefined ){
							$('.accoBody:eq('+i+')').attr('id', 'acco_'+i );
						} else {
							$('.accoBtn:eq('+i+')').attr('aria-controls', $('.accoBody:eq('+i+')').attr('id') );
						}
						if( $('.accoBtn:eq('+i+')').closest('.accoItem.on').length > 0 ){
							$('.accoBtn:eq('+i+')').attr('aria-expanded', true);
							$('.accoBtn:eq('+i+') .waTxt').text('�묎린');
						}
						
						if( $('.accoBtn:eq('+i+')').closest('.accoTbl').length == 0 ){ // accoTable �좊Т 泥댄겕
							$('.accoBtn:eq('+i+')').closest('.accoItem.on').find('> .accoBody').show();
						} else {
							$('.accoBtn:eq('+i+')').closest('.accoItem.on').next('.accoItem').find('.accoBody').show();
						}
						$('.accoBtn:eq('+i+')').bind({
							'click':function(e){
								var target = e.target;
								e.preventDefault();
								if( $(target).closest('.accoTbl').length == 0 ){ // accoTable �좊Т 泥댄겕
									var contents = $(target).closest('.accoItem').find(' > .accoBody');
								} else {
									contents = $(target).closest('.accoItem').next().find('.accoBody');
								}
								$(target).closest('.accoItem').toggleClass('on');
								if( $(target).closest('.accoItem').hasClass('on') ){
									$(contents).stop(true, true).slideDown(300);
									$(target).attr('aria-expanded', true);
									$(target).find('.waTxt').text('�묎린');
									if( $(target).closest('.accoWrap').data('single') == true || $(target).closest('ul').data('single') == true ){
										$(target).closest('.accoItem').siblings('.accoItem').removeClass('on');
										$(target).closest('.accoItem').siblings('.accoItem').find('>.accoBody').stop(true, true).slideUp(300);
										$(target).closest('.accoItem').siblings('.accoItem').find('> accoHead .accoBtn').attr('aria-expanded', false);
										$(target).closest('.accoItem').siblings('.accoItem').find('> accoHead .accoBtn').find('.waTxt').text('�쇱튂湲�');
									}
									$('.ipt.unit').each(function( idx ){
										ui.iptUnitInit( $(this) );
									});
									setTimeout(function(){
										wa.update();
									},400)
								} else {
									$(contents).stop(true, true).slideUp(300);
									$(target).attr('aria-expanded', false);
									$(target).find('.waTxt').text('�쇱튂湲�');
								}
							}
						});
						// �쎄� �쇱튂湲�
						if( $('.accoBtn:eq('+i+')').closest('.accoBody').length == 0 && $('.accoBtn:eq('+i+')').closest('.termsWrap').length > 0 ){
							if( $('.accoBtn:eq('+i+')').closest('.termsWrap').data('expand') != false ){
								$('.accoBtn:eq('+i+')').trigger('click');
							}
						}
						if( pubMode == true ){ // �뚮젮�쒕┰�덈떎 �쇰툝�섏씠吏�留� �쇱퀜�볤린
							if( $('.accoBtn:eq('+i+')').closest('.addInfoList').hasClass('notice') ){
								$('.accoBtn:eq('+i+')').trigger('click');
							}
						}
					}
				}
			},
			conEllipInit : function(){
				for( var i = 0 ; i < $('.conEllip').length ; ++i ){
					if( $('.conEllip:eq('+i+')').next().is('.links') ){
						$('.conEllip:eq('+i+')').next().attr('aria-hidden', true);
						$('.conEllip:eq('+i+')').next().bind({
							'click':function(e){
								e.preventDefault();
								$(this).prev().toggleClass('on');
							}
						});
					}
				}
			},
			// Tab init
			tabInit : function(){
				for( var i = 0 ; i < $('.tabList').length ; ++i ){
					if( $('.tabList:eq('+i+')').hasClass('uiAct') == false ){
						$('.tabList:eq('+i+')').addClass('uiAct');
						// tab setting
						var tabFunc = false;
						if( $('.tabList:eq('+i+')').closest('.tabWrap').length > 0 ){
							tabFunc = true;
							$('.tabList:eq('+i+')').attr('role','tablist');
							//$('.tabContents').attr('tabindex', 0);
							var classStr = $('.tabList:eq('+i+')').attr('class').replace('tabList ','').replace(' uiAct', '');
							var originClass = $('.tabList:eq('+i+')').closest('.tabWrap').attr('class') + ' ' + classStr;
							$('.tabList:eq('+i+')').closest('.tabWrap').attr('class', originClass);
						}
						$('.tabList:eq('+i+') > li').each(function(idx){
							console.log( 'tabFunc : ' + tabFunc );
							if( tabFunc == true ){
								if( $(this).attr('id') == undefined ){
									$(this).attr({'id':'tab_'+i+'_'+idx, 'role': 'tab', 'aria-controls':'panel_'+i+'_'+idx , 'tabindex': 0, 'aria-selected': false});
								} else {
									$(this).attr({'role': 'tab', 'aria-controls':'panel_'+i+'_'+idx , 'tabindex': 0, 'aria-selected': false});
								}
								if( $(this).hasClass('disable') == true ){
									$(this).append('<span class="blind">�댁슜�놁쓬</span>');
									var tabContents = $(this).closest('.tabWrap').find('.tabContents');
									$(tabContents).find('.tabPanel:eq('+idx+')').before('<div class="tabPanel"></div>');
								}
							} else {
								if( $(this).find('a[href]').length == 0 ){
									$(this).attr({'role': 'button', 'tabindex': 0});
								}
							}
							idx++;
						});
						// tabPanel setting
						if( tabFunc == true ){
							var tabContents = $('.tabList:eq('+i+')').closest('.tabWrap').find('> .tabContents');
							$(tabContents).find(' > .tabPanel').each(function(idx){
								if( $(this).attr('id') == undefined ){
									$(this).attr({'id': 'panel_'+i+'_'+idx}); 
								} else {
									$('.tabList:eq('+i+') > li:eq('+idx+')').attr('aria-controls', $(this).attr('id'));
								}
								$(this).attr({'role':'tabpanel', 'aria-hidden': true, 'aria-labelledby' : $('.tabList:eq('+i+') > li:eq('+idx+')').attr('id') })
								idx++;
							});
						}
						// �쒖꽦�� 泥댄겕
						if( $('.tabList:eq('+i+') li.on').length == 0 ){
							$('.tabList:eq('+i+') li').first().addClass('on');
						}
						// key event
						$('.tabList:eq('+i+')').on('keydown',' > li[tabindex]', function(e){
							if(e.keyCode == 13){
								$(this).trigger('click');
							}
						});
						// click event
						if( tabFunc == true ){
							$('.tabList:eq('+i+')').on('click',' > li', function(e){
								e.preventDefault();
								if( $(this).hasClass('disable') == false ){
									$(this).siblings().removeClass('on').attr('aria-selected', false);
									$(this).addClass('on').attr('aria-selected', true);
									$(this).closest('.tabWrap').find('> .tabPanel').removeClass('on').attr('aria-hidden', true);
									$(this).closest('.tabWrap').find('> .tabContents > .tabPanel').removeClass('on').attr('aria-hidden', true);
									$(this).closest('.tabWrap').find('#'+$(this).attr('aria-controls')).addClass('on').attr('aria-hidden', false);
									ui.swiperUpdate();
									// PC�꾩슜 湲곕뒫
									var guideTxt = $(this).text() + " �� �댁슜 �쒖옉";
									if( $(this).closest('.tabList').next().is('.guideTxt') == false ){
										$(this).closest('.tabList').after('<p class="blind guideTxt">'+guideTxt+'</p>');
									} else {
										$(this).closest('.tabList').next().text( guideTxt );
									}
									$(this).siblings().find('.blind.guideTxt').remove();
									$(this).find('.blind.guideTxt').remove();
									$(this).append('<span class="blind guideTxt">�좏깮��</span>');
									ui.init();
								}
							});
							$('.tabList:eq('+i+') li.on').trigger('click');
						} else {
							$('.tabList:eq('+i+') li.on').append('<span class="blind guideTxt">�좏깮��</span>');
						}
					}
				}
			},
			// Card Select init
			cardSelInit : function(){
				for( var i = 0 ; i < $('a.cardSel').length ; ++i ){
					$('a.cardSel').attr({'role':'button','tabindex':'0'});
					if( $('a.cardSel:eq('+i+')').hasClass('uiAct') == false ){
						$('a.cardSel:eq('+i+')').addClass('uiAct');
						if( $('a.cardSel:eq('+i+')').next().is('.cardSelList') ){
							$('a.cardSel:eq('+i+')').addClass('asSlt').attr('title','移대뱶 �좏깮');
							var list = $('a.cardSel:eq('+i+')').next();
							$('a.cardSel:eq('+i+')').wrap('<div class="customSlt cardSlt"></div>');
							var contain = $('a.cardSel:eq('+i+')').closest('.customSlt');
							contain.append( $(list) );
							$(list).wrap('<div class="cardSelListWrap" tabindex="0"></div>');
							ui.cardImgAnal( $('a.cardSel:eq('+i+')') );
							if( $(contain).find('.cardSelListWrap li.on').length == 0 ){
								$(contain).find('.cardSelListWrap li').first().find('a.cardSel').addClass('on');
							}
						}
					}
				}
			},
			cardImgAnal : function(target){
				$(target).find('li img').each(function(){
					if( $(this).outerWidth() < $(this).outerHeight() ){
						$(this).closest('a.cardSel').find('.tit').addClass('vertical');
					} else {
						$(this).closest('a.cardSel').find('.tit').removeClass('vertical');
					}
				})
			},
			// Custom Select init
			customSelectGlobal : new Object(),
			customSltFocusOutEL : new Object(),
			customSltInit : function(){
				for(var  i = 0 ; i < $('.customSlt').length ; ++i ){
					if( $('.customSlt').eq(i).hasClass('uiAct') == false ){
						$('.customSlt').eq(i).addClass('uiAct');
						$('.customSlt:eq('+i+') li > button.on, .customSlt:eq('+i+') li > a.on').attr('title','�좏깮��');
						if( $('.customSlt:eq('+i+') .asSlt').hasClass('cardSel') == false ){
							//$('.customSlt:eq('+i+') .asSlt').data('fixTitle', $('.customSlt:eq('+i+') .asSlt:not(a.cardSel)').text() ); /* 怨좎젙�띿뒪�� */
						}
						if( $('.customSlt:eq('+i+') li > *.on').length > 0 ){
							$('.customSlt:eq('+i+') .asSlt:not(a.cardSel)').text( $('.customSlt:eq('+i+') li > *.on').html() );
						}
						// Custom�� �덈뒗 寃��됲븘��
						var searchTitTxt = $('.customSlt:eq('+i+') .asSlt').attr('title') + '�� 愿��⑤맂 寃��됱뼱 �낅젰';
						$('.customSlt:eq('+i+') .customSearch .ipt').attr('title', searchTitTxt);
						$('.customSlt:eq('+i+') .customSearch .ipt').bind({
							'focusin':function(){
								$(this).removeClass('firstSet');
							}
						});
						
						// �대깽��
						$('.customSlt:eq('+i+') .asSlt').bind({
							'click':function(e){
								e.preventDefault();
								if( $(this).closest('.customSlt').hasClass('on') == false ){
									$('.customSlt.on').removeClass('on');
									$(this).closest('.customSlt').addClass('on');
									$(this).closest('.customSlt').find('.customSearch .ipt').addClass('firstSet').val('');
									$(this).attr('tabindex','-1');
									if( $(this).data('fixTitle') != undefined ){
										$(this).text( $(this).data('fixTitle') );//fix
									}
									if( $(this).hasClass('cardSel') ){
										ui.cardImgAnal( $(this).closest('.customSlt') );
									}
									ui.customSelectGlobal = true;
									ui.bodyAddBind(true, $(this));
								} else {
									$(this).closest('.customSlt').removeClass('on');
									$(this).text( $(this).closest('.customSlt ul .on').html() );//selectText
									if( $(this).closest('.customSlt ul .on').length == 0 ){
										if( $(this).data('fixTitle') != undefined ){
											$(this).text( $(this).data('fixTitle') );//fix
										}
									}
									$(this).closest('.customSlt').find('.asSlt').removeAttr('tabindex');
									ui.customSelectGlobal = false;
									ui.bodyAddBind(false, $(this));
								}
							}
						});
						$('.customSlt:eq('+i+')').on('click', 'li > button, li >a', function(e){
							var _this = e.currentTarget;
							e.preventDefault();
							$(_this).parent().siblings().find('>*').removeClass('on').removeAttr('title');
							$(_this).addClass('on').attr('title','�좏깮��');
							$(_this).closest('.customSlt').find('.asSlt').html($(this).html());
							$(_this).closest('.customSlt').find('.asSlt').focus();
							$(_this).closest('.customSlt').find('.asSlt').removeAttr('tabindex');
							$(_this).closest('.customSlt').removeClass('on');
						});
						$('.customSlt:eq('+i+')').on('focusout', ' li button, li a, li a.cardSel', function(e){
							var _this = e.currentTarget;
							ui.customSltFocusOutEL = $(_this);
							setTimeout(function(){
								if( $(':focus').closest('.customSlt').length == 0){
									ui.customSelectGlobal = false;
									ui.bodyAddBind(false, $(_this));
									$(ui.customSltFocusOutEL).closest('.customSlt').find('.asSlt').attr('tabindex','0');
									$('.customSlt.on .asSlt').html( $('.customSlt.on ul .on').html() );//selectText
									if( $('.customSlt.on ul .on').length == 0 ){
										if( $(_this).closest('.customSlt').data('fixTitle') != undefined ){
											$(_this).closest('.customSlt').find('.asSlt').html($(_this).closest('.customSlt').find('.asSlt').data('fixTitle') );//fix
										}
									}
									$('.customSlt.on').removeClass('on');
								}
							},10);
						});
						// Focus
						$('.customSlt:eq('+i+') .customSltListWrap').attr('tabindex',0);
					}
				}
			},
			bodyAddBind : function (state,_target){
				if(state == true){
					$('body').bind({
						'mousedown':function(e){
							if( $(e.target).hasClass('customSlt', 'on') == true ){
								return false;
							}
							if( $(e.target).closest('.customSlt').length == 0 ){
								$('.customSlt.on .asSlt').html( $('.customSlt.on ul .on').html() );//selectText
								if( $('.customSlt.on ul .on').length == 0 ){
									if( $(e.target).closest('.customSlt').data('fixTitle') != undefined ){
										$('.customSlt.on .asSlt').html( $('.customSlt.on .asSlt').data('fixTitle') );//fix
									}
								}
								$('.customSlt.on').removeClass('on');
								customSelectWrapState = false;
								$('body').unbind('mousedown');
								return false;
							}
						}
					});
				} else {
					$('body').unbind('mousedown');
				}
			},
			/*loadingInit : function ( target, white ){
				if( white != "white" ){
					var str = '<div class="loadingWrap"><div class="loadingArea"><span class="img loading"></span><span class="message">Loading</span></div></div>';
				} else {
					str = '<div class="loadingWrap white"><div class="loadingArea"><span class="img loading"></span><span class="blind">Loading</span></div></div>';
				}
				target.prepend(str);
			},*/
			// Data List Init
			dataListInit : function(){
				$('.dataList .detail .infoList').each(function(){
					$(this).addClass( 'div'+$(this).data('grid') );
				});
			},
			// Card List Init
			cardListInit : function (){
				for( var i = 0 ; i < $('.goodsList').length ; ++i ){
					if( $('.goodsList:eq('+i+')').hasClass('uiAct') == false ){
						$('.goodsList:eq('+i+')').addClass('uiAct');
						// tabPanel 泥댄겕
						if( $('.goodsList:eq('+i+')').closest('.tabPanel').length > 0 ){
							var radioGroup = $('.goodsList:eq('+i+')').closest('.tabPanel').find('.goodsType .ipt');
						} else {
							radioGroup = $('.goodsList:eq('+i+')').closest('section').find('.goodsType .ipt');
						}
						radioGroup.attr('name','cardGroup'+i);
						radioGroup.first().attr('value','list');
						radioGroup.last().attr('value','card');
						if( $('.goodsList:eq('+i+')').closest('.tabPanel').length > 0 ){
							var radio = $('.goodsList:eq('+i+')').closest('.tabPanel').find('.goodsType .ipt[name=cardGroup'+i+']');
						} else {
							radio = $('.goodsList:eq('+i+')').closest('section').find('.goodsType .ipt[name=cardGroup'+i+']');
						}
						radio.bind({
							'change' : function(){
								console.log( $(this).val() );
								if( $(this).val() == 'card' ){
									// tabPanel 泥댄겕
									if( $(this).closest('.tabPanel').length > 0 ){
										transCardMode( $(this).closest('.tabPanel').find('.goodsList'), true );
									} else {
										transCardMode( $(this).closest('section').find('.goodsList'), true );
									}
								} else {
									// tabPanel 泥댄겕
									if( $(this).closest('.tabPanel').length > 0 ){
										transCardMode( $(this).closest('.tabPanel').find('.goodsList'), false );
									} else {
										transCardMode( $(this).closest('section').find('.goodsList'), false );
									}
								}
							}
						});
					}
				}
				for( var i = 0 ; i < $('.goodsList').length ; ++i ){
					$('.goodsList:eq('+i+') > li').each(function(){
						if( $(this).hasClass('uiAct') == false ){
							$(this).addClass('uiAct')
							goodsOverMake( $(this) );
							$(this).find('.goods').bind({
								'focusin mouseover':function(){
									if( $(this).closest('.goodsList').hasClass('card') ){
										$(this).find('.over').addClass('on');
									}
								},
								'focusout mouseout':function(){
									if( $(this).closest('.goodsList').hasClass('card') ){
										$(this).find('.over').removeClass('on');
									}
								}
							});
						}
					})
					if( $(this).closest('.tabPanel').length > 0 ){
						var radio = $('.goodsList:eq('+i+')').closest('.tabPanel').find('.goodsType .ipt[name=cardGroup'+i+']:checked');
					} else {
						radio = $('.goodsList:eq('+i+')').closest('section').find('.goodsType .ipt[name=cardGroup'+i+']:checked');
					}
					if( $(radio).val() == 'card' ){
						transCardMode( $('.goodsList:eq('+i+')'), true );
					} else {
						transCardMode( $('.goodsList:eq('+i+')'), false );
					}
				}
				function goodsOverMake( target ){
					$(target).find('.cardInfo').after('<div class="over"></div>');
					var txt = $(target).find('.cardInfo h2.tit').text();
					$(target).find('.over').append('<h2 class="tit">' + txt + '</h2>');
					$(target).find('.over').append('<ul class="txtList_disc"></ul>');
					$(target).find('.over ul').append($(target).find('.txtList_disc').html());
					$(target).find('.over ul h3').remove();
				}
				function transCardMode( target, _boolean ){
					if( _boolean == true ){
						$(target).addClass('card');
						$(target).find('> li').each(function(){
							$(this).find('.over').attr('tabindex',0);
							$(this).find('.over').append( $(this).find('.cardInfo .btnArea') );
						});
					} else {
						$(target).removeClass('card');
						$(target).find('> li').each(function(){
							$(this).find('.over').removeAttr('tabindex',0);
							$(this).find('.cardInfo').append( $(this).find('.over .btnArea') );
						});
					}
				}
			},
			// eventListInit
			eventListInit : function(){
				for( var i = 0 ; i < $('.tblInfo').length ; ++i ){
					if( $('.tblInfo:eq('+i+') .goodsType').hasClass('uiAct') == false ){
						if( $('.tblInfo:eq('+i+')').next().is('.eventList') ){
							$('.tblInfo:eq('+i+') .goodsType').addClass('uiAct');
							var listTarget = $('.tblInfo:eq('+i+')').next();
							$('.tblInfo:eq('+i+') .goodsType input').bind({
								'change':function(){
									console.log( $(this).next().attr('class') );
									$(listTarget).removeClass('list card');
									$(listTarget).addClass( $(this).next().attr('class') );
								}
							});
						}
					}
				}
				$('.eventList li').each(function(){
					if( $(this).hasClass('uiAct') == false ){
						if( $(this).find('.eventInfo').text().length > 0 ){
							$(this).addClass('uiAct');
							$(this).find('a').append('<div class="over"/>');
							$(this).find('.over').html( $(this).find('.eventInfo').html() );
							$(this).find('a').bind({
								'mouseover':function(){
									if( $(this).closest('.eventList.card').length > 0 ){
										$(this).find(' > .eventImg, > .eventInfo').attr('aria-hidden', true);
									}
								},
								'mouseout':function(){
									if( $(this).closest('.eventList.card').length > 0 ){
										$(this).find(' > .eventImg, > .eventInfo').removeAttr('aria-hidden');
									}
								},
							});
						}
					}
				});
				
				// img Transfer background
				/*setTimeout(function(){
					$('.eventList .eventImg img:not(.evtIco)').each(function(){
						var imgURL = $(this).attr('src');
						$(this).closest('.eventImg').css('background','url("'+imgURL+'") center center / cover no-repeat ');
						if( imgURL.indexOf('event_list_noimg') < 0 ){
							$(this).css('opacity',0);
						}
					})
				},1000);*/
				
			},
			// swiper Init
			swiperIdCnt : 0,
			swiperInit : function(){
				$('.swiperWrap').each(function(idx){
					var visibleState = true;
					var swiper;
					if( $('.swiperWrap:eq('+idx+')').attr('id') == undefined ){
						$('.swiperWrap:eq('+idx+')').attr('id', 'swiper'+ui.swiperIdCnt );
						ui.swiperIdCnt++;
					}
					if( $('.swiperWrap:eq('+idx+')').closest('.popWrap').length > 0 && $('.swiperWrap:eq('+idx+')').hasClass('swiperReady') == false ){
						$('.swiperWrap:eq('+idx+')').addClass('on');
					} else if( $('.swiperWrap:eq('+idx+')').hasClass('swiperReady') ){
						$('.swiperWrap:eq('+idx+')').removeClass('on');
					}
					if( $('.winPop').length > 0 ){
						$('.swiperWrap:eq('+idx+')').removeClass('on');
					}
					if( $('.swiperWrap:eq('+idx+')').hasClass('on') == false ){
						if( $('.swiperWrap:eq('+idx+')').find('> .slideList > li').length > 1){
							if( $('.swiperWrap:eq('+idx+')').find('.swiper-container').length == 0 ){
								$('.swiperWrap:eq('+idx+')').wrapInner('<div class="swiper-container"/>');
							}
							var targetWrap = $('.swiperWrap:eq('+idx+')');
							if( $(targetWrap).is(':visible') == false ){
								$(targetWrap).show();
								visibleState = false;
							}
							var target = '#'+$('.swiperWrap:eq('+idx+')').attr('id') + ' .swiper-container';
							var totalNum = $(target).find('> .slideList > li').length;
							dataSet( $(targetWrap), 'fade', 'slide' );
							dataSet( $(targetWrap), 'loop', true );
							dataSet( $(targetWrap), 'speed', 500 );
							dataSet( $(targetWrap), 'page', true );
							dataSet( $(targetWrap), 'align', 'left' );
							dataSet( $(targetWrap), 'arrow', true );
							dataSet( $(targetWrap), 'number', false );
							dataSet( $(targetWrap), 'perView', 1 );
							dataSet( $(targetWrap), 'between', 0 );
							dataSet( $(targetWrap), 'auto', 4000 );
							dataSet( $(targetWrap), 'pause', true );
							dataSet( $(targetWrap), 'align', 'bc' );
							$(target).find('> .slideList').addClass('swiper-wrapper');
							$(target).find('> .slideList > li').addClass('swiper-slide');
							// pagenation
							$(targetWrap).append('<div class="swiper-controls"><div class="swiper-pagination"></div></div>');
							if( $(targetWrap).data('align') == 'left' ){
								 $(targetWrap).find('.swiper-controls').addClass('al');
							} else if( $(targetWrap).data('align') == 'right' ){
								 $(targetWrap).find('.swiper-controls').addClass('ar');
							} else if( $(targetWrap).data('align') == 'center' ){
								 $(targetWrap).find('.swiper-controls').addClass('ac');
							}
							if( $(targetWrap).data('page') == false ){
								$(targetWrap).find('.swiper-pagination').hide();
							}
							$(targetWrap).append(
								'<button type="button" class="btnPrev"><span class="blind">�댁쟾 �щ씪�대뱶</span></button>'+
								'<button type="button" class="btnNext"><span class="blind">�ㅼ쓬 �щ씪�대뱶</span></button>'
							);
							if( $(targetWrap).data('arrow') != true ){
								$(targetWrap).find('.btnPrev').hide();
								$(targetWrap).find('.btnNext').hide();
							}
							var swiperOpt = {
								effect : $(targetWrap).data('fade'),
								init : false,
								allowTouchMove : false,
								speed : $(targetWrap).data('speed'),
								loop : $(targetWrap).data('loop'),
								slidesPerView : $(targetWrap).data('perView'),
								spaceBetween : $(targetWrap).data('between'),
								followFinger : false,
								pagination:{
									el: $(targetWrap).find('.swiper-pagination'),
									clickable : 'true',
									renderBullet : function(index,className){
										return '<button type="button" class="'+className+'"><span class="blind">' + (index + 1) + '</span></button>';
									}
								},
								navigation:{
									nextEl: $(targetWrap).find('.btnNext'),
									prevEl: $(targetWrap).find('.btnPrev')
								}
							}
							if( $(targetWrap).data('auto') != false ) {
								swiperOpt.autoplay = {
									delay : $(targetWrap).data('auto'),
									disableOnInteraction : !$(targetWrap).data('auto')
								}
							}
							if( oldIE == false ){
								swiper = new Swiper(target, swiperOpt);
								$(targetWrap).find('.swiper-pagination').attr('aria-label','珥� '+totalNum+'�щ씪�대뱶 以�  1踰덉㎏ �щ씪�대뱶');
								swiper.on('slideChange',function(){
									//$(targetWrap).find('.swiper-slide a, .swiper-slide :input').show();
									//console.log("�몃젋吏��섏뿏�� : " + this.activeIndex );
									$(targetWrap).find('.swiper-pagination').attr('aria-label', '珥� '+ totalNum+'�щ씪�대뱶 以� '+Number(this.realIndex+1) + '踰덉㎏ �щ씪�대뱶');
									$(targetWrap).find('.swiper-counter em').text( Number(this.realIndex+1) );
									var nowActiveEL = swiper.activeIndex;
									if( $(targetWrap).data('color') != undefined ){
										swiperColorInvert( swiper.$el, nowActiveEL );
									}
								});
								swiper.on('slideChangeTransitionStart',function(){
									
								});
								swiper.on('slideChangeTransitionEnd',function(){
									var nowActiveEL = this.activeIndex;
									
									$(targetWrap).find('.swiper-slide *').attr('tabindex','-1');
									$(targetWrap).find('.swiper-slide-active *').removeAttr('tabindex');
									
									setTimeout(function(){
										//$(target).find('.swiper-slide a, .swiper-slide :input').hide();
										//$(target).find('.swiper-slide *').removeAttr('tabindex');
										//$(target).find('.swiper-slide:eq('+nowActiveEL+') a, .swiper-slide:eq('+nowActiveEL+') :input').show();
										//$(target).find('.swiper-slide:eq('+nowActiveEL+') *[role=button]').attr('tabindex', 0);
										if( $(targetWrap).data('func') != undefined ){
											console.log( $(targetWrap).data('func') );
											window[ $(targetWrap).data('func') ]( $(target).find('.swiper-slide:eq('+nowActiveEL+')') );
										}
									},10);
									
								});
								swiper.on('init',function(){
									if( this.$el.data('display') == "false" ){
										$(this.$el).addClass('zIndexSet');
									}
									if( $(target).hasClass('colorChk') ){
										var nowActiveEL = this.activeIndex;
										swiperColorInvert( swiper.$el, nowActiveEL );
									}
								});
							} else { // IE9
								var swiperId = $('.swiperWrap:eq('+idx+')').attr('id');
								swiper = new Swiper('#'+ swiperId +' .swiper-container',{
									pagination: '#'+ swiperId +' .swiper-pagination',
									loop : $(targetWrap).data('loop'),
									speed : $(targetWrap).data('speed'),
									slidesPerView : $(targetWrap).data('perView'),
									autoplay : $(targetWrap).data('auto'),
									paginationClickable: true,
									autoHeight: true,
									onSlideChangeEnd : function(swiper){
										if( $(targetWrap).data('loop') == true ){
											$(targetWrap).find('.swiper-counter em').text( Number(swiper.activeLoopIndex+1) );
										} else {
											$(targetWrap).find('.swiper-counter em').text( Number(swiper.activeIndex+1) );
										}
									}
								});
								$('#'+ swiperId +' .btnPrev').on('click', function(e){
									e.preventDefault();
									swiper.swipePrev();
								});
								$('#'+ swiperId +' .btnNext').on('click', function(e){
									e.preventDefault();
									swiper.swipeNext();
								});
							}
							if( $(targetWrap).data('auto') != false ){
								$(targetWrap).find('.swiper-controls').prepend(
									'<button type="button" class="swiper-button-stop"><span class="blind">stop</span></button>'+
									'<button type="button" class="swiper-button-play"><span class="blind">play</span></button>'
								);
							}
							if( $(targetWrap).data('number') == true ){
								$(targetWrap).find('.swiper-controls').append('<span class="swiper-counter"><em>1</em> / '+totalNum+'</span>');
							}
							$(targetWrap).find('.swiper-button-play').bind({
								'click':function(e){
									if( oldIE == false ){
										swiper.autoplay.start();
									} else {
										swiper.startAutoplay();
									}
									$(this).hide();
									$(this).parent().find('.swiper-button-stop').show().focus();
								}
							});
							$(targetWrap).find('.swiper-button-stop').bind({
								'click':function(e){
									if( oldIE == false ){
										swiper.autoplay.stop();
									} else {
										swiper.stopAutoplay();
									}
									$(this).hide();
									$(this).parent().find('.swiper-button-play').show().focus();
								}
							});
							if( oldIE == false ){
								swiper.init();
								if( $('.popWrap.nowOpen .swiperWrap').length > 0 ){
									lp.popupResize(lp.popIntervalStr);
								}
							}
							if( visibleState == false ){
								$(targetWrap).hide();
							}
						}
						$('.swiperWrap:eq('+idx+')').addClass('on');
						try{
							window['ui' + $('.swiperWrap:eq('+idx+')').attr('id') ] = swiper;
							if( oldIE == false ){
								$(targetWrap).bind({
									'focusin':function(){
										var id = 'ui'+$(this).attr('id');
										window[id].autoplay.stop();
									},
									'focusout':function(){
										if( $(this).find('.swiper-button-stop').is(':visible') ){
											var id = 'ui'+$(this).attr('id');
											window[id].autoplay.start();
										}
									}
								});
							}
						} catch(e){
							console.log(e);
						}
					} else {
						$('.swiperWrap:eq('+idx+')').addClass('on')
					}
					idx++;
				});
				function dataSet( target, attr, def ){
					if( $(target).data(attr) == undefined ){
						$(target).data(attr, def);
					}
				}
			},
			swiperUpdate : function(){
				for( var i = 0 ; i < $('.swiperWrap').length ; ++i ){
					try{
						window['ui' + $('.swiperWrap :eq('+i+')').attr('id') ].update();
					} catch(e){
						console.log(e);
					}
				}
			},
			// scroll Move
			scollMove : function(){
				$('#content a[href], .popWrap a[href]').each(function(){
					if( $(this).attr('href').length > 1 ){
						var hrefVal = $(this).attr('href').substr(0,1);
						if( hrefVal == '#' ){
							if( $(this).data('scollMove') == undefined ){
								$(this).data('scollMove',true);
								$(this).bind({
									'click' : function(e){
										e.preventDefault();
										var id = $(this).attr('href').replace('#','');
										if( $('#'+id).length > 0 ){
											var posY = $('#'+id).offset().top - $('.header').height();
											$('body,html').animate({scrollTop: posY},300);
										}
									}
								});
							}
							
						}
					}
					
				});
			},
			// Contents Block
			conBlockInterval : new Object(),
			conBlockCnt : 0,
			conBlockInit : function(){
				$('.conBlockList').each(function(){
					if( $(this).data('div') != undefined && $(this).hasClass('uiAct') == false ){
						var colNum = $(this).data('div');
						$(this).addClass( 'uiAct div_' + colNum );
						for( var j = 0 ; j < $(this).find(' > li').length ; ++j ){
							var code = j%colNum;
							var rowCnt = Math.floor( j/colNum );
							$(this).find('> li:eq('+j+')').addClass('col'+Number(code) + ' rowCnt'+ rowCnt);
						}
					} else {
						$(this).addClass('onBlock');
					}
					if( $(this).hasClass('stepArrow') && $('.isIE').length > 0 ){
						var maxH = 0;
						for( var i = 0 ; i < $(this).find('.block').length ; ++i ){
							var num = $(this).find('.block:eq('+i+')').outerHeight();
							if( num > maxH ){
								maxH = num;
							}
						}
						$(this).find('.block').height( maxH );
					}
				});
				ui.consBlockResizeInit();
			},
			conBlockResize : function(){
				ui.conBlockCnt++;
				if( ui.conBlockCnt > 1 ){
					clearInterval(ui.conBlockInterval);
					ui.conBlockCnt = 0;
				}
				for(var i = 0; i < $('.conBlockList.uiAct').length ; ++i ){
					var colNum = $('.conBlockList.uiAct:eq('+i+')').data('div');
					var rowNum = Math.ceil( $('.conBlockList.uiAct:eq('+i+') > li').length/colNum );
					for( var j = 0 ; j < rowNum ; ++j ){
						var liHArry = [];
						var liTitHArry = [];
						for( var k = 0 ; k < colNum ; ++k ){
							if( $('.conBlockList.uiAct:eq('+i+')').hasClass('stepArrow') ){
								$('.conBlockList.uiAct:eq('+i+') > li.rowCnt'+j + '.col'+ k +' .tit').css('height','auto');
							}
							$('.conBlockList.uiAct:eq('+i+') > li.rowCnt'+j + '.col'+ k +' .block').css('height','auto');
							if( $('.conBlockList.uiAct:eq('+i+') > li.rowCnt'+j+'.col'+k+' .block').outerHeight() > 0 ){
								if( $('.conBlockList.uiAct:eq('+i+')').hasClass('stepArrow') ){
									liTitHArry.push( $('.conBlockList.uiAct:eq('+i+') > li.rowCnt'+j+'.col'+k+' .tit').outerHeight() );
								}
								liHArry.push( $('.conBlockList.uiAct:eq('+i+') > li.rowCnt'+j+'.col'+k+' .block').outerHeight() );
							}
						}
						var maxTitH = Math.max.apply( null, liTitHArry );
						var maxH = Math.max.apply( null, liHArry );
						if( $('.conBlockList.uiAct:eq('+i+')').hasClass('stepArrow') ){
							$('.conBlockList.uiAct:eq('+i+') > li.rowCnt'+j + ' .tit').css('height',maxTitH);
						}
						$('.conBlockList.uiAct:eq('+i+') > li.rowCnt'+j + ' .block').css('height',maxH);
						$('.conBlockList.uiAct:eq('+i+')').addClass('onBlock');
					}
				}
			},
			consBlockResizeInit : function(){
				ui.conBlockResize();
				ui.conBlockInterval = setInterval( ui.conBlockResize, 1000 );
			},
			// tblScrollInit
			tblScrollInit : function(){
				$('table[data-scroll]').each(function(){
					if( $(this).closest('.tblWrap').length == 0 ){
						var scrH = $(this).data('scroll');
						$(this).wrap('<div class="scrollY" style="max-height:' + scrH + 'px;"></div>');
						$(this).parent().wrap('<div class="tblWrap"/>');
						var dummy = $(this).html();
						$(this).closest('.tblWrap').prepend('<div class="dummyWrap"/>');
						$(this).closest('.tblWrap').find('.dummyWrap').append( '<table class="'+$(this).attr('class')+'">'+dummy+'</table>' );
						$('.dummyWrap').find('tbody').remove();
						$('.dummyWrap').find('table').removeAttr('id');
						$('.dummyWrap').attr('aria-hidden',true)
						$('.dummyWrap').css('padding-right', analysis.getScrollbarWidth() );
					}
					var targetNum = $(this).data('num');//�ㅽ겕濡ㅼ뾾�� 蹂댁뿬吏��� 由ъ뒪�멸갗�� 吏���
					if( targetNum == undefined ){
						targetNum = 6;
					}
					if( $(this).find('tbody tr').length < targetNum + 1 ){
						$('.dummyWrap').hide();
						$(this).parent('.scrollY').css('overflow-y','hidden');
					} else {
						$('.dummyWrap').show();
						$(this).parent('.scrollY').css('overflow-y','auto');
					}
				});
				$('.scrollY').each(function(){
					$(this).attr('tabindex','0');
				});
			},
			autocompleteInit: function(){
				$.widget('app.autocomplete', $.ui.autocomplete,{
					_renderItem : function(ui, item){
						var re = new RegExp("("+this.term+")", 'gi'),
						cls = this.options.highlightClass,
						template = '<strong class="'+cls+'">$1</strong>',
						label = item.label.replace(re,template),
						$li = $('<li/>').appendTo('.ui-autocomplete');
						$('<span/>').html(label).appendTo($li);
						$li.attr('role','button');
						return $li;
					}
				});
				if( pubMode == true ){
					var autoCompleteURL = '../../html_h1/ajax/temp.autocomplete.js';
					$.getScript(autoCompleteURL).done(function(){
						for( var i = 0 ; i < $('.autocomplete').length ; ++i ){
							if( $('.autocomplete:eq('+i+')').hasClass('autoCompleteAct') == false ){
								$('.autocomplete:eq('+i+')').addClass('autoCompleteAct');
								var appendTarget = $('.autocomplete:eq('+i+')').parent().attr('id');
								if( appendTarget == undefined ){
									$('.autocomplete:eq('+i+')').parent().attr( 'id', 'autoWrap'+i );
									appendTarget = $('.autocomplete:eq('+i+')').parent().attr('id');
								}
								$('.autocomplete:eq('+i+')').autocomplete({
									source: autocompleteData,
									delay:0,
									highlightClass: "pointC1",
									appendTo : '#'+appendTarget,
									focus : function(e,ui){
										return false;
									}
								});
							}
						}
					});
				} else {
					for( var i = 0 ; i < $('.autocomplete').length ; ++i ){
						if( $('.autocomplete:eq('+i+')').hasClass('autoCompleteAct') == false ){
							$('.autocomplete:eq('+i+')').addClass('autoCompleteAct');
							var appendTarget = $('.autocomplete:eq('+i+')').parent().attr('id');
							if( appendTarget == undefined ){
								$('.autocomplete:eq('+i+')').parent().attr( 'id', 'autoWrap'+i );
								appendTarget = $('.autocomplete:eq('+i+')').parent().attr('id');
							}
							$('.autocomplete:eq('+i+')').autocomplete({
								source: function(request, response){
									var reqJson = {};
									reqJson.searchVo = {};
									reqJson.searchVo.searchTerm = request.term;
									ExecuteAjax.callBgPost('/autoKeyWord.pwkjson', reqJson, function(resdata){
										response($.map(resdata.autoKeyWord.autoMap, function(el){
											return{
												label:el.label,
												value:el.label
											}
										}));
									});
								},
								highlightClass: "pointC1",
								appendTo : '#'+appendTarget,
								focus : function(e,ui){
									return false;
								}
							});
						}
					}
				}
			},
			crdSticky : function(){
				if( $('.crdQuick').length > 0 ){
					$('body').addClass('hasCrdSticky');
				}
				if( $('.crdQuick .close').hasClass('uiAct') == false ){
					$('.crdQuick .close').addClass('uiAct');
					$('.crdQuick .close').bind({
						'click':function(){
							$('.crdQuick').toggleClass('off');
							if( $('.crdQuick').hasClass('off') ){
								$('body').removeClass('hasCrdSticky');
								$('.crdQuick .waTxt').text('�쇱튂湲�');
								$('.crdQuick .btnArea a, .crdQuick .btnArea button').attr('tabindex', -1);
							} else {
								$('body').addClass('hasCrdSticky');
								$('.crdQuick .waTxt').text('�묎린');
								$('.crdQuick .btnArea a, .crdQuick .btnArea button').removeAttr('tabindex');
							}
						}
					});
				}
			},
			cardLinkInit : function(){
				for( var i = 0 ; i < $('.cardLink .link').length ; ++i ){
					if( $('.cardLink .link:eq('+i+')').hasClass('uiAct') == false ){
						$('.cardLink .link:eq('+i+')').addClass('uiAct');
						$('.cardLink .link:eq('+i+')').addClass('s0');
						ui.cardLinkSizeChk( $('.cardLink .link:eq('+i+')') );
						$('.cardLink .link:eq('+i+')').unbind('mouseover focusin mouseout focusout');
						$('.cardLink .link:eq('+i+')').bind({
							'mouseover focusin':function(){
								$(this).addClass('on');
							},
							'mouseout focusout':function(){
								$(this).removeClass('on');
							}
						});
					}
				}
			},
			cardLinkSizeChk : function(target){
				var targetY = $(target).find('.desc').outerHeight() + $(target).find('.tit').outerHeight() - 30;
				if( targetY < 10 ){
					setTimeout(function(){
						ui.cardLinkSizeChk( $(target) );
					},200);
				} else {
					$(target).css('transform','translate(0,'+targetY+'px)');
					setTimeout(function(){
						$(target).removeClass('s0');
					},200)
				}
			},
			cmsAddClass : function(){
				var asis = false;
				$('.bbsView .body').addClass('fr-view');
				$('.eventView_body #wcmsArea > ul').each(function(idx){
					if( $(this).find('dl').length > 0 ){
						$(this).addClass('eventCont');
					}
					idx++;
				});
				if( $('.eventView_body #wcmsArea dl').length > 0 )asis = true;
				if( $('.eventView_body .inner .tit').text() != '' )asis = false;
				if( asis == true ){
					$('.eventView_body').addClass('asisData');
				}
				if( $('.asisData').length > 0 ){
					$('.eventView_body #wcmsArea').wrapInner('<div class="titH3 pointC1 mt0"/>');
					$('.eventView_body #wcmsArea .titH3.pointC1 > *').each(function(){
						$(this).appendTo( '.eventView_body #wcmsArea' );
					});
				}
				tobeTransClass('clearfix ', 'clfix');
				tobeTransClass('fleft ', 'fl');
				tobeTransClass('fright ', 'fr');
				tobeTransClass('bull-no', 'list-txt');
				tobeTransClass('bull-cd-type1', 'txtList_star');
				tobeTransClass('bull-cd-type3', 'txtList_star');
				tobeTransClass('cd-star', 'txtList_star');
				tobeTransClass('tbl-type-1', 'tableX');
				tobeTransClass('tbl-type', 'tableY');
				tobeTransClass('list-txt-1', 'list-txt');
				tobeTransClass('btn-type-3c', 'btn_p m');
				tobeTransClass('cd-event-btn', 'btn_p round');
				tobeTransClass('btn-area', 'btnArea');
				tobeTransClass('namBox', 'subMsgBox');
				tobeTransClass('txt-c', 'ac');
				tobeTransClass('txt-l', 'al');
				tobeTransClass('txt-r', 'ar');
				tobeTransClass('font16', 'txtL');
				
				function tobeTransClass(asis,tobe){
					if( tobe == 'tableX' || tobe == 'tableY' ){
						$('.'+asis).removeAttr('class').addClass(tobe);
					} else {
						$('.'+asis).addClass(tobe).removeClass(asis);
					}
					
					$('.eventCont dl').each(function(){
						if( $(this).find('dd').length > 1 ){
							$(this).find('dd').addClass('blk');
						}
					});
				}
				
			}
			/*numberAni : function(target, _unit, _fix){
				var unit = '';
				var fix = 1;
				if( _unit != undefined )unit = _unit;
				if( _fix != undefined )fix = _fix;
				$(target).prop('Counter',0).animate({
					Counter: $(target).text()
				}, {
					duration: 1000,
					easing: 'swing',
					step: function (now) {
						var num = Math.ceil(now*fix)/fix;
						$(target).text(num+unit);
					}
				});
			}*/

	}
	var wa = {
			nowFocusEl : new Object(),
			// init
			init : function(){
				wa.update();
			},
			update : function(){
				wa.captionInit();
				wa.progressInit();
				wa.imgAltInit();
				wa.tabindexInit();
				wa.gridSkip();
			},
			// get Focus
			getNowFocus : function(){
				wa.nowFocusEl = $(':focus');
			},
			// set Focus
			setNowFocus : function(){
				$(wa.nowFocusEl).focus();
				wa.nowFocusEl = null;
			},
			// Focus Center Align
			focusCenterAlign : function(){
				$('#content button, #content :input, #content a, .quick :input, .quick a, .popCont button, .popCont :input, .popCont a').on('focusin', wa.focusCenterAlignFunc);
				$('.swiper-slide button, .swiper-slide a').off('focusin');
			},
			focusCenterAlignFunc : function(e){
				
			},
			// �ъ빱�� 媛��� �좏깮��
			getEnabledFocus : function(_target, visible){
				var target = _target + " ";
				if( visible == undefined || visible == null ){
					var str = target + 'div:visible[tabindex="0"],'+target + 'li:visible[tabindex="0"],'+target + 'button:visible:not([tabindex="-1"]),'+target + 'a:visible:not([tabindex="-1"]),'+target+'input:visible:not([tabindex="-1"]),'+target+'select:visible:not([tabindex="-1"]),'+target+'textarea:visible:not([tabindex="-1"])';
				} else {
					str = target + 'div:[tabindex="0"],' + target + 'li:[tabindex="0"],' + target + 'button:not([tabindex="-1"]),'+target + 'a:not([tabindex="-1"]),'+target+'input:not([tabindex="-1"]),'+target+'select:not([tabindex="-1"]),'+target+'textarea:not([tabindex="-1"])';
				}
				return str;
			},
			// Table caption init
			captionInit : function(){
				$('.tableX, .bbsTbl').each(function(){
					if( $(this).find('thead').length != 0 ){
						var tableTit = $(this).closest('section').find('.titArea .titH2').text();
						if( $(this).data('title') != undefined ){
							tableTit = $(this).data('title');
						}
						var captionStr = tableTit;
						if(tableTit != "" ) captionStr += ' - ';
						$(this).find('thead th').each(function(idx){
							if( $(this).is(':visible') ){
								var str = $(this).text();
								(idx != 0 )?captionStr += ", " + str:captionStr += str;
							}
						});
						captionStr += " �깆쑝濡� 援ъ꽦�섏뼱 �덉뒿�덈떎.";
						if( $(this).find('caption').length > 0 ){
							$(this).find('caption').text( captionStr );
						} else {
							$(this).prepend('<caption>'+ captionStr +'</caption>');
						}
					}
				});
				$('.tableY').each(function(){
					if( $(this).find('th').length == 0 ){
						$(this).find('caption').remove();
					}
				})
			},
			progressInit : function(){
				console.log("progressInit");
				for(var  i = 0 ; i < $('.progress').length ; ++i ){
					if( $('.progress').eq(i).hasClass('uiAct') == false ){
						$('.progress').eq(i).addClass('uiAct');
						$('.progress:eq('+i+') ol').attr('aria-hidden','true');
						var num = $('.progress').eq(i).find('li').length;
						var nowStep = $('.progress').eq(i).find('li.on').index() + 1;
						var stepName = $('.progress:eq('+i+') li.on').text();
						$('.progress:eq('+i+')').attr('role','img');
						$('.progress:eq('+i+')').attr('aria-label','珥� '+num+'�④퀎 以� '+nowStep+'�④퀎 '+stepName + ' 吏꾪뻾以�');
						if( $('.progress:eq('+i+') li.on span').length == 0 ){
							$('.progress:eq('+i+') li.on').wrapInner('<span/>');
						}
					}
				}
			},
			getNowFocus : function (){
				wa.nowFocusEl = $(':focus');
			},
			setNowFocus : function (){
				$(wa.nowFocusEl).focus();
				wa.nowFocusEl = null;
			},
			imgAltInit : function(){
				$('img').each(function(){
					if( $(this).attr('alt') == undefined ){
						$(this).attr('alt', '');
					}
				});
			},
			gnbSrchInit : function(){
				$('.gnb .right .gnb_search').before('<div class="searchFocus btnFirst" tabindex="0"></div>');
				$('.gnb .right .gnb_search').after('<div class="searchFocus btnLast" tabindex="0"></div>');
				$('.srchContain').prepend('<div class="searchFocus first" tabindex="0"></div>');
				$('.srchContain').append('<div class="searchFocus last" tabindex="0"></div>');
				$('.searchFocus').bind({
					'focusin':function(e){
						if( $(e.target).hasClass('btnLast') ){
							$('.srchBar .ipt.autocomplete').focus();
						} else if( $(e.target).hasClass('last') ){
							$('.gnb .right .gnb_search').focus();
						} else if( $(e.target).hasClass('first') ){
							$('.gnb .right .gnb_search').focus();
						} else if( $(e.target).hasClass('btnFirst') ){
							$( wa.getEnabledFocus('.srchContain .eventArea') ).last().focus();
						}
					}
				});
			},
			chromeFocus : function(){
				if( isChrome ){
					$('body').on({
						'keydown':function(e){
							if( e.code == 'Tab' ){
								$('body').addClass('tabFocus');
							}
						},
						'mousedown':function(){
							$('body').removeClass('tabFocus');
						}
					});
				}
			},
			tabindexInit : function(){
				$('.termsWrap .iptGroup .accoBody .inner, .scrollWrap').attr('tabindex','0');
			},
			gridSkip : function(){
				$('.gridWrap').addClass('gridArea');
				for( var i = 0 ; i < $('.gridArea').length ; ++i ){
					if( $('.gridArea:eq('+i+')').hasClass('uiAct') == false ){
						$('.gridArea:eq('+i+')').addClass('uiAct');
						$('.gridArea:eq('+i+')').before('<div class="gridFocusSet blind first" tabindex="-1" data-index="'+i+'"></div>');
						$('.gridArea:eq('+i+')').before('<a href="#" class="gridFocusSet first" tabindex="0" data-index="'+i+'">洹몃━�� 嫄대꼫�곌린</a>');
						$('.gridArea:eq('+i+')').after('<div class="gridFocusSet blind last" tabindex="-1" data-index="'+i+'"></div>');
						$('.gridArea:eq('+i+')').after('<a href="#" class="gridFocusSet last" tabindex="0" data-index="'+i+'">洹몃━�� �댁쟾 �곸뿭�쇰줈 �대룞</a>');
					}
				}
				$('.gridFocusSet').unbind('click');
				$('a.gridFocusSet').bind({
					'click' : function(e){
						e.preventDefault();
						var idx = $(this).data('index');
						if( $(this).hasClass('first') ){
							$('div.gridFocusSet.last[data-index="'+idx+'"]').focus();
						} else {
							$('div.gridFocusSet.first[data-index="'+idx+'"]').focus();
						}
					}
				});
			}
	}
	var lp = {
			fnCb : new Object(),  // 媛쒕퀎�앹뾽�먯꽌 肄쒕갚�⑥닔瑜� �뗮똿�좎닔 �덈뒗 �⑥닔 媛앹껜.
			winLastW : new Object(),
			popupInterval : new Object(),
			popIntervalStr : new Object(),
			closeTarget : new Object(),
			firstPopFocus : new Object(),
			elCnt : 0, // element 媛�닔
			move : function(){
				$( '.popWrap' ).each(function(){
					$(this).insertAfter( ".wrapper" );
				});
			},
			// Open
			open : function (url, jsParam, jsURL, fnObj){ // jsParam(json �뚮씪誘명꽣 媛앹껜), fnObj(肄쒕갚�⑥닔)
				var alertState = false;
				wa.getNowFocus();
				lp.winLastW = $('body').outerWidth();
				if(fnObj != undefined && fnObj != null && fnObj != ""){
					lp.fnCb = fnObj; // 肄쒕갚�⑥닔 �뗮똿.
				}
				if( $('body').hasClass('popOn') == false ){
					$('html, body').addClass('popOn');
					lp.firstPopFocus = $(':focus');
				}
				if( lp.winLastW != $(window).width() ){
					$('body').addClass('hasScroll');
				}
				if( url.indexOf('/') != -1 ){
					var str = url + " .popup";
					$('body').append('<div id=\''+url.substring(url.lastIndexOf('/')+1, url.lastIndexOf('.'))+'_cPopup\' class="popWrap nowOpen ajaxPop analysis"></div>');
					$('.popWrap.nowOpen.analysis .popCont').hide();
					$('.popWrap.nowOpen.analysis').fadeIn();
					$('.ajaxPop.nowOpen.analysis').load(str, jsParam, function(){
						lp.getCol( $('.ajaxPop.nowOpen.analysis') );
						ui.init();
						if( $(this).find('.popCont.alert').length > 0 ){alertState = true;}
						$('.nowOpen.analysis .popCont').fadeIn('fast',function(){
							$('.nowOpen.analysis .popCont').attr("tabindex", -1).focus();
							console.log("alertState : " + alertState);
							if( alertState == true ){
								$('.popWrap.analysis').addClass('nowAlert').removeClass('nowOpen analysis');
								lp.openedSet(jsURL, 'alert');
							} else {
								if( $('.nowOpen').length > 0 ){
									$('.popWrap.nowOpen:not(.analysis)').addClass('beforePopup').removeClass('nowOpen');
								}
								$('.popWrap.analysis').removeClass('analysis');
								lp.openedSet(jsURL);
							}
						});
					});
				} else {
					var targetPop = $(url);
					targetPop.addClass('nowOpen analysis');
					lp.getCol( $('.nowOpen.analysis') );
					targetPop.fadeIn('fast',function(){
						$('.nowOpen.analysis .popCont').attr("tabindex", -1).focus();
						if( $(targetPop).find('.alert').length > 0 ){
							$('.nowOpen.analysis').addClass('nowAlert').removeClass('nowOpen analysis');
							lp.openedSet(jsURL, 'alert');
						} else {
							$('.nowOpen.analysis').removeClass('analysis');
							lp.openedSet(jsURL);
						}
					});
				}
			},
			openedSet : function( jsURL, _type ){
				$('.wrapper').attr('aria-hidden','true');
				$('.popCont').attr('role','dialog');
				$('.popCont .formTbl').each(function(){
					$(this).find('colgroup col:eq(0), colgroup col:eq(2)').css('width','145px');
				});
				wa.update();
				if( jsURL != undefined )$.getScript( jsURL ).done( function(){ /*cf_popfooter();*/ }).fail(function(){ /*cf_popfooter();*/ });
				if( $('.popWrap.nowOpen:not(.beforePopup)').find('.popBody').length > 0 ){
					lp.popIntervalStr = '.popWrap.nowOpen';
					lp.popupResize(lp.popIntervalStr);
					clearInterval( lp.popResizeInterval );
					lp.popupInterval = setInterval(lp.popResizeInterval, 1000);
					if( $(lp.popIntervalStr).find('.tab').length > 0 ){
						$(lp.popIntervalStr).find('.popBody').removeClass('on off');
						setTimeout(function(){
							lp.popupResize(lp.popIntervalStr);
						},100);
					}
				} else {
					
				}
				if( $('.beforePopup').length > 0 ){
					$('.popWrap.nowOpen:not(.beforePopup)').css('z-index', '1200');
					if( $('.nowAlert').length > 0 ){
						$('.popWrap.nowOpen:not(.beforePopup)').css('z-index', '1202');
					}
				}
				if( _type == 'alert' ){
					$('.nowAlert .popBody').removeClass('on').removeAttr('tabindex').css('height','auto');
					lp.focusLoopInit('alert');
				} else {
					lp.focusLoopInit();
				}
				ui.emailInit();
				$('.popWrap .ipt').each(function(){
					if( $(this).data('unit') != undefined ){
						ui.iptUnitInit( $(this) );
					}
				});
				if( $('.nowOpen .swiperWrap .swiper-container').length == 0 ){
					$('.nowOpen .swiperWrap').addClass('swiperReady');
					ui.swiperInit();
				}
			},
			close : function (_mTime){
				console.log("lp close");
				lp.closeTarget = $(':focus').closest('.popWrap');
				wa.setNowFocus();
				if(_mTime == null || _mTime == undefined){
					var mTime = 300;
				} else {
					mTime = _mTime;
					if( _mTime.indexOf('.') >= 0 || _mTime.indexOf('#') >= 0 ){
						lp.closeTarget = _mTime;
					}
				}
				$(lp.closeTarget).fadeOut(mTime, function(){
					lp.closeComplete();
				});
			},
			closeComplete : function(){
				$(lp.closeTarget).removeClass('nowOpen nowAlert');
				if( $(lp.closeTarget).hasClass('ajaxPop') ){
					$(lp.closeTarget).remove();
				}
				if( $('.beforePopup').length > 0 ){
					$('.beforePopup').addClass('nowOpen').removeClass('beforePopup');
				}
				if( $('body .nowOpen').length == 0 && $('body .nowAlert').length == 0 ){
					clearInterval( lp.popupInterval );
					$('.popWrap').removeClass('nowOpen nowAlert');
					$('html, body').removeClass('popOn');
					$('body').removeClass('hasScroll');
					$('html').removeClass('popFullScroll');
					$('.wrapper').removeAttr('aria-hidden');
					$(lp.firstPopFocus).focus();
				}
			},
			change : function(url, jsParam, jsURL, fnObj, remove){
				if(lp.fnCb != undefined && lp.fnCb != null && lp.fnCb != ""){
					lp.fnCb = fnObj;
				}
				$('body .popWrap.nowOpen').css('z-index',1100);
				var popH = $('body .popWrap.nowOpen .popCont').outerHeight() - $('body .popWrap.nowOpen .popHead').outerHeight();
				$('body .popWrap.nowOpen').addClass('loading');
				$('body .popWrap.nowOpen .popCont').css('min-height', popH);
				layout.loadingInit('', '.popWrap.nowOpen .popCont');
				var topPos = $('.popWrap.nowOpen .popHead').outerHeight();
				$('.popCont .loadingWrap').css({'top': topPos });
				$('.popCont .loadingWrap span').css({'margin-top': -topPos });
				$('body .popWrap.nowOpen .popCont .lpLoadingWrap').css('min-height', popH );
				setTimeout(
					function (){ lp.changeInit(url, jsParam, jsURL, fnObj, remove);
				},1500);
			},
			changeInit : function(url, jsParam, jsURL, fnObj, remove){
				if( url.indexOf('/') != -1 ){
					var str = url + " .popup";
					$("body").append('<div class="popWrap noBG ajaxPop"></div>');
					$('.popWrap.noBG.ajaxPop').hide();
					$('.popWrap.noBG.ajaxPop').css('z-index',1111);
					
					$("body .noBG.ajaxPop").load(str, jsParam ,function(){
						lp.getCol( $("body .noBG.ajaxPop") );
						$('.noBG').show();
						lp.popWrapCtrl();
						$('.wrapper').attr('aria-hidden','true');
						
						if(remove == true ){
							$('.popWrap.nowOpen').remove();
						} else {
							$('.popWrap.nowOpen').removeClass('nowOpen');
						}
						ui.init();
						lp.openedSet();
						$('.popWrap.noBG').addClass('nowOpen');
						$('.nowOpen .popCont').attr("tabindex", -1).focus();
						$('.popWrap.noBG').removeClass('noBG');
						if( jsURL != undefined )$.getScript( jsURL ).done( function(){ /*cf_popfooter();*/ }).fail(function(){ /*cf_popfooter();*/ });
						lp.popupResize('.popWrap.nowOpen');
					});
					
				} else {
					var str = url;
					var targetPop = $(str);
					targetPop.css('z-index',1200);
					targetPop.addClass('noBG');
					targetPop.show();
					lp.popWrapCtrl();
					$('.wrapper').attr('aria-hidden','true');
					targetPop.find('.popCont').attr("tabindex", -1).focus();
					if(remove == true ){
						$('.popWrap.nowOpen').remove();
					} else {
						$('.popWrap.nowOpen').removeClass('nowOpen');
					}
					$('.popWrap.noBG').addClass('nowOpen');
					$('.popWrap.noBG').removeClass('noBG');
					if( jsURL != undefined )$.getScript(  jsURL, function(){/*cf_popfooter();*/} );
					lp.popupResize(str+".nowOpen");
				}
			},
			getCol : function( target ){
				if( $(target).find('.popBody').hasClass('admin') ){
					$(target).find('.popBody').removeClass('admin');
					$(target).addClass('admin');
				}
				var getCol = $(target).find('.popBody').attr('class');
				console.log( "getCol : " + getCol );
				if( getCol.indexOf('col_') > -1 ){
					var replaceCol = getCol.replace('popBody','').replace('on','').replace(/ /gi, '');
					$(target).find('.popCont').addClass( replaceCol );
					$(target).find('.popBody').removeClass( replaceCol );
				}
				if( $(target).find('.popBody').hasClass('full') ){
					$(target).find('.popCont').addClass('full');
					$(target).find('.popBody').removeClass('full');
				}
			},
			popWrapCtrl : function (){
				$('.popWrap.nowOpen .loadingWrap').remove();
				$('.popWrap.nowOpen').hide();
			},
			callBack : function(aa){ // 媛쒕퀎�앹뾽�먯꽌 肄쒕갚 �⑥닔 �몄텧 �좎닔 �덈룄濡� �쒓났.
				lp.fnCb(aa);
			},
			callBackNullClose : function (mTime){
				if(lp.fnCb != undefined && lp.fnCb != null && lp.fnCb != ""){
					lp.fnCb(null); // 肄쒕갚�⑥닔 �뗮똿.
				}
				lp.fnCb = null;
				lp.close(mTime);
			},
			setCallBack : function(pFn){ // �앹뾽 �몄텧�� 肄쒕갚 �⑥닔瑜� �뗮똿 �좎닔 �덈룄濡� �쒓났.
				lp.fnCb = pFn;
			},
			focusLoopInit : function (){
				$('.nowAlert, .popWrap.nowOpen').each(function(){
					if( $(this).find('.focusSet').length == 0 ){
						$(this).prepend('<div class="focusSet blind first" tabindex="0"></div>');
						$(this).append('<div class="focusSet blind last" tabindex="0"></div>');
						$(this).find('.focusSet').bind({
							'focusin':function(e){
								var popWrap = '.'+$(e.target).closest('.popWrap').attr('class').replace(/ /gi,'.') + ' .popCont';
								if( $(e.target).hasClass('first') ){
									$( wa.getEnabledFocus(popWrap) ).last().focus();
								} else {
									$( wa.getEnabledFocus(popWrap) ).first().focus();
								}
							}
						});
					}
				});
			},
			popResizeInterval : function (){
				if( $(lp.popIntervalStr + ' .popBody').hasClass('on') == false && $(lp.popIntervalStr + ' .popBody').hasClass('off') == false  ){
					lp.popupResize(lp.popIntervalStr);
				}
				if(winH != $(window).height()){
					winH = $(window).height();
					lp.popupResize(lp.popIntervalStr);
				}
				if( $(lp.popIntervalStr + ' .popBody').hasClass('on') == true ){
					if( lp.elCnt != $(lp.popIntervalStr + ' .popInner > *').length ){
						lp.elCnt = $(lp.popIntervalStr + ' .popInner > *').length;
						lp.popupResize(lp.popIntervalStr);
					}
				}
			},
			popupResize : function( str ){
				$(str + ' .popBody').removeClass('on').removeAttr('tabindex');
				$(str + ' .popBody').css('height','auto');
				winH = $(window).height();
				try{
					var scrollPos = $(str + ' .popBody').position().top
				} catch(error){
					scrollPos = 0;
				}
				var result = $('.popWrap.nowOpen .popBody').outerHeight();
				$('.popWrap.nowOpen .popCont').css('min-height', 0);
				var vGap = 60; // 60�� �앹뾽怨� 寃����� Dimmed �곸뿭�� �꾩븘�� �⑹궛�� 留덉쭊
				if( $('body.windowPop').length > 0 ){
					vGap = 0;
					if( $('body.windowPop .popWrap .popBody').length > 0 ){
						vGap = 60;
					}
				}
				if( winH - vGap < $(str + ' .popCont' ).outerHeight() ){
					var headerH = $('.popWrap.nowOpen .popHead').outerHeight() + 30;// 30�� �ㅻ뜑�� �ㅽ겕濡� �ъ씠�� 媛꾧꺽
					var bottomH = $('.popWrap.nowOpen .popCont > .btnArea').outerHeight();
					var stickyH = 0;
					var maxH = winH - vGap - headerH - bottomH;/* - stickyH - targetPX;*/
					if(result > maxH ){
						result = maxH;
					}
					$(str + ' .popBody').height(Math.floor(result) - 30);
					$(str + ' .popBody').addClass('on');
					$(str + ' .popBody').attr('tabindex','0');
				}
				//移대뱶鍮꾧탳��
				if( $('.compareBox').length > 0 ){
					var compareInterval = setInterval(function(){layout.compareBoxInit();},500);
					setTimeout(function(){
						clearInterval( compareInterval );
					},1500);
				}
			},
			adminOpen : function(el){
				$('.adminPopWrap').show();
				$('body').addClass('rel');
				$('.wrapper').attr('aria-hidden',true);
				if( $('.adminPopWrap .focusSet').length == 0 ){
					$('.adminPopWrap').prepend('<div class="focusSet blind first" tabindex="0"></div>');
					$('.adminPopWrap').append('<div class="focusSet blind last" tabindex="0"></div>');
					$('.adminPopWrap').find('.focusSet').bind({
						'focusin':function(e){
							if( $(e.target).hasClass('first') ){
								var popWrap = '.adminPopWrap .popCont:eq('+ Number($('.adminPopWrap .popCont').length - 1) +')';
								$( wa.getEnabledFocus(popWrap) ).last().focus();
							} else {
								popWrap = '.adminPopWrap .popCont:eq(0)';
								$( wa.getEnabledFocus(popWrap) ).first().focus();
							}
						}
					});
					$( wa.getEnabledFocus('.adminPopWrap .popCont:eq(0)') ).first().focus();
				}
				setTimeout(function(){
					var popWrapH = $('.adminPopWrap').outerHeight() + 10;
					console.log( "$('body').outerHeight() : " + $('body').outerHeight() );
					var bodyH = $('body').outerHeight();
					if( $('.parallax').length > 0 ){
						bodyH = $(window).outerHeight();
					}
					if( popWrapH < bodyH ){
						popWrapH = bodyH;
					}
					$('.adminPopWrap').css('min-height', popWrapH );
				},500);
			},
			adminClose : function(){
				console.log("lp.adminClose() �ㅽ뻾");
				var arryPos = [];
				$('.adminPopWrap .popCont').each(function(){
					var arryTL = [];
					var top = $(this).offset().top - parseInt( $(this).css('margin-top') );
					var left = $(this).offset().left - parseInt( $(this).css('margin-left') );
					arryTL.push( top );
					arryTL.push( left );
					arryPos.push( arryTL );
				});
				$('.adminPopWrap .popCont').each(function(idx){
					$(this).css({'position':'absolute', 'top':arryPos[idx][0], 'left':arryPos[idx][1]});
					idx++;
				})
				var target = $(':focus').closest('.popCont');
				if( $('.safari').length > 0 ){
					target = $('.adminPopWrap .popCont');
				}
				$(target).remove();
				if( $('.adminPopWrap' ).find('.popCont').length == 0 ){
					$('.adminPopWrap').fadeOut(function(){
						$('.wrapper').removeAttr('aria-hidden');
						$('.adminPopWrap').remove();
						$('body').removeClass('rel');
					});
				}
			}
	}
	var dp = {
			nowFocus : null,
			// Date picker Make
			init : function(){
				var month1 = '1', month2 = '2', month3 = '3', month4 = '4', month5 = '5', month6 = '6', month7 = '7', month8 = '8', month9 = '9', month10 ='10', month11 = '11', month12 = '12';
				var week1 = '��', week2 = '��', week3 = '��', week4 = '��', week5 = '紐�', week6 = '湲�', week7 = '��';
				var enWeek1 = 'SUN', enWeek2 = 'MON', enWeek3 = 'TUE', enWeek4 = 'WED', enWeek5 = 'THU', enWeek6 = 'FRI', enWeek7 = 'SAT';
				var year = '';
				var prevMonth = '�댁쟾 ��';
				var nextMonth = '�ㅼ쓬 ��';
				var select = '�щ젰�먯꽌 �좏깮�섍린';
				var closeTxt = "�щ젰 �リ린";
				var altStr = '�щ젰 �덉씠�� �닿린';
				var resultMonthArry;
				
				for(var i = 0; i < $('.ipt.date').length ; ++i ){
					if( $('.ipt.date:eq('+i+')').hasClass('uiAct') == false ){
						$('.ipt.date:eq('+i+')').addClass('uiAct');
						if( $('.ipt.date:eq('+i+')').attr('id') == undefined ){
							$('.ipt.date:eq('+i+')').attr('id', 'datepicker'+i );
						}
						$('.ipt.date:eq('+i+')').wrap('<div class="dateWrap">');
						$('.ipt.date:eq('+i+')').attr('autocomplete','off');
						var yearRangeSet = 'c-10:c+10';
						if( $('.ipt.date:eq('+i+')').data('startYear') != undefined ){
							var startYear = $('.ipt.date:eq('+i+')').data('startYear');
							yearRangeSet = '-'+startYear+':+0';
						}
						if( $('.ipt.date:eq('+i+')').data('endYear') != undefined ){
							startYear = $('.ipt.date:eq('+i+')').data('startYear');
							var endYear = $('.ipt.date:eq('+i+')').data('endYear');
							yearRangeSet =  '-'+startYear+':+'+endYear;
						}
						if( $('.ipt.date:eq('+i+')').data('en') != true ){
							resultMonthArry = [ week1, week2, week3, week4, week5, week6, week7 ];
						} else {
							resultMonthArry = [ enWeek1, enWeek2, enWeek3, enWeek4, enWeek5, enWeek6, enWeek7 ];
						}
						$('.ipt.date:eq('+i+')').datepicker({
							showOn: "button",
							buttonImageOnly: false,
							buttonText: altStr,
							yearRange: yearRangeSet,
							
							changeYear:true,
							changeMonth:true,
							dateFormat : 'yy.mm.dd',
							/*prevText : prevMonth,
							nextText : nextMonth,*/
							monthNames : [ month1, month2, month3, month4, month5, month6, month7, month8, month9, month10, month11, month12 ],
							monthNamesShort : [ month1, month2, month3, month4, month5, month6, month7, month8, month9, month10, month11, month12 ],
							dayNames : resultMonthArry,
							dayNamesShort : resultMonthArry,
							dayNamesMin : resultMonthArry,
							showMonthAfterYear : true,
							closeText : closeTxt, 
							
							beforeShow:function(input){
								if( $('body').hasClass('popOn') ){
									$(input).next().after( $('#ui-datepicker-div') );
								}
								setTimeout(function(){
									dp.addDatePicker(input);
								},100);
							},
							
							onChangeMonthYear:function(input){
								setTimeout(function(){
									dp.addDatePicker(input);
								},100);
							},
							onClose:function(input){
								$('.nowCalendar').prev().focus();
								$('.nowCalendar').removeClass('nowCalendar');
								dp.nowFocus = null;
							}
						});
						$('.ipt.date:eq('+i+')').next().bind({
							'click':function(){
								if( $(this).hasClass('nowCalendar') == false ){
									$(this).addClass('nowCalendar');
								} else {
									$(this).removeClass('nowCalendar')
								}
							}
						});
						
					}
				}
			},
			addDatePicker : function (input){
				var todayBtn = '�ㅻ뒛 �좎쭨 �좏깮';
				if( $(input).data('btn') != undefined ){
					todayBtn = $(input).data('btn');
				}
				var yearTit = '�꾨룄 �좏깮';
				var monthTit = '�� �좏깮';
				var yearOpTxt = '��';
				var closeTxt = '�リ린';
				var captionTxt = '�붾떖�� - ��,��,��,��,紐�,湲�,�좎슂�쇰줈 援ъ꽦�섏뼱 �덉뒿�덈떎.';
				var todayTxt = '�ㅻ뒛 �좎쭨�낅땲��.';
				var selectDay = '�꾩옱 �좏깮�� �좎쭨�낅땲��.';
				$('#ui-datepicker-div').prepend('<div tabindex="0" class="close blind first"></div>');
				$('#ui-datepicker-div table').prepend('<caption>'+captionTxt+'</caption>');
				$('.ui-datepicker-year').attr('title', yearTit);
				$('.ui-datepicker-month').attr('title', monthTit);
				//$('.ui-datepicker-year option').append(yearOpTxt);
				var headerPane = $(input).datepicker('widget').find('.ui-datepicker-calendar');
				$('<button type="button" class="btnIco_close">'+closeTxt+'</button>').insertBefore(headerPane).bind({
					'click':function(e){
						$('.nowCalendar').prev().focus();
						$('.nowCalendar').trigger('click');
						$('.nowCalendar').removeClass('nowCalendar');
					}
				});
				$('<div class="btnArea ac"><button type="button" class="btn_l s">'+todayBtn+'</button><div tabindex="0" class="close blind end"></div>').insertAfter(headerPane).bind({
					'click':function(e){
						e.preventDefault();
						var target = $('.nowCalendar').prev();
						if( $(target).data('btnValue') == undefined ){
							$('.nowCalendar').prev().datepicker('setDate', new Date()).datepicker('hide');
						} else {
							$('.nowCalendar').prev().datepicker('setDate', $(target).data('btnValue') ).datepicker('hide');
						}
						$('.nowCalendar').removeClass('nowCalendar');
						setTimeout(function(){
							$(target).focus();
						},100);
					}
				});
				$('#ui-datepicker-div .ui-datepicker-month, #ui-datepicker-div .ui-datepicker-year').bind({
					'change':function(){
						dp.nowFocus = $(this).attr('class');
						console.log("?dp.nowFocus : " + dp.nowFocus );
					}
				});
				// focus
				$('#ui-datepicker-div .close.blind.first').bind({
					'focusin':function(){
						$('#ui-datepicker-div .btnArea button').focus();
					}
				});
				$('#ui-datepicker-div .close.blind.end').bind({
					'focusin':function(){
						$('#ui-datepicker-div .ui-datepicker-year').focus();
					}
				});
				$('#ui-datepicker-div .ui-state-highlight').attr('title', todayTxt );
				$('#ui-datepicker-div .ui-state-active').attr('title', selectDay );
				if( dp.nowFocus == null ){
					$('.ui-datepicker-header select.ui-datepicker-year').focus();
				} else {
					$('.ui-datepicker-header select.ui-datepicker-year').focus();
					setTimeout(function(){
						$("."+dp.nowFocus).focus();
					}, 10);
				}
			}
	}
	var mp = {
			todayYear : new Date().getFullYear(),
			todayMonth : new Date().getMonth() + 1,
			monthArry : new Array('Jan', 'Feb', 'Mar','Apr', "May", "Jun", "Jul","Aug", "Sep","Oct","Nov","Dec"),
			monthFullArry : new Array('January', 'February', 'March','April', "May", "June", "July","August", "September","October","November","December"),
			selectedYear : null,
			selectedMonth : null,
			init : function( target ){
				var pickerTxt = '�꾩썡 �좏깮 �щ젰 �닿린';
				$(target).wrap('<div class="dateWrap">');
				$(target).addClass('hasDatepicker');
				$(target).after('<button type="button" class="btnIco_month">'+pickerTxt+'</button>');
				/*if( $(target).closest('.hasMP').length > 0 ){
					$(target).find('.ipt').addClass('hasMP').attr('tabindex','-1');
				}*/
				$(target).bind({
					'paste focusout':function(){
						$(this).val(mp.formatting($(this).val()));
						mp.pickerSet( $(this) );
					}
				});
				
				$(target).parent().find('.btnIco_month').bind('click', function () {
					if( $('#monthPicker').hasClass('on') == false ){
						mp.close();
						mp.open( $(this).parent().find('.month') );
					} else {
						$('.nowMPFocus').removeClass('nowMPFocus');
						mp.open(  $(this).parent().find('.month') );
					}
				});
				// monthPicker媛� �놁쓣�� 理쒖큹 �앹꽦
				if( $('body .monthPicker').length == 0 ){
					mp.make();
				}
			},
			thisMonthBtn : '�대쾲 ��',
			settingTxt : '�좏깮',
			// picker make
			make : function(){
				var selectTit = "�꾨룄 �좏깮";
				var closeBtn = '�リ린';
				var thisMonthTxt = '�대쾲 ��';
				var picker = '<div id="monthPicker" class="monthPicker">'+
				'	<div tabindex="0" class="close blind first"></div>'+
				'	<div class="topArea">'+
				'		<select class="ipt notDel" id="mpYear" title="'+selectTit+'"></select><button type="button" class="btnIco_close">'+closeBtn+'</button>'+
				'	</div>'+
				'	<div class="monthList"></div>'+
				'	<div class="btnArea ac"><button type="button" class="btn_l s">'+mp.thisMonthBtn+' '+mp.settingTxt+'</button></div>'+
				'	<div tabindex="0" class="close blind end"></div>'+
				'</div>';
				$('body').append(picker);
				for( var i = 0 ; i < 12 ; ++i ){
					var num = Number( i + 1 );
					if( num < 10 ){
						var monthVal = "0"+num;
					} else {
						monthVal = num;
					}
					$('#monthPicker .monthList').append('<button type="button" role="radio" aria-checked="false" value="'+monthVal+'" class="btn_l">'+num+'��</button>');
				}
				$('#monthPicker .monthList button:nth-child('+mp.todayMonth+')').addClass('today').append('<i class="blind to">'+thisMonthTxt+'</i>');
				// select event
				$('#monthPicker .topArea select').bind({
					'change':function(e){
						mp.changeYear(e);
					}
				})
				
				//�붾쾭��
				$('#monthPicker .monthList button').bind({
					'click':function(){
						$(this).siblings().removeClass('on');
						$(this).addClass('on');
						mp.valueSet();
						mp.close(true);
					}
				});
				
				//�꾩옱�붾쾭��
				$('#monthPicker .btnArea button').bind({
					'click':function(){
						$('#monthPicker .monthList button').removeClass('on');
						if( $('.nowMPFocus').data('btnYear') != undefined && $('.nowMPFocus').data('btnMonth') != undefined ){
							$('#monthPicker .topArea select').val( $('.nowMPFocus').data('btnYear') );
							$('#monthPicker .monthList button:nth-child('+$('.nowMPFocus').data('btnMonth')+')').addClass('on');
						} else {
							$('#monthPicker .topArea select').val(mp.todayYear);
							$('#monthPicker .monthList button:nth-child('+Number(mp.todayMonth)+')').addClass('on');
						}
						mp.valueSet();
						mp.close(true);
					}
				});
				
				//�リ린踰꾪듉
				$('#monthPicker .btnIco_close').bind({
					'click':function(){
						mp.close(true);
					}
				});
				// focus
				$('#monthPicker .close.blind.first').bind({
					'focusin':function(){
						$('#monthPicker .btnArea button').focus();
					}
				});
				$('#monthPicker .close.blind.end').bind({
					'focusin':function(){
						$('#monthPicker select').focus();
					}
				});
			},
			//picker select change
			changeYear : function(e){
				var selectYear = e.target.value;
				$('#monthPicker .monthList button').removeClass('on today').attr('aria-checked','false');
				if( selectYear == mpSelectedYear ){
					$('#monthPicker .monthList button:nth-child('+Number(mpSelectedMonth)+')').addClass('on').attr('aria-checked','true');
				}
				if( selectYear == mp.todayYear ){
					$('#monthPicker .monthList button:nth-child('+Number(mp.todayMonth)+')').addClass('today');
				}
			},
			// input媛� �뗮똿
			valueSet : function(){
				var selYear = $('#monthPicker .topArea select').val();
				var selMonth = $('#monthPicker .monthList button.on').val();
				var resultDate = selYear + "."+ selMonth;
				$(".nowMPFocus").val( resultDate );
				$('#monthPicker .monthList button').attr('aria-checked','false');
				$('#monthPicker .monthList button.on').attr('aria-checked','true');
				mpSelectedYear = selYear;
				mpSelectedMonth = selMonth;
			},
			// picker �뗮똿
			pickerSet : function(_target){
				$('#monthPicker .topArea .links').show();
				if( _target == undefined ){
					var target = '.nowMPFocus';
				} else {
					target = _target;
				}
				$('#monthPicker .monthList button').removeClass('on today').attr('aria-checked','false');
				if( String($(target).val()).length == 7 ){
					var date = String($(target).val());
					mpSelectedYear = date.substr(0,4);
					mpSelectedMonth = date.substr(-2,2);
					for( var i = 0 ; i < $('#monthPicker select option').length ; ++i ){
						if( mpSelectedYear == $('#monthPicker select option:eq('+i+')').val() ){
							$('#monthPicker select').val(mpSelectedYear);
							break;
						}
					}
					if( $('#monthPicker select').val() == mpSelectedYear ){
						for( var i = 0 ; i < $('#monthPicker .monthList button').length ; ++i ){
							if( mpSelectedMonth == $('#monthPicker .monthList button:eq('+i+')').val() ){
								$('#monthPicker .monthList button:eq('+i+')').addClass('on').attr('aria-checked','true');
								break;
							}
						}
					} else {
						$('#monthPicker select').val(mp.todayYear);
					}
				} else {
					mpSelectedYear = ""; 
					mpSelectedMonth = "";
					$('#monthPicker select').val(mp.todayYear);
					if( mp.todayYear > $('#monthPicker select option').last().val() ){
						$('#monthPicker select').prop('selectedIndex',0);
						$('#monthPicker .topArea .links').hide();
					}
				}
				if( $('#monthPicker select').val() == mp.todayYear ){
					$('#monthPicker .monthList button:nth-child('+mp.todayMonth+')').addClass('today');
				}
			},
			// picker open
			open : function(target){
				$(target).addClass("nowMPFocus");
				var startYear = mp.todayYear-10;
				var endYear = mp.todayYear+10;
				if( $('.nowMPFocus').data('startYear') != undefined ){
					startYear = $('.nowMPFocus').data('startYear');
				}
				if( $('.nowMPFocus').data('endYear') != undefined ){
					endYear = $('.nowMPFocus').data('endYear');
				}
				$('#monthPicker select').empty();
				for( var i = startYear ; i <= endYear ; ++i ){
					$('#monthPicker select').append('<option value="'+i+'">'+i+'</option>');
				}
				
				if( $(target).data('btn') != undefined ){
					$('#monthPicker .btnArea .btn_l').text( $(target).data('btn') );
				} else {
					$('#monthPicker .btnArea .btn_l').text( mp.thisMonthBtn + ' ' + mp.settingTxt );
				}
				
				//value setting
				mp.pickerSet();
				
				//position setting
				var offset = target.offset();
				var posY = offset.top + 45;
				var posX = offset.left;
				$('#monthPicker').addClass('on').css({"top":posY, "left":posX});
				$('#monthPicker select').focus();
				mp.bodyAddBind();
			},
			//picker close
			close : function(focusUse){
				if( focusUse == true ){
					$('.nowMPFocus').focus();
				}
				if( $('.nowMPFocus').hasClass('hasMP') && $('.nowMPFocus').prev().is('.dateTxt') ){
					$('.nowMPFocus').prev().text( mp.formattingTxt( $('.nowMPFocus').val() ) );
				}
				
				$('.nowMPFocus').removeClass('nowMPFocus');
				$('#monthPicker').removeClass('on');
				$('body').unbind('mousedown');
			},
			formatting : function(_str){
				var str = _str.replace(".", "");
				if( str.length == 5 ){
					var resultTxt = str.substr(0,4)+".0"+str.substr(-1,1);
				} else if(str.length == 6 ){
					resultTxt = str.substr(0,4)+"."+str.substr(-2,2);
				}
				//console.log("resultTxt : " + resultTxt );
				return resultTxt;
			},
			formattingTxt : function(_str){
				var resultTxt = _str;
				var str = _str;
				resultTxt = str.substr(0,4)+"�� "+str.substr(-2,2)+"��";
				return resultTxt;
			},

			// pickerBodyBind
			bodyAddBind : function(){
				$('body').bind({
					'mousedown':function(e){
						if( $(e.target).closest('.monthPicker').length == 0 && $(e.target).hasClass('nowMPFocus') == false && $(e.target).prev().hasClass('nowMPFocus') == false ){
							mp.close();
						}
					}
				});
			}
	}
	var tip = {
			posArry : new Array(),
			make : function(){
				$('.toolTip').each(function(){
					$(this).wrap('<div class="tip"><div class="tipWrap"></div></div>');
					if( $(this).hasClass('noti') ){
						$(this).closest('.tip').addClass('noti');
					}
					$(this).closest('.tipWrap').prepend('<button type="button" class="btnIco_tip"><span>�꾩�留�</span></button>');
					$(this).addClass('tooltip').removeClass('toolTip').wrapInner('<div class="cont"></div>');
					$(this).prepend('<div class="arrow"></div>');
					$(this).append('<button type="button" class="btnIco_close"><span>�リ린</span></button>');
					if( $(this).data('direction') != undefined ){
						$(this).closest('.tip').find('.btnIco_tip').data('direction',  $(this).data('direction') );
					}
					if( $(this).data('rel') != undefined ){
						var targetEl = $( $(this).data('rel') );
						var top = $(targetEl).position().top - 2;
						var left = $(targetEl).position().left + ($(targetEl).outerWidth() - $(this).closest('.tip').find('.btnIco_tip').width() )*0.5;
						$(this).closest('.tip').css({top:top, left:left})
					}
				});
			},
			init : function(){
				tip.make();
				for(var  i = 0 ; i < $('.tipWrap').length ; ++i ){
					if( $('.tipWrap').eq(i).hasClass('uiAct') == false ){
						$('.tipWrap').eq(i).addClass('uiAct');
						$('.tipWrap:eq('+i+') .btnIco_tip').attr('aria-labelledby','tooltip_'+i);
						$('.tipWrap:eq('+i+') .tooltip .cont').attr('id','tooltip_'+i);
						$('.tipWrap:eq('+i+') > .btnIco_tip').bind({
							'click':function(e){
								if($(this).hasClass('hasLink') == false ){
									e.preventDefault();
								}
								if($(this).parent().hasClass('on') == false ){
									$(this).next().attr("tabindex", -1).focus();
									$(this).parent().addClass('on');
									$(this).next().addClass('in');
									tip.open( $(this) );
								}
							},
							'mouseenter':function(e){
								if( $(this).next().hasClass('in') == false ){
									if( $('.tipWrap.on').data('autoTip') != true ){
										$('.tipWrap').removeClass('on');
										$('.tipWrap .tooltip').removeClass('in');
									}
									tip.open( $(this) );
								}
							},
							'mouseleave':function(e){
								if($(this).parent().hasClass('on') == false ){
									$(this).next().removeClass('in');
								}
							}
						});
						$('.tipWrap:eq('+i+') .btnIco_close').bind({
							'click':function(e){
								e.preventDefault();
								tip.close( $(this) );
							}
						});
						if( $('.tipWrap:eq('+i+')').closest('.tip').hasClass('noti') ){
							$('.tipWrap:eq('+i+') > .btnIco_tip').trigger('click');
							$('.tipWrap:eq('+i+') > .btnIco_tip').remove();
						}
					}
				}
			},
			
			open : function (target){
				target.next().css('width', tip.getWidth( target.next()) );
				var yPos = target.next().outerHeight();
				target.next().css('margin-top',-yPos*0.5);
				target.next().addClass('in');
				target.next().find('.arrow').removeAttr('style');
				var parent = target.closest( ".wrapper" );
				if($('body').hasClass('popOn') == true ){
					parent = target.closest( ".popBody" );
				}
				if(parent == undefined ){
					parent = target.closest( ".likeSubpage" );
				}
				if(parent == undefined){
					parent = target.closest( ".popCont" );
					if(parent == undefined){
						tip.getPosRect(target);
					} else {
						tip.getPosRect(target, parent);
					}
				} else {
					tip.getPosRect(target, parent);
				}
				//$('body').addClass('tipOpen');
			},

			close : function (target){
				target.parent().parent().removeClass('on');
				target.parent().removeClass('in');
				if( target.closest('.tip').hasClass('noti') ){
					target.closest('.tip').remove();
				}
				//$('body').removeClass('tipOpen');
			},

			getWidth : function(target){
				var className = String( target.attr('class') );
				var num = className.indexOf("col_");
				if( num > -1 ){
					var result = Number( className.substr(num + 4, 2) );
					$(target).removeClass('col_'+result);
					var contWidth = $( "#content" ).outerWidth();
					if(contWidth > 1080 ) contWidth = 1080;
					var percent = 0.0833333 * result * contWidth;
					return percent;
				} else {
					//return 400; /*吏ㅻ━�� 臾몄젣 �뚮Ц�� �곗꽑 二쇱꽍泥섎━�섍퀬 css濡� �닿껐�대큵. 吏�耳쒕킄�쇳븿*/
				}
			},

			getPosRect : function(target, $parent){
				tip.posArry = [];
				var parent = $parent;
				if(parent == undefined ){
					parent = $('#content');
				}
				if( parent.hasClass('wrapper') ){
					parent = $('#content');
				}
				if( $('.likeSubpage').length > 0 ){
					parent = $('.likeSubpage');
				}
				var offset = target.offset();
				var posY = offset.top - $(window).scrollTop();
				//console.log("posY : " + posY );
				var posX = offset.left - $(window).scrollLeft();
				if($(target).closest('.popCont').length > 0 )parent = $(target).closest('.popCont');
				var parentOffset = parent.offset();
				var parentPosY = parentOffset.top - $(window).scrollTop();
				var parentPosX = parentOffset.left - $(window).scrollLeft();
				var boxW = target.next().outerWidth();
				var boxH = target.next().outerHeight();
				if( $(target).data('direction') == undefined ){
					var code = chkPos();
				} else {
					code = $(target).data('direction');
				}
				function chkPos(){
					tip.posArry = ['right','left','top','bottom'];
					var removeCode;
					// rightChk
					if( posX + boxW > parentPosX + parent.outerWidth() - 40 ){
						//console.log("湲곕낯 泥댄겕 : �ㅻⅨ履쎌뿉�� 嫄몃┛��");
						removeCode = tip.posArry.indexOf("right");
						if(removeCode > -1)tip.posArry.splice(removeCode,1);
					} else {
						chkVPos("right");
					}
					//topChk
					if( posY - boxH - 30 < $('.header').height() ){
						//console.log("湲곕낯 泥댄겕 : �꾩そ�먯꽌 嫄몃┛�� : ");
						removeCode = tip.posArry.indexOf("top");
						if(removeCode > -1)tip.posArry.splice(removeCode,1);
						//console.log("�묒��곕뒗嫄곕깘?????");
						//console.log("?????????????????????" + tip.posArry );
					} else {
						chkHPos('top');
					}
					// leftChk
					if( posX - boxW -15 < parentPosX ){
						//console.log("湲곕낯 泥댄겕 : �쇱そ�먯꽌 嫄몃┛��");
						removeCode = tip.posArry.indexOf("left");
						if(removeCode > -1)tip.posArry.splice(removeCode,1);
					} else {
						chkVPos("left");
					}
					
					//bottomChk
					if( posY + boxH  > $(window).height() ){
						//console.log("湲곕낯 泥댄겕 : �꾨옒履쎌뿉�� 嫄몃┛��");
						removeCode = tip.posArry.indexOf("bottom");
						if(removeCode > -1)tip.posArry.splice(removeCode,1);
						if(tip.posArry.length == 0) tip.posArry.push('right');
					} else {
						chkHPos("bottom");
					}
					
					return tip.posArry[0];
				}
				
				function chkVPos(removeDirection){
					if(parent.attr('id') == 'content'){
						var targetPos = $('.header').height();
					} else {
						targetPos = parentPosY;
					}
					if( posY - boxH*0.5 + 40 < targetPos ){
						removeCode = tip.posArry.indexOf(removeDirection);
						if(removeCode > -1)tip.posArry.splice(removeCode,1);
						var removeCode2 = tip.posArry.indexOf("top");
						if(removeCode2 > -1)tip.posArry.splice(removeCode2,1);
						if(tip.posArry.length == 0) tip.posArry.push(removeDirection);
					}
					if( posY + boxH*0.5  > $(window).height()){
						//console.log("vCheck : �꾨옒�먯꽌 嫄몃┛��" + removeDirection );
						removeCode = tip.posArry.indexOf(removeDirection);
						if(removeCode > -1)tip.posArry.splice(removeCode,1);
						var removeCode2 = tip.posArry.indexOf("bottom");
						if(removeCode2 > -1)tip.posArry.splice(removeCode2,1);
						if(tip.posArry.length == 0) tip.posArry.push(removeDirection);
					}
					
				}
				
				function chkHPos(removeDirection){
					//console.log("chkHPos : " + removeDirection );
					if( posX + boxW*0.5 > parentPosX + parent.outerWidth() ){
						//console.log("chkHPos : �ㅻⅨ履쎌뿉�� 嫄몃┛��");
						removeCode = tip.posArry.indexOf(removeDirection);
						if(removeCode > -1)tip.posArry.splice(removeCode,1);
					} else {
						chkVPos("right");
					}
					if( posX - boxW*0.5 -15 < parentPosX ){
						//console.log("chkHPos : �쇱そ�먯꽌 嫄몃┛��");
						removeCode = tip.posArry.indexOf(removeDirection);
						if(removeCode > -1)tip.posArry.splice(removeCode,1);
					} else {
						chkVPos("left");
					}
				}
				function setTipLayout(type){
					if( type == "left" ){
						target.parent().parent().removeClass('top left bottom right');
						target.parent().parent().addClass('left');
						target.next().css('left', -boxW);
					} else if( type == "bottom" ){
						target.parent().parent().removeClass('top left bottom right');
						target.parent().parent().addClass('bottom');
						target.next().css('margin-top', 'auto');
						target.next().css('left', -boxW*0.5);
					} else if( type == "top" ){
						target.parent().parent().removeClass('top left bottom right');
						target.parent().parent().addClass('top');
						target.next().css('margin-top', 'auto');
						target.next().css('left', -boxW*0.5);
					} else if( type == "right" ){
						target.parent().parent().removeClass('top left bottom right');
						target.next().css('margin-top', -target.next().outerHeight()*0.5);
						target.next().css('left', 0);
					}
				}
				//console.log("理쒖쥌肄붾뱶 : " + code);
				setTipLayout(code);
			}
			
		
	}
	if(!Array.indexOf){
		Array.prototype.indexOf = function(obj){
			for(var i=0; i<this.length; i++){
				if(this[i]==obj){
					return i;
				}
			}
			return -1;
		};
	}
	// var analysis = {
	// 		// IE Check
	// 		checkIE : function () {
	// 			if( /*@cc_on!@*/false && document.documentMode === 10 ){
	// 				document.documentElement.className += ' ie10';
	// 			}
	// 			var agent = navigator.userAgent.toLowerCase();
	// 			if( navigator.appName == "Netscape" && agent.indexOf('edge') !== -1 ){
	// 				return true;
	// 			}
	// 			if( (navigator.appName == "Netscape" && agent.indexOf('trident') != -1 ) || (agent.indexOf("msie") != -1 ) ){
	// 				return true;
	// 			} else {
	// 				return false;
	// 			}
	// 		},
	// 		// IE analysis
	// 		get_version_of_IE : function() {
	// 			var word;
	// 			var version = "N/A";
	// 			var agent = navigator.userAgent.toLowerCase();
	// 			var name = navigator.appName;
	// 			// IE old version ( IE 10 or Lower )
	// 			if ( name == "Microsoft Internet Explorer" ) word = "msie ";
	// 			else {
	// 				// IE 11
	// 				if ( agent.search("trident") > -1 ) word = "trident/.*rv:";
	// 				// Microsoft Edge
	// 				else if ( agent.search("edge/") > -1 ) word = "edge/";
	// 			}
	// 			var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" );
	// 			if (  reg.exec( agent ) != null  ) version = RegExp.$1 + RegExp.$2;
	// 			return version;
	// 		},
	// 		getBody : function(){
	// 			var html = 'html';
	// 			if( analysis.checkIE() == true ){
	// 				if( Number(analysis.get_version_of_IE() ) > 11 ){
	// 					html = 'body';
	// 				}
	// 			}
	// 			return html;
	// 		},
	// 		ieVersionChk : function(){
	// 			if(ieV == "8.0" || ieV == "9.0"){
	// 				oldIE = true;
	// 			}
	// 			if(ieV == "8.0") {
	// 				ie8 = true;
	// 			}
	// 		},
	// 		// Chrome Version Check
	// 		chromeCheck : function(){
	// 			var browser_version = "N/A";
	// 			var min_chromeVer	= 60; // Old Chrome 踰꾩쟾 湲곗�
	// 			var ui_isChrome 	= /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	// 			if( ui_isChrome == true ){
	// 				isChrome = true;
	// 				$('body').addClass('isChrome');
	// 				browser_version = analysis.getChromeVersion();
	// 				if(browser_version < min_chromeVer){
	// 					$('body').addClass('oldChrome');
	// 				}
	// 			}
	// 		},
	// 		getChromeVersion : function (){
	// 			var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
	// 			return raw ? parseInt(raw[2],10):false;
	// 		},
	// 		// Safari check
	// 		safariChk : function (){
	// 			var ua = navigator.userAgent.toLowerCase();
	// 			if(ua.indexOf('safari') != -1){
	// 				if(ua.indexOf('chrome') == -1 ){
	// 					$('body').addClass('oldChrome safari');
	// 				}
	// 			}
	// 		},
	// 		// Mobile Check
	// 		checkMobileDevice : function () {
	// 			var mobileKeyWords = new Array('Android', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows CE', 'MOT', 'SonyEricsson');//'SAMSUNG', 'LG',
	// 			for (var info in mobileKeyWords) {
	// 				if(navigator.userAgent.match(mobileKeyWords[info]) != null) {
	// 					return true;
	// 				}
	// 			}
	// 			return false;
	// 		},
	// 		// IOS Check
	// 		checkIOSDevice : function () {
	// 			var mobileKeyWords = new Array('iPhone', 'iPad', 'iPod');
	// 			for (var info in mobileKeyWords) {
	// 				if(navigator.userAgent.match(mobileKeyWords[info]) != null) {
	// 					return true;
	// 				}
	// 			}
	// 			return false;
	// 		},

	// 		// Old IE init
	// 		oldIEinit : function(){
	// 			$('html').addClass('oldIE');
	// 		},
			
	// 		// IE8 init
	// 		ie8Init : function(){
				
	// 		},
	// 		// get Browser Scroll Width
	// 		getScrollbarWidth : function () {
	// 			var outer = document.createElement("div");
	// 			outer.style.visibility = "hidden";
	// 			outer.style.width = "100px";
	// 			outer.style.msOverflowStyle = "scrollbar";
	// 			document.body.appendChild(outer);
	// 			var widthNoScroll = outer.offsetWidth;
	// 			outer.style.overflow = "scroll";
	// 			var inner = document.createElement("div");
	// 			inner.style.width = "100%";
	// 			outer.appendChild(inner);
	// 			var widthWithScroll = inner.offsetWidth;
	// 			outer.parentNode.removeChild(outer);
				
	// 			return widthNoScroll - widthWithScroll;
	// 		},
	// 		browserScollWSet : function(){
	// 			var pdR = analysis.getScrollbarWidth();
	// 			var css = 	'<style type="text/css">'+
	// 						'	body.hasScroll.windowPop.popOn, body.hasScroll.windowPop.popOn .popCont > .btnArea {padding-right:'+pdR+'px !important}'+
	// 						'	html:not(.popFullScroll) body.hasScroll {padding-right:'+pdR+'px !important}'+
	// 						'	html:not(.popFullScroll) body.hasScroll .header.sticky {padding-right:'+pdR+'px !important}'+
	// 						'</style>';
	// 			$('head').append( css );
	// 		},
	// 		init : function(){
	// 			ieV = analysis.get_version_of_IE();
	// 			analysis.ieVersionChk();
	// 			if(oldIE == true )analysis.oldIEinit();
	// 			if(ie8 == true ){
	// 				analysis.ie8Init();
	// 				isMobile = false;
	// 				isIOS = false;
	// 			} else {
	// 				isMobile = analysis.checkMobileDevice();
	// 				isIOS = analysis.checkIOSDevice();
	// 				isIE = analysis.checkIE();
	// 				analysis.chromeCheck();
	// 				analysis.safariChk();
	// 				if(isIE)$('body').addClass('isIE');
	// 				if(isMobile)$('body').addClass('isDevice');
	// 				if(isIOS)$('body').addClass('isIOS');
	// 			}
	// 			// 紐⑤뱶泥댄겕
	// 			var url = window.location.href;
	// 			if( window.location.href.indexOf('?') >= 0 ){
	// 				var pureURL = String(window.location.href).substr(0, window.location.href.indexOf('?'));
	// 			} else {
	// 				pureURL = window.location.href;
	// 			}
	// 			if( pureURL.indexOf('.html') >= 0 ){
	// 				pubMode = true;
	// 			}
	// 			analysis.browserScollWSet();
	// 		}
	// }

	t.layout 		= layout; // Layout 愿���
	t.gnb 			= gnb; // GNB 愿���
	t.tip 			= tip; // tooltip
	t.ui 			= ui; // UI Component
	t.lp 			= lp; // �덉씠�� �앹뾽
	t.dp 			= dp; // datePicker
	t.mp 			= mp; // monthPicker
	t.wa 			= wa; // �묎렐�� 愿���
	t.analysis 		= analysis; // Browser analysis
})(this);

$.fn.outerHTML = function(){
	var el = $(this);
	if( !el[0] ) return "";
	if( el[0].outerHTML ){
		return el[0].outerHTML;
	} else {
		var content = el.wrap('<p/>').parent().html();
		el.unwrap();
		return content;
	}
}


$(document).ready(function(){
	winH = $(window).height()
	analysis.init();
	if(pubMode){
		layout.ready();
		$('title').text( $('#content .titH1').text() );
	} else {
		//layout.init();
	}
	if( $('.winPop').length > 0 ){
		layout.init();
	}
});
