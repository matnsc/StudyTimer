const badge = {
    update = (values) => {
        if (values.color) {
            chrome.browserAction.setBadgeBackgroundColor({
                color: value
            });
        }
        
        if (values.text) {
            chrome.browserAction.setBadgeText({
                text: value
            });
        }
    }
}