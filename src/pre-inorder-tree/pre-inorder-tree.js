/**
Given pre-order and in-order traversals of a binary tree, write a function to reconstruct the tree.
You're given the traversals as raw data values in an array. Assume all values are unique.

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

/**
 * @param {Array} preorder
 *   [root.val, pre(root.left), pre(root.right)] e.g. ['a', 'b', 'd', 'e', 'c', 'f', 'g']
 * @param {Array} inorder
 *   [in(root.left), root.val, in(root.right)]   e.g. ['d', 'b', 'e', 'a', 'f', 'c', 'g']
 */
function buildTreeFromPreAndIn(preorder, inorder) {
  return _buildTreeFromPreAndInHelper(preorder, 0, preorder.length, inorder, 0, inorder.length);
}

/**
 * This is just an optimization. Instead of using slice() to delineate sub-arrays before passing
 * them to recursive calls, we pass the indexes of the subarrays.
 *
 * @param {Array} preorder
 *   [root.val, pre(root.left), pre(root.right)] e.g. ['a', 'b', 'd', 'e', 'c', 'f', 'g']
 * @param {Number} preorderStart
 *   Starting index in "preorder" of preorder traversal
 * @param {Number} preorderEnd
 *   One past where the preorder traversal ends in "preorder"
 * @param {Array} inorder
 *   [in(root.left), root.val, in(root.right)]   e.g. ['d', 'b', 'e', 'a', 'f', 'c', 'g']
 * @param {Number} inorderStart
 *   Starting index in "inorder" of inorder traversal
 * @param {Number} inorderEnd
 *   One past where the inorder traversal ends in "inorder"
 * @returns {Object}
 *   Root (object with 'val', and possibly 'lt' and 'rt' for left and right children), or null
 */
function _buildTreeFromPreAndInHelper(preorder, preorderStart, preorderEnd, inorder, inorderStart, inorderEnd) {
  let root = null;

  if (preorderEnd > preorderStart) {

    const val = preorder[preorderStart];

    root = {
      val: val
    };

    // Find it in inorder.
    let leftSubLen = -1;
    for (let i = inorderStart; i < inorderEnd; i++) {
      if (inorder[i] === val) {
        leftSubLen = i - inorderStart;
        break;
      }
    }
    if (leftSubLen === -1) {
      throw "Did not find it, must be a bug";
    }

    // Now leftSubLen equals the number of items in the left subtree.

    // Recurse to build left subtree.
    const lt = _buildTreeFromPreAndInHelper(
      preorder,
      preorderStart + 1,              // left subtree's preorder starts here...
      preorderStart + 1 + leftSubLen, // and ends just before here
      inorder,
      inorderStart,                   // left subtree's inorder starts here...
      inorderStart + leftSubLen       // and ends just before here
    );
    if (lt) {
      root.lt = lt;
    }

    // Recurse to build right subtree.
    const rt = _buildTreeFromPreAndInHelper(
      preorder,
      preorderStart + 1 + leftSubLen, // right subtree's preorder starts here...
      preorderEnd,                    // and ends just before here
      inorder,
      inorderStart + leftSubLen + 1,  // right subtree's inorder starts here
      inorderEnd                      // and ends just before here
    );
    if (rt) {
      root.rt = rt;
    }

  }

  return root;
}

function buildTreeFromPostAndIn(postorder, inorder) {
  return _buildTreeFromPostAndInHelper(postorder, 0, postorder.length, inorder, 0, inorder.length);
}

/**
 * @param {Array} postorder
 *   [post(root.left), post(root.right), root.val] e.g. ['d', 'e', 'b', 'f', 'g', 'c', 'a']
 * @param {Number} postorderStart
 *   Starting index in "postorder" of postorder traversal
 * @param {Number} postorderEnd
 *   One past where the postorder traversal ends in "postorder"
 * @param {Array} inorder
 *   [in(root.left), root.val, in(root.right)]     e.g. ['d', 'b', 'e', 'a', 'f', 'c', 'g']
 * @param {Number} inorderStart
 *   Starting index in "inorder" of inorder traversal
 * @param {Number} inorderEnd
 *   One past where the inorder traversal ends in "inorder"
 * @returns {Object}
 *   Root (object with 'val', and possibly 'lt' and 'rt' for left and right children), or null
 */
function _buildTreeFromPostAndInHelper(postorder, postorderStart, postorderEnd, inorder, inorderStart, inorderEnd) {
  let root = null;

  if (postorderEnd > postorderStart) {

    const val = postorder[postorderEnd - 1];

    root = {
      val: val
    };

    // Find it in inorder.
    let leftSubLen = inorder.indexOf(val);
    for (let i = inorderStart; i < inorderEnd; i++) {
      if (inorder[i] === val) {
        leftSubLen = i - inorderStart;
        break;
      }
    }
    if (leftSubLen === -1) {
      throw "Did not find it, must be a bug";
    }

    // Recurse to build left subtree.
    const lt = _buildTreeFromPostAndInHelper(
      postorder,
      postorderStart,              // left subtree's postorder starts here...
      postorderStart + leftSubLen, // and ends just before here
      inorder,
      inorderStart,                // left subtree's inorder starts here...
      inorderStart + leftSubLen    // and ends just before here
    );
    if (lt) {
      root.lt = lt;
    }

    // Recurse to build right subtree.
    const rt = _buildTreeFromPostAndInHelper(
      postorder,
      postorderStart + leftSubLen,   // right subtree's postorder starts here...
      postorderEnd - 1,              // and ends just before here
      inorder,
      inorderStart + leftSubLen + 1, // right subtree's inorder starts here...
      inorderEnd                     // and ends just before here
    );
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
