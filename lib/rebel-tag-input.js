/**
 * Created by Leon Revill on 10/01/2016.
 * Blog: http://www.revilweb.com
 * GitHub: https://github.com/RevillWeb
 * Twitter: @RevillWeb
 */

class RblTagInput extends HTMLElement {
    createdCallback() {
        this.createShadowRoot();
        this.tags = [];
    }
    addTag(tag) {
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
                $element.className = ($element.className + " duplicate");
                setTimeout(function () {
                    $element.className = $element.className.replace("duplicate", "");
                }, 500);
            }
        }
    }
    get value() {
        return this.tags.join(",");
    }
    render() {
        this.clear();
        this.tags.forEach((tag, idx) => {
            let $tag = document.createElement("div");
            $tag.className = "tag";
            let $remove = document.createElement("div");
            $remove.className = "remove";
            $remove.innerHTML = "x";
            $remove.addEventListener("click", () => {
                this.deleteTag(idx);
            });
            $tag.dataset.index = idx;
            $tag.innerHTML = tag;
            $tag.appendChild($remove);
            this.shadowRoot.querySelector('.rebel-tag-input').appendChild($tag);
        });
    }
    clear() {
        var tagElements = this.shadowRoot.querySelectorAll('.tag');
        if (tagElements.length > 0) {
            for (var i = 0; i < tagElements.length; i++) {
                this.shadowRoot.querySelector('.rebel-tag-input').removeChild(tagElements[i]);
            }
        }
    }
    empty() {
        this.clear();
        this.tags = [];
    }
    deleteTag(index) {
        var newTags = [];
        this.tags.forEach((tag, idx) => {
            if (idx !== index) {
                newTags.push(tag);
            }
        });
        this.tags = newTags;
        this.render();
    }
    attachedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                .rebel-tag-input {
                    font-family: 'Helvetica Neue', 'Lucida Grande', sans-serif;
                    max-width: 100%;
                    display: flex;
                    align-content: flex-start;
                    flex-wrap: wrap;
                    background-color: #FFF;
                    border: solid 1px #CCC;
                    border-radius: 2px;
                    min-height: 33px;
                    padding: 0 5px;
                }
                #tag-input {
                    flex-grow: 1;
                    display: inline-block;
                    order: 200;
                    border: none;
                    height: 33px;
                    line-height: 33px;
                    font-size: 14px;
                    margin: 0;
                }
                #tag-input:focus {
                    outline: none;
                }
                .rebel-tag-input div.tag {
                    display: inline-block;
                    flex-grow: 0;
                    margin: 5px 5px 5px 0;
                    padding: 0 10px;
                    height: 25px;
                    line-height: 25px;
                    background-color: #E1E1E1;
                    color: #333;
                    font-size: 14px;
                    order: 100;
                    border-radius: 2px;
                    position: relative;
                    overflow: hidden;
                }
                .rebel-tag-input div.tag.duplicate {
                    background-color: rgba(255, 64, 27, 0.71);
                    transition: all 0.3s linear;
                }
                .rebel-tag-input div.tag:last-child {
                    margin-right: 5px;
                }
                .rebel-tag-input div.tag .remove {
                    display: inline-block;
                    background-color: rgba(255, 64, 27, 0.71);
                    color: #FFF;
                    position: absolute;
                    right: -20px;
                    width: 20px;
                    text-align: center;
                    border-top-right-radius: 2px;
                    border-bottom-right-radius: 2px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .rebel-tag-input div.tag:hover .remove {
                    right: 0;
                }
            </style>
            <div class="rebel-tag-input">
                <input type="text" id="tag-input" />
                <!-- Start Tag Elements -->
            </div>
        `;
        let allowDelete = false;
        this.shadowRoot.querySelector('#tag-input').addEventListener("keydown", (event) => {
            let tag = this.shadowRoot.querySelector('#tag-input').value;
            if (event.keyCode === 13) {
                this.addTag(tag);
            } else if (event.keyCode === 188) {
                event.preventDefault();
                this.addTag(tag);
            } else if (event.keyCode === 8 && tag.length === 0) {
                if (allowDelete) {
                    this.deleteTag(this.tags.length - 1);
                    allowDelete = false;
                } else {
                    allowDelete = true;
                }
            }
        });
    }
}

document.registerElement("rbl-tag-input", RblTagInput);