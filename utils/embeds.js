module.exports.errorEmbed = function errorEmbed(message, avatarURL, tag) {
    return {
        "color": 0xf54242,
        "footer": {
          "icon_url": avatarURL,
          "text": tag
        },
        "fields": [
            {
                "name": "Error!",
                "value": message
            }
        ]
      };
}

module.exports.warningEmbed = function warningEmbed(message, avatarURL, tag) {
  return {
      "color": 0xecf542,
      "footer": {
        "icon_url": avatarURL,
        "text": tag
      },
      "fields": [
          {
              "name": "Warning!",
              "value": message
          }
      ]
    };
}

module.exports.notifEmbed = function notifEmbed(title, message, avatarURL, tag) {
  return {
      "color": 0x53e677,
      "footer": {
        "icon_url": avatarURL,
        "text": tag
      },
      "fields": [
          {
              "name": title,
              "value": message
          }
      ]
    };
}
