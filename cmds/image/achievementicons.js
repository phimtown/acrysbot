const Discord = require("discord.js");
const embeds = require('../../utils/embeds.js');
const needle = require('needle');

module.exports.run = async (bot, msg, args) => {
    needle.get(`https://api.alexflipnote.dev/achievement?text=hmm&icon=0`, function (err, res) {
        if (err && res.body.status != 200) {
            console.log(err);
            msg.channel.send({
                embed: embeds.errorEmbed('An error occured.', msg.author.avatarURL(), msg.author.tag)
            }).then(async msg => msg.delete({timeout: 5000}));
            return;
        }
        var arr = [];
        for(i = 0; i < Object.keys(res.body).length; i++) {
            arr.push([Object.keys(res.body)[i], Object.values(res.body)[i]]);
        }
        for (i = 0, j = arr.length; i < j; i += 25) {
            var temparray = arr.slice(i, i + 25);
            const embed = new Discord.MessageEmbed()
            .setColor(0x53e677)
            .setTimestamp()
            .setFooter(msg.author.tag, msg.author.avatarURL())
            .setTitle(`Achievement Icons`);
            temparray.forEach(i => {
                embed.addField(i[0], i[1], true);
            });
            msg.channel.send(embed).then(async msg => msg.delete({timeout: 5000}));
        }
    });
    return;
};


module.exports.help = {
    name: "achievementicons",
    arguments: "",
    description: "lists all icons you can use for acry$ achievement.",
    category: "image"
}