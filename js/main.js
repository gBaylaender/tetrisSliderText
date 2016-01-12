(function($) {
    $.fn.slideTexting = function(options) {
        return this.each(function() {

            //Plugin settings
            var settings = $.extend({
                wrapper: '.wrapper',
                container: '.slides',
                slide: '.slide',
                slideText: '.slide__text',
                isActive: 'slide--is-active',
                isShowing: 'slide--showing',
                speed: 1200,
                timer: true,
                timeIn: 0,
                timeOut: 2000,
                slidingTheme: false
            }, options);

            //DOM cache
            /////////////////////////////////////////////////
            var $slideContainer = $(settings.container),
                $slideActive = $('.' + settings.isActive);

            //Configuration
            /////////////////////////////////////////////////
            var containerWidth = 0, //set total width of container/slides
                wrapperW = Math.ceil($(settings.wrapper).width()), //get width of the wrapper
                nSlides = $(settings.slide).length, // get how many slide have
                textsW = $(settings.slideText).each(function() { //get all width for each text
                    var w = Math.ceil($(this).width());
                    $(this).attr('data-textwidth', w); //set attr data-textwidth to the element text
                }),
                textWSmallest = 0,
                slidesW = $(settings.slide).each(function() {
                    var w = Math.ceil($(this).outerWidth());
                    containerWidth += parseInt($(this).outerWidth(), 10); //calculate the width of container
                    $(this).attr('data-slidewidth', w); //set attr data-textwidth to the element text
                }),
                speed2 = Math.floor(settings.speed / 2),
                TextSmaller = null,
                currentSlide = 1; // current Slide


            //#0 START
            //////////////////////////////////////////////////////////////////////////////

            $(settings.container).css('min-width', containerWidth); //set the width of container based on the slide elements
            if (settings.slidingTheme === true) {
                $(settings.wrapper).css('overflow', 'hidden'); //All slide go out the wrapper, but not first element
                $(settings.slide).not('.' + settings.isActive).css('left', wrapperW); //All slide go out the wrapper, but not first element
            }

            //#1 Next slide coming
            //////////////////////////////////////////////////////////////////////////////
            slideAnimationNext = function(callback) {
                console.log('#1');
                var $slideActive = $('.' + settings.isActive),
                    slideActiveW = Math.ceil($slideActive.outerWidth());

                if (settings.slidingTheme === true) {
                    $slideActive
                        .next().animate({
                            'left': 0
                        }, settings.speed);
                }
                callback();
            };



            //#2 Next slide coming (text tetris)
            //////////////////////////////////////////////////////////////////////////////
            animationTextTetris = function() {
                console.log('#2');
                var $slideActive = $('.' + settings.isActive),
                    $slideActiveNext = $slideActive.next(),
                    $this = $($slideActiveNext),
                    activeSlideW = Math.ceil($slideActive.width()),
                    nText = $this.find(settings.slideText).length;

                $this.addClass(settings.isShowing);

                if (settings.slidingTheme === true) {
                    for (var i = 0; i < nText; i++) {
                        $this.find('.slide__text__' + i).animate({
                            'margin-left': -1 * (activeSlideW - $slideActive.find('.slide__text__' + i).attr('data-textwidth'))
                        }, settings.speed);
                    }
                } else {
                    for (var p = 0; p < nText; p++) {
                        $this.find('.slide__text__' + p).css({
                            'margin-left': -1 * (activeSlideW - $slideActive.find('.slide__text__' + p).attr('data-textwidth'))
                        });
                    }
                }



                //set current slide number,
                if (currentSlide < nSlides) {
                    currentSlide++; //set counter of currentSlide
                } else {
                    currentSlide = 0; //reset the counter of currentSlide
                    resetSlides();
                }




            };

            //#3 slideActive go out, next slide take positio as slideActive
            //////////////////////////////////////////////////////////////////////////////
            animationSlideActive = function() {
                console.log('#3');

                var $slideActive = $('.' + settings.isActive),
                    slideActiveW = Math.ceil($slideActive.width()),
                    slideActiveOutW = Math.ceil($slideActive.outerWidth()),
                    nText = $slideActive.find(settings.slideText).length;

                //#A Hide prev active slide before it translate to left
                $slideActive.prev().css('opacity', 0);

                //#B slide active
                $slideActive
                    .css({
                        'margin-left': -1 * slideActiveOutW,
                        'opacity': 1
                    }, settings.speed);

                //#C slide active margin left
                $slideActive.css({
                    'margin-left': -1 * ($(this).attr('data-slidewith'))
                });

                //Align Right Active Slide
                for (var i = 0; i < nText; i++) {
                    $slideActive.find('.slide__text__' + i).animate({
                        'margin-left': (slideActiveW - $slideActive.find('.slide__text__' + i).attr('data-textwidth'))
                    }, speed2);
                }

                // re-align all text of next element
                $slideActive.next()
                    .find(settings.slideText).animate({
                        'margin-left': 0
                    }, speed2);


                //add active class to active.next()
                $slideActive
                    .removeClass(settings.isActive)
                    .next()
                    .addClass(settings.isActive).removeClass(settings.isShowing);
            };

            //#6 Reset
            resetSlides = function() {
                $(settings.slide).removeAttr('style').removeClass(settings.isActive);
                $(settings.slideText).removeAttr('style');
                $(settings.slide + ':first-child').addClass(settings.isActive);
            };

            if (settings.timer === true) {
                setTimeout(function() {
                    slideAnimationNext(function() {
                        animationTextTetris();
                    });
                }, settings.timeIn);
                setTimeout(function() {
                    animationSlideActive();
                }, settings.timeOut);

            }

            //TEST
            $('#btn-1').click(function() {
                console.log('btn-1');
                slideAnimationNext(function() {
                    animationTextTetris();
                });
            });
            $('#btn-2').click(function() {
                console.log('btn-2');
                animationSlideActive();
            });

            $('#btn-3').click(function() {
                console.log('btn-3');
                resetSlides();
            });

        });
    };
}(jQuery));




//#5 Load JSON
//////////////////////////////////////////////////////////////////////////////
loadVideoTiming = function() {
    var timingJSON = $.getJSON("timing.json", function() {
            console.log("success");
        }).done(function() {
            console.log("second success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        }).complete(function() {
            console.log("second complete");
        });
    console.log('JSON: ' + timingJSON.video0.slide0.description[1]);
};




//run slideTexting
$(document).ready(function() {
    $('.slideTexting').slideTexting({
        timeOut: 1500
    });
});


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/*

wTextSmaller = function() {
    $('.' + settings.isActive).find(settings.slideText).each(function(index, el) {
        var w = $(this).attr('data-textwidth');

        if (TextSmaller === null || parseInt(w) < TextSmaller) {
            TextSmaller = w;
        }
    });
    console.log('TextSmaller: ' + TextSmaller);
};



///TEST
var currentIndex = 0,
    $items = $(settings.slide),
    nItems = $(settings.slide).length,
    $container = $(settings.container),
    elm = $container.find(':first-child').prop('tagName'),
    containerWidth = $container.width();



var run = setInterval(rotate, speed);


//get width of each text element
var textW = $(settings.slideText).each(function() {
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
