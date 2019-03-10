const {MinHeap, MaxHeap} = require("./heap");

const INCREASING = [1, 2, 3, 4, 5, 6, 7];
const DECREASING = [7, 6, 5, 4, 3, 2, 1];

test("MinHeap", () => {
  const minHeap = new MinHeap();

  minHeap.insert(...DECREASING);

  expect(minHeap.size).toEqual(DECREASING.length);

  for (let i = 0; i < DECREASING.length && minHeap.hasMore(); i++) {
    expect(minHeap.extract()).toEqual(INCREASING[i]);
  }

  expect(minHeap.size).toEqual(0);

  minHeap.insert(...DECREASING);

  expect(minHeap.remove(6)).toEqual(true);
  expect(minHeap.size).toEqual(DECREASING.length - 1);
  expect(minHeap.remove(2)).toEqual(true);
  expect(minHeap.remove(7)).toEqual(true);
  expect(minHeap.remove(3)).toEqual(true);
  expect(minHeap.remove(1)).toEqual(true);
  expect(minHeap.remove(5)).toEqual(true);
  expect(minHeap.remove(4)).toEqual(true);
  expect(minHeap.size).toEqual(0);

  expect(minHeap.remove(6)).toEqual(false);
});

test("MaxHeap", () => {
  const maxHeap = new MaxHeap();

  maxHeap.insert(...INCREASING);

  expect(maxHeap.size).toEqual(INCREASING.length);

  for (let i = 0; i < INCREASING.length && maxHeap.hasMore(); i++) {
    expect(maxHeap.extract()).toEqual(DECREASING[i]);
  }

  expect(maxHeap.size).toEqual(0);

  maxHeap.insert(...INCREASING);

  expect(maxHeap.remove(6)).toEqual(true);
  expect(maxHeap.size).toEqual(INCREASING.length - 1);
  expect(maxHeap.remove(6)).toEqual(false);
  expect(maxHeap.size).toEqual(INCREASING.length - 1);
});
