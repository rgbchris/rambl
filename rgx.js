var parser = require('./lib/parser');

/**
 * \d is the same as [0-9]
 * \w is the same as [a-zA-Z0-9]
 * \s is the same as [\t\n\v\f\r]
 *
 *
 * [^aeou] - any character except ‘a’,’e’,’o’,’u’
 * [^0-9]  - any non-digit, same as \D
 * [^\s]   - any not-a-space, same as \S
 *
 *
 *
 *
 */

function Rgx(id) {
  this.chain = "";
  this.str = null; // string to test
  this.method = null; // e.g. test, exec, etc...

  this.sentencing = null;

  this.captureStack = [];

  init.call(this);
}

function addProp(key, body) {
  Object.defineProperty(this, key, {
    get: body
  });
}

function methodCheck() {
  if (this.method) {
    throw "Error: Rgx object already has " + this.method + " declared.";
  }
}

function init() {
  // Built-in RegExp methods
  // Need these (for style), want to invoke functions
  // without needing to add invocation parens
  ['exec','test','match','search','replace','split'].forEach(function(key) {
    Object.defineProperty(this, key, {
      get: function() {
        methodCheck();
        this.constructor.prototype[key].call(this);
        return this;
      }
    });
  }, this);

  // one.or.more => + (of preceding)
  // zero.or.one => ? (of preceding)
  // zero.or.more => * (of preceding)

  addProp.call(this, 'non', function() {
    // should just capitalize whatever comes next, in order to negate?
    return this;
  });

  addProp.call(this, 'any', function() {
    return this;
  });

  addProp.call(this, 'all', function() {
    return this;
  });

  addProp.call(this, 'zero', function() {
    return this;
  });

  addProp.call(this, 'one', function() {
    return this;
  });

  addProp.call(this, 'then', function() {
    return this;
  });

  addProp.call(this, 'digit', function() {
    this.chain += '\d'; // [0-9]
    return this;
  });
}

Rgx.prototype._empty = function() {
  this.str = '';
  this.chain = '';
  this.captureStack.length = 0;
}


Rgx.prototype.if = function(str) {
  this.str = str;
  return this;
}

Rgx.prototype.sees = function(str) {
  this.chain += str;
  return this;
}


Rgx.prototype.run = function(flags) {
  var rgxObj = new RegExp(this.chain);
  // var result = rgxObj.test(this.str, flags);
  // this._empty();
  return rgxObj;
}

Rgx.prototype.groupOf = function(subexpression) {
  if (typeof group !== "function") {
    throw "Whoops!";
  }
  this.chain += '(';
  subexpression.call(this, this);
  this.chain += ')';
  return this;
}

Rgx.prototype.or = or = function(str) {
  this.chain += ('|' + str);
  return this;
}

Rgx.prototype.either = function(before, after) {
  if (typeof before !== "function" || typeof after !== "function") {
    throw "Whoops!";
  }
  before.call(this, this);
  this.chain += '|';
  after.call(this, this);
  return this;
}

// Special Characters for Regular Expressions

// '\'
Rgx.prototype.special = function(str) {
    // var rgxObj = new RegExp('\' + str);
    this.chain += ("\\" + str);
    return this;
}

// '^'
Rgx.prototype.startsWith = function() {
    this.chain += ("^" + str);
    return this;
}

// '$'
Rgx.prototype.endsWith = function(str, lazy) {
    this.chain += (str + "$" + (lazy ? "?" : ""));
    return this;
}

// '*' - equiv. {0,}
Rgx.prototype.zeroOrMore = function(str, lazy) {
    str = parser(str);
    this.chain += (str + "*" + (lazy ? "?" : ""));
    return this;
}

// '+' - equiv {1,}
Rgx.prototype.oneOrMore = function(str, lazy) {
    str = parser(str);
    this.chain += (str + "+" + (lazy ? "?" : ""));
    return this;
}

// '?' - equiv {0,1}
Rgx.prototype.zeroOrOne = function(str, lazy) {
    str = parser(str);
    this.chain += (str + "?" + (lazy ? "?" : ""));
    return this;
}

module.exports = Rgx;
