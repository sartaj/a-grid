// Creates an object based in the HTML Element prototype
var structureFluid = Object.create(HTMLElement.prototype);

structureFluid.CSS_MAP = {
    'small': 'col-xs-',
    'medium': 'col-md-',
    'align-x': 'contentX-xs-',
    'align-y': 'contentY-xs-',
    'row': 'row'
};

// Fires when an instance of the element is created
structureFluid.createdCallback = function() {

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
            // // $baseDiv.classList.add(this.CSS_MAP['row']);
            // $contentDiv = $baseDiv;
        }

};

// Registers element in the main document
document.registerElement('structure-fluid', {
    prototype: structureFluid
});