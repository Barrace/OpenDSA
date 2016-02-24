.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Yupheng Yang, Team member 2, Team member 3

============================================================
Illustrate slide shows in an OpenDSA learning module
============================================================

Prototype of Knapsack
---------------------


The following slideshow demonstrates how, starting with a slideshow
like you worked with in the first week's lab, you can incorporate it into a
learning module as an inlineav.

.. inlineav:: YuphengKnapsack1 ss
   :output: show

Prototype of Knapsack with a reset button
-------------------------------------------

Here we have the same visualization as in the previous inlineav, but
now as an embedded AV.  Although it is slightly more complicated this
way, it allows us to process input from the user on the embedded page.
Here the user can enter a space-separated list of numbers, or if they
choose to not do so, an OpenDSA utility randomly generates them for
the user.


.. avembed:: AV/Development/YuphengKnaps/YuphengKnapsack2.html ss


A Khan Academy Exericse with JSAV object for knapsack algorthim
---------------------------------------------------------------

This example shows how to embed a Khan Academy exercise that has the user identify the 
maximum by clicking on a JSAV array cell. 

.. avembed:: Exercises/Development/Yuphengknapsack1.html ka


.. odsascript:: AV/Development/YuphengKnaps/YuphengKnapsack1.js

