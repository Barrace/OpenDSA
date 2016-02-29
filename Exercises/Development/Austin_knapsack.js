/*global window */
(function() {
  "use strict";
    var numberOne;
	var numberTwo; 
	var operators = ["+", "-", "*"];
	var operator;

	var operation = {
		'+': function (x, y) { return x + y },
		'-': function (x, y) { return x - y },
		'*': function (x, y) { return x * y },
		//'%': function (x, y) { return x % y }
};

    var austin_knapsack = {
      
    // Initialise the exercise
      getQuestion: function(arr_size) {
	  numberOne = Math.floor(Math.random() * 1000 + 1);
	  numberTwo = Math.floor(Math.random() * 1000 + 1);
	  operator = operators[Math.floor(Math.random() * operators.length)];
	  var questionString = numberOne + " " + operator + " " + numberTwo;
	  return questionString;
      },
      
      sum: function() {
	  	return operation[operator](numberOne, numberTwo);
      }
  };
    

  window.austin_knapsack = window.austin_knapsack || austin_knapsack;
}());
