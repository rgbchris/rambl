# rambl.js

Useless-ware experiment aimed at being an equally powerful, more verbose, human-readable abstraction on top of JavaScript's regular expression engine with an emphasis on dynamic composability.

## TODO:
- create subclass rmbl snippet


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
// /\/\*[\s\S]*?\*\/|\/\/.*/g

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
/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?'])']/g

let rmblObj = rmbl.oneOrMore((s) => {
                    s.setOf((s) => {
                      s.sees.range('a','z')
                       .or.range(0, 9)
                       .or.sees.literals('!#$%&i\'*+/=?^+`{|}~-');
                    });
                  })
                  .nonCapturingGroupOf(s) => {
                    s.literal('.')
                     .then.setOf(() => {
                     })
                  })
                  .end();
```

```javascript
.sees.a.literal('/').then.a.literal('*');
.sees.literals('/*');
```
