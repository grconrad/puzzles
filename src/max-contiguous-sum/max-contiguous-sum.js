/**
 * @param {number[]} arr Array of integers
 * @returns {object} obj
 * @returns {number[]} obj.indices Start and end positions of max contiguous sum
 * @returns {number} obj.sum Max contiguous sum
 */
function maxContiguousSum(arr) {
  let bestSoFar = {
    indices: [0, 0],
    sum: arr[0],
  };
  let runningStart = 0,
    runningSum = arr[0];
  for (let i = 1; i < arr.length; i++) {
    // First, make a choice:
    // 1a. Extend the running range (which might later yield something better than our bestSoFar)
    // OR
    // 1b. Start a new running range because that's better than extending the existing one
    if (runningSum > 0) {
      // Extending the running range is better than starting a new one
      runningSum += arr[i];
    } else {
      // Start a new range
      runningStart = i;
      runningSum = arr[i];
    }
    // Then, if in-progress range is the best we've seen, update state
    if (runningSum > bestSoFar.sum) {
      bestSoFar = {
        indices: [runningStart, i],
        sum: runningSum,
      };
    }
  }
  return bestSoFar;
}

module.exports = { maxContiguousSum };
