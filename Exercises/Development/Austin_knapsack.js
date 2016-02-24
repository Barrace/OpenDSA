/*global window */
(function() {
  "use strict";
    var numberOne;
	var numberTwo;  
    var austin_knapsack = {
      
    // Initialise the exercise
      initArr: function(arr_size) {
	  numberOne = Math.floor(Math.random() * 1000 + 1);
	  numberTwo = Math.floor(Math.random() * 1000 + 1);
	  var questionString = numberOne + " + " + numberTwo;
	  return questionString;
      },
      
      maxValue: function() {
	  	return numberOne + numberTwo;
      }
  };
    

  window.austin_knapsack = window.austin_knapsack || austin_knapsack;
}());
