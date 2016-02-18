"use strict";

$(document).ready(function () {


    JSAV.init();

    var av = new JSAV("scramble");
    var theArray = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    var arr = av.ds.array(theArray, {indexed: true});
    av.umsg("Text before displayInit()");
    // Note: av.displayInit() will not affect the number of slides.
    // All that it will do is affect what you get to see on the
    // initial slide.
    av.displayInit();
    // We are now starting a new slide (#2)
    av.umsg("... and text after displayInit()", {preserve: true});
    for(var i=0; i<theArray.length; i++)
    {
       var rand = Math.floor(Math.random() * (theArray.length - 1));
	   arr.swap(i, rand);
       av.step();
    }
    // We are now starting a new slide (#3)
    av.umsg("Text after av.step()");
    av.recorded();
    // If you add av.umsg after av.recorded, it will add new slides in
    // ways that you probably do not expect and probably cannot
    // control in the way that you want. As av.recorded() rewinds the
    // slideshow, the new slides would go to the beginning of the slideshow.
    // So, unless you are trying to add slides on-the-fly
    // interactively, you don't want to do this.
    // av.umsg("Text after av.recorded()");

});
