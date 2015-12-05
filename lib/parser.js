var dictionary = require('./dictionary');

module.exports = function parser(contents) {
  if (typeof contents !== 'string') {
    throw "parser needs a string";
  }

  return dictionary[contents];
}
