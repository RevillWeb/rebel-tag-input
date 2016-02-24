rebel-tag-input
==============

A complete tag input for use in JavaScript web applications provided as a web component. Take a look at a working [Demo](http://revillweb.github.io/rebel-tag-input/).

Usage
=====

Include the web components polyfill from [webcomponents.org](http://webcomponents.org/) and include the compiled version of the rebel-tag-input.js file.

````html
<script src="webcomponents.min.js"></script>
<script src="rebel-tag-input.js"></script>
````

Add the custom element somewhere in your app:

````html
<rbl-tag-input lowercase="false" uppercase="false" duplicates="false" id="tagElement"></rbl-tag-input>
````

API
===

The component provides a few attributes and methods so you are able to tailing its functionality to suit your application.

Attributes
----------

| Attribute Name | Required | Type   | Example     | Comments                                              |
| -------------- | -------- | ------ | ----------- | ----------------------------------------------------- |
| lowercase      |   No     | String | true, false | If the component should convert all tags to lowercase |
| uppercase      |   No     | String | true, false | If the component should convert all tags to uppercase |
| duplicates     |   No     | String | true, false | If the component should allow duplicate tags          |

Methods & Properties
-------

##value

Get the current value of the tag input.

````javascript
var $element = document.querySelector("#tagElement");
console.log($element.value); //Web Components, JavaScript, AngularJS
````

##clear()

Clear the input of any tags.

````javascript
var $element = document.querySelector("#tagElement");
$element.clear();
````

