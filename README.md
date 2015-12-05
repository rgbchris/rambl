# rambl.js

Useless-ware experiment aimed at being an equally powerful, more verbose, human-readable abstraction on top of JavaScript's regular expression engine.


```javascript
let rmblObj = rmbl.see('<')
                  .then
                  .zeroOrMore('whitespaces')
                  .either((s) => s.see('s'), 
                          (s) => s.see('ae'))
                  .run();
```
