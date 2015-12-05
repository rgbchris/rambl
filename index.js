var Rgx = require('./rgx');

var rgx = new Rgx();
// var answer;

// answer = rgx.test.if(str).finds("gray").or.finds("grey").run();
// answer = rgx.test.if(str).finds("gr").then("a").or("e").then.finds("y").run();
// answer = rgx.test.if("the gray fox").finds('gr').then((a) => a.finds('a').or('e')).finds('y').run("gm");
// answer = rgx.test.if("that tested test is testing the tester's tests").any.all.zero.any.run("gm");

var rgxObj = rgx.sees('<')
                .then
                .zeroOrMore('whitespaces')
                .run();


console.log(rgxObj);
