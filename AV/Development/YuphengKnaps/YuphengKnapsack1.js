"use strict";

$(document).ready(function () {


    JSAV.init();


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
    for(var ji = 1; ji < a.length; ji++)
    {
        a[ji] = 6;
        av.step();
    }
    var arr = av.ds.matrix([v, a, b,
        c, d]);
    //arr..highlight([v,a,b,c,d])
    //arr.hide();
    //a[2] = 0;
    //arr.show();
    

    //var arr = av.ds.matrix({rows: 5, columns: 6, style: "table"});
    //alert(arr.rows());
    //alert(arr.columns());
    //var arr = av.ds.matrix([[],[],[],[],[],[]]);

    /*for(var i = 0; i < 6; i++)
    {
        for(var j = 0; j < 7; j++)
        {
            arr..highlight([v,a,b,c,d])
        }
        
        av.step();
        

    }*/
    //console.log(a);
    av.umsg("Text before displayInit()");
    // Note: av.displayInit() will not affect the number of slides.
    // All that it will do is affect what you get to see on the
    // initial slide.
    av.displayInit();
    // We are now starting a new slide (#2)
    av.umsg("... and text after displayInit()", {preserve: false});
    //arr.swap(3,7);
    //var arr = av.ds.matrix([v, a, b,
        //c, d]);
    //av.step();
    /*for(var i = 0; i < arr.rows; i++)
    {
        //for(var j = 0; j < arr.columns(); j++)
        //{

            
            //a.highlight(i+1);
            
            //arr.value(a[i],0);
            //arr.value(a[i],0);

            //arr = av.ds.matrix([v,a,b,c,d]);
            //a.unhighlight(i);
            //av.recorded();
            av.step();
        //}
        //av.step();
    }*/
    //a.value(1,0);
    //how();
    arr.show();
    av.step();
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
