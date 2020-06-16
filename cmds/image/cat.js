const needle = require('needle');
const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
    needle.get('http://aws.random.cat/meow', function(error, response) {
        if (!error && response.statusCode == 200) {
            const embed = new Discord.MessageEmbed()
            .setColor(0x21a2d1)
            .setTimestamp()
            .setTitle("Here's your CAT!")
            .setImage(response.body.file)
            .setFooter(msg.author.tag, msg.author.avatarURL());
            msg.channel.send({embed: embed});
        }
    });

};

module.exports.help = {
  name: "cat",
  arguments: "",
  description: "drops a random cat image.",
  category: "image"
}
