const Discord = require("discord.js");
const fs = require('fs');
const embeds = require('../../utils/embeds.js');
const jt = require("json-toolkit");

module.exports.run = async(bot, msg, args) => {
  if (!msg.member.hasPermission("KICK_MEMBERS")) {
    msg.channel.send({
      embed: embeds.errorEmbed('No permissions!', msg.author.avatarURL(), msg.author.tag)
    }).then(async msg => msg.delete({timeout: 5000}));
    return;
  }
  switch (args[0]) {
    case "voicejoin":
      if (fs.existsSync('json/servers/blacklists/' + msg.guild.id + '_voice.json')) {
        jt.parseFile("json/servers/blacklists/" + msg.guild.id + "_voice.json", (error, data) => {
          var voiceArray = data.map(function (item, index) {
              return index % 25 === 0 ? data.slice(index, index + 25) : null;
            })
            .filter(function (item) {
              return item;
            });

          if (args[1] == null || (args[1] != null && isNaN(args[1]))) {
            const embed = new Discord.MessageEmbed()
              .setTimestamp()
              .setTitle("Acrys | Voicechat Blacklist")
              .setFooter(msg.author.tag, msg.author.avatarURL())
              .setDescription("Page 1/" + voiceArray.length);
            var i = 0;
            voiceArray[0].forEach(id => {
              embed.addField(`ID: ${id.toString()}`, i + 1 + ".");
              i++;
            });
            i = 0;
            msg.channel.send(embed);
          } else {
            if (args[1] > voiceArray.length) {
              msg.channel.send({
                embed: embeds.errorEmbed('That page doesn\'t exist!', msg.author.avatarURL(), msg.author.tag)
              }).then(async msg => msg.delete({timeout: 5000}));
            } else {
              const embed = new Discord.MessageEmbed()
                .setTimestamp()
                .setTitle("Acrys | Voicechat Blacklist")
                .setFooter(msg.author.tag, msg.author.avatarURL())
                .setDescription(`Page ${args[1]}/${voiceArray.length}`);
              var i = 0;
              voiceArray[args[1] - 1].forEach(id => {
                embed.addField(`ID: ${id.toString()}`, i + 1 + ".");
                i++;
              });
              i = 0;
              msg.channel.send(embed);
            }
          }
        });
      } else {
        msg.channel.send({
          embed: embeds.errorEmbed('There are no users blacklisted from voice chat!', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({timeout: 5000}));
      }
      break;
    case "serverjoin":
      if (fs.existsSync('json/servers/blacklists/' + msg.guild.id + '_server.json')) {
        jt.parseFile("json/servers/blacklists/" + msg.guild.id + "_server.json", (error, data) => {
          var serverArray = data.map(function (item, index) {
              return index % 25 === 0 ? data.slice(index, index + 25) : null;
            })
            .filter(function (item) {
              return item;
            });

          if (args[1] == null || (args[1] != null && isNaN(args[1]))) {
            const embed = new Discord.MessageEmbed()
              .setTimestamp()
              .setTitle("Acrys | Serverjoin Blacklist")
              .setFooter(msg.author.tag, msg.author.avatarURL())
              .setDescription("Page 1/" + serverArray.length);
            var i = 0;
            serverArray[0].forEach(id => {
              embed.addField(`ID: ${id.toString()}`, i + 1 + ".");
              i++;
            });
            i = 0;
            msg.channel.send(embed);
          } else {
            if (args[1] > serverArray.length) {
              msg.channel.send({
                embed: embeds.errorEmbed('That page doesn\'t exist!', msg.author.avatarURL(), msg.author.tag)
              }).then(async msg => msg.delete({timeout: 5000}));
            } else {
              const embed = new Discord.MessageEmbed()
                .setTimestamp()
                .setTitle("Acrys | Voicechat Blacklist")
                .setFooter(msg.author.tag, msg.author.avatarURL())
                .setDescription(`Page ${args[1]}/${serverArray.length}`);
              var i = 0;
              serverArray[args[1] - 1].forEach(id => {
                embed.addField(`ID: ${id.toString()}`, i + 1 + ".");
                i++;
              });
              i = 0;
              msg.channel.send(embed);
            }
          }
        });
      } else {
        msg.channel.send({
          embed: embeds.errorEmbed('There are no users blacklisted from joining the server!', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({timeout: 5000}));
      }
      break;
  }
};

module.exports.help = {
  name: "blacklisted",
  arguments: "<voicejoin/serverjoin>",
  description: "list the blacklisted users on a server. requires KICK_MEMBERS permission.",
  category: "moderation"
}