const { embeds } = require('../utils/embeds');

module.exports.run = async (bot, msg, args) => {
  if (!args.length) {
      var __mainguild__ = bot.guilds.cache.get(msg.guild.id);
      var sicon = __mainguild__.iconURL();
      const embed = new Discord.MessageEmbed()
          .setColor(0x53e677)
          .setTimestamp()
          .addField('Created on: ', __mainguild__.createdAt)
          .addField('Members: ', __mainguild__.memberCount)
          .setThumbnail(sicon)
          .setDescription(__mainguild__.name);
      msg.channel.send(embed);
      return;
  } else {
      try {
          var __mainguild__ = bot.guilds.cache.get(args.toString());
          var sicon = __mainguild__.iconURL();

          const embed = new Discord.MessageEmbed()
              .setColor(0x53e677)
              .setTimestamp()
              .setThumbnail(sicon)
              .addField('Created on: ', __mainguild__.createdAt)
              .addField('Members: ', __mainguild__.memberCount)
              .setDescription(__mainguild__.name);
          msg.channel.send(embed);
      } catch (TypeError) {
          console.log(TypeError);
          msg.channel.send({
              embed: embeds.errorEmbed('Guild not found.', msg.author.avatarURL(), msg.author.tag)
          });
      }
  }
};

module.exports.help = {
  name: "server",
  arguments: "<guildID / none>",
  description: "shows information about a server.",
  category: "misc"
}
