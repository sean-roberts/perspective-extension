'use strict';

const getSettings = () => {
    return new Promise((resolve) => {
        // no reject path.. :/
        chrome.runtime.getBackgroundPage((bg)=>{
            resolve(bg.background.settings);
        });
    });
};

const isDomainBlacklisted = (domain) => {
    return getSettings().then((settings)=>{
        return settings.isDomainBlacklisted(domain);
    });
};

const toggleBlacklistedDomain = (domain) => {
    return getSettings().then((settings)=>{
        return settings.toggleBlacklistedDomain(domain);
    });
};

const getDomain = () => {
    return new Promise((resolve) => {
        // no reject path.. :/
        chrome.runtime.getBackgroundPage((bg)=>{
            resolve(bg.background.utils.getDomain());
        });
    });
};


const initBrowserActionUI = () => {

    let currentDomain;
    const blacklistToggle = document.querySelector('.domain-blacklist-toggle');
    const updateToggleState = ( blacklisted ) => {
        blacklistToggle.innerText = blacklisted ? "Yep!" : "Nope!";
    };

    // update dynamic UI elements
    getDomain().then((domain)=>{

        currentDomain = domain;

        // add domain to ui setting
        document.querySelector('.domain').innerText = currentDomain;

        return isDomainBlacklisted(currentDomain);
    }).then(updateToggleState);

    // add controls to the trigger
    blacklistToggle.addEventListener('click', ()=>{
        toggleBlacklistedDomain(currentDomain)
            .then(()=>{
                return isDomainBlacklisted(currentDomain);
            })
            .then(updateToggleState);
    });
};


window.onload = initBrowserActionUI;
