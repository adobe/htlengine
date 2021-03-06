#
### use external template lib and invoke 1 template
#
<!--/* use sly tag to suppress outer elements */-->
<sly data-sly-use.lib="template_spec/templateLib.html" data-sly-call="${lib.one}"></sly>
===

blah 1
#
### use external template lib and invoke template 2
#
<sly data-sly-use.lib="template_spec/templateLib.html"></sly>
<div data-sly-call="${lib.two}"></div>
===
<div>blah 2</div>

#
### use external template lib and invoke template with args
#
<!--/* use unwrap to suppress out elements */-->
<div data-sly-unwrap data-sly-use.lib="template_spec/templateLib.html" data-sly-call="${lib.any @ jcr:title='Hello, world.'}"></div>
===

blah Hello, world.
#
### static include with data
#
<h1>${page.title}</h1>
<div data-sly-use.lib="template_spec/button.htl" data-sly-call="${lib.button @ data=component.data}"></div>
===
<h1>This is the title</h1>
<div>
    <button>This is a button</button>
</div>
#
### selecting templates example
#
<sly data-sly-use.lib="template_spec/library.htl"/>
<h1>${page.title}</h1>
<!-- here comes the heading -->
<div data-sly-call="${lib.lib @ name='heading', data=component.data}"></div>
<!-- here comes the button -->
<div data-sly-call="${lib.lib @ name=component.name, data=component.data}"></div>
===
<h1>This is the title</h1>
<!-- here comes the heading -->
<div>


    <h1>This is a button</h1>

</div>
<!-- here comes the button -->
<div>

    <button>This is a button</button>


</div>
^^^
33:         yield $.call(comps1["button"], [$n, {"data": data, }]);
38:         yield $.call(comps2["heading"], [$n, {"data": data, }]);
53:       $.dom.append($n, var_0);
68:       $.dom.append($n, var_0);
82:     $.dom.append($n, var_0);
89:     yield $.call(lib["lib"], [$n, {"name": "heading", "data": component["data"], }]);
96:     yield $.call(lib["lib"], [$n, {"name": component["name"], "data": component["data"], }]);
#
### template defining and calling another template
#
<div data-sly-use.lib="template_spec/templateLib.html" data-sly-call="${lib.foo @ a=123}"></div>
===
<div>
    <div>
    <section>123</section>
</div>
</div>
^^^
42:       $.dom.append($n, var_0);
52:       yield $.call(lib["bar"], [$n, {"a": a, }]);
67:       $.dom.append($n, var_0);
79:     yield $.call(lib["foo"], [$n, {"a": 123, }]);
#
### template can use global var
#
<div data-sly-use.lib="template_spec/template.htl" data-sly-call="${lib.tmpl}"></div>
===
<div>
    <h1>This is the title</h1>
</div>
#
### template works on multiple roots
#
<div data-sly-use.lib="project1/template.htl" data-sly-call="${lib.tmpl}"></div>
===
<div>
    <h1>Project This is the title</h1>
</div>
#
### recursive template calls
#
<div data-sly-use.lib="template_spec/group.htl" data-sly-call="${lib.group @ items=page.list}"></div>
===
<div><ul><li>item 1</li>
<li>item 2<ul><li>item 2.1</li>
<li>item 2.2<ul><li> item 2.2.1</li>
</ul>
</li>
<li>item 2.3</li>
</ul>
</li>
<li>item 2</li>
</ul>
</div>
#
### calling template with invalid argument
#
<sly data-sly-use.lib="template_spec/library.htl"/>
<div data-sly-call="${lib.lib @ name='heading', classAppend, data=component.data}"></div>
===
<div>


    <h1>This is a button</h1>

</div>
#
### using template with clashing variables
#
<sly data-sly-use.cal="template_spec/calendar.htl"/>
<div data-sly-call="${cal.element @ date=component.date}"></div>
===
<div>

2021-01-12 04:47
</div>
#
### use variable used twice in tests
#
<sly data-sly-test="" data-sly-use.headline="template_spec/calendar.htl" >
  Hello world
</sly>

<sly data-sly-test="" data-sly-use.headline="template_spec/calendar.htl" >
  Hello world
</sly>
===

#
### template variables case insensitive
#
<template data-sly-template.headlineDemo="${@ textMessage}">
  <h1>${textMessage}!</h1>
</template>

<div data-sly-call="${headlineDemo @ textMessage = 'Hello, world.'}"></div>
===
<div>
  <h1>Hello, world.!</h1>
</div>
#
### template in template
#
<sly data-sly-use.lv="template_spec/lv/item.htl"/>
<div data-sly-call="${lv.item @ item='Foo, bar.'}"></div>
===
<div>
  <div>
  Hello Item content
</div>
</div>
#
### another case insensitive test
#
<sly data-sly-use.primaryButtonTmpl="template_spec/primaryButton.htl" data-sly-call="${primaryButtonTmpl.primaryButton @ disableButton=false }" />
===
<button>hello</button>
#
