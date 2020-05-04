'use strict'
module.exports = {
    errorEmbed: (message, avatarURL, tag) => {
        return {
            "color": 0xf54242,
            "footer": {
                "icon_url": avatarURL,
                "text": tag
            },
            "fields": [{
                "name": "Error!",
                "value": message
            }]
        };
    },
    warningEmbed: (message, avatarURL, tag) => {
        return {
            "color": 0xecf542,
            "footer": {
                "icon_url": avatarURL,
                "text": tag
            },
            "fields": [{
                "name": "Warning!",
                "value": message
            }]
        };
    },
    notifEmbed: (title, message, avatarURL, tag) => {
        return {
            "color": 0x53e677,
            "footer": {
                "icon_url": avatarURL,
                "text": tag
            },
            "fields": [{
                "name": title,
                "value": message
            }]
        };
    }
};
