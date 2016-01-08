(function($) {
    $.fn.slideTexting = function(options) {
        return this.each(function() {

            //Plugin settings
            var settings = $.extend({
                wrapper: '.wrapper',
                container: '.slides',
                slide: '.slide',
                text: '.text',
                speed: 3000,
                pause: 2000,
                autoSlide: false
            }, options);


            //Variables
            var $slideContainer = $(settings.container),
                containerWidth = 0, //set total width of container/slides
                wrapperW = $(settings.wrapper).width(), //get width of the wrapper
                nSlides = $(settings.slide).length, // get how many slide have
                textsW = $(settings.text).each(function() { //get all width for each text
                    var w = Math.ceil($(this).width());
                    $(this).attr('data-textwidth', w); //set attr data-textwidth to the element text
                    console.log('textW:' + w);
                }),
                slidesW = $(settings.slide).each(function(index) {
                    var w = Math.ceil($(this).width());

                    containerWidth += parseInt($(this).width(), 10);//calculate the width of container

                    $(this).attr('data-slidewidth', w); //set attr data-textwidth to the element text
                }),
                currentSlide = 1; // current Slide

            $(settings.container).css('width',containerWidth);



            console.log('Wrapper W: ' + wrapperW + ' nSlides: ' + nSlides);


            //Functions





            //Add number of the slide
            animationSlide = function() {
                if (currentSlide === nSlides) {
                    currentSlide = 1;
                    $slideContainer.css('margin-left', 0);
                } else {

                }
            };

            //slideW of current == margin-left of second element is





        });
    };
}(jQuery));


//run slideTexting
$(document).ready(function() {
    $('.slideTexting').slideTexting();
});


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/*
///TEST
var currentIndex = 0,
    $items = $(settings.slide),
    nItems = $(settings.slide).length,
    $container = $(settings.container),
    elm = $container.find(':first-child').prop('tagName'),
    containerWidth = $container.width();



var run = setInterval(rotate, speed);


//get width of each text element
var textW = $(settings.text).each(function() {
    var w = $(this).width();
    console.log(w);
});


$items.width(containerWidth);
//set the slides to the correct pixel width

$container.parent().width(containerWidth);

$container.width(slides.length * containerWidth); //set the slides $container to the correct total width

$container.find(elm + ':first').before($container.find(elm + ':last'));

resetSlides();




function cycleItems() {
    var item = $(settings.slide).eq(currentIndex);
    $items.hide();
    item.css('display', 'inline-block');
}


//autoSlide
if (settings.autoSlide === true) {
    var autoSlideing = setInterval(function() {
        currentIndex += 1;
        if (currentIndex > nItems) {
            currentIndex = 0;
        }
        cycleItems();

    }, settings.speed);
}





console.log(nItems + ' textW:' + textW);


*/
/*
//SLIDER
///////////////////////////

            $('#checkbox').change(function() {
                setInterval(function() {
                    moveRight();
                }, settings.speed);
            });

            var slideCount = $(settings.slide).length,
                slideWidth = $(settings.slide).width(),
                slideHeight = $(settings.slide).height(),
                sliderUlWidth = slideCount * slideWidth;

            $(settings.wrapper).css({
                width: slideWidth,
                height: slideHeight
            });

            $(settings.container).css({
                width: sliderUlWidth,
                marginLeft: -slideWidth
            });

            $(settings.slide + ':last-child').prependTo(settings.container);

            function moveLeft() {
                $(settings.container).animate({
                    left: +slideWidth
                }, 200, function() {
                    $(settings.slide + ':last-child').prependTo(settings.container);
                    $(settings.container).css('left', '');
                });
            }

            function moveRight() {
                $(settings.container).animate({
                    left: -slideWidth
                }, 200, function() {
                    $(settings.slide + ':first-child').appendTo(settings.container);
                    $(settings.container).css('left', '');
                });
            }

            $('a.control_prev').click(function() {
                moveLeft();
            });

            $('a.control_next').click(function() {
                moveRight();
            });



*/
