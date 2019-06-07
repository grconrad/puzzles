const findCoverage = require("./intervals-coverage");

test("Basic functionality", () => {
  expect(findCoverage([])).toBe(0);

  expect(findCoverage([[5, 7]])).toBe(2);

  // Two intervals with same start point, out of order
  expect(findCoverage([[1, 6], [1, 4]])).toBe(5);

  // Two intervals overlapping
  expect(
    findCoverage([
      [1, 4], // 3 so far
      [3, 6] // 5 so far
    ])
  ).toBe(5);

  // Two intervals adjacent
  expect(
    findCoverage([
      [1, 4], // 3 so far
      [4, 6] // 5 so far
    ])
  ).toBe(5);

  expect(
    findCoverage([
      [1, 4], // 3 so far
      [4, 6], // 5 so far
      [9, 11], // 7 so far
      [9, 14], // 10 so far
      [19, 22] // 13 so far
    ])
  ).toBe(13);
});
