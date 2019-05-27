#
### plain text
#
Hello, World
===
Hello, World
#
### simple expression
#
Hello, ${world}.
===
Hello, Earth.
#
#
### simple expression in attribute
#
<div class="${world}"></div>
===
<div class="Earth"></div>
#
### sly-text with simple string
#
<p data-sly-text="${'Hello, world.'}">This text would never be shown.</p>
===
<p>Hello, world.</p>
#
### sly-text with variable
#
<p data-sly-text="${properties.title}">This text would never be shown.</p>
===
<p>Hello, world.</p>
#
### join filter test
#
Fruits: ${['Apple', 'Banana', 'Orange'] @ join='*'}
===
Fruits: Apple*Banana*Orange
#
### join filter test with variables
#
Fruits: ${properties.fruits @ join=properties.comma}
===
Fruits: Apple, Banana, Orange
#
### string OR
#
${properties.pageTitle || properties.title || 'string constant'}
${properties.foo || properties.title || 'string constant'}
${'string constant' || properties.pageTitle || properties.title}
===
Hello, world.
bar
string constant
#
### comparison
#
<div>
${nullValue1 == nullValue2}
${nullValue1 != nullValue2}
${stringValue1 == stringValue2}
${stringValue1 != stringValue2}
${stringValue1 != stringValue3}
${numberValue1 < numberValue2}
${numberValue1 <= numberValue2}
${numberValue1 == numberValue2}
${numberValue1 >= numberValue2}
${numberValue1 > numberValue2}
${numberValue1 != numberValue2}
${booleanValue1 == booleanValue2}
${booleanValue1 != booleanValue2}
${stringValue1 == 'hello'}
</div>
===
<div>
true
false
true
false
true
false
true
true
true
false
false
true
false
true
</div>
#
### boolean casting
#
${!0}
${!''}
${!""}
${![]}
${!"false"}
${![0]}
===
true
true
true
true
false
false
#
### string casting
#
${0}
${true}
${false}
${[1, 2, 3]}
${[true, false]}
${['foo', 'bar']}
${['foo', '']}
===
0
true
false
1,2,3
true,false
foo,bar
foo,
#
### comments
#
<!-- This is normal HTML comment -->
<!--/* The content of this comment will be removed from the output. */-->
<!-- Page title: ${properties.title} -->
===
<!-- This is normal HTML comment -->

<!-- Page title: Hello, world. -->
#
### multiple plugins
#
<div class="foo" data-sly-attribute.class="${'bar'}" data-sly-text="${'Hello, World'}">This is not shown</div>
===
<div class="bar">Hello, World</div>
#
### string constant test
#
<div>${'\\\"\''}</div>
===
<div>\"'</div>
#
### self closing esi:includes work correctly
#
<div>
  <esi:include src="abc"/>
  <esi:include src="abc"/>
</div>
===
<div>
  <esi:include src="abc"></esi:include>
  <esi:include src="abc"></esi:include>
</div>
#
###

