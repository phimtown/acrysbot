const Discord = require("discord.js");
const embeds = require('../../utils/embeds.js');
const needle = require('needle');

module.exports.run = async (bot, msg, args) => {
    if(args[0]) {
        var string = "";
        args.forEach(a => {
            string += a + "%20";
        });
        string = string.split("|");
        var text = string[0];
        var icon = string[1];
        if(icon) {
            if(parseInt(icon.replace('%20', '')) <= 45 && parseInt(icon.replace('%20', '')) > 0) {
                needle.get(`https://api.alexflipnote.dev/achievement?text=${text}&icon=${icon}`, function(err, res) {
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
                    .setTitle(`Achievement`)
                    .setImage(`https://api.alexflipnote.dev/achievement?text=${text}&icon=${icon}`);
                    msg.channel.send(embed);
                });
            } else {
                needle.get(`https://api.alexflipnote.dev/achievement?text=${text}`, function(err, res) {
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
                .setTitle(`Achievement`)
                .setImage(`https://api.alexflipnote.dev/achievement?text=${text}`);
                msg.channel.send(embed);
            });
            }
        } else {
            needle.get(`https://api.alexflipnote.dev/achievement?text=${text}`, function(err, res) {
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
                .setTitle(`Achievement`)
                .setImage(`https://api.alexflipnote.dev/achievement?text=${text}`);
                msg.channel.send(embed);
            });
        }
        return;
    }
};


module.exports.help = {
  name: "achievement",
  arguments: "<text>",
  description: "create a minecraft achievement image. \nseperate text (and optional icon, acry$ achievementicons for a list of icons) with a |. example: acry$ achievement i\'m an achievement text[| 1-45]",
  category: "image"
}
