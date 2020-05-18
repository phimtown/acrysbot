const needle = require('needle');
const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
    needle.get('https://dog.ceo/api/breeds/image/random', function(error, response) {
        if (!error && response.statusCode == 200) {
            const embed = new Discord.MessageEmbed()
            .setColor(0x21a2d1)
            .setTimestamp()
            .setTitle("Here's your dog!")
            .setImage(response.body.message)
            .setFooter(msg.author.tag, msg.author.avatarURL());
            msg.channel.send({embed: embed});
        }
    });
};

module.exports.help = {
    name: "dog",
    arguments: "",
    description: "drops a random dog image.",
    category: "fun"
}
  