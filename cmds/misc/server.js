const embeds = require('../../utils/embeds');
const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
	if (!args.length) {
		let __mainguild__ = bot.guilds.cache.get(msg.guild.id);
		var sicon = __mainguild__.iconURL();
		throwEmbed(sicon, __mainguild__);
		return;
	}
	else {
		try {
			let __mainguild__ = bot.guilds.cache.get(args.toString());
			throwEmbed(sicon, __mainguild__);

		}
		catch (TypeError) {
			console.log(TypeError);
			msg.channel.send({
				embed: embeds.errorEmbed('Guild not found.', msg.author.avatarURL(), msg.author.tag)
			}).then(async msg => msg.delete({timeout: 5000}));
		}
	}

	function throwEmbed(icon, mainguild) {
		const embed = new Discord.MessageEmbed()
			.setColor(0x53e677)
			.setTimestamp()
			.setThumbnail(icon)
			.addField('Created on: ', mainguild.createdAt)
			.addField('Members: ', mainguild.memberCount)
			.setDescription(mainguild.name);
		msg.channel.send(embed);
	}
};

module.exports.help = {
	name: "server",
	arguments: "<guildID / none>",
	description: "shows information about a server.",
	category: "misc"
}
