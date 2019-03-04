// Logic to be tested
const countWaysToMakeChange = require("./make-change");

// Test data
const TEST_DATA = [
  1,  // 0 cents:  Q=0 D=0 N=0 P=0
  1,  // 1 cent:   1 way (P=1)
  1,  // 2 cents:  1 way (P=2)
  1,  // 3 cents:  1 way (P=3)
  1,  // 4 cents:  1 way (P=4)
  2,  // 5 cents:  2 ways (N=1, P=5)
  2,  // 6 cents:  2 ways (N=1 P=1, P=6)
  2,  // 7 cents:  2 ways (N=1 P=2, P=7)
  2,  // 8 cents:  2 ways (N=1 P=3, P=8)
  2,  // 9 cents:  2 ways (N=1 P=4, P=9)
  4,  // 10 cents: 4 ways (D=1, N=2, N=1 P=5, P=10)
  4,  // 11 cents: 4 ways (D=1 P=1, N=2 P=1, N=1 P=6, P=11)
  4,  // 12 cents: 4 ways (D=1 P=2, N=2 P=2, N=1 P=7, P=12)
];

test("Basic functionality", () => {

  TEST_DATA.forEach((ways, numCents) => {
    expect(countWaysToMakeChange(numCents)).toEqual(ways);
  });

  // 29 cents: 13 ways (1Q 4P, 2D 1N 4P, 2D 9P, 1D 3N 4P, 1D 2N 9P, 1D 1N 14P, 1D 19P, 5N 4P, 4N 9P, 3N 14P, 2N 19P, 1N 24P, 29P)
  expect(countWaysToMakeChange(29)).toEqual(13);

});
