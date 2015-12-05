
/**
 * BUILT-INS
 */

/**
 * A RegExp method that executes a search for a match in a string. It returns an array of information.
 * regexObj.exec(str)
 */
Rgx.prototype.exec = function() {}

/**
 * A RegExp method that tests for a match in a string. It returns true or false
 * regexObj.test(str)
 */
Rgx.prototype.test = function() {
  this.method = 'test';
}

/**
 * A String method that executes a search for a match in a string. It returns an array of information or null on a mismatch.
 * str.match(regexp)
 */
Rgx.prototype.match = function() {}

/**
 * A String method that tests for a match in a string. It returns the index of the match, or -1 if the search fails.
 * str.search(regexp)
 */
Rgx.prototype.search = function() {}

/**
 * A String method that executes a search for a match in a string, and replaces the matched substring with a replacement substring.
 * str.replace(regexp|substr, newSubStr|function[, flags])
 */
Rgx.prototype.replace = function() {}

/**
 * A String method that uses a regular expression or a fixed string to break a string into an array of substrings.
 * str.split([separator[, limit]])
 */
Rgx.prototype.split = function() {}
