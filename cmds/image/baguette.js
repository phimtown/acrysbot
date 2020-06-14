const Discord = require("discord.js");
const embeds = require('../../utils/embeds.js');
const request = require('request');

module.exports.run = async (bot, msg, args) => {
    if(args[0]) {
        request(`https://nekobot.xyz/api/imagegen?type=baguette&url=${args[0]}`, { json: true }, (err, res, body) => {
            if (err) {
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
            .setTitle(`Baguette`)
            .setImage(body.message);
            msg.channel.send(embed);
        });
        return;
    }

    if (msg.attachments.size > 0) {
        msg.attachments.forEach(img => {
            request(`https://nekobot.xyz/api/imagegen?type=baguette&url=${img.url}`, { json: true }, (err, res, body) => {
                if (err) {
                    console.log(err);
                    msg.channel.send({
                        embed: embeds.errorEmbed('An error occured.', msg.author.avatarURL(), msg.author.tag)
                    }).then(async msg => msg.delete({timeout: 5000}));
                    return;
                }
                console.log(body.message);
                const embed = new Discord.MessageEmbed()
                .setColor(0x53e677)
                .setTimestamp()
                .setFooter(msg.author.tag, msg.author.avatarURL())
                .setTitle(`Baguette`)
                .setImage(body.message);
                msg.channel.send(embed);
            });
        });
        return;
    }
};


module.exports.help = {
  name: "baguette",
  arguments: "[img]",
  description: "baguette. \nimg: image url or attatched image",
  category: "image"
}
