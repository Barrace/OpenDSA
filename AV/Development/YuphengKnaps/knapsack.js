var Knapsack = new function () {
    var config = {
        minItems: 2,
        maxItems: 5,
        minWeight: 1,
        maxWeight: 5,
        minValue: 1,
        maxValue: 5,
        minCapacityPercent: 60,
        maxCapacityPercent: 75
    }

    var randNum = function (min, max, lastNum) {
        var rand = Math.floor(Math.random() * (max - min + 1) + min);
        while(typeof lastNum !== 'undefined' && rand == lastNum){
            rand = Math.floor(Math.random() * (max - min + 1) + min);
        }
        return rand;
    };
    
    this.calculateCapacity = function(items){
        var sumWeight = 0;
        for(var i = 0; i <= items.length - 1; i++){
            sumWeight += items[i].w;
        }
        var percentageDif = randNum(config.minCapacityPercent, config.maxCapacityPercent) / 100;
        return Math.floor(percentageDif * sumWeight);
    }

    this.initKnapsack = function () {
        var items = [];
        var data = {
            numItems: randNum(config.minItems, config.maxItems),
            capacity: 0,
        }

        var itemWeight, itemValue, tempItem, lastWeight = -1, lastValue = -1;
        for (var i = 0; i <= data.numItems - 1; i++) {
            itemWeight = randNum(config.minWeight, config.maxWeight, lastWeight);
            itemValue = randNum(config.minValue, config.maxValue, lastValue);
            lastWeight = itemWeight;
            lastValue = itemValue;
            tempItem = {
                i: i - 1,
                w: itemWeight,
                v: itemValue
            };
            items.push(tempItem);
        }
        
        data.capacity = this.calculateCapacity(items);
        
        return {
            items: items,
            data: data
        };
    };

    this.knapsack = function (items, capacity, matrix, inKeepMatrix, av) {
        var idxItem = 0,
            idxWeight = 0,
            oldMax = 0,
            newMax = 0,
            numItems = items.length,
            weightMatrix = new Array(numItems + 1),
            keepMatrix = new Array(numItems + 1),
            solutionSet = [];

        // Setup matrices
        for (idxItem = 0; idxItem < numItems + 1; idxItem++) {
            weightMatrix[idxItem] = new Array(capacity + 1);
            keepMatrix[idxItem] = new Array(capacity + 1);
        }

        // Build weightMatrix from [0][0] -> [numItems-1][capacity-1]
        for (idxItem = 0; idxItem <= numItems; idxItem++) {
            for (idxWeight = 0; idxWeight <= capacity; idxWeight++) {

                // Fill top row and left column with zeros
                if (idxItem === 0 || idxWeight === 0) {
                    weightMatrix[idxItem][idxWeight] = 0;
                }

                // If item will fit, decide if there's greater value in keeping it,
                // or leaving it
                else if (items[idxItem - 1].w <= idxWeight) {
                    newMax = items[idxItem - 1].v + weightMatrix[idxItem - 1][idxWeight - items[idxItem - 1].w];
                    oldMax = weightMatrix[idxItem - 1][idxWeight];

                    // Update the matrices
                    if (newMax > oldMax) {
                        weightMatrix[idxItem][idxWeight] = newMax;
                        keepMatrix[idxItem][idxWeight] = 1;
                        matrix.value(idxItem + 1, idxWeight, newMax);
                        inKeepMatrix.value(idxItem + 1, idxWeight, 1);
                        av.step();

                    } else {
                        weightMatrix[idxItem][idxWeight] = oldMax;
                        keepMatrix[idxItem][idxWeight] = 0;
                        matrix.value(idxItem + 1, idxWeight, oldMax);
                        inKeepMatrix.value(idxItem + 1, idxWeight, 0);
                        av.step();

                    }
                }

                // Else, item can't fit; value and weight are the same as before
                else {
                    weightMatrix[idxItem][idxWeight] = weightMatrix[idxItem - 1][idxWeight];
                    matrix.value(idxItem + 1, idxWeight, weightMatrix[idxItem - 1][idxWeight]);
                    inKeepMatrix.value(idxItem + 1, idxWeight, 0);
                    av.step();
                }
            }
        }

        // Traverse through keepMatrix ([numItems][capacity] -> [1][?])
        // to create solutionSet
        idxWeight = capacity;
        idxItem = numItems;
        for (idxItem; idxItem > 0; idxItem--) {
            if (keepMatrix[idxItem][idxWeight] === 1) {
                var item = items[idxItem - 1];
                item.i = idxItem;
                solutionSet.push(items[idxItem - 1]);
                idxWeight = idxWeight - items[idxItem - 1].w;
            }
        }
        return {
            "maxValue": weightMatrix[numItems][capacity],
            "set": solutionSet,
            "keep": keepMatrix,
            weight: weightMatrix
        };
    }
}