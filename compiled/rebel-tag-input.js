"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by Leon Revill on 10/01/2016.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */

var RblTagInput = (function (_HTMLElement) {
    _inherits(RblTagInput, _HTMLElement);

    function RblTagInput() {
        _classCallCheck(this, RblTagInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RblTagInput).apply(this, arguments));
    }

    _createClass(RblTagInput, [{
        key: "createdCallback",
        value: function createdCallback() {
            this.createShadowRoot();
            this.tags = [];
        }
    }, {
        key: "addTag",
        value: function addTag(tag) {
            if (tag.length > 0) {
                if (this.getAttribute("lowercase") == "true") {
                    tag = tag.toLowerCase();
                }
                if (this.getAttribute("uppercase") == "true") {
                    tag = tag.toUpperCase();
                }
                if (this.getAttribute("duplicates") == "true" || this.tags.indexOf(tag) === -1) {
                    this.tags.push(tag);
                    this.shadowRoot.querySelector('#tag-input').value = "";
                    this.render();
                } else {
                    var $element = this.shadowRoot.querySelector('[data-index="' + this.tags.indexOf(tag) + '"]');
                    $element.className = $element.className + " duplicate";
                    setTimeout(function () {
                        $element.className = $element.className.replace("duplicate", "");
                    }, 500);
                }
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            this.clear();
            this.tags.forEach(function (tag, idx) {
                var $tag = document.createElement("div");
                $tag.className = "tag";
                var $remove = document.createElement("div");
                $remove.className = "remove";
                $remove.innerHTML = "x";
                $remove.addEventListener("click", function () {
                    _this2.deleteTag(idx);
                });
                $tag.dataset.index = idx;
                $tag.innerHTML = tag;
                $tag.appendChild($remove);
                _this2.shadowRoot.querySelector('.rebel-tag-input').appendChild($tag);
            });
        }
    }, {
        key: "clear",
        value: function clear() {
            var tagElements = this.shadowRoot.querySelectorAll('.tag');
            if (tagElements.length > 0) {
                for (var i = 0; i < tagElements.length; i++) {
                    this.shadowRoot.querySelector('.rebel-tag-input').removeChild(tagElements[i]);
                }
            }
        }
    }, {
        key: "empty",
        value: function empty() {
            this.clear();
            this.tags = [];
        }
    }, {
        key: "deleteTag",
        value: function deleteTag(index) {
            var newTags = [];
            this.tags.forEach(function (tag, idx) {
                if (idx !== index) {
                    newTags.push(tag);
                }
            });
            this.tags = newTags;
            this.render();
        }
    }, {
        key: "attachedCallback",
        value: function attachedCallback() {
            var _this3 = this;

            this.shadowRoot.innerHTML = "\n            <style>\n                .rebel-tag-input {\n                    font-family: 'Helvetica Neue', 'Lucida Grande', sans-serif;\n                    max-width: 100%;\n                    display: flex;\n                    align-content: flex-start;\n                    flex-wrap: wrap;\n                    background-color: #FFF;\n                    border: solid 1px #CCC;\n                    border-radius: 2px;\n                    min-height: 33px;\n                    padding: 0 5px;\n                }\n                #tag-input {\n                    flex-grow: 1;\n                    display: inline-block;\n                    order: 200;\n                    border: none;\n                    height: 33px;\n                    line-height: 33px;\n                    font-size: 14px;\n                    margin: 0;\n                }\n                #tag-input:focus {\n                    outline: none;\n                }\n                .rebel-tag-input div.tag {\n                    display: inline-block;\n                    flex-grow: 0;\n                    margin: 5px 5px 5px 0;\n                    padding: 0 10px;\n                    height: 25px;\n                    line-height: 25px;\n                    background-color: #E1E1E1;\n                    color: #333;\n                    font-size: 14px;\n                    order: 100;\n                    border-radius: 2px;\n                    position: relative;\n                    overflow: hidden;\n                }\n                .rebel-tag-input div.tag.duplicate {\n                    background-color: rgba(255, 64, 27, 0.71);\n                    transition: all 0.3s linear;\n                }\n                .rebel-tag-input div.tag:last-child {\n                    margin-right: 5px;\n                }\n                .rebel-tag-input div.tag .remove {\n                    display: inline-block;\n                    background-color: rgba(255, 64, 27, 0.71);\n                    color: #FFF;\n                    position: absolute;\n                    right: -20px;\n                    width: 20px;\n                    text-align: center;\n                    border-top-right-radius: 2px;\n                    border-bottom-right-radius: 2px;\n                    transition: all 0.3s ease;\n                    cursor: pointer;\n                }\n                .rebel-tag-input div.tag:hover .remove {\n                    right: 0;\n                }\n            </style>\n            <div class=\"rebel-tag-input\">\n                <input type=\"text\" id=\"tag-input\" />\n                <!-- Start Tag Elements -->\n            </div>\n        ";
            var allowDelete = false;
            this.shadowRoot.querySelector('#tag-input').addEventListener("keydown", function (event) {
                var tag = _this3.shadowRoot.querySelector('#tag-input').value;
                if (event.keyCode === 13) {
                    _this3.addTag(tag);
                } else if (event.keyCode === 188) {
                    event.preventDefault();
                    _this3.addTag(tag);
                } else if (event.keyCode === 8 && tag.length === 0) {
                    if (allowDelete) {
                        _this3.deleteTag(_this3.tags.length - 1);
                        allowDelete = false;
                    } else {
                        allowDelete = true;
                    }
                }
            });
        }
    }, {
        key: "value",
        get: function get() {
            return this.tags.join(",");
        }
    }]);

    return RblTagInput;
})(HTMLElement);

document.registerElement("rbl-tag-input", RblTagInput);
