#
### simple test
#
<div data-sly-test="${properties.false0}">nope</div>
<div data-sly-test="${properties.true0}">yeah!</div>
===

<div>yeah!</div>
#
### test with variable
#
<div data-sly-test.mytest="${properties.true0}">It is true!</div>
It was: ${mytest}
<div>It is true!</div>
It was: hello
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
###
