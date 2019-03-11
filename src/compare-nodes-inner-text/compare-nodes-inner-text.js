/*
Given two DOM nodes, return true iff the text contained within them is exactly the same, character
for character. Do this without using innerHTML, innerText or any such browser APIs.

Also, do it efficiently.
*/

/*
Idea 1: Could compute innerText by doing DFS using recursion, and concatenting to result string
every time we find a text node. We would do this for both nodes to compute the inner text of both
subtrees, and then compare once we're done.

BAD because this would use a lot of space and be SLOW (lots of string concatenation means memory
would be allocated / re-allocated frequently). Even if the subtrees' texts differ in the very first
character we would still end up traversing a potentially huge DOM and saving up lots of text.

Idea 2: Could do recursive DFS, and just store the resulting list of text nodes in each subtree.
Then with two lists of text nodes we could march forward through both lists at the same time, so
that we can intelligently return false the moment we notice any difference without having to "see"
all the later text.

BETTER in space and time. Still need to find all the text nodes up front, though - even if only a
couple of them are needed to make a "no" determination.

Idea 3: Do iterative DFS on both subtrees at the same time, while maintaining the "unmatched text"
of both subtrees as we go. Once a prefix of text has been "matched" in both subtrees, we get rid of
it, such that one or both of the "unmatched text" will be an empty string at any point - or we can
just return false the moment there is no match.

BEST in space and time.
*/

/**
 * Return true iff node1 and node2 have exactly the same inner text.
 *
 * @param {*} node1
 * @param {*} node2
 * @returns {Boolean}
 */
function hasSameInnerText(node1, node2) {

  if (!node1 || !node2) {
    throw `Invalid arguments ${node1} and ${node2}`;
  }

  let st1Nodes = [node1];
  let st1UnmatchedText = "";

  let st2Nodes = [node2];
  let st2UnmatchedText = "";

  // Continue as long as there are more nodes to see in either subtree.
  // But we'll abort inside of here if we ever find text mismatch.
  while (st1Nodes.length || st2Nodes.length) {

    if (st1UnmatchedText === "" && st1Nodes.length) {
      // Continue DFS in tree 1 until we run out of tree or find a text node.
      while (st1Nodes.length) {
        const node = st1Nodes.pop(); // remove last one

        // If this node is a text node, remember its text, and suspend the DFS.
        if (node.nodeType === 3) {
          // Found a text node! Append its text to unmatched text and suspend this DFS.
          st1UnmatchedText += node.nodeValue;
          break;
        } else {
          // Push node's children, in REVERSE order (important for DFS).
          const cn = node.childNodes;
          for (let i = cn.length - 1; i >= 0; i--) {
            st1Nodes.push(cn[i]);
          }
        }
      }
      // Now, we either ran out of subtree or we found another text node.
    }

    if (st2UnmatchedText === "" && st2Nodes.length) {
      // Continue DFS in tree 2 until we run out of tree or find a text node.
      while (st2Nodes.length) {
        const node = st2Nodes.pop(); // remove last one

        // If this node is a text node, remember its text, and suspend the DFS.
        if (node.nodeType === 3) {
          // Found a text node! Append its text to unmatched text and suspend this DFS.
          st2UnmatchedText += node.nodeValue;
          break;
        } else {
          // Push node's children, in REVERSE order (important for DFS).
          const cn = node.childNodes;
          for (let i = cn.length - 1; i >= 0; i--) {
            st2Nodes.push(cn[i]);
          }
        }
      }
      // Now, we either ran out of subtree or we found another text node.
    }

    // Compare text. Both trees' unmatched text should be either equal, or one should be a prefix of
    // the other. If this is true, chop off any matched part and continue. Otherwise just stop and
    // return false.
    const len1 = st1UnmatchedText.length,
      len2 = st2UnmatchedText.length;

    if (len1 === len2) {
      if (st1UnmatchedText === st2UnmatchedText) {
        st1UnmatchedText = "";
        st2UnmatchedText = "";
      } else {
        return false;
      }
    } else if (len1 > len2 && st1UnmatchedText.startsWith(st2UnmatchedText)) {
      st1UnmatchedText = st1UnmatchedText.substring(len2);
      st2UnmatchedText = "";
    } else if (len2 > len1 && st2UnmatchedText.startsWith(st1UnmatchedText)) {
      st1UnmatchedText = "";
      st2UnmatchedText = st2UnmatchedText.substring(len1);
    } else {
      return false;
    }

  }

  return true;
}

module.exports = hasSameInnerText;
