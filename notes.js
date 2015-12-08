(function() {

'use strict';


function Rmbl(name) {
    this.name = name || '';
    this.chain = '';
    initialize.call(this);
}

Rmbl.prototype.startsWith = function(str) {
    this.chain += '^' + str;
    return this;
}

Rmbl.prototype.literal = function(str) {
    this.chain += '\\' + str;
    return this;
}

// Consumers
let consumers = ['sees', 'see', 'find', 'finds'];
consumers.forEach(key => {
    Rmbl.prototype[key] = function(str) {
        this.chain += str;
        return this;
    }
})



Rmbl.prototype.then = function then() {
    return this;
}

Rmbl.prototype.generate = function generate(flags) {
    return this.chain;
}


// Object.defineProperty(Rmbl.prototype, 'startsWith', {
//     get: function() {
//         return this;
//     }
// });

// Object.keys(Rmbl.prototype).forEach(key => {
//     // Child functions of startsWith
//     ['a','an','another'].forEach(noun => {
//         Rmbl.prototype[key][noun] = () => {
//             return Rmbl.prototype[key];
//         };
//     });
// });

Object.defineProperty(Rmbl.prototype, 'then', {
    get: function() {
        return this;
    }
})

function handlePredecessor(key, noun) {
    // console.log('calling', key, 'from', noun);
    this.flag = key;
}

function initialize() {
    var proto = this.constructor.prototype;

    Object.keys(proto).forEach(function(key) {
        if (typeof this[key] !== "function") return;
        // Child functions of startsWith
        ['a','an','another'].forEach(function(noun) {
            var _this = this;
            // further nested functions need to go on this
            this[key][noun] = function(args) {
                handlePredecessor.call(_this, key, noun);
                proto[key].call(_this, args);
                return _this;
            };
        }, this);
    }, this);
}

var rmbl = new Rmbl('foo rmbl');

// var answer = rmbl.startsWith.a('/*');
// rmbl.startsWith = function(str) {
//     return this.chain = '^' + str;
// };

// var answer = rmbl.startsWith('/*').generate();
// var answer = rmbl.startsWith.a('/*').generate();
var answer = rmbl.finds.a('/*')
                 .then
                 .sees.a('$')
                 .then
                 .sees.a.literal('\\')
                 .generate();

console.log(answer);


})();
