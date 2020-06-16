const Discord = require("discord.js");
const embeds = require('../../utils/embeds.js');
const needle = require('needle');

module.exports.run = async (bot, msg, args) => {
    if(args[0]) {
        var string = "";
        args.forEach(a => {
            string += a + " ";
        });
        needle.get(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${string}`, function(err, res) {
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
            .setTitle(`Trump tweet`)
            .setImage(res.body.message);
            msg.channel.send(embed);
        });
        return;
    }
};


module.exports.help = {
  name: "trumptweet",
  arguments: "<text>",
  description: "create a trump tweet. \ntext: text to trumptweet.",
  category: "image"
}
