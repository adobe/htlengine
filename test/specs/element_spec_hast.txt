#
### sightly element replacement
#
<div data-sly-element="${'h1'}">Hello, world.</div>
===
<h1>Hello, world.</h1>
#
### ignore forbidden element
#
<div data-sly-element="${'script'}">Hello, world.</div>
===
<div>Hello, world.</div>
#
### empty element
#
<div data-sly-element="${''}">Hello, world.</div>
===
<div>Hello, world.</div>
#
### self closing
#
<foo data-sly-element="${'br'}"/>
===
<br>
#
###
#
<sly data-sly-list=${properties.allowed}><div data-sly-element="${item}" />
</sly>
===
<section></section>
<nav></nav>
<article></article>
<aside></aside>
<h1></h1>
<h2></h2>
<h3></h3>
<h4></h4>
<h5></h5>
<h6></h6>
<header></header>
<footer></footer>
<address></address>
<main></main>
<p></p>
<pre></pre>
<blockquote></blockquote>
<ol></ol>
<li></li>
<dl></dl>
<dt></dt>
<dd></dd>
<figure></figure>
<figcaption></figcaption>
<div></div>
<a></a>
<em></em>
<strong></strong>
<small></small>
<s></s>
<cite></cite>
<q></q>
<dfn></dfn>
<div></div>
<data></data>
<time></time>
<code></code>
<var></var>
<samp></samp>
<kbd></kbd>
<sub></sub>
<sup></sup>
<i></i>
<b></b>
<u></u>
<mark></mark>
<ruby></ruby>
<rt></rt>
<rp></rp>
<bdi></bdi>
<bdo></bdo>
<span></span>
<br>
<wbr>
<ins></ins>
<del></del>
<table></table>
<caption></caption>
<colgroup></colgroup>
<col>
<tbody></tbody>
<thead></thead>
<tfoot></tfoot>
<tr></tr>
<td></td>
<th></th>

#
### forbidden
#
<sly data-sly-list=${properties.forbidden}><div data-sly-element="${item}" />
</sly>
===
<div></div>
<div></div>
<div></div>
<div></div>

#
###

