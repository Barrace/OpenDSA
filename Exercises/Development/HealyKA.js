/*global window */
(function() {
    "use strict";
    var av,         // The JSAV object
    jsavArr;    // The array that the user manipulates (JSAV object)

    var healyKA = {	// Name of export object
	userInput: null,  // Boolean: Tells us if user ever did anything

	// Initialise the exercise
	initJSAV: function(arr_size) {
	    healyKA.userInput = false;
	    av = new JSAV("HealyKA", {animationMode: "none"});
	    jsavArr = av.ds.matrix({rows: 5, columns: 8, syle: "table"});
	    av.displayInit();
	    av.recorded();
	    // bind the clickHandler to handle click events on the array
	    jsavArr.click(clickHandler);
	},

	// Validate user's answer
	checkAnswer: function() {
	    var i;
	    var max_index_row = 0;
		var max_index_col = 0;
	    for (var r = 0; i < jsavArr.rows(); i++) {
			for (var c = 0; c < jsavArr.columns(); c++) {
				if (jsavArr.value(r, c) > jsavArr.value(max_index_row, max_index_col)) {
					max_index_row = r;
					max_index_col = c;
				}
			}
	    }
	    if (!jsavArr.isHighlight(max_index_row, max_index_col)) {
		return false;
	    } else {
		return true;
	    }
	}
    };

    // Click event handler on the array
    function clickHandler(indexR, indexC) {
	if (jsavArr.isHighlight(indexR, indexC)) {
	    jsavArr.unhighlight(indexR, indexC);
	} else { jsavArr.highlight(indexR, indexC); }
	healyKA.userInput = true;
    }
    // Export name used here
    window.healyKA = window.healyKA || healyKA;
}());
