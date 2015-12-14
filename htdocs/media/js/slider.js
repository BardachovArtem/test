var Slider = function(){
    var self = this;
    
    self.DOM = {
        item: '.slider-item',
        next: '.next-btn',
        prev: '.prev-btn',
        window_height: $(window).height(),
        window_width: $(window).width()
    };

    self.change = function(_obj)
    {
        
        self.DOM.loop += _obj.delta;
        
        if(self.DOM.loop == self.DOM.itemsCount)
        {
            self.DOM.loop = 0;   
        }
        else if(self.DOM.loop < 0 )
        {
            self.DOM.loop = self.DOM.itemsCount-1;
        }
        
        $(self.DOM.item).removeClass('active');
        $(self.DOM.item).find('div').removeClass('active');

        $('[data-item='+self.DOM.loop+']').addClass('active');

        widgets = $('[data-item='+self.DOM.loop+']').find('div');
        
        setTimeout(function(){$(widgets[0]).addClass('active')},1000);
        setTimeout(function(){$(widgets[1]).addClass('active')},1400);
        setTimeout(function(){$(widgets[2]).addClass('active')},1800);
    };

    self.calcuteheight = function(_obj)
    {
        $.each(self.DOM.items, function(index){
            if(this.classList[2] == 'active')
            {
                self.DOM.content_height = $(this).find('video')[0].clientHeight;
                console.log(self.DOM.content_height);
                return false
            }
        })
        
        if(self.DOM.content_height < self.DOM.window_height)
        {
            $(self.DOM.container).height(self.DOM.content_height); //посчитал высоту по высоте содержимого
            self.DOM.slider_H = $(self.DOM.container).width()/self.DOM.content_height;// считаю соотношение сторон
        }
        else
        {
            $(self.DOM.container).height(self.DOM.window_height); //посчитал высоту по высоте экрана
            self.DOM.slider_H = $(self.DOM.container).width()/self.DOM.window_height;// считаю соотношение сторон
        }
    }

    self.init = function(container)
    {
        /*  инициализация */
            self.DOM.container = container;
            self.DOM.content = container+' ul.slider-content';

            self.DOM.itemsCount = $(self.DOM.content).children().length; // количество слайдов
            self.DOM.items = $(self.DOM.content).find(self.DOM.item); //список слайдов
            
            // нумерация слайдов
            $.each(self.DOM.items, function(index){
                $(this).attr('data-item',index);
            })

            self.DOM.loop = 0; //номер активного
            $('[data-item=0]').addClass('active');

            widgets = $('[data-item='+self.DOM.loop+']').find('div');
            
            setTimeout(function(){$(widgets[0]).addClass('active')},1600);
            setTimeout(function(){$(widgets[1]).addClass('active')},2000);
            setTimeout(function(){$(widgets[2]).addClass('active')},2400);

            self.calcuteheight();
        /* инициализация */
        // myvar = parseInt(self.DOM.window_width/2);
        $("div.image").mousemove(function(e){
            target = $(this).find("img");
            
            d = 470;
            c = 710
            if(e.pageX < c)
            {
                d = d-(e.pageX/15);
            }
            else if(e.pageX >= c)
            {
                d = ((e.pageX/15)-d)*-1
            }
            console.log(d);
            console.log(e.pageX);
            // $(target).css("transform","translate3d("+d/30+"px,0px,0px)");
            $(target).css("transform","matrix(1, 0, 0, 1,"+d+", -2.24063)");
        });

        $("div.image").mouseleave(function(e)
        {
            target = $(this).find("img");
            $(target).css("transform","matrix(1, 0, 0, 1,470, -2.24063)");
        });


        // пресчитываю высоту при ресайзе
        $(window).resize(function() {
            $(self.DOM.container).height($(self.DOM.container).width()/self.DOM.slider_H);
        })

        /* навигация */
        $(self.DOM.next).on('click',function(){self.change({delta:1})});
        $(self.DOM.prev).on('click',function(){self.change({delta:-1})});
    }
}