# tetrisSliderText
work in progress

##Goal##
Create a small slider of text with a "tetris" interaction

![Image sketch]
(doc/animation-design.png)



###known issues###

* if a font is loaded in async, the calculations of the width will be not correct, to prevent this problem call the plugin inside `$(window).on('load', function() {`



###Logical Process###
A possible approach could be:
(use margin-left or position.left)

1. get widths
    1. get wrapper width
    2. each slide get width
    3. each text get width

2. set currentIndex

3. set margins
    1. slide (not currentIndex) margin-left wrapper-width

4. Animation of a slide from out wrapper
    1. start: margin-left: wrapperWidth
    2. end: margin-left: slide 1 width
    3. text slider-2 margin-left: slide width current index - text

5. Animation of slide 2 to slide 1
    1. start: margin-left: slide 1 Width
    2. end: margin-left: 0
    3. text slider-2 margin-left: 0
    4. set currentIndex

6. Restart
