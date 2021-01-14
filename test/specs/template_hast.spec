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
### components
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
#
###
