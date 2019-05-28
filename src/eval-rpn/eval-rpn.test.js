const evalRpnExpr = require("./eval-rpn");

test("Basic functionality", () => {
  // Simple value
  expect(evalRpnExpr([3])).toBe(3);

  // One operation
  expect(evalRpnExpr([5, 3, "+"])).toBe(5 + 3);

  // Multiple operations
  expect(
    evalRpnExpr([15, 7, 1, 1, "+", "-", "/", 3, "*", 2, 1, 1, "+", "+", "-"])
  ).toBe(5);
});
