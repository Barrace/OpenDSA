/*global window */
(function() {
    "use strict";
	alert("test");
    var av,         // The JSAV object
    jsavArr;    // The array that the user manipulates (JSAV object)

    var healyKA = {	// Name of export object
	userInput: null,  // Boolean: Tells us if user ever did anything

	// Initialise the exercise
	initJSAV: function(arr_size) {
	    healyKA.userInput = false;
	    av = new JSAV("HealyKA", {animationMode: "none"});
	    jsavArr = av.ds.array(JSAV.utils.rand.numKeys(0, 999, arr_size),
				  {indexed: true, center: false});
	    av.displayInit();
	    av.recorded();
	    // bind the clickHandler to handle click events on the array
	    jsavArr.click(clickHandler);
	},

	// Validate user's answer
	checkAnswer: function() {
	    var i;
	    var max_index = 0;
	    for (i = 1; i < jsavArr.size(); i++) {
		if (jsavArr.value(i) > jsavArr.value(max_index)) {
		    max_index = i;
		}
	    }
	    if (!jsavArr.isHighlight(max_index)) {
		return false;
	    } else {
		return true;
	    }
	}
    };

    // Click event handler on the array
    function clickHandler(index) {
	if (jsavArr.isHighlight(index)) {
	    jsavArr.unhighlight(index);
	} else { jsavArr.highlight(index); }
	healyKA.userInput = true;
    }
    // Export name used here
    window.healyKA = window.healyKA || healyKA;
}());
