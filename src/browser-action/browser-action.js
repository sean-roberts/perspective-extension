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
    return new Promise((resolve, reject)=>{
        chrome.tabs.query({active: true, currentWindow: true}, (arrayOfTabs) => {
            const activeTab = arrayOfTabs[0];
            if(activeTab){
                const url = activeTab.url;
                let domain;

                if (url.indexOf('://') > -1) {
                    return resolve(url.split('/')[2]);
                }

                return resolve(url.split('/')[0]);
            }else {
                reject('no_tab');
            }
        });
    });
};


const initBrowserActionUI = () => {

    let currentDomain;
    const blacklistToggle = document.querySelector('.domain-blacklist-toggle');
    const updateToggleState = ( blacklisted ) => {
        console.log(blacklisted);
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
