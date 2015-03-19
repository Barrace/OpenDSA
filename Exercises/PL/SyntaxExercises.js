"use strict";

/* global LAMBDA, console */

var question = {};
var L = LAMBDA;


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        common code for SyntaxTF and SyntaxMC exercises
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

function pickRndCharacter(c,s) {
    var list = s.split("").map(function (e,i) { return (e===c ? i : -1) ; });
    list = list.filter(function (x) { return x >= 0; });
    return list[L.getRnd(0,list.length-1)];		       
}
function findMatchingParen(s,index) {
    s = s.split("");
    var count = 0;
    for(var i=index+1; i<s.length; i++) {
	if (s[i] === ')') {
	    if (count === 0) {
		return i;
	    } else {
		count--;
	    }
	} else {
	    if (s[i] === '(') {
		count++;
	    }
	}
    }
    throw new Error("Could not find closing paren for the one at position " +
		    index + " in " + s);
}
function removeParenPair(s) {
    var openParen = pickRndCharacter('(',s);
    var closeParen = findMatchingParen(s,openParen);
    return s.substring(0,openParen) + s.substring(openParen+1,closeParen) + 
	s.substring(closeParen+1);
}
function removeDot(s) {
    var dot = pickRndCharacter('.',s);
    return s.substring(0,dot) + " " + s.substring(dot+1);
}
function addParens(s) {
    var n = s.length;
    var closing = n-1;
    while (s[closing] === ')') {
	closing--;
    }
    var p1 = L.getRnd(0,closing-1);
    var p2 = L.getRnd(closing+1,n-1);
    // do not insert in front of a space or a dot
    if (s[p1] === " " || s[p1] === ".") {
	p1++;
    }
    // do not insert after a lambda
    if (p1>0 && s[p1-1] === "\u03BB" ) {
	p1 += 2;
    }
    return s.substring(0,p1) + "(" + 
	s.substring(p1,p2) + ")" + s.substring(p2);
}
function getSyntaxError(minDepth,maxDepth,vs) {
    var s = L.printExp( L.getRndExp(1,minDepth,maxDepth,vs,""));
    var rnd = L.getRnd(1,3);
    question.answer = "True";
    switch (rnd) {
    case 1: 
	if (s.indexOf('(') !== -1) {
	    s = removeParenPair(s);
	    question.answer = "False";
	}
	//  leave s unchanged if it does not contain any parens
	break;
    case 2: 
	if (s.indexOf('.') !== -1) {
	    s = removeDot(s);
	    question.answer = "False";
	}
	//  leave s unchanged if it does not contain any dot
	break;
    case 3: 
	s = addParens(s);
        question.answer = "False";
	break;
    }    
    return s;
}


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                 code for SyntaxTF exercise
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
// Initialize Alpha Multiple Choice Exercises.
function initSyntaxTF()
{
    var vs = "uvxyz";
    var maxDepth = 6;
    var minDepth = 4;
    var exp;
    if (L.getRnd(0,1) === 0) {
	// syntactically correct lambda exp
	exp = L.printExp( L.getRndExp(1,minDepth,maxDepth,vs,""));
	question.answer = "True";
    } else {
	exp = getSyntaxError(minDepth,maxDepth,vs);
    }
    var jsav = new JSAV("jsav", {"animationMode": "none"});
    jsav.code(exp, {lineNumbers: false});

    question.statement = exp;
}
function getAnswerSyntaxTF() {
    return question.answer;
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                 code for SyntaxTF exercise
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

function isNew(arr) {
    var exp = arr[arr.length-1];
    for(var i=0; i<arr.length-1; i++) {
	if (arr[i] === exp) {
	    return false;
	}
    }
    return true;
}
function initSyntaxMC()
{
    var vs = "uvxyz";
    var maxDepth = 5;
    var minDepth = 4;
    var exp;
    var numCorrect = 0;
    var exps = [ ];
    var isCorrect;


    while (exps.length < 4) {	
	if (L.getRnd(0,1) === 0) {
	    // syntactically correct lambda exp
	    exps.push( L.printExp( L.getRndExp(1,minDepth,maxDepth,vs,"")) );
	    isCorrect = true;
	} else {
	    exps.push( getSyntaxError(minDepth,maxDepth,vs) );
	    isCorrect = false;
	}

	if (isNew(exps)) {
	    numCorrect += isCorrect ? 1 : 0;
	} else {
	    exps.pop();
	}
    }

    question.answer = String(numCorrect);

    var jsav = new JSAV("jsav",{"animationMode": "none"});
    jsav.code(exps.join("\n"), {lineNumbers: false});


}
function getAnswerSyntaxMC() {
    return question.answer;
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                 code for SyntaxTreeMC exercise
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

function initSyntaxTreeMC()
{
    var vs = "uvxyz";
    var maxDepth = 4;
    var minDepth = 4;
    var exp = L.getRndExp(1,minDepth,maxDepth,vs,"");
    var options = [ L.getNumNodes(exp),10,20,30,40 ];

    question.options = options;

    var jsav = new JSAV("jsav",{"animationMode": "none"});
    jsav.code( L.printExp(exp), {lineNumbers: false});
}
function getOptionSyntaxTreeMC() {
    return question.options;
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                 code for freeVarHighlight exercise
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

    var arr;
    var setArrayCellsWidth = function (highlight,range) {
	arr.removeClass(true,"oneCharWidth");
	arr.removeClass(true,"emptyWidth");
	arr.removeClass(true,"lambdaWidth");
	arr.removeClass(true,"parenWidth");
	arr.addClass(true, "defaultCellStyle");
	arr.addClass(oneChar, "oneCharWidth");
	arr.addClass(noChar,"emptyWidth");
	arr.addClass(lambdaChar,"lambdaWidth");
	arr.addClass(parenChar,"parenWidth");
	if (highlight !== undefined) {
	    if (highlight) {
		arr.removeClass(true,"unhighlightCell");
		arr.addClass(range, "highlightCell");
	    } else {
		arr.removeClass(true,"highlightCell");
		arr.addClass(range, "unhighlightCell");
	    }
	}
    };
    function oneChar (x) { return arr.value(x).length === 1; }
    var noChar = function(x) { return arr.value(x).length === 0; };
    var lambdaChar = function(x) { return arr.value(x).length === 3; };
    var parenChar = function(x) { 
    return arr.value(x) === '(' || arr.value(x) === ')' ||
	    arr.value(x) === ' '; 
    };

function initFreeVarHighlight () {
    var jsav = new JSAV("jsav", {"animationMode": "none"});
    var vs = "uvxyz";
    var minDepth = 3;
    var maxDepth = 4;
    var exp = L.getRndExp2(1,minDepth,maxDepth,vs,"");
    var answer = L.mySplit(L.getFreeBoundVariables(exp));
    arr = jsav.ds.array(L.mySplit(L.printExp(exp)));
    setArrayCellsWidth();
    L.light = [ ];
    for(var i=0; i<arr.size(); i++) {
	L.light.push(false);
    }
    arr.click(clickHandler);
    question.answer = answer;
}
function clickHandler(index, e) {
    if(L.light[index]) {
	arr.unhighlight(index);
	L.light[index] = false;
    } else {
	arr.highlight(index);
	L.light[index] = true;
    }
}
function validateFreeVar() {
    for(var i=0; i<question.answer.length; i++) {
	if ((L.light[i] && question.answer[i] !== '?') ||
	    (! L.light[i]  && question.answer[i] === '?')) {
	    return false;
	}
    }
    return true;
}

