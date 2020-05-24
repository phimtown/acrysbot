const chars = require('../../json/chars');
const fs = require('fs');
const Discord = require('discord.js');
const embeds = require('../../utils/embeds');

module.exports.run = async (bot, msg, args) => {
    fs.readFile('json/game/' + msg.member.id + '.json', (err, data) => {
        if (err) {
            msg.channel.send({
                embed: embeds.errorEmbed('Inventory not found.', msg.author.avatarURL(), msg.author.tag)
            }).then(async msg => msg.delete({ timeout: 5000 }));
            return
        }
        var tempdata = data.toString().split(']');
        var wtf = tempdata.toString().split('[');
        var tempxd = wtf.toString().replace(/,/gi, " ");
        var xdddd = tempxd.toString().split('"');

        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setFooter(msg.author.tag, msg.author.avatarURL())
            .setDescription('Inventory')
            .addField('Characters: ', xdddd);
        msg.channel.send(embed);
    });
}


module.exports.help = {
    name: "inv",
    arguments: "",
    description: "shows your inventory",
    category: "game"
}
