#
### sightly resource function
#
<section data-sly-resource="resource_spec/test_page.html"></section>
===
<section><span>Resource</span></section>
#
### sightly resource function in expression
#
<section data-sly-resource="${'resource_spec/test_page.html'}"></section>
===
<section><span>Resource</span></section>
#
### sightly resource function with prependPath option
#
<section data-sly-resource="${'/test_page.html' @ prependPath='resource_spec/'}"></section>
===
<section><span>Resource</span></section>
#
### sightly resource function with appendPath option
#
<section data-sly-resource="${'resource_spec' @ appendPath='test_page.html'}"></section>
===
<section><span>Resource</span></section>
#
### slightly resource function with single selectors option
#
<section data-sly-resource="${'resource_spec/test_page.html' @ selectors='selector'}"></section>
===
<section><span>Resource selector</span></section>
#
### slightly resource function with selectors array option 
#
<section data-sly-resource="${'resource_spec/test_page.html' @ selectors=['selector']}"></section>
===
<section><span>Resource selector</span></section>
#
### slightly resource function with single addSelectors option
#
<section data-sly-resource="${'resource_spec/test_page.html' @ addSelectors='selector'}"></section>
===
<section><span>Resource selector</span></section>
#
### slightly resource function with addSelectors array option
#
<section data-sly-resource="${'resource_spec/test_page.html' @ addSelectors=['selector']}"></section>
===
<section><span>Resource selector</span></section>
#
### slightly resource function with single removeSelectors option
#
<section data-sly-resource="${'resource_spec/test_page.selector.html' @ removeSelectors='selector'}"></section>
===
<section><span>Resource</span></section>
#
### slightly resource function with removeSelectors array option
#
<section data-sly-resource="${'resource_spec/test_page.selector.html' @ removeSelectors=['selector']}"></section>
===
<section><span>Resource</span></section>
#
### slightly resource function with removeSelectors option
#
<section data-sly-resource="${'resource_spec/test_page.html' @ removeSelectors}"></section>
===
<section><span>Resource</span></section>
#
###