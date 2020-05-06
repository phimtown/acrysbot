const Discord = require("discord.js");
const fs = require('fs');
const embeds = require('../utils/embeds.js');

module.exports.run = async (bot, msg, args) => {
  if (!msg.member.hasPermission("KICK_MEMBERS")) {
    msg.channel.send({
      embed: embeds.errorEmbed('No permissions!', msg.author.avatarURL(), msg.author.tag)
  });
    return;
  }
};

module.exports.help = {
  name: "blacklisted",
  arguments: "<all/voicejoin/serverjoin>",
  description: "list the blacklisted users on a server. requires KICK_MEMBERS permission.",
  category: "moderation"
}
