const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Logic to be tested
const hasSameInnerText = require("./compare-nodes-inner-text");

// Test data

const TEST_DOM_1 = new JSDOM(`
  <body>
    <div id="variant0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <div id="variant1">
      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
      <div>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
      <div>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
      <span>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
    </div>
    <div id="variant2">
      Lorem ipsum <span>dolor</span> sit amet, consectetur <div id="notTheSame">adipiscing elit, sed do eiusmod tempor incididunt</div> <div>ut labore et dolore <div>magna aliqua.</div>
      <div>Ut <div>enim ad minim veniam,</div> quis nostrud exercitation ullamco laboris nisi ut aliquip</div> ex ea commodo consequat.</div>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <div id="variant3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      <div>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
    </div>
  </body>
`);

const TEST_DOM_2 = new JSDOM(`
  <body id="hw">Hello world!</body>
`);

const TEST_DOM_3 = new JSDOM(`
  <body id="hw"><div>Hello</div> <div>world!</div></body>
`);

test("Within same DOM", () => {

  const testDoc = TEST_DOM_1.window.document,
    variant0 = testDoc.getElementById("variant0"),
    variant1 = testDoc.getElementById("variant1"),
    variant2 = testDoc.getElementById("variant2"),
    variant3 = testDoc.getElementById("variant3"),
    notTheSame = testDoc.getElementById("notTheSame");

  expect(hasSameInnerText(variant0, variant1)).toEqual(true);
  expect(hasSameInnerText(variant1, variant2)).toEqual(true);
  expect(hasSameInnerText(variant2, variant3)).toEqual(true);
  expect(hasSameInnerText(variant0, variant2)).toEqual(true);
  expect(hasSameInnerText(variant0, variant3)).toEqual(true);
  expect(hasSameInnerText(variant1, variant3)).toEqual(true);

  expect(hasSameInnerText(variant0, notTheSame)).toEqual(false);

});

test("Across DOMs", () => {

  expect(hasSameInnerText(
    TEST_DOM_2.window.document.getElementById("hw"),
    TEST_DOM_3.window.document.getElementById("hw")
  )).toEqual(true);

});
