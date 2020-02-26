#
### unwrap with value and variable
#
<a href="${properties.url}" data-sly-unwrap.unwrapTest="${properties.unwrap}">
    <span>${properties.title}: ${unwrapTest}</span>
</a>
===

    <span>yes: true</span>

#
### unwrap with value and variable with false
#
<a href="${properties.url}" data-sly-unwrap.unwrapTest="${properties.falseTest}">
    <span>${properties.title}: ${unwrapTest}</span>
</a>
===
<a href="url">
    <span>yes: false</span>
</a>
#
### unwrap with value no variable
#
<a href="${properties.url}" data-sly-unwrap="${properties.unwrap}">
    <span>${properties.title}</span>
</a>
===

    <span>yes</span>

#
### unwrap
#
<a href="${properties.url}" data-sly-unwrap><span>${properties.title}</span></a>
===
<span>yes</span>
#
###
