'use strict';
// Creates an object based in the HTML Element prototype
const structFlex = Object.create(HTMLElement.prototype);

structFlex.createdCallback = function() {
    if (this.parentElement.tagName === 'STRUCT-FLEX') {
	    let attrGrow = this.getAttribute('grow') || null;
	    let attrShrink = this.getAttribute('shrink') || null;
	    let attrSize = this.getAttribute('basis') || this.getAttribute('size') || null;

        // Don't waste time if none are specified.
        if (!(attrGrow || attrShrink || attrSize)) return;

        let currentStyle = this.getAttribute('style');
        this.setAttribute('style', [
            'flex:' + [attrGrow || 1, attrShrink || 1, attrSize || 'auto'].join(' '),
            '-ms-flex:' + [attrGrow || 1, attrShrink || 1, attrSize || 'auto'].join(' '),
            '-moz-box-flex:' + [attrGrow || 1, attrShrink || 1, attrSize || 'auto'].join(' '),
            '-webkit-box-flex:' + [attrGrow || 1, attrShrink || 1, attrSize || 'auto'].join(' ')
        ].join(';'));
    }
};
// Registers element in the main document
document.registerElement('struct-flex', {
    prototype: structFlex
});

// Creates an object based in the HTML Element prototype
const structItem = Object.create(HTMLElement.prototype);

// Fires when an instance of the element is created
structItem.createdCallback = function() {

    let attrGrow = this.getAttribute('grow') || null;
    let attrShrink = this.getAttribute('shrink') || null;
    let attrSize = this.getAttribute('basis') || this.getAttribute('size') || null;

    // Don't waste time if none are specified.
    if (!(attrGrow || attrShrink || attrSize)) return;

    let currentStyle = this.getAttribute('style');
    this.setAttribute('style', [
        'flex:' + [attrGrow || 1, attrShrink || 1, attrSize || 'auto'].join(' '),
        '-ms-flex:' + [attrGrow || 1, attrShrink || 1, attrSize || 'auto'].join(' '),
        '-moz-box-flex:' + [attrGrow || 1, attrShrink || 1, attrSize || 'auto'].join(' '),
        '-webkit-box-flex:' + [attrGrow || 1, attrShrink || 1, attrSize || 'auto'].join(' ')
    ].join(';'));
};

// Registers element in the main document
document.registerElement('struct-item', {
    prototype: structItem
});