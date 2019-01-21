// Logic to be tested
const {generatePreorder, generateInorder, generatePostorder} = require("./traversals");

// Test data
const {tree, preorder, inorder, postorder} = require("./sample-tree");

test("Generating pre-order", () => {
  expect(generatePreorder(tree)).toEqual(preorder);
});

test("Generating in-order", () => {
  expect(generateInorder(tree)).toEqual(inorder);
});

test("Generating post-order", () => {
  expect(generatePostorder(tree)).toEqual(postorder);
});
