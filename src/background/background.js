var background = {};

(()=>{
    let _settings = {
        blacklistedDomains: []
    };

    const _load = () => {
        return new Promise((resolve, reject)=>{
            chrome.storage.sync.get(_settings, function(settings) {

                // keep global access of this
                _settings = settings;

                resolve(_settings);
            });
        });
    };

    const _save = () => {
        return new Promise((resolve, reject)=>{
            chrome.storage.sync.set(_settings, (settings) => {

                // keep global access of this
                _settings = settings;

                resolve(_settings);
            });
        });
    };

    background.settings = {

        isDomainBlacklisted: (domain) => {
            return _load().then((settings)=>{
                return settings.blacklistedDomains.includes((domain || '').toLowerCase());
            });
        },

        toggleBlacklistedDomain: (domain) => {
            let bl = _settings.blacklistedDomains;
            domain = domain.toLowerCase();
            if(bl.includes(domain)){
                bl.splice(bl.indexOf(domain), 1);
            }else {
                bl.push(domain);
            }
            return _save();
        }
    };
})();


(()=>{
    background.utils = {};
    background.utils.getDomain = () => {
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
})();
