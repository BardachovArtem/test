var ScreenSize = function(){
    var self = this;

    self.DOM = {};
    
    self.init = function(_screen){
        self.DOM.container = _screen;
        window_height = $(window).height();
        
        $(self.DOM.container).children().each(function(){
            $(this).height(window_height)
        })
    }
}