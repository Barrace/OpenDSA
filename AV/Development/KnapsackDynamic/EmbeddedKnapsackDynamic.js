"use strict";
/*global alert: true, ODSA */

(function ($) {
    var av;
    var weight,
        value,
        capacity;
    var keepMatrix, matrix, itemsMatrix;
    
function runit() {
    ODSA.AV.reset(true);

    var itemNum, itemWeight, itemValue, newItem, items = [];
    weight = document.getElementById("weight").value.trim().split(",");
    value = document.getElementById("value").value.trim().split(",");
    capacity = parseInt(document.getElementById("capacity").value);
    
    //Weight and val should be same length so if not gen random
    if(weight.length != value.length || (weight.length == 0 || value.length == 0)
        || (weight[0] === "" || value[0] === "")){
        var knap = Knapsack.initKnapsack();
        items = knap.items;
        capacity = knap.data.capacity;
        alert("Invalid knapsack data entered, a problem has been generated for you");
    } else {
        for(var i = 0; i < weight.length; i++){
            itemNum = i + 1;
            itemWeight = weight[i];
            itemValue = value[i];
            newItem = {
                i: itemNum,
                w: itemWeight,
                v: itemValue
            };
            items.push(newItem);
        }
    }

   console.log(capacity);
   console.log(items, items.length);

    av = new JSAV($('.avcontainer'));

    var tempWeightArr = new Array();
	var tempValueArr = new Array();
	var tempNumberArr = new Array();
	
	tempWeightArr.push("W");
	tempValueArr.push("V");
	tempNumberArr.push(" ");

	for (var i=0; i < items.length; i++)
	{
		tempWeightArr.push(items[i].w);
		tempValueArr.push(items[i].v);
		tempNumberArr.push(i + 1);
	}

    var matrixRows = items.length + 2;
    var matrixCols = capacity + 1;
	
	itemsMatrix = av.ds.matrix([tempNumberArr, tempWeightArr, tempValueArr ],{
        style: "table",
		left: true
    });

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

    Knapsack.knapsack(items, capacity, matrix, keepMatrix, av);


    av.recorded();

}

function about() {
   alert("Enter a list of weights, values, and a capacity to watch the problem be solved.");
}
  
function help() {
   alert("Enter values seperated by commas for values and weights then a number for capacity");
}
  
// Initialize the arraysize dropdown list
ODSA.AV.initArraySize(1, 5, 2); // Between 10 and 16, with default at 12

// Connect action callbacks to the HTML entities
$('#about').click(about);
$('#runit').click(runit);
$('#help').click(help);
$('#reset').click(ODSA.AV.reset);
}(jQuery));
