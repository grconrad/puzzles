// Logic to be tested
const generateHTML = require("./rte-formatted-html");

// Test data
const TEST_STRING = "Hello, world!";
const TEST_OPERATIONS = [
  [0, 2, "i"],
  [4, 9, "b"],
  [7, 11, "u"]
];
const TEST_HTML = "<i>Hel</i>l<b>o, <u>wor</u></b><u>ld</u>!";

test("Hello world test", () => {

  let result = generateHTML(TEST_STRING, TEST_OPERATIONS);
  expect(result).toEqual(TEST_HTML);

});
