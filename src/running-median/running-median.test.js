// What we want to test
const findRunningMedians = require("./running-median");

const SEQUENCE_LENGTH = 20;

test("Test running medians", () => {

  // Generate a random sequence of integers.
  const sequence = new Array(SEQUENCE_LENGTH).fill(0).map(() => Math.floor(Math.random() * 100) + 1);

  // Compute actual cumulative medians.
  const actualMedians = sequence.map((val, idx) => {
    const sortedSeqSoFar = sequence.slice(0, idx + 1).sort((num1, num2) => num1 - num2);
    const medianIdx = (sortedSeqSoFar.length - 1) / 2;
    const actualMedianSoFar =
      (medianIdx === Math.floor(medianIdx)) ? sortedSeqSoFar[medianIdx] :
        (sortedSeqSoFar[Math.floor(medianIdx)] + sortedSeqSoFar[Math.ceil(medianIdx)]) / 2;
    return actualMedianSoFar;
  });

  // Invoke the API under test.
  const computedMedians = findRunningMedians(sequence);

  expect(computedMedians.length).toEqual(actualMedians.length);
  for (let i = 0; i < computedMedians.length; i++) {
    expect(computedMedians[i]).toEqual(actualMedians[i]);
  }

});
