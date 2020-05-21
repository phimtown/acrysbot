const chars = require('../../json/chars');
const fs = require('fs');
const Discord = require('discord.js');
const embeds = require('../../utils/embeds');

module.exports.run = async (bot, msg, args) => {
    if (!args.length) {
        msg.channel.send({
            embed: embeds.errorEmbed('Missing character.', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({timeout: 5000}));
    } else {

        fs.readFile('json/game/claimed.json', (err, data) => {
            if (err) console.log(err)

            if (!(data.toString().includes(args.toString()))) {
                if (JSON.stringify(chars).includes(args.toString())) {
                    fs.appendFile('json/game/claimed.json', JSON.stringify(args), (err) => {
                        if (err) throw err
                        console.log(err);

                        const embed = new Discord.MessageEmbed()
                        .setTimestamp()
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                        .setDescription('Character was successfully claimed.')
                        .addField('Claimed character: ', args);
                        msg.channel.send(embed);
                        fs.appendFile('json/game/' + msg.member.id + '.json', JSON.stringify(args), (err) => {
                            if (err) throw err
                            console.log(err);
                        });
                    });
                } else {
                    msg.channel.send({
                        embed: embeds.errorEmbed('Character not found.', msg.author.avatarURL(), msg.author.tag)
                    }).then(async msg => msg.delete({timeout: 5000}));
                }
            } else {
                msg.channel.send({
                    embed: embeds.errorEmbed('That character is already claimed.', msg.author.avatarURL(), msg.author.tag)
                }).then(async msg => msg.delete({timeout: 5000}));
            }
        });
    };
}

module.exports.help = {
    name: "claim",
    arguments: "<char>",
    description: "claim a  character",
    category: "game"
}
