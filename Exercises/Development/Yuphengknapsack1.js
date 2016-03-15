/*global window */
(function() {
    "use strict";
    var av,         // The JSAV object
    jsavArr,		// The array that the user manipulates (JSAV object)
    jsavMatrix1,	// Matrix for weight
    jsavMatrix2;    // Matrix for keep

    var solutionArray = [];
    var lastArr = [];

    var yuphengknapsack1 = {	// Name of export object
	userInput: null,  // Boolean: Tells us if user ever did anything

	// Initialise the exercise
	initJSAV: function(arr_size) {
	    yuphengknapsack1.userInput = false;
	    av = new JSAV("Yuphengknapsack1", {animationMode: "none"});

	    var matrixRows = arr_size.data.numItems + 2;
	    var matrixCols = arr_size.data.capacity + 1;

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

		var objForMatrix = Knapsack.knapsack(arr_size.items, arr_size.data.capacity, jsavMatrix1, jsavMatrix2, av);
	    console.log(objForMatrix);

		var arr = objForMatrix.set;
		console.log(arr);
		

		for(var i = 1; i < matrixRows - 1; i++)
		{
			lastArr[i-1] = i;
		}

		//Getting the items from the set object. 
		for(var p = 0; p < arr.length; p++)
		{
			console.log(arr[p].i);
			solutionArray[p] = arr[p].i;
		}

		jsavArr = av.ds.array(lastArr,
			  	  {indexed: true, center: true});

	    av.displayInit();
	    av.recorded();
	    // bind the clickHandler to handle click events on the array
	    jsavArr.click(clickHandler);
	},

	// Validate user's answer
	checkAnswer: function() {
	    for(var i = 0; i < jsavArr.size(); i++)
	    {
	    	for(var j = 0; j < solutionArray.length; j++)
	    	{
	    		if(jsavArr.value(i) == solutionArray[j])
	    		{

	    			if(!jsavArr.isHighlight(i))
	    				return false;
	    		}
	    	}
	    }
	    for(var i = 0; i < jsavArr.size(); i++)
	    {
	    	if(jsavArr.isHighlight(i))
	    	{
	    		if(!contains(solutionArray, jsavArr.value(i)))
	    			return false;
	    	}
	    }
	    return true;
	}
    };

    //We created a contains method to check if the array contains the solution array. 
	var contains = function (arr, i)
	{
    	for (var k=0; k<arr.length; k++)
    	{
        	if (i == arr[k])
            	return true;
    	}
    	return false;
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
