const findMinBalanced = require("./min-balance-parens");

describe("Degenerate cases", () => {
  test("Empty string", () => {
    expect(findMinBalanced("")).toBe("");
  });
});

describe("Already balanced", () => {
  test("No changes needed", () => {
    ["()", "()()", "(())"].forEach(s => {
      expect(findMinBalanced(s)).toBe(s);
    });
  });
});

describe("Normal cases", () => {
  test("Needing single left paren", () => {
    expect(["()"]).toContain(findMinBalanced(")"));
  });

  test("Needing single left paren", () => {
    expect(["()"]).toContain(findMinBalanced("("));
  });

  test("Needing left parens", () => {
    expect(["(())", "()()"]).toContain(findMinBalanced("))"));
  });

  test("Needing right parens", () => {
    expect(["()()", "(())"]).toContain(findMinBalanced("(("));
    expect(["()()", "(())"]).toContain(findMinBalanced("(()"));
  });

  test("Needing both kinds of parens", () => {
    expect(["(())()()", "()()()()"]).toContain(findMinBalanced("))()("));
  });
});
