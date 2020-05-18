const Discord = require("discord.js");
const fs = require('fs');
const embeds = require('../../utils/embeds.js');

module.exports.run = async(bot, msg, args) => {
  if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
    msg.channel.send({
      embed: embeds.errorEmbed('No permissions!', msg.author.avatarURL(), msg.author.tag)
    });
    return;
  }
  if (args.length > 1) {
    if (args[1] != null) {
      switch (args[0]) {
        case "enabled":
          writeToFile(args);
          throwEmbed('enabled', args[1]);
          break;
        case "disabled":
          writeToFile(args);
          throwEmbed('disabled', args[1]);
          break;
        default:
          msg.channel.send({
            embed: embeds.errorEmbed('Missing arguments. Use acry$ antiraid <enabled/disabled> <mpm>.', msg.author.avatarURL(), msg.author.tag)
          });

      }
    }
  } else {
    msg.channel.send({
      embed: embeds.errorEmbed('Missing arguments. Use acry$ antiraid <enabled/disabled> <mpm>.', msg.author.avatarURL(), msg.author.tag)
    });
  }

  function writeToFile(arguments) {
    fs.writeFile('json/servers/' + msg.guild.id + '_settings.json', JSON.stringify(arguments), (err) => {
      if (err) throw err
      console.log(err);
      return;
    });
  }

  function throwEmbed(statement, mpm) {
    const embed = new Discord.MessageEmbed()
      .setColor(4889423)
      .setTimestamp()
      .setFooter(msg.author.tag, msg.author.avatarURL())
      .setAuthor("antiraid " + statement, bot.user.avatarURL(), "https://acrysbot.xyz/commands")
      .addField("MPM: ", mpm);
    msg.channel.send(embed);
  }
};

//todo: make mpm optional if already set
module.exports.help = {
  name: "antiraid",
  arguments: "<enabled / disabled> [mpm]",
  description: "enable/disable antiraid. requires MANAGE_MESSAGES permission.",
  category: "moderation"
}