#
### add single attribute
#
<div data-sly-attribute.data-values="${properties.myValues}"></div>
===
<div data-values="some data value"></div>
#
### don't double escape attributes
#
<time datetime="${date}">${date}</time>
<time data-sly-attribute.datetime="${date}">${date}</time>
===
<time datetime="2019-04-02T08:44:26.000Z">2019-04-02T08:44:26.000Z</time>
<time datetime="2019-04-02T08:44:26.000Z">2019-04-02T08:44:26.000Z</time>
#
### keep existing attribute
#
<div title="Hello &amp; world." href="/w/index.php?title=Dalek&action=edit&section=1"></div>
===
<div title="Hello &amp; world." href="/w/index.php?title=Dalek&amp;action=edit&amp;section=1"></div>
#
### replace single attribute
#
<div title="" class="className" data-sly-attribute.class="${properties.myClass}"/>
===
<div title="" class="super-green"></div>
#
### replace single attribute after call works.
#
<div data-sly-attribute.class="${properties.myClass}" class="className"/>
===
<div class="super-green"></div>
#
### remove single attribute
#
<div title="" class="className" data-sly-attribute.class="${false}"/>
===
<div title=""></div>
#
### ignore dangerous attributes
#
<div title="" onMouseMove="javascript:alert()" data-sly-attribute.onMouseMove="${'system.exit()'}"/>
===
<div title="" onmousemove="javascript:alert()"></div>
#
### create / replace / delete multiple arguments
#
<input class="green" lang="en" data-sly-attribute="${foobar}" type="text" />
===
<input class="bar" type="text" id="foo">
#
### left to right
#
<div class="bar1" data-sly-attribute.class="bar2" data-sly-attribute="${foobar}"></div>
<div data-sly-attribute="${foobar}" data-sly-attribute.class="bar2" id="foo2"></div>
===
<div class="bar" id="foo"></div>
<div id="foo2" class="bar2"></div>
#
### Empty string values lead to the removal of the attribute:
#
<div lang="${''}"></div>
<div lang="en" data-sly-attribute.lang></div>
<div lang="en" data-sly-attribute.lang=""></div>
<div lang="en" data-sly-attribute.lang="${''}"></div>
<div lang="en" data-sly-attribute="${foobar}"></div>
===
<div></div>
<div></div>
<div></div>
<div></div>
<div id="foo" class="bar"></div>
#
### empty attributes are left as they are if no data-sly-attribute applies to them
#
<div title="" data-sly-attribute="${foobar}"></div>
===
<div title="" id="foo" class="bar"></div>
#
### Boolean values allow to control the display of boolean attributes:
#
<input checked="${true}"/>
<input data-sly-attribute.checked="${true}"/>
<input checked="${false}"/>
<input data-sly-attribute.checked="${false}"/>
<input checked="${'true'}"/>
<input checked="${'false'}"/>
<input data-sly-attribute="${attrs}"/>
===
<input checked="true">
<input checked="true">
<input>
<input>
<input checked="true">
<input checked="false">
<input checked="true">
#
### Arrays are cast to strings:
#
<div title="${['one', 'two', 'three']}"></div>
<div title="${[]}"></div>
===
<div title="one,two,three"></div>
<div></div>
#
### Numbers are cast to strings (i.e. zero doesn't remove the attribute):
#
<div class="${0}"></div>
===
<div class="0"></div>
#
### Quotes are escaped
#
<div class='"foo" "bar"'></div>
===
<div class="&quot;foo&quot; &quot;bar&quot;"></div>
#
### Quotes are escaped in variables
#
<div class="${quotes}"></div>
===
<div class="Hello, &quot;World &amp; Mars!&quot;"></div>
#
### Quotes and text are escaped in variables
#
<div class=">>> ${quotes} <<<"></div>
===
<div class=">>> Hello, &quot;World &amp; Mars!&quot; <<<"></div>
#
### can output vars with colon
#
<div class="${jcr:content}"></div>
===
<div class="hello again"></div>
#
#
### can output vars with colon in property
#
<div class="${properties.jcr:content}"></div>
===
<div class="the content"></div>
#
### allow for attributes without value
### TODO: Update after JSDOM bug will be fixed https://github.com/jsdom/jsdom/issues/2977
#
<input type="checkbox" checked disabled>
===
<input type="checkbox" checked="" disabled="">
#
###
