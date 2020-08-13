$(function () {
    
});

var FullPage = (function(){
    function FullPage(opts){
        this.options = opts;
        this.initEvent();
        console.log(this, '1');

    }

    FullPage.prototype.up = function(){
        console.log('Scroll up');
    }

    FullPage.prototype.down = function(){
        console.log('Scroll down');
    }

    function util1(){
        console.log('util1');
    }

    function util2(){
        console.log('util2');
    }


    FullPage.prototype.initEvent = function(){
        var scope = this;
        setEvents();
        if(this.options.mode === 'slide'){
            slideEvent();
        }else{
            fadeInEvent();
        }
        
        function setEvents(){
            //console.log(this, '2');
            $(window).bind('mousewheel', function(event) {
                if (event.originalEvent.wheelDelta >= 0) {
                    //console.log('Scroll up');
                    scope.up();
                    //console.log(this, '3');
                }
                else {
                    //console.log('Scroll down');
                    scope.down();
                }
            });
        }

        function slideEvent(){

        }

        function fadeInEvent(){
            
        }
        
    }
    return FullPage;
}())


 
