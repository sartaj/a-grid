(function(window, document, undefined) {

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

        // ## Gridding

            if ($attr['small']) {
                $baseDiv.classList.add(CSS_MAP['small'] + $attr['small'].value);
            }

            if ($attr['large']) {
                $baseDiv.classList.add(CSS_MAP['large'] + $attr['large'].value)
            }

        // ### Aligning

            if ($attr['align']) {

                // Expecting align to be either 1 or 2 space separated alignments
                var attrArray = $attr['align'].value.split(" ");

                // If only 1 alignment, make both X and Y the same
                if (attrArray.length === 1) {
                    attrArray.push(attrArray[0]);
                }

                var contentX = attrArray[0];

                var contentY = attrArray[1] || '';

                $baseDiv.classList.add(CSS_MAP['align-x'] + contentX);

                $baseDiv.classList.add(CSS_MAP['align-y'] + contentY);

            }

        if ($attr['col'] || $attr['small'] || $attr['large']) {
            var $contentDiv = document.createElement('div');
            $baseDiv.appendChild($contentDiv);
        } else {
            $baseDiv.classList.add(CSS_MAP['row']);
            $contentDiv = $baseDiv;
        }

            // // Transfers child nodes between this and $baseDiv
            // // source: http://stackoverflow.com/a/20910214/2026639
            // while (this.childNodes.length > 0) {
            //     $contentDiv.appendChild(this.childNodes[0]);
            // }

            // // Insert element after this element
            // // source: http://stackoverflow.com/a/7258301/2026639
            // if(this.parentNode) { // Hack because on the transfer above, some of these get re-run;
            //     this.parentNode.insertBefore($baseDiv, this.nextSibling);
            // }

            // // $baseDiv.innerHTML = this.innerHTML;

            // // Remove.
            // this.remove();


    };

    // Registers element in the main document
    document.registerElement('eg-grid', {
        prototype: MyElementProto
    });

})(window, document);