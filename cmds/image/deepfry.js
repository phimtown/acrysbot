const Discord = require("discord.js");
const embeds = require('../../utils/embeds.js');
const needle = require('needle');

module.exports.run = async (bot, msg, args) => {
    if(args[0]) {
        needle.get(`https://nekobot.xyz/api/imagegen?type=deepfry&image=${args[0]}`, function(err, res) {
            if (err && res.body.status != 200) {
                msg.channel.send({
                    embed: embeds.errorEmbed('An error occured.', msg.author.avatarURL(), msg.author.tag)
                }).then(async msg => msg.delete({timeout: 5000}));
                return;
            }
            const embed = new Discord.MessageEmbed()
            .setColor(0x53e677)
            .setTimestamp()
            .setFooter(msg.author.tag, msg.author.avatarURL())
            .setTitle(`Deepfry`)
            .setImage(res.body.message);
            msg.channel.send(embed);
        });
        return;
    }

    if (msg.attachments.size > 0) {
        msg.attachments.forEach(img => {
            needle.get(`https://nekobot.xyz/api/imagegen?type=deepfry&image=${img.url}`, function(err, res) {
                if (err && res.body.status != 200) {
                    msg.channel.send({
                        embed: embeds.errorEmbed('An error occured.', msg.author.avatarURL(), msg.author.tag)
                    }).then(async msg => msg.delete({timeout: 5000}));
                    return;
                }
                const embed = new Discord.MessageEmbed()
                .setColor(0x53e677)
                .setTimestamp()
                .setFooter(msg.author.tag, msg.author.avatarURL())
                .setTitle(`Deepfry`)
                .setImage(res.body.message);
                msg.channel.send(embed);
            });
        });
        return;
    }
};


module.exports.help = {
  name: "deepfry",
  arguments: "[img]",
  description: "deepfry an image. \nimg: image url or attatched image",
  category: "image"
}
