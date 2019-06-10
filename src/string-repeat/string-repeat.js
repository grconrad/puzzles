/**
 * Naive approach with O(n) concatenations
 *
 * @param {String} s
 * @param {Number} n
 * @returns {String}
 */
function repeatLinear(s, n) {
  _validateInput(s, n);
  if (s.length === 0 || n === 0) {
    return "";
  }

  let result = "";
  while (n--) {
    result = helper.concat(result, s);
  }

  return result;
}

/**
 * More clever approach with O(log n) concatenations
 *
 * @param {String} s
 * @param {Number} n
 * @returns {String}
 */
function repeatLogarithmic(s, n) {
  _validateInput(s, n);
  if (s.length === 0 || n === 0) {
    return "";
  }

  // Invariants:
  // result has r instances of the input string
  // r is a power of 2 less than or equal to n
  let result = s,
    r = 1,
    stop = n / 2;
  while (r <= stop) {
    result = helper.concat(result, result);
    r *= 2;
  }
  // We stopped at a power of 2 instances of the input string.
  // Figure out how many more we need, find them as a substring of the result, and concatenate.
  const moreNeeded = n - r;
  if (moreNeeded > 0) {
    const rest = result.substring(0, moreNeeded * s.length);
    result = helper.concat(result, rest);
  }

  return result;
}

function _validateInput(s, n) {
  if (
    typeof s !== "string" ||
    typeof n !== "number" ||
    n < 0 ||
    Math.floor(n) !== n
  ) {
    throw new Error("Invalid input, string and nonnegative integer required");
  }
}

const helper = {
  // To support spies in unit tests
  concat: (s1, s2) => s1 + s2,
  repeatLinear,
  repeatLogarithmic
};

module.exports = helper;
