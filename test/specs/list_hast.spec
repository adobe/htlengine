#
### simple list
#
<ul data-sly-list="${properties.fruits}">
    <li>${item}</li>
</ul>
===
<ul>
    <li>Apple</li>

    <li>Banana</li>

    <li>Orange</li>
</ul>
#
### empty list
#
<ul data-sly-list="${properties.emptyList}">
    <li>${item}</li>
</ul>
===

#
### list variables
#
<code data-sly-list.myItem="${properties.fruits}">
    ---
    myItem: ${myItem}
    index: ${myItemList.index}
    count: ${myItemList.count}
    first: ${myItemList.first}
    middle: ${myItemList.middle}
    last: ${myItemList.last}
    odd: ${myItemList.odd}
    even: ${myItemList.even}
</code>
===
<code>
    ---
    myItem: Apple
    index: 0
    count: 1
    first: true
    middle: false
    last: false
    odd: true
    even: false

    ---
    myItem: Banana
    index: 1
    count: 2
    first: false
    middle: true
    last: false
    odd: false
    even: true

    ---
    myItem: Orange
    index: 2
    count: 3
    first: false
    middle: false
    last: true
    odd: true
    even: false
</code>
#
### list map
#
<dl data-sly-list="${properties.map}">
<dt>key: ${item}</dt>
<dd>value: ${properties.map[item]}</dd>
</dl>
===
<dl>
<dt>key: a</dt>
<dd>value: 1</dd>

<dt>key: b</dt>
<dd>value: 2</dd>

<dt>key: c</dt>
<dd>value: 3</dd>
</dl>
#
### list over property with colon
#
<ul data-sly-list="${properties.jcr:content}">
    <li>${item}</li>
</ul>
===
<ul>
    <li>Apple</li>

    <li>Banana</li>

    <li>Orange</li>
</ul>
#
###
