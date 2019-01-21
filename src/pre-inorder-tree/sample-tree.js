/*
Implement nodes linked together with "lt" and "rt" pointers, for the following tree:

     a
    / \
  b     c
 / \   / \
d   e f   g

And export several traversals of this tree.
*/

const
  d = {
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
  a = {
    val: "a",
    lt: b,
    rt: c
  },
  tree = a;

module.exports = {
  tree:      tree,
  preorder:  ["a", "b", "d", "e", "c", "f", "g"],
  inorder:   ["d", "b", "e", "a", "f", "c", "g"],
  postorder: ["d", "e", "b", "f", "g", "c", "a"]
};
