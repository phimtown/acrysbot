const needle = require('needle');
const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
    needle.get('https://api.alexflipnote.dev/sadcat', function(error, response) {
        if (!error && response.statusCode == 200) {
            const embed = new Discord.MessageEmbed()
            .setColor(0x21a2d1)
            .setTimestamp()
            .setTitle("Here's your sad cat..")
            .setImage(response.body.file)
            .setFooter(msg.author.tag, msg.author.avatarURL());
            msg.channel.send({embed: embed});
        }
    });

};

module.exports.help = {
  name: "sadcat",
  arguments: "",
  description: "drops a random sad cat image.",
  category: "image"
}
