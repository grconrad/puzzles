/**
Given a string of parentheses, find the balanced string that can be produced from it using the
minimum number of insertions and deletions. If there are multiple solutions, return any of them.

For example, given "(()", you could return "(())". Given "))()(", you could return "()()()()".
*/

/**
 * @param {String} s
 *   Input string composed (we assume) only of left and right parens
 * @returns {String}
 *   One possible shortest-length modification of the input string (if any modification is needed)
 *   that balances the left and right parentheses
 */
function findMinBalanced(s) {
  // As we scan from left to right, balance can be positive (this is fine) meaning we have unclosed
  // parentheses (a left without a matching right to cancel it out). If we get to the end and the
  // balance is positive we can just append right parens as necessary. But if we ever find that the
  // balance becomes negative (we see a right paren that hasn't been preceded by a matching left
  // paren) we need to insert a left paren at this point to match it before moving on.
  let balance = 0;
  const chars = [];
  Array.from(s).forEach(c => {
    if (c === "(") {
      balance++;
    } else if (c === ")") {
      if (balance <= 0) {
        chars.push("(");
      } else {
        balance--;
      }
    }
    chars.push(c);
  });
  // At the end, insert enough ')' to return balance back to zero from a positive number.
  while (balance--) {
    chars.push(")");
  }
  return chars.join("");
}

module.exports = findMinBalanced;
