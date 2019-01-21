function generatePreorder(node, arr = []) {
  if (node) {
    arr.push(node.val);
    generatePreorder(node.lt, arr);
    generatePreorder(node.rt, arr);
  }
  return arr;
}

function generateInorder(node, arr = []) {
  if (node) {
    generateInorder(node.lt, arr);
    arr.push(node.val);
    generateInorder(node.rt, arr);
  }
  return arr;
}

function generatePostorder(node, arr = []) {
  if (node) {
    generatePostorder(node.lt, arr);
    generatePostorder(node.rt, arr);
    arr.push(node.val);
  }
  return arr;
}

module.exports = {
  generatePreorder,
  generateInorder,
  generatePostorder
};
