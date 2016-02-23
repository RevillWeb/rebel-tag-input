rebel-repeater
==============

A web component inspired by ngRepeat from the AngularJS framework.

Usage
=====

There are two ways you can make use of this web component. You can use it as part of a bigger ES2015 project as ES2015 source, or you can include a compiled ES5 version.

ES5
---

You can simple included the compiled version into your project and make use of the custom element `rbl-repeater`.

```javascript
    <script src="compiled/rebel-repeater.js"></script>
    <ul>
        <rbl-repeater shadow="true" content='[{"firstName": "Bilbo", "lastName": "Baggins"}]'>
                <li>${firstName} ${lastName}</li>
        </rbl-repeater>
    </ul>
```

ES2015
------

For ES2015 projects `rebel-repeater` makes use of the [jspm](http://jspm.io/) package manager to make including and managing versions & dependencies a doddle. Assuming you already have [installed jspm](http://jspm.io/docs/getting-started.html) just install it into your project as follows:

`jspm install github:RevillWeb/rebel-repeater`

Then you can include it into your ES2015 project as you would any other module:

````javascript
import * as RebelRepeater from 'revillweb/rebel-repeater';
````

**Note**: *`rebel-repeater.js` doesn't actually export anything but an import is required to have the custom element registered on the document.*

API
===

At this point in time the component is very primitive and more a proof of concept than anything useful. 

Attributes
----------

| Attribute Name | Required | Type | Example | Comments |
| -------------- | -------- | ---- | ------- | -------- |
| shadow         |   No   | boolean | true, false | Used to tell the component if it should wrap the repeated content within the Shadow DOM |
| content        |   **Yes**  | Array | [{"firstName": "Bilbo", "lastName": "Baggins"}, {"firstName": "Frodo", "lastName": "Baggins"}] | Used to tell the component if it should wrap the repeated content within the Shadow DOM |

Template
--------

You create the template which is to be repeated within the `rbl-repeater` element itself and make use of the ES2015 template string variables `${}` to pull out object properties. For example if you had populated the content attribute with an array of objects which look like this:

```
{
    "title": "Game of Thrones",
    "genre": "Adventure, Drama, Fantasy"
}
```

You could write the following template to pull out the show title:

`<p>${title}</p>`

Example
=======

You can find a working example by running `index.html` in a modern web browser or take a look at the code below:

````html
<ul>
    <rbl-repeater shadow="true" content='[{"firstName": "Bilbo", "lastName": "Baggins"}, {"firstName": "Frodo", "lastName": "Baggins"}, {"firstName": "Samwise", "lastName": "Gamgee"}]'>
        <li>${firstName} ${lastName}</li>
    </rbl-repeater>
</ul>
````

Contributing
============

To contribute to this project all you will need is jspm installed and a love of web components. Please submit any suggestions or changes via a pull request.