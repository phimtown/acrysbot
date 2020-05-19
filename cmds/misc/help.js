const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor(4889423)
    .setTimestamp()
    .setFooter(msg.author.tag, msg.author.avatarURL())
    .setAuthor("Acrys commands", bot.user.avatarURL(), "https://acrysbot.xyz/commands")
    .addField("link to the commands list.", "https://acrysbot.xyz/commands");
    msg.channel.send(embed).then(async msg => msg.delete({timeout: 15000}));
};

module.exports.help = {
  name: "help",
  arguments: "",
  description: "lists all commands.",
  category: "misc"
}
