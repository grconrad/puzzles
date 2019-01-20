const {
  buildTreeFromPreAndIn,
  buildTreeFromPostAndIn
} = require("./pre-inorder-tree");

const d = {
    val: "d"
  },
  e = {
    val: "e"
  },
  f = {
    val: "f"
  },
  g = {
    val: "g"
  },
  b = {
    val: "b",
    lt: d,
    rt: e
  },
  c = {
    val: "c",
    lt: f,
    rt: g
  },
  a = { // eslint-disable-line no-unused-vars
    val: "a",
    lt: b,
    rt: c
  };

const preorder = ["a", "b", "d", "e", "c", "f", "g"]; // [a, pre(a.left), pre(a.right)]
const inorder = ["d", "b", "e", "a", "f", "c", "g"]; // [in(a.left), a, in(a.right)]
const postorder = ["d", "e", "b", "f", "g", "c", "a"]; // [post(a.left), post(a.right), a]

const SERIALIZED_TREE =
`{
  "val": "a",
  "lt": {
    "val": "b",
    "lt": {
      "val": "d"
    },
    "rt": {
      "val": "e"
    }
  },
  "rt": {
    "val": "c",
    "lt": {
      "val": "f"
    },
    "rt": {
      "val": "g"
    }
  }
}`;

test("Basic functionality", () => {

  const preInTree = buildTreeFromPreAndIn(preorder, inorder);
  expect(JSON.stringify(preInTree, null, 2)).toBe(SERIALIZED_TREE);

  const postInTree = buildTreeFromPostAndIn(postorder, inorder);
  expect(JSON.stringify(postInTree, null, 2)).toBe(SERIALIZED_TREE);

});