// var CSS_MAP = {
//     'small': 'col-xs-',
//     'medium': 'col-md-',
//     'align-x': 'contentX-xs-',
//     'align-y': 'contentY-xs-',
//     'row': 'row'
// };

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