(function() {

  'use-strict'

  function Rgx(id) {
    this.chain = "";
    this.str = null; // string to test
    this.method = null; // e.g. test, exec, etc...

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

    addProp.call(this, 'digit', function() {
      this.chain += '\d'; // 0-9
      return this;
    });
  }

  Rgx.prototype._empty = function() {
    this.str = '';
    this.chain = '';
    this.captureStack.length = 0;
  }
  
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

  // ----------------------------------

  Rgx.prototype.if = function(str) {
    this.str = str;
    return this;
  }

  Rgx.prototype.finds = finds = function(str) {
    this.chain += str;
    return this;
  }


  Rgx.prototype.run = function(flags) {
    var rgxObj = new RegExp(this.chain);
    var result = rgxObj.test(this.str, flags);
    this._empty();
    return result;
  }

  Rgx.prototype.then = function(subexpression) {
    //     var stack = this.captureStack;

    //     if (!stack.length) {
    //       stack.push('(');
    //       this.chain += '(';
    //     } else if (!(stack.length % 2)) {
    //       stack.push('(');
    //       this.chain += '(';
    //     } else {
    //       stack.push(')');
    //       this.chain += ')';
    //     }
    this.chain += '(';
    if (typeof subexpression === "function") {
      subexpression.call(this, this);
    }
    this.chain += ')';
    return this;
  }

  Rgx.prototype.or = or = function(str) {
    this.chain += ('|' + str);
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
  Rgx.prototype.endsWith = function(str) {
      this.chain += (str + "$");
      return this;
  }

  // '*' - equiv. {0,}
  Rgx.prototype.zeroOrMore = function(str) {
      this.chain += (str + "*");
      return this;
  }

  // '+' - equiv {1,}
  Rgx.prototype.oneOrMore = function(str) {
      this.chain += (str + "+");
      return this;
  }

  // '?' - equiv {0,1}
  Rgx.prototype.zeroOrOne = function(str) {
      this.chain += (str + "?");
      return this;
  }

  // Invokes getters to execute custom logic
  //   Object.keys(Rgx.prototype).forEach(function(key) {
  //     if (typeof Rgx.prototype[key] === "function") return;
  //     console.log(key);
  //     Object.defineProperty(foo, key, {
  //       get: function() {
  //         return this;
  //       }
  //     })
  //   });

  var rgx = new Rgx();
  var str = "the gray fox";
  var answer;

  // answer = rgx.test.if(str).finds("gray").or.finds("grey").run();
  // answer = rgx.test.if(str).finds("gr").then("a").or("e").then.finds("y").run();
  // answer = rgx.test.if("the gray fox").finds('gr').then((a) => a.finds('a').or('e')).finds('y').run("gm");
  answer = rgx.test.if("that tested test is testing the tester's tests").any.all.zero.any.run("gm");
  console.log(answer);

})();
