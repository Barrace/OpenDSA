/*global window */
(function() {
    "use strict";
    var av,         // The JSAV object
    jsavArr,		// The array that the user manipulates (JSAV object)
    jsavMatrix1,	// Matrix for weight
    jsavMatrix2,
    itemsMatrix;    // Matrix for keep

    var solutionArray = [];
    var lastArr = [];

    var highlightExerciseKnapsack = {	// Name of export object
	userInput: null,  // Boolean: Tells us if user ever did anything

	// Initialise the exercise
	initJSAV: function(arr_size) {
	    highlightExerciseKnapsack.userInput = false;
	    av = new JSAV("HighlightExerciseKnapsack", {animationMode: "none"});

	    var matrixRows = arr_size.data.numItems + 2;
	    var matrixCols = arr_size.data.capacity + 1;
	    
        var tempWeightArr = new Array();
        var tempValueArr = new Array();
        var tempNumberArr = new Array();

        tempWeightArr.push("W");
        tempValueArr.push("V");
        tempNumberArr.push(" ");

        for (var i=0; i < arr_size.items.length; i++)
        {
            tempWeightArr.push(arr_size.items[i].w);
            tempValueArr.push(arr_size.items[i].v);
            tempNumberArr.push(i + 1);
        }
        
        itemsMatrix = av.ds.matrix([tempNumberArr, tempWeightArr, tempValueArr ],{
            style: "table"
        });

	    jsavMatrix1 = av.ds.matrix({rows: matrixRows, columns: matrixCols, style: "table", visible: false});

	    jsavMatrix2 = av.ds.matrix({rows: matrixRows, columns: matrixCols, style: "table"});

	    jsavMatrix1.value(0,0,"V");
	    jsavMatrix2.value(0,0,"K");

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
		var arr = objForMatrix.set;

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
	highlightExerciseKnapsack.userInput = true;
    }
    // Export name used here
    window.highlightExerciseKnapsack = window.highlightExerciseKnapsack || highlightExerciseKnapsack;
}());
