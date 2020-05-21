const {chars} = require('../../json/chars');
const embeds = require('../../utils/embeds');
const Discord = require("discord.js");
const fs = require('fs');

module.exports.run = async (bot, msg, args) => {
    var charI = Math.floor(Math.random() * chars.length);

    fs.readFile('json/game/claimed.json', (err, data) => {
        if (err) console.log(err)

        if (!data.toString().includes(chars[charI][1])) {
            throwEmbed("Unclaimed");
        } else {
            throwEmbed("Claimed");
        }

        function throwEmbed(status) {
            const embed = new Discord.MessageEmbed()
                .setTitle(chars[charI][1])
                .setColor(0x53e677)
                .setTimestamp()
                .setFooter(msg.author.tag, msg.author.avatarURL())
                .addField('Status: ', status)
                .setImage(chars[charI][0]);
            msg.channel.send(embed);
        }
        });
};

module.exports.help = {
    name: "char",
    arguments: "",
    description: "returns a random available character",
    category: "game"
}
