"use strict";

$(document).ready(function () {


    JSAV.init();
    var arr;

    var av = new JSAV("YuphengKnapsack1");
    //var theArray = av.ds.matrix({rows: 5, columns: 6, style: "table"});
    var weighCompa = av.ds.matrix([[" ","V","W"], ["I",5,3], ["II",3,2], ["III",4,1]], {left: true});
    var a = [0," "," "," "," "," "],
        b = [1," "," "," "," "," "],
        c = [2," "," "," "," "," "],
        d = [3," "," "," "," "," "],
        v = ["V", 1, 2, 3, 4, 5];
    //a[1] = 0;
    //alert(a.size());
    //arr = av.ds.matrix([v, a, b, c, d]);
    /*for(var ji = 1; ji < a.length; ji++)
    {
        //var arr = av.ds.matrix([v, a, b, c, d]);
        a[ji] = 6;
        av.step();
    }*/
    //av.step();
    //av.ds.matrix([v, a, b, c, d]); 
    //arr..highlight([v,a,b,c,d])
    //arr.hide();
    //a[2] = 0;
    //arr.show();
    

    arr = av.ds.matrix({rows: 5, columns: 6, style: "table"});
    /*for(var r = 0; r < arr.rows; r++)
    {
        for(var c = 0; c < arr.columns; c++)
        {
            arr.value(0,0,"V");
            arr.value(0,c,c);
            arr.value(r,0,r);
        }
        av.step();
    }*/
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
    //alert(arr.rows());
    //alert(arr.columns());
    //var arr = av.ds.matrix([[],[],[],[],[],[]]);
    //var count = 0;
    /*for(var i = 1; i < arr.rows; i++)
    {
        for(var j = 1; j < arr.columns; j++)
        {
           arr.value(4,4,count);
        }
        count++;
        arr.step();
        //arr.show(); 

        

    }*/
    //console.log(a);
    av.umsg("Text before displayInit()");
    // Note: av.displayInit() will not affect the number of slides.
    // All that it will do is affect what you get to see on the
    // initial slide.
    av.displayInit();

    // We are now starting a new slide (#2)
    av.umsg("... and text after displayInit()", {preserve: true});
    //arr.swap(3,7);
    //var arr = av.ds.matrix([v, a, b,
        //c, d]);
    /*var count = 0;
    var j = 1;
    for(var i = 1; i < arr.rows; i++)
    {
        //for(var j = 0; j < arr.columns(); j++)
        //{

            
            //a.highlight(i+1);
            
            arr.value(i,j,count);
            //arr.value(a[i],0);

            //arr = av.ds.matrix([v,a,b,c,d]);
            //a.unhighlight(i);
            //av.recorded();
            //av.step();
        //}
        av.step();
        j++;
    }*/
    //a.value(1,0);
    //how();
    //arr.show();
    //av.step();
    /*var bool = true;
    var i = 1,
        j = 1,
        count = 0;
    while(i != arr.rows)
    {
        while(j != arr.columns)
        {
            arr.value(i,j,count);
            j++;
        }
        i++;
        av.step();
    }*/
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
