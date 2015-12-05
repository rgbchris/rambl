"use strict";

let Rambl = require('./rambl');
let rmbl  = new Rambl();

let rmblObj = rmbl.see('<')
                  .then
                  .zeroOrMore('whitespaces')
                  .either((s) => s.see('s'), 
                          (s) => s.see('ae'))
                  .run();


console.log(rmblObj);
