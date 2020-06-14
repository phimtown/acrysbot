const Discord = require("discord.js");
const embeds = require('../../utils/embeds');
const utils = require('../../utils/utils');

module.exports.run = async (bot, msg, args) => {
    if (args[0]) {
		const u = utils.userFromMention(args[0], bot);
		if (!u) {
            msg.channel.send({
                embed: embeds.errorEmbed('Please use a proper mention if you want to see someone else\'s avatar.', msg.author.avatarURL(), msg.author.tag)
            }).then(async msg => msg.delete({timeout: 5000}));
            return;
		}

        const embed = new Discord.MessageEmbed()
          .setColor(0x53e677)
          .setTimestamp()
          .setFooter(msg.author.tag, msg.author.avatarURL())
          .setDescription('Here\'s your avatar!')
          .setURL(u.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
          .setTitle(`Avatar: ${u.username}`)
          .setThumbnail(u.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }));
        msg.channel.send(embed);
        return;
	}

    const embed = new Discord.MessageEmbed()
          .setColor(0x53e677)
          .setTimestamp()
          .setFooter(msg.author.tag, msg.author.avatarURL())
          .setDescription('Here\'s your avatar!')
          .setURL(msg.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
          .setTitle(`Avatar: ${msg.author.username}`)
          .setThumbnail(msg.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }));
    msg.channel.send(embed);
};

module.exports.help = {
  name: "avatar",
  arguments: "@mention",
  description: "returns the avatar of the mentioned user.",
  category: "misc"
}
