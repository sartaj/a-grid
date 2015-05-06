// Creates an object based in the HTML Element prototype
var MyElementProto = Object.create(HTMLElement.prototype);

MyElementProto.CSS_MAP = {
    'small': 'col-xs-',
    'medium': 'col-md-',
    'align-x': 'contentX-xs-',
    'align-y': 'contentY-xs-',
    'row': 'row'
};

// Fires when an instance of the element is created
MyElementProto.attachedCallback = function() {

    // this is the current element
    // $baseDiv is the base element
        var $baseDiv = this;

    // Attributes on this will dictate the final $baseDiv element
        var $attr = this.attributes;

        var attrWidth = this.getAttribute('width');
        var attrHeight = this.getAttribute('height');

        var width = attrWidth ? attrWidth + "vw" : "100%";
        var height = attrHeight ? attrHeight + "vh" : "100%";

        this.style.width = width;
        this.style.height = height;

        if(!this.parentNode) return;

        // If parent isn't a group and this isn't a group.
        if(
            !this.parentNode.hasAttribute('group')
            && !this.hasAttribute('group')
        ) {
            // this.parentNode.setAttribute('group', '');
            // console.warn("This element is not inside a group tag. Elements need to be elements to be stored in a group.", "More info: https://sartaj.github.io/structure/help/groups", this)
        }

        function createParent (thisElement) {

            try {

                var parent = thisElement.parentNode;
 
                var newParent = document.createElement('structure-viewport');
                newParent.setAttribute('group','');
 
                newParent.appendChild(parent.childNodes);
                parent.appendChild(newParent);

            } catch(e) {
                console.error(parent, parent.childNodes, newParent);
            }

        }

    // Add content div

        if ($attr['col'] || $attr['small'] || $attr['large']) {
            var $contentDiv = document.createElement('div');
            this.appendChild($contentDiv);
        } else {
            $baseDiv.classList.add(this.CSS_MAP['row']);
            $contentDiv = this;
        }

};

// Registers element in the main document
document.registerElement('structure-viewport', {
    prototype: MyElementProto
});