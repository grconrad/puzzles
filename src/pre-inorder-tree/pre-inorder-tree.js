/**
Given pre-order and in-order traversals of a binary tree, write a function to reconstruct the tree.

For example, given the following preorder traversal:

[a, b, d, e, c, f, g]

And the following inorder traversal:

[d, b, e, a, f, c, g]

You should return the following tree:

    a
   / \
  b   c
 / \ / \
d  e f  g
*/

// Observation: First in preorder is always root of tree, and last in both orders is "rightmost".
// Thought: Build up tree one node at a time, in "preorder" order, finding same node in "inorder" ordering.
// Contract of each node: value is at 'val', left child is at 'lt', right child is at 'rt' property.

/*
 * buildTreeFromPreAndIn
 *
 * @param {Array} preorder
 *   [a, pre(a.left), pre(a.right)] e.g. ['a', 'b', 'd', 'e', 'c', 'f', 'g']
 * @param {Array} inorder
 *   [in(a.left), a, in(a.right)]   e.g. ['d', 'b', 'e', 'a', 'f', 'c', 'g']
 */
function buildTreeFromPreAndIn(preorder, inorder) {
  let root = null;
  if (preorder.length > 0) {
    const val = preorder[0];
    root = {
      val: val
    };
    // Find it in inorder.
    let pos = inorder.indexOf(val);
    // Should always find it!
    if (pos === -1) {
      throw "Did not find it, must be a bug";
    }
    const ltInorder = inorder.slice(0, pos);
    const rtInorder = inorder.slice(pos + 1);
    const ltPreorder = preorder.slice(1, 1 + pos);
    const rtPreorder = preorder.slice(1 + pos);
    const lt = buildTreeFromPreAndIn(ltPreorder, ltInorder);
    if (lt) {
      root.lt = lt;
    }
    const rt = buildTreeFromPreAndIn(rtPreorder, rtInorder);
    if (rt) {
      root.rt = rt;
    }
  }
  return root;
}

/*
 * buildTreeFromPostAndIn
 *
 * @param {Array} postorder
 *   [post(root.left), post(root.right), root.val]
 * @param {Array} inorder
 *   [in(root.left), root.val, in(root.right)]
 */
function buildTreeFromPostAndIn(postorder, inorder) {
  let root = null;
  if (postorder.length > 0) {
    const val = postorder[postorder.length - 1];
    root = {
      val: val
    };
    // Find it in inorder.
    let pos = inorder.indexOf(val);
    // Should always find it!
    if (pos === -1) {
      throw "Did not find it, must be a bug";
    }
    const ltInorder = inorder.slice(0, pos);
    const rtInorder = inorder.slice(pos + 1);
    const ltPostorder = postorder.slice(0, pos);
    const rtPostorder = postorder.slice(pos, postorder.length - 1);
    const lt = buildTreeFromPostAndIn(ltPostorder, ltInorder);
    if (lt) {
      root.lt = lt;
    }
    const rt = buildTreeFromPostAndIn(rtPostorder, rtInorder);
    if (rt) {
      root.rt = rt;
    }
  }
  return root;
}

module.exports = {
  buildTreeFromPreAndIn,
  buildTreeFromPostAndIn
};
