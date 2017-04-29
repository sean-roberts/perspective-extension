
let _indicator;
const _indicatorBaseClassName = 'feedback-icon';


/**
 * Lazy loader of the indicator css
 */
const _lazyCssInjection = (()=>{
    let injected = false;

    return ()=>{
        if(injected){
            return;
        }

        const styleInject = document.createElement('link');
        styleInject.rel = 'stylesheet';
        styleInject.type = 'text/css';
        styleInject.href = chrome.extension.getURL('src/app/perspective-indicator.css');
        (document.head || document.documentElement).appendChild(styleInject);
        injected = true;
    };
})();


/**
 * Lazy loader of the indicator html
 */
const _lazyIndicatorInjection = (()=>{
    let injected = false;

    return ()=>{
        if(injected){
            return;
        }

        _indicator = document.createElement('div');
        _indicator.className = _indicatorBaseClassName;

        document.body.appendChild(_indicator);
        injected = true;
    };
})();


/**
 * Given the current element, position the indicator
 * at the lower right of the element.
 */
const _positionIndicator = (activeElement)=>{

    const indicatorPadding = 10;
    const indicatorSideLength = 15 + indicatorPadding;
    const elRect = activeElement.getBoundingClientRect();

    // getBoundingClientRect top/left are not static and are based on the viewport.
    // adding scrollX/Y allows us to get top/left based on the document.
    _indicator.style.top = (window.scrollY + elRect.top + elRect.height - indicatorSideLength) + 'px';
    _indicator.style.left = (window.scrollX + elRect.left + elRect.width - indicatorSideLength) + 'px';
};



/**
 * Put the indicator where it needs to be and apply the
 * state class that corresponds to the state. Then update
 * the indicator background color based on the level, if provided.
 */
const _showIndicator = (className, level)=>{

    // add needed css/dom
    _lazyCssInjection();
    _lazyIndicatorInjection();

    // move indicator into correct position
    _positionIndicator(document.activeElement);

    _indicator.className = _indicatorBaseClassName + ' ' + className;

    if(level !== undefined){
        _indicator.style.backgroundPositionX = (level * 100) + '%';
    }

    // make the indicator visible
    _indicator.style.display = 'block';
};

const _hide = ()=>{
    if(_indicator){
        _indicator.style.display = 'none';
    }
};

module.exports = {

    hide: _hide,

    showForLevel: (level)=>{

        let stateClass = 'dot';

        if(level > .35 && level < .65){
            stateClass = 'square';
        }else if(level >= .65) {
            stateClass = 'diamond';
        }

        _showIndicator(stateClass, level);
    },

    showLoading: ()=>{
        _showIndicator('loading');
    },

    showError: ()=>{
        _showIndicator('error');
    }
};
