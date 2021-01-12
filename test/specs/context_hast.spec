#
### html
#
${properties.title @ context='html'}
===
HTML &#x26; Things <b>are bold</b> or Single ' or double " quoted.
#
### text
#
${properties.title @ context='text'}
===
HTML &#x26; Things &#x3C;b>are bold&#x3C;/b> or Single ' or double " quoted.&#x3C;script>alert("hello");&#x3C;/script>
#
### element name
#
${'div' @ context='elementName'}
${'blockquote' @ context='elementName'}
${'object' @ context='elementName'}
===
div
blockquote
div
#
### attributeName
#
${'data-foo' @ context='attributeName'}
${'onMouseClick' @ context='attributeName'}
===
data-foo

#
### attribute
#
${properties.title @ context='attribute'}
<div class="${properties.attvalue}" />
===
HTML &#x26; Things &#x3C;b>are bold&#x3C;/b> or Single ' or double " quoted.&#x3C;script>alert("hello");&#x3C;/script>
<div class="&#x22; onload=&#x22;alert()&#x22; &#x22;"></div>
#
### uri
#
${properties.title @ context='uri'}
===

#
### scriptToken
#
${'foo' @ context='scriptToken'}
${'12Foo' @ context='scriptToken'}
${'_token' @ context='scriptToken'}
===
foo

_token
#
### scriptString
#
${properties.title @ context='scriptString'}
===
HTML\x20\x26\x20Things\x20\x3Cb\x3Eare\x20bold\x3C\x2Fb\x3E\x20or\x20Single\x20\x27\x20or\x20double\x20\x22\x20quoted.\x3Cscript\x3Ealert\x28\x22hello\x22\x29\x3B\x3C\x2Fscript\x3E
#
### scriptComment
#
${'ok comment' @ context='scriptComment'}
${'not ok */ comment' @ context='scriptComment'}
===
ok comment

#
### styleToken
#
${'border-color' @ context='styleToken'}
${'*/' @ context='styleToken'}
===
border-color
*/
#
### styleString
#
${'foo/img.src' @ context='styleString'}
===
foo\2f img\2e src
#
### styleComment
#
${'ok comment' @ context='styleComment'}
${'not ok */ comment' @ context='styleComment'}
===
ok comment

#
### html comment
#
${properties.title @ context='comment'}
===
HTML &#x26; Things &#x3C;b>are bold&#x3C;/b> or Single ' or double " quoted.&#x3C;script>alert("hello");&#x3C;/script>
#
### number
#
${'3.5' @ context='number'}
${'hello' @ context='number'}
===
3.5
0
#
### unsafe
#
${properties.title @ context='unsafe'}
===
HTML &#x26; Things <b>are bold</b> or Single ' or double " quoted.<script>alert("hello");</script>
#
###
