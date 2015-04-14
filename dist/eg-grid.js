(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(window, document) {

    var CSS_MAP = {
        'small': 'col-xs-',
        'medium': 'col-md-',
        'align-x': 'contentX-xs-',
        'align-y': 'contentY-xs-',
        'row': 'row'
    };

    // Creates an object based in the HTML Element prototype
    var MyElementProto = Object.create(HTMLElement.prototype);

    // Fires when an instance of the element is created
    MyElementProto.attachedCallback = function() {

        // this is the current element
        // $baseDiv is the base element
            var $baseDiv = this;

        // Attributes on this will dictate the final $baseDiv element
            var $attr = this.attributes;

        // Add content div

            if ($attr['col'] || $attr['small'] || $attr['large']) {
                var $contentDiv = document.createElement('div');
                $baseDiv.appendChild($contentDiv);
            } else {
                $baseDiv.classList.add(CSS_MAP['row']);
                $contentDiv = $baseDiv;
            }

    };

    // Registers element in the main document
    document.registerElement('eg-grid', {
        prototype: MyElementProto
    });

})(window, document);
},{}]},{},[1])