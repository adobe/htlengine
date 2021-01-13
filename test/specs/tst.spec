#
### simple test
#
<div data-sly-test="${properties.false0}">nope</div>
<div data-sly-test="${properties.true0}">yeah!</div>
---
{ const var_testVariable0 = properties["false0"];
  if (var_testVariable0) {
    $.out("<div>nope</div>");
  }
}
$.out("\n");
{ const var_testVariable1 = properties["true0"];
  if (var_testVariable1) {
    $.out("<div>yeah!</div>");
  }
}
$.out("\n");
===

<div>yeah!</div>
#
### test with variable
#
<div data-sly-test.mytest="${properties.true0}">It is true!</div>
It was: ${mytest}
---
global.mytest = properties["true0"];
if (mytest) {
  $.out("<div>It is true!</div>");
}
{ const var_0 = ("\nIt was: ") + ($.xss(mytest, "html")) + ("\n");
  $.out(var_0);
}
===
<div>It is true!</div>
It was: hello
^^^
32:     $.dom.append($n, var_0);
#
### test with variable is case insensitive
#
<div data-sly-test.mytest="${properties.true0}">It is true!</div>
It was: ${myTest}
---
global.mytest = properties["true0"];
if (mytest) {
  $.out("<div>It is true!</div>");
}
{ const var_0 = ("\nIt was: ") + ($.xss(mytest, "html")) + ("\n");
  $.out(var_0);
}
===
<div>It is true!</div>
It was: hello
^^^
32:     $.dom.append($n, var_0);
#
### test with variable is case insensitive (with case)
#
<div data-sly-test.myTest="${properties.true0}">It is true!</div>
It was: ${mytest}
===
<div>It is true!</div>
It was: hello
^^^
32:     $.dom.append($n, var_0);
#
### recursive test: true - true
#
<div data-sly-test="${properties.true1}">Title: <b data-sly-test="${properties.true1}">Bold!</b></test>
===
<div>Title: <b>Bold!</b></div>
#
### recursive test: true - false
#
<div data-sly-test="${properties.true1}">Title: <b data-sly-test="${properties.false1}">Bold!</b></test>
===
<div>Title: </div>
#
### recursive test: false - true
#
<div data-sly-test="${properties.false1}">Title: <b data-sly-test="${properties.true1}">Bold!</b></test>
===

#
### test with global variable
#
<div data-sly-test.out="${properties.true0}">It is true!</div>
It was: ${out}
===
<div>It is true!</div>
It was: hello
#
### test with variable with colon
#
<div data-sly-test.is:out="${properties.true0}">It is true!</div>
It was: ${is:out}
===
<div>It is true!</div>
It was: hello
#
### multiple tests
#
<sly
    data-sly-test.value1="${'abc'}"
    data-sly-test.value2="${0}"
    data-sly-test.value3="${999}" />
<h1>v1: ${value1} v2:${value2} v3:${value3}</h1>
===
<h1>v1: abc v2:0 v3:999</h1>
#
###
#
### test and use
#
<sly data-sly-use.page="./use_spec/test_page.js" data-sly-test="${page.title}"></sly>
===

#
###

