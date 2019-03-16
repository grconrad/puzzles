const Stack = require("../stack/stack");

/**
 * Bad O(N^2) solution, but easy to implement: look at all pairs (i, j)
 *
 * @param {Number[]} hist
 *   Heights in histogram, by index
 * @returns {Number}
 *   Maximum area of any rectangle in the histogram
 */
function maxHistRectNaive(hist) {
  let maxArea = 0;
  for (let i = 0; i < hist.length; i++) {
    let lowestHeightIJ = Infinity; // smallest height from i to j
    for (let j = i; j < hist.length; j++) {
      lowestHeightIJ = Math.min(lowestHeightIJ, hist[j]);
      let areaIJ = (j - i + 1) * lowestHeightIJ;
      maxArea = Math.max(maxArea, areaIJ);
    }
  }
  return maxArea;
}

/**
 * My attempt to make the online solution make more sense to me
 *
 * @param {Number[]} hist
 *   Heights in histogram, by index
 * @returns {Number}
 *   Maximum area of any rectangle in the histogram
 */
function maxHistRect(hist) {
  log(`Histogram ${hist}`);
  let stack = new Stack();
  let len = hist.length;
  let max = 0;

  hist.forEach((height, i) => {
    // Looking at a new height.
    if (stack.isEmpty() || height >= hist[stack.peek()]) {
      // Stepping sideways or up.
      log(`Stepping sidways/up at index ${i}, height ${height}, pushing ${i} onto stack`);
      stack.push(i);
      log(`... now stack=${stack}`);
    } else {
      // Stepping down.
      log(`Stepping down at index ${i}, height ${height}`);
      // Peek and pop off the stack all the higher heights.
      // Find area and update max as we go.
      while (!stack.isEmpty() && hist[stack.peek()] > height) {
        const peakIdx = stack.pop();
        log(`... Popped ${peakIdx} from stack`);
        const rectHeight = hist[peakIdx];
        const rectArea = /* width */ (i - peakIdx) * rectHeight;
        if (rectArea > max) {
          log(`... Found larger rectangle, bounds [${peakIdx}, ${i-1}], height ${rectHeight}, area ${rectArea}`);
          max = rectArea;
        }
        log(`... now stack=${stack}`);
      }
      log(`... now stack=${stack}`);
      stack.push(i);
    }
  });
  log(`After first pass, stack=${stack} and max=${max}`);
  // Now what's in the stack should be a non-decreasing sequence.
  // We can just look at those and compute areas and update the max the same way.
  while (!stack.isEmpty()) {
    const peakIdx = stack.pop();
    log(`Popped ${peakIdx} from stack`);
    const rectHeight = hist[peakIdx];
    const rectWidth = stack.isEmpty() ? len : (len - peakIdx);
    const rectArea = rectWidth * rectHeight;
    if (rectArea > max) {
      log(`... Found larger rectangle, bounds [${peakIdx}, ${len-1}], height ${rectHeight}, area ${rectArea}`);
      max = rectArea;
    }
    log(`... now stack=${stack}`);
  }
  return max;
}

function log(s) {
  console.log(s); // eslint-disable-line
}

module.exports = {
  maxHistRectNaive,
  maxHistRect
};
