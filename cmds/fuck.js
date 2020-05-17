const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
  const embed = new Discord.MessageEmbed()
      .setColor(0xc9405e)
      .setTimestamp()
      .setFooter(msg.author.tag, msg.author.avatarURL())
      .setAuthor("01100001 01100011 01110010 01111001 01110011 01100100", msg.author.avatarURL)
      .addField("fuck", "you");
  msg.channel.send({embed: embed});
};

module.exports.help = {
  name: "fuck",
  arguments: "",
  description: "well.. says fuck you.",
  category: "misc"
}
