const chars = require('../../json/chars');
const fs = require('fs');
const Discord = require('discord.js');
const embeds = require('../../utils/embeds');

module.exports.run = async (bot, msg, args) => {
    if (args.length != 2) {
        msg.channel.send({
            embed: embeds.errorEmbed('Missing or too many arguments. Try using acry$ trade <user> <char>', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({timeout: 5000}));
    } else {
        fs.readFile('json/game/claimed.json', (err, data) => {
            if (err) console.log(err)

            if(data.toString().includes(args[1].toString())){
                fs.readFile('json/game/' + msg.member.id + '.json', (err, userData) => {
                    if (err) console.log(err)

                    if(userData.toString().includes(args[1])){
                        let __user__ = msg.mentions.users.first();
                        let id = __user__.id;
                        var finalArgs = [args[1]];
                        
                        fs.appendFile('json/game/' + id + '.json', JSON.stringify(finalArgs), (err) => {
                            if (err) console.log(err)

                        const embed = new Discord.MessageEmbed()
                        .setTimestamp()
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                        .setDescription('Character was successfully traded.')
                        .addField('Traded character: ', args[1])
                        .addField('Traded to', __user__);
                        msg.channel.send(embed);

                        var ip = args[1];
                        var newValue = userData.toString().replace(ip, '');

                        fs.writeFile('json/game/' + msg.member.id + '.json', (newValue), (err) => {
                            if (err) console.log(err)
                        })
                        });
                    } else {
                        msg.channel.send({
                            embed: embeds.errorEmbed('You don\'t own this character!', msg.author.avatarURL(), msg.author.tag)
                        }).then(async msg => msg.delete({timeout: 5000}));
                    }
                })
            } else {
                msg.channel.send({
                    embed: embeds.errorEmbed('This character has not been claimed yet. Claim it with acry$ claim <char>', msg.author.avatarURL(), msg.author.tag)
                }).then(async msg => msg.delete({timeout: 5000}));
            }
        })
    }
}

module.exports.help = {
    name: "trade",
    arguments: "<user> <char>",
    description: "trade a character with another user",
    category: "game"
}
