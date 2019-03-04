/*
Given a number of cents and an array of coin denominations in decreasing order, find the number of
ways to make change using coins of the given denominations (values). Assume we have an unlimited
supply of each coin.

Example: Make 29 cents using [25, 10, 5, 1]
*/

/*
Ideas...

N = ways(29, [25, 10, 5, 1])

First decide how many quarters we can use. Since 29/25 = 1.xxx we can use either 0 quarters or 1
quarter. Each of those assumptions leads to a smaller sub-problem to make 29 cents from [10, 5, 1]
or to make 4 cents from [10, 5, 1]. Eventually by reducing to sub-problems in this way we will reach
sub-problems where we have 0 cents left to make (which can be done in only 1 way) or where we have
to make change but have no coins to make change with (which can be done in 0 ways).
*/

function countWaysToMakeChange(numCents, coinDenoms = [25, 10, 5, 1]) {
  const resultCache = {};
  const result = countWaysToMakeChangeWithMemo(
    numCents, // this much change
    coinDenoms, // from these coin types
    0, // using all coin types
    resultCache
  );
  console.log(`Cache at end: ${JSON.stringify(resultCache, null, 2)}`); // eslint-disable-line no-console
  return result;
}

/**
 * Find number of ways to make numCents worth of change using coins of different denominations. The
 * coin values are in coinDenoms, and we can "use" only a subset of them starting from coinIdx.
 *
 * @param {Number} numCents
 *   Amount of change to make
 * @param {Number[]} coinDenoms
 *   Array of denominations of coins, in decreasing order
 *   If not specified, defaults to [25, 10, 5, 1] for quarter/dime/nickel/penny
 * @param {Number} coinIdx
 *   Minimum index in coinDenoms of coins we can use to make change
 * @param {Object} resultCache
 *   Results of subproblems
 * @returns {Number}
 *   Number of ways to make numCents change with coin values starting at coinIdx in coinDenoms
 */
function countWaysToMakeChangeWithMemo(numCents, coinDenoms = [25, 10, 5, 1], coinIdx, resultCache) {
  if (numCents < 0) {
    return 0;
  }
  if (numCents === 0) {
    return 1;
  }
  if (coinIdx >= coinDenoms.length) {
    return 0;
  }
  const cacheKey = `${numCents}-${coinIdx}`;
  // Have we solved this sub-problem before?
  if (resultCache[cacheKey] !== undefined) {
    return resultCache[cacheKey];
  }
  // How many coins of highest available denomination can we include? Try all possibilities from the
  // max down to 0. Use recursion to make "remaining" change using "remaining" coin types.
  let ways = 0;
  const highestCoinDenom = coinDenoms[coinIdx]; // e.g. 25=quarter
  let maxHighestCoin = Math.floor(numCents / highestCoinDenom);
  for (let i = maxHighestCoin; i >= 0; i--) {
    // If we've chosen i coins of value highestCoinDenom, how many ways can we make the remaining
    // change using the remaining coin denominations?
    const remainingCents = numCents - (i * highestCoinDenom);
    ways += countWaysToMakeChangeWithMemo(remainingCents, coinDenoms, coinIdx + 1, resultCache);
  }
  // Print, cache, and return.
  console.log(`${ways} ways to make ${numCents} using {${coinDenoms.slice(coinIdx)}}`); // eslint-disable-line no-console
  resultCache[cacheKey] = ways;
  return ways;
}

module.exports = countWaysToMakeChange;
