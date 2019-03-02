const next = require("./next");

test("Basic functionality", () => {
  expect(next()).toBe(undefined);
  expect(1).toBe(1);
});
