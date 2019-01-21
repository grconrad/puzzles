// Logic to be tested
const {buildTreeFromPreAndIn, buildTreeFromPostAndIn} = require("./pre-inorder-tree");

const {generatePreorder, generateInorder, generatePostorder} = require("./traversals");

// Test data
const {tree} = require("./sample-tree");

/**
 * Standardize serialization logic so we can use string comparison to compare the original tree vs.
 * the one recreated from the traversals.
 *
 * @param {Object} node
 * @returns {String}
 */
function serializeTree(node) {
  return JSON.stringify(node, null, 2);
}

const serialization = serializeTree(tree);

const preorder = generatePreorder(tree),
  inorder = generateInorder(tree),
  postorder = generatePostorder(tree);

test("From pre- and in-order", () => {
  const preInTree = buildTreeFromPreAndIn(preorder, inorder);
  expect(serializeTree(preInTree)).toBe(serialization);
});

test("From post- and in-order", () => {
  const postInTree = buildTreeFromPostAndIn(postorder, inorder);
  expect(serializeTree(postInTree)).toBe(serialization);
});
