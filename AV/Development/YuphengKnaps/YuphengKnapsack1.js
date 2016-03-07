"use strict";

$(document).ready(function () {


    JSAV.init();


	var knap = initKnapsack();
    var arr;

    var av = new JSAV("YuphengKnapsack1");

    arr = av.ds.matrix({rows: knap.data.numItems, columns: knap.data.capacity, style: "table"});

    arr.value(0,0,"V");
    arr.value(0,1,1);
    arr.value(0,2,2);
    arr.value(0,3,3);
    arr.value(0,4,4);
    arr.value(0,5,5);
    
    arr.value(1,0,0);
    arr.value(2,0,1);
    arr.value(3,0,2);
    arr.value(4,0,3);

    //console.log(a);
    av.umsg("Text before displayInit()");
    // Note: av.displayInit() will not affect the number of slides.
    // All that it will do is affect what you get to see on the
    // initial slide.
    av.displayInit();

    // We are now starting a new slide (#2)
    av.umsg("... and text after displayInit()", {preserve: true});
    
    arr.value(1,1,0);
    av.step();
    arr.value(1,2,0);
    av.step();
    arr.value(1,3,0);
    av.step();
    arr.value(1,4,0);
    av.step();
    arr.value(1,5,0);
    av.step();

    arr.value(2,1,0);
    av.step();
    arr.value(2,2,0);
    av.step();
    arr.value(2,3,5);
    av.step();
    arr.value(2,4,5);
    av.step();
    arr.value(2,5,5);
    av.step();


    arr.value(3,1,0);
    av.step();
    arr.value(3,2,3);
    av.step();
    arr.value(3,3,5);
    av.step();
    arr.value(3,4,5);
    av.step();
    arr.value(3,5,8);
    av.step();


    arr.value(4,1,4);
    av.step();
    arr.value(4,2,4);
    av.step();
    arr.value(4,3,7);
    av.step();
    arr.value(4,4,9);
    av.step();
    arr.value(4,5,9);
    av.step();

    // array[funcname].apply(array, [].slice.call(arguments, 1));
    // We are now starting a new slide (#3)
    av.umsg("Text after av.step()");
    av.recorded();
    // If you add av.umsg after av.recorded, it will add new slides in
    // ways that you probably do not expect and probably cannot
    // control in the way that you want. As av.recorded() rewinds the
    // slideshow, the new slides would go to the beginning of the slideshow.
    // So, unless you are trying to add slides on-the-fly
    // interactively, you don't want to do this.
    // av.umsg("Text after av.recorded()");


});

var initKnapsack = function() {
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

function knapsack(items, capacity) {
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
