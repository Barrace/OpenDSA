/*global window */
(function () {
    "use strict";
    var av, matrix, keepMatrix, nextMatrixValue,itemsMatrix;

    //var knap = Knapsack.initKnapsack();

    var knapsackExercise1 = {

        initJSAV: function (knap) {
            av = new JSAV("KnapsackExercise1", {
                animationMode: "none"
            });

            var matrixRows = knap.data.numItems + 2;
            var matrixCols = knap.data.capacity + 1;
            
            var tempWeightArr = new Array();
            var tempValueArr = new Array();
            var tempNumberArr = new Array();

            tempWeightArr.push("W");
            tempValueArr.push("V");
            tempNumberArr.push(" ");

            for (var i=0; i < knap.items.length; i++)
            {
                tempWeightArr.push(knap.items[i].w);
                tempValueArr.push(knap.items[i].v);
                tempNumberArr.push(i + 1);
            }
            
            itemsMatrix = av.ds.matrix([tempNumberArr, tempWeightArr, tempValueArr ],{
                style: "table"
            });

            matrix = av.ds.matrix({
                rows: matrixRows,
                columns: matrixCols,
                style: "table"
            });

            keepMatrix = av.ds.matrix({
                rows: matrixRows,
                columns: matrixCols,
                style: "table",
				visible: false
            });

            matrix.value(0, 0, "V");
            keepMatrix.value(0, 0, "K");

            for (var i = 1; i < matrixCols; i++) {
                matrix.value(0, i, i);
                keepMatrix.value(0, i, i);
            }

            for (var i = 0; i < matrixRows - 1; i++) {
                matrix.value(i + 1, 0, i);
                keepMatrix.value(i + 1, 0, i);
            }

            for (var i = 0; i < matrixCols; i++) {
                matrix.value(1, i, 0);
                keepMatrix.value(1, i, 0);
            }
            
            nextMatrixValue = Knapsack.knapsack(knap.items, knap.data.capacity, matrix, keepMatrix, av, "FillInBlank");
            console.log(nextMatrixValue, " ~~ FILL-IN-BLANK ANSWER")
            return nextMatrixValue;
        }
    };


    window.knapsackExercise1 = window.knapsackExercise1 || knapsackExercise1;
}());