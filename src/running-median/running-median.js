/*
Given a sequence of random integers generated one at a time, keep track of the median.
Do this so that the median could be returned as quickly as possible.
*/

/*
Ideas...

OK: Keep a sorted sequence.

Sort in O(N log N) and read middle position or average two middle values. But this would be too much
work to sort. We don't want to do O(N log N) sort for each new value we insert.

Could actually insert in O(N) time into a sorted array by finding insertion point (binary search
could work for this in O(log N) time and then inserting which requires O(N) average time to shift
the array values. Then the median calculation is O(1). But maintaining a sorted array in this way
still requires O(N) work for each new value coming in.

Could build a balanced binary tree in O(N log N) time and then insert in O(log N) time. But we still
wouldn't get a fast way to compute the median from this.

BEST: Use two heaps - a max heap for lower half of values, and a min heap for upper values. To
insert we may have to deal with both heaps, but it's O(log N) insertion time, and then we can find
or compute the median in O(1) time.

NOTE: Building a heap iteratively in the straightforward way is worst-case O(N log N) but ends up
being a bit better in practice because "most" values don't need to bubble up more than a couple of
levels. There's a more clever way to build a heap in O(N) time.
*/

const {MaxHeap, MinHeap} = require("../heap/heap");

function log(/* s */) {
  // console.log(s); // eslint-disable-line
}

/**
 * Process a sequence of numbers. Return an array of the same cardinality which has the running
 * median at each step.
 *
 * @param {Number[]} seq
 * @returns {Number[]}
 *   Running medians
 */
function findRunningMedians(seq) {
  const lowers = new MaxHeap(), // for lower values
    uppers = new MinHeap(); // for higher values
  let median;
  log(`Processing sequence ${seq}`);
  return seq.map((int) => {
    log("-");
    log(`lowers=${lowers}, uppers=${uppers}`);
    log(`Processing ${int}`);
    if (int <= lowers.peek()) {
      lowers.insert(int);
    } else if (int > uppers.peek()) {
      uppers.insert(int);
    } else {
      // Could go into either heap. Insert into the smaller one.
      if (lowers.size <= uppers.size) {
        lowers.insert(int);
      } else {
        uppers.insert(int);
      }
    }
    // Now move an element from one heap to the other, if the heap sizes are off by
    // more than 1.
    if (lowers.size < uppers.size - 1) {
      lowers.insert(uppers.extract());
    } else if (lowers.size > uppers.size + 1) {
      uppers.insert(lowers.extract());
    }
    // Now our two heaps are as close in size as possible.
    // Update median.
    if (lowers.size === uppers.size) {
      // Even number, take largest of lowers and smallest of uppers and average them.
      median = (lowers.peek() + uppers.peek()) / 2;
    } else if (lowers.size === (uppers.size + 1)) {
      median = lowers.peek();
    } else if (lowers.size === (uppers.size - 1)) {
      median = uppers.peek();
    } else {
      throw "Heaps vary in size by more than 1";
    }
    log(`After processing ${int}, computed median is ${median}`);
    return median;
  });
}

module.exports = findRunningMedians;
