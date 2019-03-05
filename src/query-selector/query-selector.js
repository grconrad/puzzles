/**
 * Implement a simplified polyfill for the browser's Node.querySelector() API which accepts a node
 * and a query string and searches the node's subtree and returns an array of nodes that match the
 * query string.
 *
 * For example, "div span.class1.class2" will search for span elements with classes "class1" and
 * "class2" that are descendants of a div anywhere in the given node's subtree. All such matches
 * will be returned. If there are no matches, and empty array is returned.
 *
 * For now let's worry only about tag selectors and class name selectors. The real querySelector
 * supports much more but we'll ignore them for now.
 *
 * @param {Node} node
 * @param {String} qs
 * @returns {Node[]}
 */
function querySelectorAll(node, qs) {
  if (!node || !qs || typeof qs !== "string" || qs.length === 0) {
    return null;
  }
  let selectors = qs.split(" ");
  let matches = [node];

  // Now selectors is an array of strings that can be of several types:
  //   "div" or "span" (tag)
  //   ".class1" (class name)
  //   "div.class1.class2" (tag + class names)
  //   ".class1.class2" (class names)

  // And matches is an array of parent nodes that match all selectors seen thus far.

  for (let i = 0; matches.length > 0 && i < selectors.length; i++) {
    const selector = selectors[i]; // e.g. "div.class1.class2"

    let selectorMatches = [];

    // For each potential parent in matches, find set of descendants that match the next selector.
    // Gather them all together and then assign back to "matches" before next iteration of loop.

    let parts = selector.split("."); // e.g. ["div", "class1", "class2"] or ["", "class1"]
    const tagNameUpper = parts[0].toUpperCase(); // "" if there's no tag name in selector
    const spaceDelimitedClassNames = (parts.length > 1) ? parts.slice(1).join(" ") : "";

    // Use getElementsByClassName to find descendants matching all class names.
    if (spaceDelimitedClassNames !== "") {
      // Find descendants matching the class names.
      matches.forEach(match => {
        let classMatches = match.getElementsByClassName(spaceDelimitedClassNames);
        selectorMatches.push(...classMatches);
      });
      // Then, if there's a tag name, filter the list to elements with a matching tag name.
      if (tagNameUpper !== "") {
        selectorMatches = selectorMatches.filter(el => (el.tagName === tagNameUpper));
      }
    } else {
      if (tagNameUpper !== "") {
        // Find descendants matching the tag name.
        matches.forEach(match => {
          let tagMatches = match.getElementsByTagName(tagNameUpper);
          selectorMatches.push(...tagMatches);
        });
      }
    }

    matches = selectorMatches;
  }

  return matches;
}

/**
 * @param {Node} node
 * @param {String} qs
 * @returns {Node}
 *   First node matching query string in given node's subtree, or null if there are no matches
 */
function querySelector(node, qs) {
  const all = querySelectorAll(node, qs);
  return (Array.isArray(all) && all.length) ? all[0] : null;
}

module.exports = {
  querySelectorAll,
  querySelector
};
