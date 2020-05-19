const embeds = require('../../utils/embeds');
const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
  try {
      let __user__ = msg.mentions.users.first();
      let user = msg.guild.member(__user__);

      const embed = new Discord.MessageEmbed()
          .setColor(0x53e677)
          .setTimestamp()
          .setThumbnail(__user__.avatarURL())
          .addField('Joined guild on: ', user.joinedAt)
          .addField('Online status: ', JSON.stringify(__user__.presence.status).toLowerCase())
          .addField('Created account: ', __user__.createdAt)
          .addField('Last message: ', user.lastMessageID)
          .addField('ClientID: ', __user__.id)
          .addField('Discriminator: ', __user__.discriminator)
          .addField('Bot: ', __user__.bot);
      msg.channel.send(embed);
  } catch (TypeError) {
      console.log(TypeError);
      msg.channel.send({
          embed: embeds.errorEmbed('user not found.', msg.author.avatarURL(), msg.author.tag)
      });
  }
};

module.exports.help = {
  name: "user",
  arguments: "<userID>",
  description: "shows information about a user",
  category: "misc"
}
