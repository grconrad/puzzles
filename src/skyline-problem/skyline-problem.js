/*
See https://leetcode.com/problems/the-skyline-problem/
*/

const {MaxHeap} = require("../heap/heap");

/**
 * @param {Number[][3]} buildings
 *   Each element is [left, right, height]
 * @returns {Number[][2]}
 */
function findSkyline(buildings) {
  const skylinePts = [];

  // Get a sorted list of all the important points (top-left and top-right of every building).
  const importantPts = getImportantPoints(buildings);

  // Track heights of all buildings "in progress". That is, buildings for which we've seen the
  // start point (top left) but not the end point (top right). We'll be checking the max height
  // frequently and inserting to this data structure frequently, so a max heap is a great choice for
  // making those operations fast.
  const heightsInProgress = new MaxHeap();
  heightsInProgress.insert(0);

  // Now "scan" left to right through important points.
  // At each one we'll make a decision about whether we can add anything to the skyline.
  importantPts.forEach(importantPt => {
    const [x, y, isStart] = importantPt;
    const priorMaxInProgress = heightsInProgress.peek();
    if (isStart) {
      // Start point!
      // Save its height.
      console.log(`start pt (${x},${y}): inserting height ${y}`); // eslint-disable-line no-console
      heightsInProgress.insert(y);
      // Did max height change?
      const maxInProgress = heightsInProgress.peek();
      if (maxInProgress !== priorMaxInProgress) {
        // Max height changed. This building's height must be taller than the prior max height.
        // Include its top left point in the skyline.
        console.log(`... adding (${x},${y}) to skyline`); // eslint-disable-line no-console
        skylinePts.push([x, y]);
      } else {
        // No action needed. This start point shouldn't be part of the skyline.
      }
    } else {
      // End point!
      // Remove its height.
      console.log(`end pt (${x},${y}): removing height ${y}`); // eslint-disable-line no-console
      heightsInProgress.remove(y);
      // Did max height change?
      const maxInProgress = heightsInProgress.peek();
      if (maxInProgress !== priorMaxInProgress) {
        console.log(`... adding (${x},${maxInProgress}) to skyline`); // eslint-disable-line no-console
        skylinePts.push([x, maxInProgress]);
      }
    }
  });

  return skylinePts;
}

/**
 * @param {Number[][3]} buildings
 *   Each element is [left, right, height]
 * @returns {Number[][3]}
 *   Each element is [x, y, isStart]
 */
function getImportantPoints(buildings) {
  const points = [];
  buildings.forEach(b => {
    const [left, right, height] = b;
    points.push(
      [left,  height, true ], // isStart = true
      [right, height, false]  // isStart = false
    );
  });
  // Sort points.
  points.sort((p1, p2) => {
    const [x1, y1, isStart1] = p1;
    const [x2, y2, isStart2] = p2;
    // Earlier x comes first.
    if (x1 !== x2) {
      return x1 - x2;
    }
    // x is the same.
    // Sort based on type. Start points should come before end points.
    if (isStart1 !== isStart2) {
      // One is a start point, one is an end point.
      // End point should come first.
      return (isStart1 ? -1 : 1);
    }
    // x is the same, and both are start points or both are end points.
    if (isStart1) {
      // Both are start points.
      // Take higher y-value / height first.
      return y2 - y1;
    } else {
      // Both are end points.
      // Take lower y-value / height first.
      return y1 - y2;
    }
  });
  console.log(`Important points: ${points}`); // eslint-disable-line no-console
  return points;
}

module.exports = findSkyline;
