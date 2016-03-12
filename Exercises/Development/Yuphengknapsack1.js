/*global window */
(function() {
    "use strict";
    var av,         // The JSAV object
    jsavArr,
    jsavMatrix1,
    jsavMatrix2;    // The array that the user manipulates (JSAV object)

    var knap = Knapsack.initKnapsack();

    var yuphengknapsack1 = {	// Name of export object
	userInput: null,  // Boolean: Tells us if user ever did anything

	// Initialise the exercise
	initJSAV: function(arr_size) {
	    yuphengknapsack1.userInput = false;
	    av = new JSAV("Yuphengknapsack1", {animationMode: "none"});

	    var matrixRows = knap.data.numItems + 2;
	    var matrixCols = knap.data.capacity + 1;

	    jsavMatrix1 = av.ds.matrix({rows: matrixRows, columns: matrixCols, style: "table"});

	    jsavMatrix2 = av.ds.matrix({rows: matrixRows, columns: matrixCols, style: "table"});

	    jsavMatrix1.value(0,0,"V");
	    jsavMatrix2.value(0,0,"V");

	    for (var i = 1; i < matrixCols; i++) 
	    {
        	jsavMatrix1.value(0, i, i);
			jsavMatrix2.value(0, i, i);
    	}

    	for (var i = 0; i < matrixRows - 1; i++) 
    	{
        	jsavMatrix1.value(i + 1, 0, i);
			jsavMatrix2.value(i + 1, 0, i);
    	}

    	for (var i = 0; i < matrixCols; i++) 
    	{
        	jsavMatrix1.value(1, i, 0);
			jsavMatrix2.value(1, i, 0);
		}

		var temp = Knapsack.knapsack(knap.items, knap.data.capacity, jsavMatrix1, jsavMatrix2, av);
	    console.log(temp);

		var arr = temp.weight;
		console.log(arr);
		var lastArr = [];

		//Getting the last array of the weight object. 
		for(var p = arr.length-1; p < arr.length; p++)
		{
			for(var r = 0; r < arr[p].length; r++)
			{
				
				lastArr[r] = arr[p][r];
			}
		}

		//Checking the array if it contains the same items as the other array.
		for(var o = 0; o < lastArr.length; o++)
		{
			console.log(lastArr[o]);
		}

		jsavArr = av.ds.array(lastArr,
			  	  {indexed: true, center: true});

	    av.displayInit();
	    av.recorded();
	    // bind the clickHandler to handle click events on the array
	    jsavArr.click(clickHandler);
	    //jsavMatrix1.click(clickHandler);
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
	yuphengknapsack1.userInput = true;
    }
    // Export name used here
    window.yuphengknapsack1 = window.yuphengknapsack1 || yuphengknapsack1;
}());
