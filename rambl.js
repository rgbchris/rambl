"use strict";

var parser = require('./lib/parser');
var utils  = require('./lib/utils');

/**
 * \d is the same as [0-9]
 * \w is the same as [a-zA-Z0-9]
 * \s is the same as [\t\n\v\f\r]
 *
 *
 * [^aeou] - any character except ‘a’,’e’,’o’,’u’
 * [^0-9]  - any non-digit, same as \D
 * [^\s]   - any not-a-space, same as \S
 */

function Rgx(id) {
  this.chain = "";
  this.str = null; // string to test
  this.method = null; // e.g. test, exec, etc...

  this.backtrack; // flag determining if we need to prepend next chain item
  this.modifiers = [];
  this.negation = false;

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

  // one.or.more  => + (of preceding)
  // zero.or.one  => ? (of preceding)
  // zero.or.more => * (of preceding)

  addProp.call(this, 'non', function() {
    // should just capitalize whatever comes next, in order to negate?
    this.negation = true;
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

  addProp.call(this, 'words', function() {
    utils.backtracker(this.backtrack, this.chain, 'words');
    return this;
  });

  addProp.call(this, 'digit', function() {
    utils.backtracker(this.backtrack, this.chain, 'digit');
    return this;
  });
}

Rgx.prototype._empty = function() {
  this.str = '';
  this.chain = '';
}


Rgx.prototype.if = function(str) {
  this.str = str;
  return this;
}

Rgx.prototype.see = function(str) {
  this.chain += str;
  return this;
}


Rgx.prototype.end = function(flags) {
  var rgxObj = new RegExp(this.chain);
  // var result = rgxObj.test(this.str, flags);
  // this._empty();
  return rgxObj;
}

Rgx.prototype.setOf = function(subexp) {
  if (typeof subexp !== 'function') return;
  

}

Rgx.prototype.nonCapturingGroupOf = function(subexp) {
  if (typeof subexp !== "function") {
    throw "Whoops!";
  }
  this.chain += '(?:';
  subexp.call(this, this);
  this.chain += ')';
  return this;
}

Rgx.prototype.groupOf = function(subexp) {
  if (typeof subexp !== "function") {
    throw "Whoops!";
  }
  this.chain += '(';
  subexp.call(this, this);
  this.chain += ')';
  return this;
}

Rgx.prototype.or = function(str) {
  this.chain += ('|' + str);
  return this;
}

Rgx.prototype.range = function(from, to) {
  var valid;
  try {
    new RegExp(`[${from}-${to}]`)
    valid = true;
  } catch (e) {
    valid = false;
    console.error(e);
  }

  if (valid) {
    this.chain += `[${from}-${to}]`;
  }
}

/**
 *
 */

Rgx.prototype.except = function(str) {
  if (this.modifiers.slice(-1).pop() === 'any') {
    this.chain += `[^${str}]`;
  }
  return this;
}

Rgx.prototype.either = function(before, after) {
  if (typeof before !== "function") {
    throw "Whoops!";
  }
  if (typeof after !== "function") {
    before.call(this, this);
  }

  before.call(this, this);
  this.chain += '|';
  after.call(this, this);
  return this;
}


/**
 * Special Characters for Regular Expressions, e.g. `\` 
 * @param
 * @namespace
 * @name
 * @api public
 */

['specialChar', 'literal', 'literals'].forEach(function(key) {
  Rgx.prototype[key] = function(str) {
    if (str.length > 1) {
      str.split('').map((char) => `\${char}`).join();
    } else {
      // var rgxObj = new RegExp('\' + str);
      this.chain += ("\\" + str);
    }
    return this;
  }
})

Rgx.prototype.snippet = function() {
};

// '^'
Rgx.prototype.startsWith = 
Rgx.prototype.startWith  = function() {
    this.chain += ("^" + str);
    return this;
}

// '$'
Rgx.prototype.endsWith = function(str, lazy) {
    this.chain += (str + "$" + (lazy ? "?" : ""));
    return this;
}

// '*' - equiv. {0,}
Rgx.prototype.any = 
Rgx.prototype.anyAmountOf = 
Rgx.prototype.zeroOrMoreOf = 
Rgx.prototype.zeroOrMore = function(str, lazy) {
    str = parser(str);
    this.chain += (str + "*" + (lazy ? "?" : ""));
    return this;
}

// '+' - equiv {1,}
Rgx.prototype.oneOrMore  = 
Rgx.prototype.atLeastOne = function(str, lazy) {
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

Rgx.prototype.between = function(n, m, str) {
  var valid = true;
  try {
    new RegExp(`0{${n},${m}}`)
  } catch (e) {
    valid = false;
    console.error(e);
  }

  if (valid) {
    this.backtrack = 'quantifier';
    str = str ? parser(str) : '';
    this.chain += `${str}{${n},${m}}`;
  }
  return this;
}

module.exports = Rgx;
