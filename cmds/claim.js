const chars = require('../json/chars');
const fs = require('fs');
const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) => {
    if (!args.length) {
        msg.channel.send({
            embed: embeds.errorEmbed('Missing character.', msg.author.avatarURL(), msg.author.tag)
        });
    } else {

        fs.readFile('json/game/claimed.json', (err, data) => {
            if (err) throw err
            console.log(err)

            if (!(data.toString().includes(args.toString()))) {
                if (chars.toString().includes(args.toString())) {
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
                    msg.channel.send('Whoop whoop');
                }
            } else {
                msg.channel.send('That character is already claimed.');
            }
        });
    };
}

module.exports.help = {
    name: "claim",
    arguments: "<game char>",
    description: "claim a game character",
    category: "game"
}
