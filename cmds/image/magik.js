const Discord = require("discord.js");
const embeds = require('../../utils/embeds.js');
const needle = require('needle');

module.exports.run = async (bot, msg, args) => {
    if(args[0]) {
        if(args[1]) {
            needle.get(`https://nekobot.xyz/api/imagegen?type=magik&image=${args[0]}&intensity=${args[1]}`, function(err, res) {
                if (err && res.body.status != 200) {
                    console.log(err);
                    msg.channel.send({
                        embed: embeds.errorEmbed('An error occured.', msg.author.avatarURL(), msg.author.tag)
                    }).then(async msg => msg.delete({timeout: 5000}));
                    return;
                }
                const embed = new Discord.MessageEmbed()
                .setColor(0x53e677)
                .setTimestamp()
                .setFooter(msg.author.tag, msg.author.avatarURL())
                .setTitle(`Magik`)
                .setDescription(`Intensity: ${args[1]}`)
                .setImage(res.body.message);
                msg.channel.send(embed);
            });
            return;
        } else {
            msg.channel.send({
                embed: embeds.errorEmbed('Not enough args provided. Use acry$ magik <url> <intensity: 1-10>.', msg.author.avatarURL(), msg.author.tag)
            }).then(async msg => msg.delete({timeout: 5000}));
        }
    } else {
        msg.channel.send({
            embed: embeds.errorEmbed('No args provided. Use acry$ magik <url> <intensity: 1-10>.', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({timeout: 5000}));
    }
};


module.exports.help = {
  name: "magik",
  arguments: "<url> <intensity>",
  description: "image magik woo. \nurl: image url, intensity: magik intensity between 1-10",
  category: "image"
}
