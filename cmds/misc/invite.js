const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
  const embed = new Discord.MessageEmbed()
      .setColor(0xc9405e)
      .setTimestamp()
      .setFooter(msg.author.tag, msg.author.avatarURL())
      .setAuthor("Acrys", msg.author.avatarURL)
      .addField("Invite", "To invite this bot to your server, go to https://acrysbot.xyz/acrysinvite <3");
  msg.channel.send({embed: embed});
};

module.exports.help = {
  name: "invite",
  arguments: "",
  description: "get the discord bots invite link.",
  category: "misc"
}
