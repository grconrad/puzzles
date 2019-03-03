// Example: Input array = [1, [2, 3], [[[4]]], [[5, 6, 7]], 8, [9]]
// Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
function flattenArray(arr) {
  const result = [];
  const more = arr.slice();
  while (more.length > 0) {
    const item = more.shift(); // remove and return first
    if (Array.isArray(item)) {
      more.unshift(...item); // flatten and unqueue its items at front of queue
    } else {
      result.push(item); // append it to result
    }
  }
  return result;
}

module.exports = flattenArray;
