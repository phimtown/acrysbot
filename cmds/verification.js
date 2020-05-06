const embeds = require('../utils/embeds');
const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, msg, args) => {
  if(msg.member.hasPermission("MANAGE_CHANNELS")){
    if (args[0] != null) {
      let channelid = args[0].toString();
      const embed = new Discord.MessageEmbed()
      .setTimestamp()
      .setDescription('Verification')
      .addField('Added verification to channel', channelid)
      .setColor();
      msg.channel.send(embed);
      fs.writeFile('json/' + bot.guilds.cache.get(msg.guild.id) + 'verify.json', JSON.stringify(args[0]), (err) => {
          if (err) throw err
          console.log(err);
      });
   } else {
       msg.channel.send('> Error: missing channelID');
  }
  }
};

module.exports.help = {
  name: "verification",
  arguments: "<channelID>",
  description: "adds verification to channel",
  category: "misc"
}
