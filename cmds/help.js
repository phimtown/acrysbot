module.exports.run = async (bot, msg, args) => {
  var helpEmbed = {
      "color": 4889423,
      "timestamp": timestamp,
      "footer": {
          "icon_url": msg.author.avatarURL(),
          "text": msg.author.tag
      },
      "author": {
          "name": "acrys//bot commands" + title,
          "url": "https://acrysbot.xyz/commands",
          "icon_url": bot.user.avatarURL()
      },
      "fields": [{
          "name": "link to the commands list.",
          "value": "https://acrysbot.xyz/commands"
      }]
  };
  msg.channel.send({
      embed: helpEmbed
  });
};

module.exports.help = {
  name: "help",
  arguments: "",
  description: "lists all commands.",
  category: "help"
}
