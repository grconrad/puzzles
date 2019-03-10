// Logic to be tested
const findSkyline = require("./skyline-problem");

// Test data
const TEST1_BUILDINGS = [
  [2, 9, 10],
  [3, 7, 15],
  [5, 12, 12],
  [15, 20, 10],
  [19, 24, 8]
];
const TEST1_SKYLINE = [
  [2, 10],
  [3, 15],
  [7, 12],
  [12, 0],
  [15, 10],
  [20, 8],
  [24, 0]
];

test("Basic functionality", () => {

  expect(JSON.stringify(findSkyline(TEST1_BUILDINGS))).toEqual(JSON.stringify(TEST1_SKYLINE));

});
