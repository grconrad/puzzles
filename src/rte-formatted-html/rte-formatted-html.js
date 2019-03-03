/*
Suppose you're writing a rich text editor (RTE) where the user can enter text, select a range in the
entered text and apply formatting operations (bold, italic, underline) to the range. Imagine the
user types "Hello, world!" but wants to make certain ranges bold, italic, or underlined, and the
ranges can overlap. Then we would need our RTE to to render the final text using HTML like this:

<i>Hel</i>l<b>o, <u>wor</b>ld</u>!

In this case, the formatting may have been applied using a sequence of highlight-and-format
operations in the RTE which could be described in JSON like this:

[
  [0, 2, "i"]
  [4, 9, "b"]
  [7, 11, "u"]
]

The user may describe these operations as:
- italicizing characters 0-2
- boldface characters 4-9
- underline characters 7-11

Write a JS function that, given a string and a series of actions represented as above, generates the
correct HTML markup to render the formatted text for the RTE. The markup should be proper HTML, with
no formatting tags closed "out of order".

In the example above, the following would be INCORRECT output because some tags are closed out of
order:
<i>Hel</i>l<b>o, <u>wor</b>ld</u>!

Instead, it should be:
<i>Hel</i>l<b>o, <u>wor</u></b><u>ld</u>!
*/

function buildTagsByPosition(formatDescriptors) {
  let result = {};
  formatDescriptors.forEach(function(descriptor) {
    const [startIdx, endIdx, tagName] = descriptor;
    result[String(startIdx)] = emitTag(tagName, true);
    result[String(endIdx)] = emitTag(tagName, false);
  });
  return result;
}

function emitTag(tagName, isOpen) {
  return `<${isOpen ? "" : "/"}${tagName}>`;
}

function generateHTML(s, formatDescriptors) {
  let result = [];
  let tagsByPosition = buildTagsByPosition(formatDescriptors);
  let openTagNames = []; // stack
  for (let i = 0, len = s.length; i < len; i++) {
    let c = s[i];
    let tag = tagsByPosition[String(i)]; // e.g. '<i> or '</b>'
    //debugger;
    // Assumption: Only one opening or closing tag per index. (Not good assumption!)
    if (tag) {
      let isOpen = (tag.charAt(1) !== "/"),
        tagName = (isOpen ? tag.charAt(1) : tag.charAt(2));
      if (isOpen) {
        // Opening tag needs to precede the string character at this index.
        // Open a new format tag, then output the character
        result.push(tag);
        openTagNames.push(tagName); // e.g. openTagNames is now ['b', 'u']
        result.push(c);
      } else {
        // Closing tag needs to follow the string character at this index.
        result.push(c);
        // Close any tags that need to be closed first before we write our closing tag.
        // They will have their opening tag "buried" in the stack.
        // We can find them by popping off the stack of open tag names until we get to
        // the open tag that matches the one we're closing.
        let tagNamesToReopen = [];
        while (true) { // eslint-disable-line no-constant-condition
          let openTagName = openTagNames.pop();
          if (openTagName !== tagName) {
            // Found a tag that was already open
            // Track it
            tagNamesToReopen.push(openTagName);
            // Close it
            result.push(emitTag(openTagName, false));
          } else {
            result.push(tag);
            break;
          }
        }
        tagNamesToReopen.forEach((tagName) => {
          result.push(emitTag(tagName, true));
        });
        openTagNames.push(...(tagNamesToReopen.reverse()));
      }
    } else {
      result.push(c);
    }
  }
  return result.join("");
}

module.exports = generateHTML;
