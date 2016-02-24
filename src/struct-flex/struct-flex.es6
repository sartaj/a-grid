'use strict';
// Creates an object based in the HTML Element prototype

(function() {
    document.addEventListener('animationend', dispatchEvent, false);

    // check the animation name and operate accordingly
    var currentSize = "";
    function dispatchEvent(event) {
        if (event.animationName.substr(0,9)!=="min-width") return;
        currentSize = event.animationName.split('-').pop();
        let size;
        if (currentSize=='width') {
            currentSize="";
            size="";
        } else {
            size="-"+currentSize;
        }
        //console.log('Size changed to:',currentSize);
        let attributeValues = ['basis','size','grow','shrink']
            .map(x => 'struct-flex['+x+size+'],'+'struct-item['+x+size+']')
            .join(",");
        // Select nodes that should change, and affect the change.
        [].slice.apply(document.querySelectorAll(attributeValues)).forEach(setAttributes.bind);
    }

    function setAttributes() {
        let size=currentSize?"-"+currentSize:"";
        let grow = this.hasAttribute('grow'+size)?'grow'+size:'grow';
        let shrink = this.hasAttribute('shrink'+size)?'shrink'+size:'shrink';
        let basis = this.hasAttribute('basis'+size)?'basis'+size:'basis';
        basis = basis?basis:this.hasAttribute('size'+size)?'size'+size:'size';

        let attrGrow =  this.hasAttribute(grow)?this.getAttribute(grow):0;
        let attrShrink = this.hasAttribute(shrink)?this.getAttribute(shrink):null;
        let attrSize = this.hasAttribute(basis)?this.getAttribute(basis):null;

        //console.debug('Using %s:%s,%s:%s,%s:%s',basis,attrSize,grow,attrGrow,shrink,attrShrink);

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
                let attrList = [
                    'basis', 'basis-small', 'basis-medium', 'basis-large', 'basis-xlarge', 'basis-xxlarge'
                  , 'size', 'size-small', 'size-medium', 'size-large', 'size-xlarge', 'size-xxlarge'
                  , 'grow', 'grow-small', 'grow-medium', 'grow-large', 'grow-xlarge', 'grow-xxlarge'
                  , 'shrink', 'shrink-small', 'shrink-medium', 'shrink-large', 'shrink-xlarge', 'shrink-xxlarge'
                ];
                this.setAttribute('data-watch','1')
                if (this.getAttribute('style'))
                    this.setAttribute('data-style',this.getAttribute('style'));
                setAttributes.call(this);
                (new MutationObserver((mutations) => {
                    mutations/*.filter(mut => mut.type!='attributes')*/
                             .forEach(setAttributes.bind(this)) //mut => console.log('Attributes changed %s %O %O',this.getAttribute('data-watch'),this,mut));
                })).observe(this,{ attributes: true, childList: false, characterData: false, subtree: false, attributeFilter: attrList });
            } else {
                let t = this.getAttribute('data-watch')*1+1;
                console.warn('create callback called %s times on same node %O',t,this);
                this.setAttribute('data-watch',t);
            }
        }
    }
     
    const structFlex = Object.create(HTMLElement.prototype);
    structFlex.createdCallback = createCallback;
    document.registerElement('struct-flex', {
        prototype: structFlex
    });

    const structItem = Object.create(HTMLElement.prototype);
    structItem.createdCallback = createCallback;
    document.registerElement('struct-item', {
        prototype: structItem
    });
})();
