# rambl.js

Useless-ware experiment aimed at being an equally powerful, more verbose, human-readable abstraction on top of JavaScript's regular expression engine with an emphasis on dynamic composability.

## Examples 

```javascript
let rmblObj = rmbl.sees('<')
                  .then
                  .zeroOrMore('whitespaces')
                  .then
                  .either((s) => s.see('s'), 
                          (s) => s.see('ae'))
                  .end();
```

Comment Removal Regular Expression
```javascript
let rmblObj = rmbl.sees.literals('/*')
                  .then.zeroOrMore((str) => {
                    str.sees.whitespaces
                       .or
                       .non.whitespaces;
                  }, 'lazy')
                  .then.literals('*/')
                  .or
                  .a.literal('/')
                  .then.a.literal('/')
                  .then.zeroOrMoreOf('anything')
                  .end('g')
```

```javascript
.sees.a.literal('/').then.a.literal('*');
.sees.literals('/*');
```
