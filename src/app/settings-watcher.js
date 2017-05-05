const _loadCurrentSettings = () => {
    return new Promise((resolve, reject)=>{
        chrome.storage.sync.get(resolve);
    });
};

const _domainInBlacklistArray = (blacklistedDomains) => {
    return blacklistedDomains.includes(window.location.hostname.toLowerCase());
};

module.exports = {

    /**
     * currentDomainBlacklisted takes the current domain and sees if it is
     * blacklisted (from a content script context)
     */
    currentDomainBlacklisted : () => {
        return _loadCurrentSettings().then((settings)=>{
            return _domainInBlacklistArray(settings.blacklistedDomains || []);
        });
    }
};
