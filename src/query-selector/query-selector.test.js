const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// What we want to test
const {querySelectorAll, querySelector} = require("./query-selector");

const TEST_DOM = new JSDOM(`
  <body>
    <img id="firstImage" src="foo.jpg"/>
    <img src="bar.jpg"/>
    <div id="notAnImage">
      Hello
      <div class="c1 c3 c2">
        world!
      </div>
    </div>
  </body>
`);

const document = TEST_DOM.window.document;
const body = document.body;

test("Basic functionality", () => {

  // All img
  expect(querySelectorAll(body, "img").length).toEqual(2); // all img

  // First img
  expect(querySelector(body, "img").id).toEqual("firstImage");

  // All div
  expect(querySelectorAll(body, "div").length).toEqual(2);

  // Specific div
  expect(querySelectorAll(body, "div.c2.c1.c3").length).toEqual(1);

  // All spans
  expect(querySelectorAll(body, "span").length).toEqual(0);

});
