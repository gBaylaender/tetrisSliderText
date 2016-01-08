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
                speed: 3000,
                pause: 2000,
                autoSlide: false,
                speedMargin: 800,
                gutter: 0
            }, options);

            //DOM cache
            /////////////////////////////////////////////////
            var $slideContainer = $(settings.container),
                $slideActive = $('.' + settings.isActive);

            //Configuration
            /////////////////////////////////////////////////
            var containerWidth = 0, //set total width of container/slides
                wrapperW = $(settings.wrapper).width(), //get width of the wrapper
                nSlides = $(settings.slide).length, // get how many slide have
                textsW = $(settings.text).each(function() { //get all width for each text
                    var w = Math.ceil($(this).width());
                    $(this).attr('data-textwidth', w); //set attr data-textwidth to the element text
                }),
                slidesW = $(settings.slide).each(function() {
                    var w = Math.ceil($(this).outerWidth());
                    containerWidth += parseInt($(this).outerWidth(), 10); //calculate the width of container
                    $(this).attr('data-slidewidth', w); //set attr data-textwidth to the element text
                }),
                currentSlide = 1; // current Slide




            //set the width of container based on the slide elements
            $(settings.container).css('min-width', containerWidth);



            //add attr index of the element
            $(settings.slide).each(function(index) {
                $(this).attr('data-index', index);
            });


            //play with margin-left
            //not first element
            $(settings.slide).not(':first').css('left', wrapperW);


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


            //#1 Next slide coming
            //////////////////////////////////////////////////////////////////////////////
            slideAnimationNext = function(callback) {
                var slideActiveW = $slideActive.outerWidth();

                $slideActive
                    .next().animate({
                        'left': 0 //slideActiveW - settings.gutter
                    }, settings.speedMargin);

                setTimeout(function() {
                    callback();
                }, 300);

            };



            //#2 Next slide coming (text tetris)
            //////////////////////////////////////////////////////////////////////////////
            animationTextTetris = function(el) {
                var $this = $(el),
                    activeSlideW = $slideActive.width(),
                    nText = $this.find(settings.text).length;

                for (var i = 1; i < nText; i++) {

                    $this.find('.slide__text__' + i).animate({
                        'margin-left': -1 * (activeSlideW - $slideActive.find('.slide__text__' + i).width())
                    }, settings.speedMargin);
                }

                // $this.find('.slide__text__1').animate({
                //     'margin-left': -1 * (activeSlideW - activeTxt1W)
                // }, settings.speedMargin);
                // $this.find('.slide__text__2').animate({
                //     'margin-left': -1 * (activeSlideW - activeTxt2W)
                // }, settings.speedMargin);
                // $this.find('.slide__text__3').animate({
                //     'margin-left': -1 * (activeSlideW - activeTxt3W)
                // }, settings.speedMargin);
            };



            //#3 slideActive go out, next slide take positio as slideActive
            //////////////////////////////////////////////////////////////////////////////
            animationSlideActive = function() {
                var slideActiveW = $slideActive.outerWidth();

                console.log("slideActiveW "+slideActiveW);

                $slideActive
                    .removeClass(settings.isActive)
                    .animate({
                        'margin-left': -1 * slideActiveW,
                        //'width':0
                    }, settings.speedMargin).queue(function() {
                        $(this).hide();
                    });

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
                slideAnimationNext(function() {
                    animationTextTetris($slideActive.next());
                });
            });
            $('#btn-2').click(function() {
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
