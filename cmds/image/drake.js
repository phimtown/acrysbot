const Discord = require("discord.js");
const embeds = require('../../utils/embeds.js');
const needle = require('needle');

module.exports.run = async (bot, msg, args) => {
    if (args[0]) {
        var string = "";
        args.forEach(a => {
            string += a + "%20";
        });
        string = string.split("|");
        var top = string[0];
        var bottom = string[1];
        if (top && bottom) {
            needle.get(`https://api.alexflipnote.dev/drake?top=${top}&bottom=${bottom}`, function (err, res) {
                if (err && res.body.status != 200) {
                    console.log(err);
                    msg.channel.send({
                        embed: embeds.errorEmbed('An error occured.', msg.author.avatarURL(), msg.author.tag)
                    }).then(async msg => msg.delete({
                        timeout: 5000
                    }));
                    return;
                }
                const embed = new Discord.MessageEmbed()
                    .setColor(0x53e677)
                    .setTimestamp()
                    .setFooter(msg.author.tag, msg.author.avatarURL())
                    .setTitle(`Drake`)
                    .setImage(`https://api.alexflipnote.dev/drake?top=${top}&bottom=${bottom}`);
                msg.channel.send(embed);
            });
        }
        return;
    }
};


module.exports.help = {
    name: "drake",
    arguments: "<text | text2>",
    description: "create a drake meme. \nseperate top and bottom text with a |. example: acry$ drake i\'m a top text|i\'m a bottom text",
    category: "image"
}