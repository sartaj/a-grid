'use strict';
// Creates an object based in the HTML Element prototype
const structFlex = Object.create(HTMLElement.prototype);

function setAttributes() {
    let attrGrow = this.hasAttribute('grow')?this.getAttribute('grow'):0;
    let attrShrink = this.hasAttribute('shrink')?this.getAttribute('shrink'):null;
    let attrSize = this.hasAttribute('basis')||this.hasAttribute('size')?this.getAttribute('basis')||this.getAttribute('size'):null;

        // Don't waste time if none are specified.
        if (!(attrGrow || attrShrink || attrSize)) return;

        let saved = this.getAttribute('data-style')||"";

        this.setAttribute('style', saved.split(';').concat([
            ['flex:', attrGrow, attrShrink, attrSize || 'auto'].join(' '),
            ['-ms-flex:', attrGrow, attrShrink, attrSize || 'auto'].join(' '),
            ['-moz-box-flex:', attrGrow, attrShrink, attrSize || 'auto'].join(' '),
            ['-webkit-flex:', attrGrow, attrShrink, attrSize || 'auto'].join(' ')
            ]).join(';'));

}
function createCallback() {
    if (this.tagName === 'STRUCT-ITEM' || (this.parentElement && 'STRUCT-FLEX' === this.parentElement.tagName)) {
        if (this.getAttribute('data-watch')==null) {
            // List of attributes that (when changed) can affect the layout and should be observed.
            let attrList = ['basis','size','grow','shrink'];
            this.setAttribute('data-watch','1')
            setAttributes.call(this);
            let mWatcher = new MutationObserver((mutations) => {
                mutations/*.filter(mut => mut.type!='attributes')*/
                         .forEach(setAttributes.bind(this)) //mut => console.log('Attributes changed %s %O %O',this.getAttribute('data-watch'),this,mut));
            }).observe(this,{ attributes: true, childList: false, characterData: false, subtree: false, attributeFilter: attrList });
        } else {
            let t = this.getAttribute('data-watch')*1+1;
            console.warn('create callback called %s times on same node %O',t,this);
            this.setAttribute('data-watch',t);
        }
    }
}
 
 /*
structFlex.attachedCallback = function() {
    console.log("Attached %s %O",this.getAttribute('data-watch'),this);
}

structFlex.detachedCallback = function() {
    console.log("Detached %s %O",this.getAttribute('data-watch'),this);
}
/*
structFlex.attributeChangedCallback = function() {
    console.log("Attributes Changed %s %O",this.getAttribute('data-watch'),this);
    setAttributes.apply(this,arguments);
}
*/

structFlex.createdCallback = function() {
    // Call common creation code. 
    createCallback.apply(this,arguments);
}
// Registers element in the main document
document.registerElement('struct-flex', {
    prototype: structFlex
});

// Creates an object based in the HTML Element prototype
const structItem = Object.create(HTMLElement.prototype);

// Fires when an instance of the element is created
structItem.createdCallback = function() {
    // Call common creation code. 
    createCallback.apply(this,arguments);
}
/*
structItem.detachedCallback = function() {
    console.log("Detached from %O",this);
}
structItem.attachedCallback = function() {
    console.log("Attached %s %O",this.getAttribute('data-watch'),this);
}
/*
structItem.attributeChangedCallback = function() {
    console.log("Attributes Changed %s %O",this.getAttribute('data-watch'),this);
    setAttributes.apply(this,arguments);
}
*/
// Registers element in the main document
document.registerElement('struct-item', {
    prototype: structItem
});