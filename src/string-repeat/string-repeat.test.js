const repeat = require("./string-repeat");
const { repeatLinear, repeatLogarithmic } = repeat;

// Use built-in String.prototype.repeat to test our polyfill.
// And use jest spy to test the number of string concatenations done by our polyfill.

let spy;

beforeAll(() => {
  spy = jest.spyOn(repeat, "concat");
});

afterAll(() => {
  spy.mockRestore();
});

describe("Invalid inputs", () => {
  test("Invalid string", () => {
    expect(() => {
      repeatLinear(null, 2);
    }).toThrowError();
  });

  test("Invalid number (negative)", () => {
    expect(() => {
      repeatLinear("abc", -2);
    }).toThrowError();
  });

  test("Invalid number (non-integer)", () => {
    expect(() => {
      repeatLinear("abc", 1.5);
    }).toThrowError();
  });
});

describe("Degenerate cases", () => {
  test("Empty string", () => {
    expect(repeatLinear("", 1e3)).toBe("");
  });

  test("n = 0", () => {
    expect(repeatLinear("abc", 0)).toBe("");
  });
});

describe("Linear algorithm", () => {
  test("Linear algorithm with n = 0", () => {
    expect(repeatLinear("abc", 0)).toBe("abc".repeat(0));
    expect(spy).not.toHaveBeenCalled();
  });

  test("Linear algorithm with n = 1", () => {
    expect(repeatLinear("abc", 1)).toBe("abc".repeat(1));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("Linear algorithm with n = 2", () => {
    expect(repeatLinear("abc", 2)).toBe("abc".repeat(2));
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test("Linear algorithm with n = 7", () => {
    expect(repeatLinear("abc", 7)).toBe("abc".repeat(7));
    expect(spy).toHaveBeenCalledTimes(7);
  });

  test("Linear algorithm with n = 15", () => {
    expect(repeatLinear("abc", 15)).toBe("abc".repeat(15));
    expect(spy).toHaveBeenCalledTimes(15);
  });

  test("Linear algorithm with n = 31", () => {
    expect(repeatLinear("abc", 31)).toBe("abc".repeat(31));
    expect(spy).toHaveBeenCalledTimes(31);
  });

  test("Linear algorithm with n = 32", () => {
    expect(repeatLinear("abc", 32)).toBe("abc".repeat(32));
    expect(spy).toHaveBeenCalledTimes(32);
  });
});

describe("Logarithmic algorithm", () => {
  test("Logarithmic algorithm with n = 0", () => {
    expect(repeatLogarithmic("abc", 0)).toBe("abc".repeat(0));
    expect(spy).not.toHaveBeenCalled();
  });

  test("Logarithmic algorithm with n = 1", () => {
    expect(repeatLogarithmic("abc", 1)).toBe("abc".repeat(1));
    expect(spy).not.toHaveBeenCalled();
  });

  test("Logarithmic algorithm with n = 2", () => {
    expect(repeatLogarithmic("abc", 2)).toBe("abc".repeat(2));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("Logarithmic algorithm with n = 7", () => {
    expect(repeatLogarithmic("abc", 7)).toBe("abc".repeat(7));
    expect(spy).toHaveBeenCalledTimes(3); // 2, 4, extra 3
  });

  test("Logarithmic algorithm with n = 15", () => {
    expect(repeatLogarithmic("abc", 15)).toBe("abc".repeat(15));
    expect(spy).toHaveBeenCalledTimes(4); // 2, 4, 8, extra 7
  });

  test("Logarithmic algorithm with n = 31", () => {
    expect(repeatLogarithmic("abc", 31)).toBe("abc".repeat(31));
    expect(spy).toHaveBeenCalledTimes(5); // 2, 4, 8, 16, extra 15
  });

  test("Logarithmic algorithm with n = 32", () => {
    expect(repeatLogarithmic("abc", 32)).toBe("abc".repeat(32));
    expect(spy).toHaveBeenCalledTimes(5); // 2, 4, 8, 16, 32
  });
});
