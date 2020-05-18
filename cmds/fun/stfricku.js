const Discord = require('discord.js');
const embeds = require('../../utils/embeds.js');

module.exports.run = async (bot, msg, args) => {
  if(args[0] != null) {
    const embed = new Discord.MessageEmbed()
        .setColor(0xc9405e)
        .setTimestamp()
        .setFooter(msg.author.tag, msg.author.avatarURL())
        .setAuthor("family friendly Acrys", msg.author.avatarURL)
        .addField("hey, " + args[0], "please shut the frick up");
    msg.channel.send({embed: embed});
  } else {
    msg.channel.send({
        embed: embeds.errorEmbed("who am i supposed to tell to st-frick-u?", msg.author.avatarURL(), msg.author.tag)
    });
  }
};

module.exports.help = {
  name: "stfricku",
  arguments: "",
  description: "tell someone to shut the frick up.",
  category: "fun"
}
