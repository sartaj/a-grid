(function(window, document, undefined) {

    // Creates an object based in the HTML Element prototype
    var MyElementProto = Object.create(HTMLElement.prototype);

    // Fires when an instance of the element is created
    MyElementProto.attachedCallback = function() {

        // this is the current element
        // $baseDiv is the base element
            var $baseDiv = document.createElement("div");

        // Attributes on this will dictate the final $baseDiv element
            var $attr = this.attributes;


        // ## Gridding

            // Have col default to col-small for mobile first purposes
            if ($attr['col']) {
                $attr['col-small'] = $attr['col'];
            }

            if ($attr['col-small']) {
                $baseDiv.classList.add('ebcGrid-col-xs-' + $attr['col-small'].value);
            }

            if ($attr['col-large']) {
                $baseDiv.classList.add('ebcGrid-col-md-' + $attr['col-large'].value)
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

                $baseDiv.classList.add('ebcGrid-contentX-xs-' + contentX);

                $baseDiv.classList.add('ebcGrid-contentY-xs-' + contentY);

            }

        // Warn about $attr
        var transferAttr = ['id', 'name'];

        for (var x = 0; x < transferAttr.length; x++) {
            var item = transferAttr[x];
            if ($attr[item]) {
                console.warn(this, "is using an illegal $attr. " + item + " not allowed." );
            }
        }

        // TODO: Transfer classes
        if (this.classList.length) {

        }

        if ($attr['col'] || $attr['col-small'] || $attr['col-large']) {
            var $contentDiv = document.createElement('div');
            $baseDiv.appendChild($contentDiv);
        } else {
            $baseDiv.classList.add('ebcGrid-row');
            $contentDiv = $baseDiv;
        }



            // Transfers child nodes between this and $baseDiv
            // source: http://stackoverflow.com/a/20910214/2026639
            while (this.childNodes.length > 0) {
                $contentDiv.appendChild(this.childNodes[0]);
            }

            // Insert element after this element
            // source: http://stackoverflow.com/a/7258301/2026639
            if(this.parentNode) { // Hack because on the transfer above, some of these get re-run;
                this.parentNode.insertBefore($baseDiv, this.nextSibling);
            }

            // $baseDiv.innerHTML = this.innerHTML;

            // Remove.
            this.remove();


    };

    // Registers element in the main document
    document.registerElement('eg-grid', {
        prototype: MyElementProto
    });

})(window, document);