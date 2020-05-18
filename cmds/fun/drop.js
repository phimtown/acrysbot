const embeds = require('../../utils/embeds');
const { drops } = require('../../json/drops');
const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
  var fieldsArr = [];
  const embed = new Discord.MessageEmbed()
      .setColor(0x21a2d1)
      .setTimestamp()
      .setFooter(msg.author.tag, msg.author.avatarURL());

  if (args.length > 0) {
      if (!isNaN(args[0])) {
          if (!(args[0] < 1)) {
              if (args[0] <= 10) {
                  for (var i = 0; i <= args[0] - 1; i++) {
                      var dropI = Math.floor(Math.random() * drops.length + 1);
                      embed.addField(drops[dropI][0], drops[dropI][1]);
                  }
              } else {
                  msg.channel.send({
                      embed: embeds.errorEmbed('Specified arguments cannot be more than 10.', msg.author.avatarURL(), msg.author.tag)
                  });
                  return;
              }
          } else {
              msg.channel.send({
                  embed: embeds.errorEmbed('Specified arguments cannot be less than 1.', msg.author.avatarURL(), msg.author.tag)
              });
              return;
          }
      } else {
          msg.channel.send({
              embed: embeds.errorEmbed('Specified arguments are not a number.', msg.author.avatarURL(), msg.author.tag)
          });
          return;
      }
  } else {
      var dropI = Math.floor(Math.random() * drops.length + 1);
      embed.addField(drops[dropI][0], drops[dropI][1]);
  }
  msg.channel.send({embed: embed});
};

module.exports.help = {
  name: "drop",
  arguments: "<1-10>",
  description: "drops a random rap line. optional: add argument to send 1-10 lines.",
  category: "fun"
}
