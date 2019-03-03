// Logic to be tested
const flattenArray = require("./flatten-array");

// Test data
const TEST_ARRAY = [
  1,
  [
    2,
    3
  ],
  [
    [
      [
        4
      ]
    ]
  ],
  [
    [
      5,
      6,
      7
    ]
  ],
  8,
  [
    9
  ]
];
const TEST_ARRAY_FLATTENED = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9
];

test("Basic functionality", () => {

  expect(flattenArray(TEST_ARRAY)).toEqual(TEST_ARRAY_FLATTENED);

});
