// Logic to be tested
const { maxContiguousSum } = require("./max-contiguous-sum");

test("Basic functionality", () => {
  expect(maxContiguousSum([0, -2, 3, 1, 1, 1, -1, -1, 3, -6, 0])).toEqual({
    indices: [2, 8],
    sum: 7,
  });

  expect(maxContiguousSum([0, -2, 3, 1, 1, 1, -1, -1, -3, -6, 0])).toEqual({
    indices: [2, 5],
    sum: 6,
  });

  expect(maxContiguousSum([-1, 2, 3, 3, -10, 5, -1, -7, 9])).toEqual({
    indices: [8, 8],
    sum: 9,
  });

  // No positives, so just pick the largest negative (empty subset is not allowed)
  expect(maxContiguousSum([-1, -2, -3, -10, -5, -1, -7, -9])).toEqual({
    indices: [0, 0],
    sum: -1,
  });
});
