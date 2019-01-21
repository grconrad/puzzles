/**
Given a array of numbers representing the stock prices of a company in chronological order, write a
function that calculates the maximum profit you could have made from buying and selling that stock
once. You must buy before you can sell it.

For example, given [9, 11, 8, 5, 7, 10], you should return 5, since you could buy the stock at 5
dollars and sell it at 10 dollars.
*/

// Note, it's unclear from problem statement what we should return if no gain is possible (stock
// keeps losing value). I'm choosing to return the largest spread possible, which may be a loss. It
// would be trivial to return 0 if no gain is possible, that's just an extra line of code.

/**
 * @param {Array} series
 *   Stock values over time (sequence of numbers)
 * @returns {Number}
 *   Returns maximum spread (largest gain, or smallest loss) possible by buying the stock at some
 *   time and selling at a later time; may be negative if stock is in decline
 */
function computeMaxGainForStockSeries(series) {
  let result = -Infinity; // sentinel value, means no gain is possible
  if (series.length > 1) {
    let minSoFar = Infinity;
    series.forEach((value) => {
      const spread = value - minSoFar;
      if (spread > result) {
        result = spread;
      }
      if (value < minSoFar) {
        minSoFar = value;
      }
    });
  }
  return result;
}

module.exports = computeMaxGainForStockSeries;
