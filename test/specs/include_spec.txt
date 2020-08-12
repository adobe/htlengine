#
### simple include
#
<section data-sly-include="test.htl">foo</section>
===
<section>{"uri":"test/specs/template_spec/jcr_root/apps/test.htl","options":{}}</section>
#
### include with string variable
#
<section data-sly-include="${'test.htl'}">foo</section>
===
<section>{"uri":"test/specs/template_spec/jcr_root/apps/test.htl","options":{}}</section>
#
### include with path manipulation
#
<section data-sly-include="${'project1' @ appendPath='test.htl'}">foo</section>
<section data-sly-include="${'test.htl' @ prependPath='project1'}">foo</section>
<section data-sly-include="${@ file='test.htl'}">foo</section>
<section data-sly-include="${@ file='test.htl', prependPath='project1'}">foo</section>
===
<section>{"uri":"test/specs/template_spec/jcr_root/apps/project1/test.htl","options":{}}</section>
<section>{"uri":"test/specs/template_spec/jcr_root/apps/project1/test.htl","options":{}}</section>
<section>{"uri":"test/specs/template_spec/jcr_root/apps/test.htl","options":{}}</section>
<section>{"uri":"test/specs/template_spec/jcr_root/apps/project1/test.htl","options":{}}</section>
#
### include with request attributes
#
<section data-sly-include="${'test.htl' @ requestAttributes=settings}">foo</section>
===
<section>{"uri":"test/specs/template_spec/jcr_root/apps/test.htl","options":{"requestAttributes":{"a":1,"b":2}}}</section>
#
### include with wcmmode
#
<section data-sly-include="${'test.htl' @ wcmmode='disabled'}">foo</section>
===
<section>{"uri":"test/specs/template_spec/jcr_root/apps/test.htl","options":{"wcmmode":"disabled"}}</section>
#
###
