"use strict";

$(document).ready(function () {


    JSAV.init();


    var knap = Knapsack.initKnapsack();
	//console.log(knap);
    var weightArr, keepMatrix, valueArr, matrix;

    var av = new JSAV("YuphengKnapsack1");
    /*	AJ's notes

    We now have access to these important variables.

    knap.data.numItems
    knap.data.capacity
	
    knap.items is an array of objects containing a w and a v. array index is item #

    */



	var tempWeightArr = new Array();
	var tempValueArr = new Array();

	for (var i=0; i<knap.data.numItems; i++)
	{
		tempWeightArr.push(knap.items[i].w);
		tempValueArr.push(knap.items[i].v);
	}

	var arrayLayouts = { layout: "vertical", left: true };

	weightArr = av.ds.array(tempWeightArr, { layout: "vertical", left: true, relativeTo: valueArr, anchor: "left" });

	valueArr = av.ds.array(tempValueArr, { layout: "vertical", left: true, relativeTo: weightArr, anchor: "right" });


    var matrixRows = knap.data.numItems + 2;
    var matrixCols = knap.data.capacity + 1;

    matrix = av.ds.matrix({
        rows: matrixRows,
        columns: matrixCols,
        style: "table"
    });

	keepMatrix = av.ds.matrix({
	    rows: matrixRows,
	    columns: matrixCols,
	    style: "table"
		
	});

	matrix.value(0, 0, "V");
	keepMatrix.value(0, 0, "K");

    for (var i = 1; i < matrixCols; i++) {
        matrix.value(0, i, i);
		keepMatrix.value(0, i, i);
    }

    //initiate label col
    for (var i = 0; i < matrixRows - 1; i++) {
        matrix.value(i + 1, 0, i);
		keepMatrix.value(i + 1, 0, i);
    }

    //initiate first row
    for (var i = 0; i < matrixCols; i++) {
        matrix.value(1, i, 0);
		keepMatrix.value(1, i, 0);
	}

	

    av.displayInit();
	console.log(knap.items);
    var test = Knapsack.knapsack(knap.items, knap.data.capacity, matrix, keepMatrix, av);
	console.log(test);

    av.recorded();


});

