/*global window */
(function () {
    "use strict";
    var av, matrix, keepMatrix, nextMatrixValue;

    var knap = Knapsack.initKnapsack();

    var knapsackExercise1 = {

        initJSAV: function () {
            av = new JSAV("KnapsackExercise1", {
                animationMode: "none"
            });

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
            keepMatrix.value(0, 0, "V");

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
            
            nextMatrixValue = Knapsack.knapsack(knap.items, knap.data.capacity, matrix, keepMatrix, av, "FillInBlank")
            console.log(nextMatrixValue, " ~~ FILL-IN-BLANK ANSWER")
            return nextMatrixValue;
        }
    };


    window.knapsackExercise1 = window.knapsackExercise1 || knapsackExercise1;
}());