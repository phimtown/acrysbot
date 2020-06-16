const Discord = require("discord.js");
const embeds = require('../../utils/embeds.js');
const needle = require('needle');
const utils = require('../../utils/utils');

module.exports.run = async (bot, msg, args) => {
    if(msg.mentions.members.size < 1) {
        msg.channel.send({
            embed: embeds.errorEmbed('Mention at least 1 user. Usage: ', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({timeout: 5000}));
        return;
    }
    if(args[0] && msg.mentions.members.size >= 1) {
        const u1 = utils.userFromMention(args[0], bot);
        needle.get(`https://nekobot.xyz/api/imagegen?type=lolice&url=${u1.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 })}`, function(err, res) {
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
            .setTitle(`Lolice`)
            .setImage(res.body.message);
            msg.channel.send(embed);
        });
        return;
    }
};


module.exports.help = {
  name: "lolice",
  arguments: "@user",
  description: "lolice chief. \n@user: mention of user you want to lolice.",
  category: "image"
}
