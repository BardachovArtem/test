$(window).load(function(){

    var slider = new Slider();
    slider.init('.slider');


    var screensize = new ScreenSize();
    screensize.init('.screen');

    setTimeout(function(){$('.preloader-container').css({opacity:0})},1000);
    setTimeout(function(){$('.preloader-container').css({display:'none'})},1500);
})
