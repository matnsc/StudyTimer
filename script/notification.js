const notification = {
    show = (values) => {
        if (values.title && values.message && values.image) {
            chrome.notifications.create({
                "type": "basic",
                "iconUrl": chrome.extension.getURL(values.image),
                "title": values.title,
                "message": values.message
            });
        }
    }
}