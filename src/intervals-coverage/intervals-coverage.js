/**
 * Given a list of intervals on a one-dimensional line (each with start and end point), which may be
 * overlapping, return the total amount of coverage.
 *
 * For example, if intervals [1, 3] and [9, 15] are given, the intervals don't overlap so we can add
 * their widths to get total coverage, i.e. (3 - 1) + (15 - 9) = 2 + 6 = 8. But if if intervals
 * [1, 3] and [2, 4] are given, the area would be 3 because these intervals overlap to effectively
 * cover [1, 4].
 *
 * @param {Number[][]} intervals
 *   List of intervals, as [start, end] pairs
 * @returns {Number}
 *   Total length of coverage
 */
function findCoverage(intervals) {
  // Assume we start with a list like this:
  // [2, 6]
  // [1, 4]
  // [5, 10]
  // [14, 17]
  // [5, 8]

  // Step 1: Sort intervals based on start point. This is O(N log N).
  intervals.sort((int1, int2) => {
    return int1[0] - int2[0] || int1[1] - int2[1];
  });

  // Now we've got a list like this:
  // [1, 4]
  // [2, 6]
  // [5, 8]
  // [5, 10]
  // [14, 17]

  // Step 2: Scan left to right in sorted list.
  // At every moment we either extend the last interval, or add its width to our tally and move on.
  let totalCoverage = 0;
  if (intervals.length > 0) {
    // The first interval will become our working interval
    let [lastStart, lastEnd] = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
      const [start, end] = intervals[i];
      if (start <= lastEnd) {
        // Extend the working interval
        lastEnd = end;
      } else {
        // Previous interval is done so add its width to our tally
        totalCoverage += lastEnd - lastStart;
        lastStart = start;
        lastEnd = end;
      }
    }
    totalCoverage += lastEnd - lastStart;
  }
  return totalCoverage;
}

module.exports = findCoverage;
