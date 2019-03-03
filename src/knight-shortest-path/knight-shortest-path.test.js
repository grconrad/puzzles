// Logic to be tested
const findMovesToXY = require("./knight-shortest-path");

// Test data
const answers = [
  [0,3,2,3,2,3,4],
  [3,2,1,2,3,4,3],
  [2,1,4,3,2,3,4],
  [3,2,3,2,3,4,3],
  [2,3,2,3,4,3,4],
  [3,4,3,4,3,4,5],
  [4,3,4,3,4,5,4]
];

test("All test data", () => {

  const max = answers.length;
  for (let x = 0; x < max; x++) {
    for (let y = 0; y < max; y++) {
      expect(findMovesToXY(x, y).length).toEqual(answers[x][y]);
    }
  }

});
