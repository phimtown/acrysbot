const Discord = require("discord.js");
const embeds = require('../../utils/embeds.js');
const request = require('request');
const utils = require('../../utils/utils');

module.exports.run = async (bot, msg, args) => {
    if(msg.mentions.members.size < 2) {
        msg.channel.send({
            embed: embeds.errorEmbed('Mention at least 2 users. Usage: ', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({timeout: 5000}));
        return;
    }
    if(args[0] && msg.mentions.members.size == 2) {
        const u1 = utils.userFromMention(args[0], bot);
        const u2 = utils.userFromMention(args[1], bot);
        request(`https://nekobot.xyz/api/imagegen?type=whowouldwin&user1=${u1.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 })}&user2=${u2.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 })}`, { json: true }, (err, res, body) => {
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
            .setTitle(`Who would win?`)
            .setImage(body.message);
            msg.channel.send(embed);
        });
        return;
    }
};


module.exports.help = {
  name: "whowouldwin",
  arguments: "@user1 @user2",
  description: "who of the two users would win?. \n@user1: first user mention, @user2: second user mention",
  category: "image"
}
