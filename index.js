"use strict";

let Rambl = require('./rambl');
let rmbl  = new Rambl();

// let rmblObj = rmbl.see('<')
//                   .then
//                   .zeroOrMore('whitespaces')
//                   .either((s) => s.see('s'), 
//                           (s) => s.see('ae'))
//                   .run();

let rmblObj = rmbl.groupOf((s) => {
                    s.range('A','Z');
                  })
                  // .oneOrMore('words')
                  // .between(0, 1, 'words')
                  .then
                  .between(0, 1)
                  .words
                  .run();


console.log(rmblObj);
