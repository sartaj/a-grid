// Creates an object based in the HTML Element prototype
var structFlex = Object.create(HTMLElement.prototype);

// Registers element in the main document
document.registerElement('struct-flex', {
    prototype: structFlex
});


// Creates an object based in the HTML Element prototype
var structItem = Object.create(HTMLElement.prototype);

// Fires when an instance of the element is created
structItem.createdCallback = function() {

        var attrGrow = this.getAttribute('grow') || 1,
            attrShrink = this.getAttribute('shrink') || 0,
            attrSize = this.getAttribute('basis') || this.getAttribute('size') || 'auto';

        var currentStyle = this.getAttribute('style');
        this.setAttribute('style', 'flex:' + [attrGrow,attrShrink,attrSize].join(' '));

};

// Registers element in the main document
document.registerElement('struct-item', {
    prototype: structItem
});
