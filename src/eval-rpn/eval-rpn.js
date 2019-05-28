/**
 * @param {Array} tokens
 *   Examples:
 *     [5, 3, '+'] for expression 5+3
 *     [15, 7, 1, 1, '+', '-', '/', 3, '*', 2, 1, 1, '+', '+', '-'] for expression ((15 / (7 - (1 + 1))) * 3) - (2 + (1 + 1))
 * @returns {Number}
 *   Result of the expression
 */
function evalRpnExpr(tokens) {
  // Use "private" function just so we can copy the array first.
  // The private function modifies its input and we don't want to modify the original array.
  return _evalRpnExpr(tokens.slice());
}

const OPERATOR_BY_CHAR = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b
};

/**
 * @param {Array} tokens
 *   Examples:
 *     [5, 3, '+'] for expression 5+3
 *     [15, 7, 1, 1, '+', '-', '/', 3, '*', 2, 1, 1, '+', '+', '-'] for expression ((15 / (7 - (1 + 1))) * 3) - (2 + (1 + 1))
 * @returns {Number}
 *   Result of the expression
 */
function _evalRpnExpr(tokens) {
  if (tokens.length === 1) {
    return tokens[0];
  }
  const last = tokens.pop();
  const operatorFn = OPERATOR_BY_CHAR[last];
  let result = null;
  if (operatorFn) {
    // Last character is an operator, so we need to parse arg1 and arg2.
    // Since arg2 will
    // Try to parse arg2
    let arg2 = _evalRpnExpr(tokens);
    if (!arg2) {
      return null;
    }
    // Try to parse arg1
    let arg1 = _evalRpnExpr(tokens);
    if (!arg1) {
      return null;
    }
    result = operatorFn(arg1, arg2);
  } else if (typeof last === "number") {
    result = last;
  } else {
    console.error(`Unexpected char ${last}`); // eslint-disable-line no-console
    return null;
  }
  return result;
}

module.exports = evalRpnExpr;
