const embeds = require('../../utils/embeds');
const Discord = require('discord.js');
const jt = require('json-toolkit');
const fs = require('fs');

module.exports.run = async (bot, msg, args) => {
    if (msg.member.hasPermission("MANAGE_CHANNELS")) {
        if (args[0] == "channel" || args[0] == "rolename") {
            switch(args[0]) {
              case "channel":
              if(args[1] != null) {
                  if(!isNaN(args[1])) {
                    if(msg.guild.channels.cache.find(c => c.id === args[1])) {
                      let channelid = args[1].toString();
                      jt.saveToFile(channelid, 'json/servers/verification/' + bot.guilds.cache.get(msg.guild.id) + '_channel.json', '\t', (error) => {
                        if(error) {
                          console.log(error);
                          return;
                        }
                      });
                      const embed = new Discord.MessageEmbed()
                          .setTimestamp()
                          .setDescription('Verification')
                          .addField('Added verification to channel', channelid)
                          .setColor();
                      msg.channel.send(embed);
                      const c = msg.guild.channels.cache.find(c => c.id === args[1]);
                      const verificationEmbed = new Discord.MessageEmbed()
                          .setTimestamp()
                          .setDescription('Verification')
                          .addField('Please type \'verify\' to verify on this server.', "This is an extra protection step.")
                          .setColor(0xeb8c34);
                      c.send({embed: verificationEmbed});
                    } else {
                      msg.channel.send({
                          embed: embeds.errorEmbed("Channel not found!", msg.author.avatarURL(), msg.author.tag)
                      }).then(async msg => msg.delete({timeout: 5000}));
                    }
                  } else {
                    msg.channel.send({
                        embed: embeds.errorEmbed("Invalid <channelID>!", msg.author.avatarURL(), msg.author.tag)
                    }).then(async msg => msg.delete({timeout: 5000}));
                  }
              } else {
                msg.channel.send({
                    embed: embeds.errorEmbed("Missing arguments! <channelID> expected.", msg.author.avatarURL(), msg.author.tag)
                }).then(async msg => msg.delete({timeout: 5000}));
              }
              break;
              case "rolename":
              if(args[1] != null) {
                var roleName = "";
                for(var i = 1; i < args.length; i++) {
                  if(i != 1) {
                    roleName += " " + args[i];
                  } else {
                    roleName += args[i];
                  }
                }
                if(msg.member.guild.roles.cache.find(role => role.name === roleName)) {
                  jt.saveToFile(roleName, 'json/servers/verification/' + bot.guilds.cache.get(msg.guild.id) + '_role.json', '\t', (error) => {
                    if(error) {
                      console.log(error);
                      return;
                    }
                  });
                  const embed = new Discord.MessageEmbed()
                      .setTimestamp()
                      .setDescription('Verification role')
                      .addField('The verification role has been set to', roleName)
                      .setColor();
                  msg.channel.send(embed);
                } else {
                  msg.channel.send({
                      embed: embeds.errorEmbed("Role not found!", msg.author.avatarURL(), msg.author.tag)
                  }).then(async msg => msg.delete({timeout: 5000}));
                }
              } else {
                msg.channel.send({
                    embed: embeds.errorEmbed("Missing arguments! <role> expected (e.G. member).", msg.author.avatarURL(), msg.author.tag)
                }).then(async msg => msg.delete({timeout: 5000}));
              }
              break;
            }
        } else {
            msg.channel.send({
                embed: embeds.errorEmbed("Wrong syntax. Arguments <channel/rolename> <channelID/role> expected.", msg.author.avatarURL(), msg.author.tag)
            }).then(async msg => msg.delete({timeout: 5000}));
        }
    } else {
      msg.channel.send({
        embed: embeds.errorEmbed('No permissions!', msg.author.avatarURL(), msg.author.tag)
      }).then(async msg => msg.delete({timeout: 5000}));
    }
};

module.exports.help = {
    name: "verification",
    arguments: "<channel/rolename> <channelID>",
    description: "adds verification to channel or selects role for verification. requires MANAGE_CHANNELS permission.",
    category: "moderation"
}
