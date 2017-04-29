const debounce = require('debounce');

// Removing 'input' for now to see if it's actually
// needed. Textarea/contenteditable seems to be the primary
// tools for input with substance.
const VALID_INPUTS = ['textarea'];

let _textChangedListener;
let _onBlurListener;
let _processedText;

const _page = {

    /**
     *  page.init will add the necessary event
     *  listeners to the page to know when we need to react to
     *  user input and show indicators.
     */
    init: ( ) => {

        document.body.addEventListener('focus', (event)=>{

            const target = event.target;
            const isContentEditable = target.getAttribute('contenteditable') === 'true';

            if(!VALID_INPUTS.includes(target.nodeName.toLowerCase()) && !isContentEditable){
                return;
            }

            // process initial text on focus
            _page.processText(isContentEditable ? target.textContent : target.value);

            // using keydown + debounce timing to provide an early event capture
            // to avoid propagation cancelling and debouncing to chunk up processing
            const keydownListener = target.addEventListener('keydown', debounce((event)=>{
                _page.processText(isContentEditable ? target.textContent : target.value);
            }, 300), /*capturePhase*/ true);

            
            const blurListener = target.addEventListener('blur', ()=>{

                target.removeEventListener('keydown', keydownListener);
                target.removeEventListener('blur', blurListener);

                if(_onBlurListener){
                    _onBlurListener();
                }

            }, /*capturePhase*/ true);

        }, /*capturePhase*/ true);

    },


    /**
     *  page.processText is the handler that will do the
     *  calculations to invoke the textProcessor. Note,
     *  it currently does not process already processed content
     */
    processText: (text)=>{

        text = (text || '').trim();

        if(_textChangedListener && _processedText !== text){
            _textChangedListener(text);
            _processedText = text;
        }
    },

    /**
     *  page.textProcessor allows you to register a callback to
     *  react to text that needs processing. On text changing and
     *  when focus occurs on an input that already has values.
     */
    textProcessor: (cb)=>{
        _textChangedListener = cb;
    },

    /**
     *  page.onBlur allows you to know when an our active input loses focus
     */
    onBlur: (cb)=>{
        _onBlurListener = cb;
    }
};

module.exports = _page;
