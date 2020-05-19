const Discord = require('discord.js');
const embeds = require('../../utils/embeds.js');

module.exports.run = async (bot, msg, args) => {
  if(args[0] != null) {
    const embed = new Discord.MessageEmbed()
        .setColor(0xc9405e)
        .setTimestamp()
        .setFooter(msg.author.tag, msg.author.avatarURL())
        .setAuthor("Acrys", msg.author.avatarURL)
        .addField("hey, " + args[0], "please shut the fuck up");
    msg.channel.send({embed: embed});
  } else {
    msg.channel.send({
        embed: embeds.errorEmbed("who am i supposed to tell to stfu?", msg.author.avatarURL(), msg.author.tag)
    }).then(async msg => msg.delete({timeout: 5000}));
  }
};

module.exports.help = {
  name: "stfu",
  arguments: "",
  description: "tell someone to shut the fuck up.",
  category: "fun"
}
