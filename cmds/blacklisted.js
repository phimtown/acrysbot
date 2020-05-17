const Discord = require("discord.js");
const fs = require('fs');
const embeds = require('../utils/embeds.js');

module.exports.run = async (bot, msg, args) => {
  if (!msg.member.hasPermission("KICK_MEMBERS")) {
    msg.channel.send({embed: embeds.errorEmbed('No permissions!', msg.author.avatarURL(), msg.author.tag)});
    return;
  }
  switch(args[0]) {
    //todo: finish this when you didn't stay up until 8am to work on this
    case "all": break;
    case "voicejoin": break;
    case "serverjoin": break;
  }
};

module.exports.help = {
  name: "blacklisted",
  arguments: "<all/voicejoin/serverjoin>",
  description: "list the blacklisted users on a server. requires KICK_MEMBERS permission.",
  category: "moderation"
}
