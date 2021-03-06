#
### default item
#
<p data-sly-repeat="${properties.fruits}">${item.title}</p>
===
<p>Apple</p><p>Banana</p><p>Orange</p>
#
### customized item
#
<p data-sly-repeat.fruit="${properties.fruits}">${fruit.title}</p>
===
<p>Apple</p><p>Banana</p><p>Orange</p>
#
### use item within element
#
<div data-sly-repeat.fruit="${properties.fruits}" id="${fruit.id}">${fruit.title}</div>
===
<div id="a">Apple</div><div id="b">Banana</div><div id="o">Orange</div>
#
### iteration control
#
<div data-sly-repeat.city="${properties.cities @ begin = 1, end = 5, step = 2}">${city}</div>
====
<div>Tokyo</div><div>Los Angeles</div><div>Berlin</div>
###
#
### iteration control with objects
#
<li data-sly-repeat.iata="${properties.airports @ begin = 1}">${iata}: ${properties.airports[iata]}</li>
====
<li>bsl: Basel</li><li>hnd: Haneda</li><li>sfo: San Francisco</li>
#
### use list control
#
<div data-sly-repeat.item="${properties.fruits}" class="${itemList.first ? 'active' : ''}">
  ${item.title}
</div>
===
<div class="active">
  Apple
</div><div>
  Banana
</div><div>
  Orange
</div>
#
