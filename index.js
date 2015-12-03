/**
 * JS RegExp engine is a subset of Perl 5
 */

// var pattern = /s$/;
// var pattern = new RegExp('s$');


// - chars with special meaning
// - ^ $ . * + ? = ! : | \ / ( ) [ ] { }

function Rgx(str) {
  this.chain = '';
  this.value = str || '';
}

/**
 * Methods
 */

Rgx.prototype.match = function() {
    var rgxObj = new RegExp(this.chain);
    return this.value.match(rgxObj);
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

// ---

Rgx.prototype.any = function(str) {
    this.chain += ".*";
    return this;
}

// escapes special characters...
// ^ $ . * + ? = ! : | \ / ( ) [ ] { }
Rgx.prototype.literal = function() {}

var str = new Rgx("myteststring");

var val = str.special('b')
                .match();

console.log(val);

var proto = Rgx.prototype;
for (var prop in proto) {
    if (typeof proto[prop] === 'function') {
        var fn = proto[prop];
        // console.log(fn);
    }
}


/**

- Build up chainable on Rgx and on last method call run it then clear it
- run with either...
    exec
    test
    match
    search
    replace
    split

*/

module.exports = Rgx;
