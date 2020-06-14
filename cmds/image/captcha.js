const Discord = require("discord.js");
const embeds = require('../../utils/embeds.js');
const request = require('request');

module.exports.run = async (bot, msg, args) => {
    if(args[0]) {
        var string = "";
        args.slice(1).forEach(a => {
            string += a + " ";
        });
        request(`https://nekobot.xyz/api/imagegen?type=captcha&url=${args[0]}&username=${string}`, { json: true }, (err, res, body) => {
            if (err) {
                msg.channel.send({
                    embed: embeds.errorEmbed('An error occured.', msg.author.avatarURL(), msg.author.tag)
                }).then(async msg => msg.delete({timeout: 5000}));
                return;
            }
            const embed = new Discord.MessageEmbed()
            .setColor(0x53e677)
            .setTimestamp()
            .setFooter(msg.author.tag, msg.author.avatarURL())
            .setTitle(`Captcha`)
            .setImage(body.message);
            msg.channel.send(embed);
        });
        return;
    }
};


module.exports.help = {
  name: "captcha",
  arguments: "<imageurl> <name>",
  description: "recaptcha with an custom image and title.\nimgurl: image url, name: name for the image",
  category: "image"
}
