(function($) {
    $.fn.slideTexting = function(options) {
        return this.each(function() {

            //Plugin settings
            var settings = $.extend({
                wrapper: '.wrapper',
                container: '.slides',
                slide: '.slide',
                text: '.slide__text',
                isActive: 'slide--is-active',
                isShowing: 'slide--showing',
                speed: 3000,
                pause: 2000,
                autoSlide: false,
                speedMargin: 800,
                gutter: 0,
                slidingTheme: false
            }, options);

            //DOM cache
            /////////////////////////////////////////////////
            var $slideContainer = $(settings.container),
                $slideActive = $('.' + settings.isActive);

            //Configuration
            /////////////////////////////////////////////////
            var containerWidth = 0, //set total width of container/slides
                wrapperW = $(settings.wrapper).width(), //get width of the wrapper
                //nSlides = $(settings.slide).length, // get how many slide have
                // textsW = $(settings.text).each(function() { //get all width for each text
                //     var w = Math.ceil($(this).width());
                //     $(this).attr('data-textwidth', w); //set attr data-textwidth to the element text
                // }),
                // slidesW = $(settings.slide).each(function() {
                //     var w = Math.ceil($(this).outerWidth());
                //     containerWidth += parseInt($(this).outerWidth(), 10); //calculate the width of container
                //     $(this).attr('data-slidewidth', w); //set attr data-textwidth to the element text
                // }),
                currentSlide = 1; // current Slide


            //Add number of the slide
            //get element next active, start animation
            //////////ANIMATION
            // setInterval(function(){
            //     elToAnimate.animate({'left':0}, animationSpeed,function() {
            //         currentSlide++;
            //         if (currentSlide == nSlides) {
            //             clearInterval(interval);
            //         }
            //     });
            // }, stopAnimate);

            // //add attr index of the element
            // $(settings.slide).each(function(index) {
            //     $(this).attr('data-index', index);
            // });




            //#0 START
            //////////////////////////////////////////////////////////////////////////////


            if (settings.slidingTheme === true) {
                $(settings.container).css('min-width', containerWidth); //set the width of container based on the slide elements
                $(settings.slide).not('.' + settings.isActive).css('left', wrapperW); //All slide go out the wrapper, but not first element
            }







            //#1 Next slide coming
            //////////////////////////////////////////////////////////////////////////////
            slideAnimationNext = function(callback) {
                console.log('#1');

                var $slideActive = $('.' + settings.isActive),
                    slideActiveW = $slideActive.outerWidth();

                if (settings.slidingTheme === true) {
                    $slideActive
                        .next().animate({
                            'left': 0
                        }, settings.speedMargin);

                } else {
                    $slideActive.next().css({
                        'left': 0
                    });
                }

                setTimeout(function() {
                    callback();
                }, 300);
            };



            //#2 Next slide coming (text tetris)
            //////////////////////////////////////////////////////////////////////////////
            animationTextTetris = function() {
                console.log('#2');
                var $slideActive = $('.' + settings.isActive),
                    $slideActiveNext = $slideActive.next(),
                    $this = $($slideActiveNext),
                    activeSlideW = $slideActive.width(),
                    nText = $this.find(settings.text).length;

                $this.addClass(settings.isShowing);

                if (settings.slidingTheme === true) {
                    for (var i = 0; i < nText; i++) {
                        $this.find('.slide__text__' + i).animate({
                            'margin-left': -1 * (activeSlideW - $slideActive.find('.slide__text__' + i).width())
                        }, settings.speedMargin);
                    }
                } else {
                    for (var p = 0; p < nText; p++) {
                        $this.find('.slide__text__' + p).css({
                            'margin-left': -1 * (activeSlideW - $slideActive.find('.slide__text__' + p).width())
                        });
                    }

                }
            };



            //#3 slideActive go out, next slide take positio as slideActive
            //////////////////////////////////////////////////////////////////////////////
            animationSlideActive = function() {
                console.log('#3');

                var $slideActive = $('.' + settings.isActive),
                    slideActiveW = $slideActive.outerWidth();

                $slideActive
                    .removeClass(settings.isActive)
                    .animate({
                        'margin-left': -1 * slideActiveW,
                        //'width':0
                    }, settings.speedMargin).queue(function() {
                        $(this).hide();
                    }).removeClass(settings.isShowing);

                $slideActive.next().find(settings.text).animate({
                    'margin-left': 0
                }, settings.speedMargin);

                $slideActive.next()
                    .addClass(settings.isActive)
                    .finish()
                    .animate({
                        'left': 0
                    }, settings.speedMargin);
            };







            //TEST



            $('#btn-1').click(function() {
                console.log('btn-1');

                slideAnimationNext(function() {
                    animationTextTetris();
                });
            });
            $('#btn-2').click(function() {
                console.log('btn-2');

                //setTimeout(function() {
                animationSlideActive();
                //}, 3000);
            });





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
