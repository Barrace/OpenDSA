var Knapsack = new function() {
	this.initKnapsack = function() {
		var randNum = function(min, max) {
			return Math.floor(Math.random()*(max-min+1)+min);
		};

		var items = [];

		var config = {
		  minItems: 3,
		  maxItems: 7,
		  minWeight: 1,
		  maxWeight: 10,
		  minValue: 1,
		  maxValue: 10,
		  minCapacityPercent: 65,
		  maxCapacityPercent: 85
		}

		var data = {
			numItems: randNum(config.minItems, config.maxItems),
		  sumItemsWeight: 0
		}

		var itemWeight, itemValue, tempItem;
		for(var i=0; i <= data.numItems; i++){
		  itemWeight = randNum(config.minWeight, config.maxWeight);
		  itemValue = randNum(config.minValue, config.maxValue);
		  tempItem = {
		  	w: itemWeight,
			v: itemValue
		  };
		  items.push(tempItem);
		  data.sumItemsWeight += tempItem.w;
		}

		var percentageDif = randNum(config.minCapacityPercent, config.maxCapacityPercent) / 100;
		data.capacity = Math.floor(percentageDif * data.sumItemsWeight);

		return {
			items: items,
			data: data
		};
	};

	this.knapsack = function (items, capacity) {
	  var idxItem   = 0,
		  idxWeight = 0,
		  oldMax    = 0,
		  newMax    = 0,
		  numItems  = items.length,
		  weightMatrix  = new Array(numItems+1),
		  keepMatrix    = new Array(numItems+1),
		  solutionSet   = [];

	  // Setup matrices
	  for(idxItem = 0; idxItem < numItems + 1; idxItem++){
		weightMatrix[idxItem] = new Array(capacity+1);
		keepMatrix[idxItem]   = new Array(capacity+1);
	  }

	  // Build weightMatrix from [0][0] -> [numItems-1][capacity-1]
	  for (idxItem = 0; idxItem <= numItems; idxItem++){
		for (idxWeight = 0; idxWeight <= capacity; idxWeight++){

		  // Fill top row and left column with zeros
		  if (idxItem === 0 || idxWeight === 0){
		    weightMatrix[idxItem][idxWeight] = 0;
		  }

		  // If item will fit, decide if there's greater value in keeping it,
		  // or leaving it
		  else if (items[idxItem-1].w <= idxWeight){
		    newMax = items[idxItem-1].v + weightMatrix[idxItem-1][idxWeight-items[idxItem-1].w];
		    oldMax = weightMatrix[idxItem-1][idxWeight];

		    // Update the matrices
		    if(newMax > oldMax){ 
		      weightMatrix[idxItem][idxWeight]  = newMax;
		      keepMatrix[idxItem][idxWeight]    = 1;
		    }
		    else{
		      weightMatrix[idxItem][idxWeight]  = oldMax; 
		      keepMatrix[idxItem][idxWeight]    = 0;
		    }
		  }

		  // Else, item can't fit; value and weight are the same as before
		  else{
		    weightMatrix[idxItem][idxWeight] = weightMatrix[idxItem-1][idxWeight];
		  }
		}
	  }

	  // Traverse through keepMatrix ([numItems][capacity] -> [1][?])
	  // to create solutionSet
	  idxWeight = capacity;
	  idxItem   = numItems;
	  for(idxItem; idxItem > 0; idxItem--){
		if(keepMatrix[idxItem][idxWeight] === 1){
		  solutionSet.push(items[idxItem - 1]);
		  idxWeight = idxWeight - items[idxItem - 1].w;
		}
	  }
	  return {"maxValue": weightMatrix[numItems][capacity], "set": solutionSet, "keep": keepMatrix};
	}
}