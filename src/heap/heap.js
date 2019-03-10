const HEAP_ORDERING_MIN = 0;
const HEAP_ORDERING_MAX = 1;

// root elem is always Arr[0]
// parent of Arr[i] is Arr[Math.floor(((i-1) / 2)]
// left child of Arr[i] is Arr[2i + 1]
// right child of Arr[i] is Arr[2i + 2]

function log(/* s */) {
  // console.log(s); // eslint-disable-line
}

class Heap {

  constructor(ordering) {
    if (ordering !== HEAP_ORDERING_MIN && ordering !== HEAP_ORDERING_MAX) {
      throw "Must specify ordering (min or max) when creating a heap";
    }
    this.isMinHeap = (ordering === HEAP_ORDERING_MIN);
    this.entries = [];
  }

  // Public API

  get size() {
    return this.entries.length;
  }

  hasMore() {
    return (this.size !== 0);
  }

  print() {
    log(this.toString()); // eslint-disable-line no-console
  }

  peek() {
    return (this.size > 0) ? this.entries[0] : null;
  }

  insert(...values) {
    values.forEach(value => {
      this._insert(value);
    });
  }

  extract() {
    if (this.size === 0) {
      return null;
    }

    // Save the min value so we can return it later.
    const result = this.entries[0];

    log(`Removing ${this.isMinHeap ? "min" : "max"} value ${result}`); // eslint-disable-line no-console

    // Pull off last entry.
    const lastVal = this.entries.pop();

    if (this.size > 0) {
      this.entries[0] = lastVal;

      // Bubble down.
      this._bubbleDown(0);
    }

    this.print();

    return result;
  }

  /**
   * Remove a value, if it exists in the heap.
   *
   * @param {*} value
   * @returns {Boolean}
   *   true iff value was found and removed
   */
  remove(value) {
    if (this.size === 0) {
      return false;
    }

    return this._remove(value, 0);
  }

  toString() {
    return `[${this.entries}] length=${this.size}`;
  }

  // Internals

  _leftChildIdx(idx) {
    return 2 * idx + 1;
  }

  _rightChildIdx(idx) {
    return 2 * idx + 2;
  }

  _parentIdx(idx) {
    return Math.floor((idx - 1) / 2);
  }

  _insert(value) {
    //log(`Inserting ${value}`);

    // Append to array.
    this.entries.push(value);

    // Now bubble it up to where it's needed.
    this._bubbleUp(this.size - 1);

    this.print();
  }

  /**
   * @param {Number} idx1
   * @param {Number} idx2
   * @returns {boolean} true iff values are consistent with the heap ordering
   */
  _inOrder(idx1, idx2) {
    const val1 = this.entries[idx1],
      val2 = this.entries[idx2];
    return (this.isMinHeap ? (val1 <= val2) : (val1 >= val2));
  }

  /**
   * @param {?} value
   * @param {Number} idx
   * @returns {Boolean} true iff found and removed
   */
  _remove(value, idx) {
    const thisValue = this.entries[idx];

    if (value === thisValue) {
      // Pull off last entry.
      const lastVal = this.entries.pop();

      if (idx < this.size) {
        this.entries[idx] = lastVal;

        // Bubble down.
        this._bubbleDown(idx);
      }

      return true;
    }

    if ((this.isMinHeap && value > thisValue) || (!this.isMinHeap && value < thisValue)) {
      const len = this.size;

      let leftChildIdx = this._leftChildIdx(idx);
      if (leftChildIdx < len && this._remove(value, leftChildIdx)) {
        return true;
      }

      let rightChildIdx = this._rightChildIdx(idx);
      if (rightChildIdx < len && this._remove(value, rightChildIdx)) {
        return true;
      }
    }

    return false;
  }

  // Used when inserting
  _bubbleUp(idx) {
    while (idx > 0) {
      let parentIdx = this._parentIdx(idx);
      if (this._inOrder(parentIdx, idx)) {
        // No more bubbling needed.
        break;
      }
      // Bubble up!
      const tmp = this.entries[idx];
      this.entries[idx] = this.entries[parentIdx];
      this.entries[parentIdx] = tmp;
      idx = parentIdx;
    }
  }

  // Used when extracting
  _bubbleDown(idx) {
    const len = this.size;
    while (true) { // eslint-disable-line no-constant-condition
      this.print();
      // Which child (if any) should we swap with to "bubble down" from position idx?
      let leftChildIdx = this._leftChildIdx(idx);
      let targetChildIdx = null;
      if (leftChildIdx < len && !this._inOrder(idx, leftChildIdx)) {
        // Should bubble down by swapping with left child, unless right child is a better
        // swap (checked below).
        targetChildIdx = leftChildIdx;
      }
      let rightChildIdx = this._rightChildIdx(idx);
      if (rightChildIdx < len && !this._inOrder(idx, rightChildIdx)) {
        if (targetChildIdx === null || this._inOrder(rightChildIdx, leftChildIdx)) {
          // Need to bubble down by swapping with right child!
          targetChildIdx = rightChildIdx;
        }
      }
      if (targetChildIdx !== null) {
        // Bubble down!
        //log(`_bubbleDown(${idx}): targetChildIdx=${targetChildIdx}`);
        const tmp = this.entries[idx];
        this.entries[idx] = this.entries[targetChildIdx];
        this.entries[targetChildIdx] = tmp;
        idx = targetChildIdx;
      } else {
        //log(`_bubbleDown(${idx}): done bubbling down`);
        break;
      }
    }
  }

}

class MinHeap extends Heap {
  constructor() {
    super(HEAP_ORDERING_MIN);
  }
}

class MaxHeap extends Heap {
  constructor() {
    super(HEAP_ORDERING_MAX);
  }
}

module.exports = {
  MinHeap,
  MaxHeap
};
