<ODSAsettitle>Binary Search Trees</ODSAsettitle>
<ODSAprereq "BinTreeImp" />
<ODSAprereq "Dictionary" />
<ODSAprereq "List" />
<ODSAprereq "LinkedList" />
<ODSAprereq "ArrayBasedList" />

<p>
Module <ODSAref "Dictionary" /> presented the dictionary ADT,
along with dictionary implementations based on sorted and unsorted
lists.
When implementing the dictionary with an unsorted list,
inserting a new record into the dictionary can be performed quickly by
putting it at the end of the list.
However, searching an unsorted list for a particular record
requires &Theta;(<i>n</i>) time in the average case.
For a large database, this is probably much too slow.
Alternatively, the records can be stored in a sorted list.
If the list is implemented using a linked list, then no speedup to the
search operation will result from storing the records in sorted order.
On the other hand, if we use a sorted array-based list to implement
the dictionary, then binary search can be used to find a record in
only &Theta;(log <i>n</i> time.
However, insertion will now require &Theta;(<i>n</i>) time on average
because, once the proper location for the new record in the sorted
list has been found, many records might be shifted to make room for
the new record.
</p>

<p>
Is there some way to organize a collection of records so
that inserting records and searching for records can both be done
quickly?
This module presents the binary search tree (BST), 
which allows an improved solution to this problem.
</p>

<p>
A BST is a binary tree that conforms to the following condition, known 
as the <ODSAdef "Binary Search Tree Property" />.
All nodes stored in the left
subtree of a node whose key value is <i>K</i> have key values less
than <i>K</i>.
All nodes stored in the right subtree of a node whose key value
is <i>K</i> have key values greater than or equal to <i>K</i>.
Figure <ODSAref "BSTShape" /> shows two BSTs for a collection of
values.
One consequence of the Binary Search Tree Property is that if the BST
nodes are printed using an inorder traversal
(see Module <ODSAref "BinTraverse" />)
the resulting enumeration will be in
sorted order from lowest to highest.
</p>

<center>
<img src="Images/BSTShape.png" alt="Two Binary Search Trees" />
</center>

<p class="caption">
<ODSAfig "BSTShape" />
Two Binary Search Trees for a collection of values.
Tree (a) results if values are inserted
in the order 37, 24, 42, 7, 2, 40, 42, 32, 120.
Tree (b) results if the same values are inserted in the
order 120, 42, 42, 7, 2, 32, 37, 24, 40.
</p>

<p>
Figure <ODSAref "BSTClass" /> shows a class declaration for the BST
that implements the dictionary ADT.
The public member functions include those required by the dictionary
ADT, along with a constructor and destructor.
Recall from the discussion in Module <ODSAref "Dictionary" /> that
there are various ways to deal with keys and comparing records
(three approaches  being key/value pairs, a special comparison
method such as using the <tt>Comparator</tt> class,
and passing in a comparator function).
Our BST implementation will handle comparison by explicitly storing
a key separate from the data value at each node of the tree.
</p>

<pre>
/** Binary Search Tree implementation for Dictionary ADT */
class BST<Key extends Comparable<? super Key>, E>
         implements Dictionary<Key, E> {
  private BSTNode<Key,E> root; // Root of the BST
  private int nodecount;       // Number of nodes in the BST

  /** Constructor */
  BST() { root = null; nodecount = 0; }

  /** Reinitialize tree */
  public void clear() { root = null; nodecount = 0; }

  /** Insert a record into the tree.
      @param k Key value of the record.
      @param e The record to insert. */
  public void insert(Key k, E e) {
    root = inserthelp(root, k, e);
    nodecount++;
  }

  /** Remove a record from the tree.
      @param k Key value of record to remove.
      @return The record removed, null if there is none. */
  public E remove(Key k) {
    E temp = findhelp(root, k);   // First find it
    if (temp != null) {
      root = removehelp(root, k); // Now remove it
      nodecount--;
    }
    return temp;
  }

  /** Remove and return the root node from the dictionary.
      @return The record removed, null if tree is empty. */
  public E removeAny() {
    if (root == null) return null;
    E temp = root.element();
    root = removehelp(root, root.key());
    nodecount--;
    return temp;
  }

  /** @return Record with key value k, null if none exist.
      @param k The key value to find. */
  public E find(Key k) { return findhelp(root, k); }

  /** @return The number of records in the dictionary. */
  public int size() { return nodecount; }
}
</pre>

<p class="caption">
<ODSAfig "BSTClass" />
The binary search tree implementation.
</p>

<p>
To find a record with key value <i>K</i> in a BST, begin at the root.
If~the root stores a record with key value <i>K</i>,
then the search is over.
If not, then we must search deeper in the tree.
What makes the BST efficient during search is that we need search only
one of the node's two subtrees.
If <i>K</i> is less than the root node's key value,
we search only the left subtree.
If <i>K</i> is greater than the root node's key value, we search only
the right subtree.
This process continues until a record with key value <i>K</i> is
found, or we reach a leaf node.
If we reach a leaf node without encountering <i>K</i>, then
no record exists in the BST whose key value is <i>K</i>.
</p>

<p class="example">
Consider searching for the node with key value 32 in the tree of
Figure <ODSAref "BSTShape" />(a).
Because 32 is less than the root value of 37, the search
proceeds to the left subtree.
Because 32 is greater than 24, we search in 24's right subtree.
At this point the node containing 32 is found.
If the search value were 35, the same path would be followed to the
node containing 32.
Because this node has no children, we know that 35 is not
in the BST.
</p>

<p>
Notice that in Figure <ODSAref "BSTClass" />, public member function
<tt>find</tt> calls private member function <tt>findhelp</tt>.
Method <tt>find</tt> takes the search key as an explicit parameter
and its BST as an implicit parameter, and returns the record that
matches the key.
However, the find operation is most easily implemented as a
recursive function whose parameters are the root of a
subtree and the search key.
Member <tt>findhelp</tt> has the desired form for this recursive
subroutine and is implemented as follows.
</p>

<pre>
private E findhelp(BSTNode<Key,E> rt, Key k) {
  if (rt == null) return null;
  if (rt.key().compareTo(k) > 0)
    return findhelp(rt.left(), k);
  else if (rt.key().compareTo(k) == 0) return rt.element();
  else return findhelp(rt.right(), k);
}
</pre>

<p>
Once the desired record is found, it is passed through
return values up the chain of recursive calls.
If a suitable record is not found, NULL is returned.
</p>

<p>
Inserting a record with key value <i>k</i> requires that we first find
where that record would have been if it were in the tree.
This takes us to either a leaf node, or to an internal node with no
child in the appropriate direction.
</p>

<p class="footnote">
This assumes that no node
has a key value equal to the one being inserted.
If we find a node that duplicates the key value to be inserted,
we have two options.
If the application does not allow nodes with equal keys, then this
insertion should be treated as an error (or ignored).
If duplicate keys are allowed, our convention will be to insert the
duplicate in the right subtree.
</p>

<center>
<img src="Images/BSTAdd.png" alt="Inserting a node into a BST" />
</center>

<p class="caption">
An example of BST insertion.
A record with value 35 is inserted into the BST of
Figure <ODSAref "BSTShape" />(a).
The node with value 32 becomes the parent of the new node
containing~35.
</p>

<p>
Call this node <i>R'</i>.
We then add a new node containing the new record as a child
of <i>R'</i>.
Figure <ODSAref "BSTAdd" /> illustrates this operation.
The value 35 is added as the right child of the node with value 32.
Here is the implementation for <tt>inserthelp</tt>.
</p>

<pre>
/** @return The current subtree, modified to contain
   the new item */
private BSTNode<Key,E> inserthelp(BSTNode<Key,E> rt,
                                  Key k, E e) {
  if (rt == null) return new BSTNode<Key,E>(k, e);
  if (rt.key().compareTo(k) > 0)
    rt.setLeft(inserthelp(rt.left(), k, e));
  else
    rt.setRight(inserthelp(rt.right(), k, e));
  return rt;
}
</pre>

<p>
You should pay careful attention to the implementation for
<tt>inserthelp</tt>.
Note that <tt>inserthelp</tt> returns a pointer to a
<tt>BSTNode</tt>.
What is being returned is a subtree identical to the old subtree,
except that it has been modified to contain the new record being
inserted.
Each node along a path from the root to the parent of the new node
added to the tree will have its appropriate child pointer assigned to
it.
Except for the last node in the path, none of these nodes will
actually change their child's pointer value.
In that sense, many of the assignments seem redundant.
However, the cost of these additional assignments is worth paying to
keep the insertion process simple.
The alternative is to check if a given assignment is necessary, which
is probably more expensive than the assignment!
</p>

<p>
The shape of a BST depends on the order in which elements are inserted.
A new element is added to the BST as a new leaf node,
potentially increasing the depth of the tree.
Figure <ODSAref "BSTShape" /> illustrates two BSTs for a collection of
values.
It is possible for the BST containing <i>n</i> nodes to be a chain of
nodes with height <i>n</i>.
This would happen if, for example, all elements were inserted in
sorted order.
In general, it is preferable for a BST to be as shallow as
possible.
This keeps the average cost of a BST operation low.
</p>

<p>
Removing a node from a BST is a bit trickier than inserting a node,
but it is not complicated if all of the possible cases are considered
individually.
Before tackling the general node removal process, let us first discuss
how to remove from a given subtree the node with the smallest key
value.
This routine will be used later by the general node removal function.
To~remove the node with the minimum key value from a subtree,
first find that node by continuously moving down the left link until
there is no further left link to follow.
Call this node <i>S</i>.
To~remove <i>S</i>, simply have the parent of <i>S</i> change its
pointer to point to the right child of <i>S</i>.
We know that <i>S</i> has no left child (because if <i>S</i> did have
a left child, <i>S</i> would not be the node with minimum key value).
Thus, changing the pointer as described will maintain a BST, with
<i>S</i> removed.
The code for this method, named <tt>deletemin</tt>, is as follows:
</p>

<pre>
private BSTNode<Key,E> deletemin(BSTNode<Key,E> rt) {
  if (rt.left() == null) return rt.right();
  rt.setLeft(deletemin(rt.left()));
  return rt;
}
</pre>

<p class="example">
Figure <ODSAref "DelMin" /> illustrates the <tt>deletemin</tt>
process.
Beginning at the root node with value 10,
<tt>deletemin</tt> follows the left link until there is no further
left link, in this case reaching the node with value 5.
The node with value10 is changed to point to the right child of the
node containing the minimum value.
This is indicated in Figure <ODSAref "DelMin" /> by a dashed line.
</p>

<center>
<img src="Images/DelMin.png" alt="Deleting the node with minimum value" />
</center>

<p class="DelMin">
An example of deleting the node with minimum value.
In this tree, the node with minimum value, 5, is the left child of the
root.
Thus, the root's <tt>left</tt> pointer is changed to point to 5's right
child.
</p>

<p>
A pointer to the node containing the minimum-valued element is stored
in parameter <tt>S</tt>.
The return value of the <tt>deletemin</tt> method is the subtree of
the current node with the minimum-valued node in the subtree removed.
As with method <tt>inserthelp</tt>, each node on the path back to the
root has its left child pointer reassigned to the subtree resulting
from its call to the <tt>deletemin</tt> method.
</p>

<p>
A useful companion method is <tt>getmin</tt> which returns a
pointer to the node containing the minimum value in the subtree.
</p>

<pre>
private BSTNode<Key,E> getmin(BSTNode<Key,E> rt) {
  if (rt.left() == null) return rt;
  return getmin(rt.left());
}
</pre>

<p>
Removing a node with given key value <i>R</i> from the BST requires
that we first find <i>R</i> and then remove it from the tree.
So, the first part of the remove operation is a search to find
<i>R</i>.
Once <i>R</i> is found, there are several possibilities.
If <i>R</i> has no children, then <i>R</i>'s parent has its pointer
set to NULL.
If <i>R</i> has one child, then <i>R</i>'s parent has
its pointer set to <i>R</i>'s child (similar to <tt>deletemin</tt>).
The problem comes if <i>R</i> has two children.
One simple approach, though expensive, is to set <i>R</i>'s parent to
point to one of <i>R</i>'s subtrees, and then reinsert the remaining
subtree's nodes one at a time.
A better alternative is to find a value in one of the
subtrees that can replace the value in <i>R</i>.
</p>

<p>
Thus, the question becomes:
Which value can substitute for the one being removed?
It cannot be any arbitrary value, because we must preserve the BST
property without making major changes to the structure of the tree.
Which value is most like the one being removed?
The answer is the least key value greater than (or equal to) the one
being removed, or else the greatest key value less than the one being
removed.
If either of these values replace the one being removed,
then the BST property is maintained.
</p>

<p class="example">
Assume that we wish to remove the value 37 from the BST
of Figure <ODSAref "BSTShape" />(a).
Instead of removing the root node, we remove the node with the least
value in the right subtree (using the <tt>deletemin</tt>
operation).
This value can then replace the value in the root.
In this example we first remove the node with value 40,
because it contains the least value in the right subtree.
We then substitute 40 as the new value for the root node.
Figure <ODSAref "Remove" /> illustrates this process.
</p>

<center>
<img src="Images/Remove.png" alt="Removing a node from the BST" />
</center>

<p class="caption">
An example of removing the value 37 from the BST.
The node containing this value has two children.
We replace value 37 with the least value from the
node's right subtree, in this case 40.
</p>

<p>
When duplicate node values do not appear in the tree, it makes no
difference whether the replacement is the greatest value from the
left subtree or the least value from the right subtree.
If duplicates are stored, then we must select
the replacement from the <em>right</em> subtree.
To see why, call the greatest value in the left subtree <i>G</i>.
If multiple nodes in the left subtree have value <i>G</i>,
selecting <i>G</i> as the replacement value for the root of the
subtree will result in a tree with equal values to the left of the
node now containing <i>G</i>.
Precisely this situation occurs if we replace value 120 with the
greatest value in the left subtree of Figure
<ODSAref "BSTShape" />(b).
Selecting the least value from the right subtree does not
have a similar problem, because it does not violate the Binary Search
Tree Property if equal values appear in the right subtree.
</p>

<p>
From the above, we see that if we want to remove the record stored in
a node with two children, then we simply call <tt>deletemin</tt> on
the node's right subtree and substitute the record returned for the
record being removed.
Here is an implementation for <tt>removehelp</tt>. 
</p>

<pre>
/** Remove a node with key value k
    @return The tree with the node removed */
private BSTNode<Key,E> removehelp(BSTNode<Key,E> rt,Key k) {
  if (rt == null) return null;
  if (rt.key().compareTo(k) > 0)
    rt.setLeft(removehelp(rt.left(), k));
  else if (rt.key().compareTo(k) < 0)
    rt.setRight(removehelp(rt.right(), k));
  else { // Found it
    if (rt.left() == null) return rt.right();
    else if (rt.right() == null) return rt.left();
    else { // Two children
      BSTNode<Key,E> temp = getmin(rt.right());
      rt.setElement(temp.element());
      rt.setKey(temp.key());
      rt.setRight(deletemin(rt.right()));
    }
  }
  return rt;
}
</pre>

<p>
The cost for <tt>findhelp</tt> and <tt>inserthelp</tt> is the depth of
the node found or inserted.
The cost for <tt>removehelp</tt> is the depth of the node being
removed, or in the case when this node has two children,
the depth of the node with smallest value in its right subtree. 
Thus, in the worst case, the cost for any one of these operations is
the depth of the deepest node in the tree.
This is why it is desirable to keep BSTs <ODSAdef "balanced" />,
that is, with least possible height.
If a binary tree is balanced, then the height for a tree of <i>n</i>
nodes is approximately log <i>n</i>.
However, if the tree is completely unbalanced, for example in the
shape of a linked list, then the height for a tree with <i>n</i> nodes
can be as great as <i>n</i>.
Thus, a balanced BST will in the average case have operations costing
&Theta;(log <i>n</i>), while a badly unbalanced BST can have
operations in the worst case costing &Theta;(<i>n</i>).
Consider the situation where we construct a BST of <i>n</i> nodes
by inserting records one at a time.
If we are fortunate to have them arrive in an order that results in a
balanced tree (a ``random'' order is likely to be good
enough for this purpose), then each insertion will cost on average
&Theta;(log <i>n</i>), for a total cost of
&Theta;(<i>n</i> log <i>n</i>).
However, if the records are inserted in order of increasing value,
then the resulting tree will be a chain of height <i>n</i>.
The cost of insertion in this case will be
<img src="http://www.forkosh.com/mathtex.cgi?
\sum_{i=1}^{n} i = \Theta(n^2)"
   alt="" border=0 align="middle">.
</p>

<p>
Traversing a BST costs &Theta;(<i>n</i>) regardless of the shape of
the tree.
Each node is visited exactly once, and each child pointer
is followed exactly once.
</p>

<p>
Below is an example traversal, named <tt>printhelp</tt>.
It performs an inorder traversal on the BST to print the node values
in ascending order.
</p>

<pre>
private void printhelp(BSTNode<Key,E> rt) {
  if (rt == null) return;
  printhelp(rt.left());
  printVisit(rt.element());
  printhelp(rt.right());
}
</pre>

<p>
While the BST is simple to implement and efficient when the tree is
balanced, the possibility of its being unbalanced is a serious
liability.
There are techniques for organizing a BST to guarantee good performance.
Two examples are the AVL tree and the splay tree.
Other search trees are guaranteed to remain
balanced, such as the 2-3 Tree.
</p>
