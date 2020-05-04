const Discord = require("discord.js");
const fs = require('fs');
const embeds = require('../utils/embeds.js');

module.exports.run = async (bot, msg, args) => {
        if(args.length > 1){
            switch(args[0]){
                case "enabled":
                writeToFile(args[0]);
                throwEmbed('enabled', args[1]);
                break;
                case "disabled":
                writeToFile(args[0]);
                throwEmbed('disabled', args[1]);
                break;
                default:
                    msg.channel.send({
                        embed: embeds.errorEmbed('Missing arguments. Use acry$ antiraid <enabled/disabled> <mpm>.', msg.author.avatarURL(), msg.author.tag)
                    });

            }
            if(args[1] != null){
                writeToFile(args[1]);
            }
        } else {
            msg.channel.send({
                embed: embeds.errorEmbed('Missing arguments. Use acry$ antiraid <enabled/disabled> <mpm>.', msg.author.avatarURL(), msg.author.tag)
            });
        }

    function writeToFile(arguments){
        fs.appendFile('json/servers/' + msg.guild.id + '_settings.json', JSON.stringify(arguments), (err) => {
            if (err) throw err
            console.log(err);

            return;
        });
        /*
        fs.access('json/servers/' + msg.guild.id + '_settings.json', fs.F_OK, (err) => {
            if(err)
            console.error(err)
            return
        });*/

        fs.unlinkSync('json/servers/' + msg.guild.id + '_settings.json', (err) => {
            if(err)
            console.error(err)
            return
        });

    }

    function throwEmbed(statement, mpm){
    const embed = new Discord.MessageEmbed()
    .setColor(4889423)
    .setTimestamp()
    .setFooter(msg.author.tag, msg.author.avatarURL())
    .setAuthor("antiraid " + statement, bot.user.avatarURL(), "https://acrysbot.xyz/commands")
    .addField("MPM: ", mpm);
    msg.channel.send(embed);
    }
};

module.exports.help = {
    name: "antiraid",
    arguments: "<enabled / disabled> <mpm>",
    description: "enabled / disable antiraid",
    category: "misc"
}