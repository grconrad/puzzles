const {MinHeap, MaxHeap} = require("./heap");

const INCREASING = [1, 2, 3, 4, 5, 6, 7];
const DECREASING = [7, 6, 5, 4, 3, 2, 1];

test("MinHeap", () => {
  const minHeap = new MinHeap();
  minHeap.insert(...DECREASING);

  for (let i = 0; i < DECREASING.length && minHeap.hasMore(); i++) {
    expect(minHeap.extract()).toEqual(INCREASING[i]);
  }
});

test("MaxHeap", () => {
  const maxHeap = new MaxHeap();
  maxHeap.insert(...INCREASING);

  for (let i = 0; i < INCREASING.length && maxHeap.hasMore(); i++) {
    expect(maxHeap.extract()).toEqual(DECREASING[i]);
  }
});
