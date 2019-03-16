// Logic to be tested
const {maxHistRectNaive, maxHistRect} = require("./max-histogram-rectangle");

// Test data
const TEST_DATA = [
  {
    hist: [2, 4, 6, 5, 8, 3, 2],
    maxArea: 16
  },
  {
    hist: [2, 4, 6, 5, 8, 3, 2, 2, 2],
    maxArea: 18
  },
  {
    hist: [2, 2, 2],
    maxArea: 6
  },
  {
    hist: [7, 8, 9],
    maxArea: 21
  },
  {
    hist: [3, 1],
    maxArea: 3
  },
  {
    hist: [5, 4],
    maxArea: 8
  },
  {
    hist: [7],
    maxArea: 7
  },
  {
    hist: [7, 2, 4],
    maxArea: 7
  },
  {
    hist: [7, 2, 8],
    maxArea: 8
  },
  {
    hist: [9, 8, 7],
    maxArea: 21
  },
];

test("Basic functionality", () => {

  TEST_DATA.forEach(({hist, maxArea}) => {
    expect(maxHistRectNaive(hist)).toEqual(maxArea);
    expect(maxHistRect(hist)).toEqual(maxArea);
  });

});
