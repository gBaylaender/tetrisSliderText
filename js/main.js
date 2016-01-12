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
                showSlide: 0,
                translateSlide: 2000,
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

            $(settings.container).css('min-width', containerWidth + 1); //set the width of container based on the slide elements
            if (settings.slidingTheme === true) {
                $(settings.wrapper).css('overflow', 'hidden'); //All slide go out the wrapper, but not first element
                $(settings.slide).not('.' + settings.isActive).css('left', wrapperW); //All slide go out the wrapper, but not first element
            }

            //#1 Next slide coming
            //////////////////////////////////////////////////////////////////////////////
            showSlide = function(callback) {
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
                    showSlide(function() {
                        animationTextTetris();
                    });
                }, settings.showSlide);
                setTimeout(function() {
                    animationSlideActive();
                }, settings.translateSlide);

            }

            //TEST
            $('#btn-1').click(function() {
                console.log('btn-1');
                showSlide(function() {
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
var projetJSONResp = null;
projetJSONCycle = function(projetJSON) {
    var projetJSONResp = projetJSON;
    if (projetJSON.length > 0) {
        for (var i = 0; i < projetJSON.length; i++) {
            var video = projetJSON[i];

            if (video.hasOwnProperty('slides')) {
                var slides = video.slides;

                for (var n = 0; n < slides.length; n++) {
                    var slide = slides[n];

                    var descriptions = null;
                    var showSlide = null;
                    var translateSlide = null;

                    if (slide.hasOwnProperty('descriptions')) descriptions = slide.descriptions;
                    if (slide.hasOwnProperty('showSlide')) showSlide = slide.showSlide;
                    if (slide.hasOwnProperty('translateSlide')) translateSlide = slide.translateSlide;


                    var createSlide = '<div class="slide slide__' + n + '"></div>';

                    $('.wrapper .slides').append(createSlide); //create slides
                    $('.slide:first-child').addClass('slide--is-active'); //set the first as active

                    //set descriptions
                    for (var t = 0; t < descriptions.length; t++) {
                        var textDescr = descriptions[t];
                        var createText = '<div class="slide__text slide__text__' + t + '">' + textDescr + '</div>';

                        $('.wrapper .slide__' + n).append(createText); //create texts
                    }
                }
            }
        }
    }

};



//run slideTexting
$(document).ready(function() {

    $.ajax({
            url: 'timing.json',
            type: 'POST',
            dataType: 'json',
            success: projetJSONCycle
        })
        .done(function() {
            console.log("success");

            $('.slideTexting').slideTexting({
                showSlide: 1000,
                translateSlide: 2000
            });
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });



});
