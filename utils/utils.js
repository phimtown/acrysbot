'use strict'
const embeds = require('./embeds.js')
const jt = require("json-toolkit");

module.exports = {
  isHexColor: function isHexColor(hex) {
    return typeof hex === 'string' &&
      hex.length === 6 &&
      !isNaN(Number('0x' + hex));
  },
  validVerify: function validVerify(msg, bot) {
    try {
      jt.parseFile('json/servers/verification/' + bot.guilds.cache.get(msg.guild.id) + '_channel.json', (error, data) => {
        if (error) return;
        if (data.toString().includes(msg.channel.id)) {
          if (msg.author.id != bot.user.id) {
            msg.delete();
            if (msg.content == 'verify') {
              jt.parseFile('json/servers/verification/' + bot.guilds.cache.get(msg.guild.id) + '_role.json', (error, data) => {
                if (error) {
                  msg.channel.send({
                    embed: embeds.errorEmbed("A role for verification hasn't been set up yet. Please contact an administrator or moderator of this server.", msg.author.avatarURL(), msg.author.tag)
                  }).then(async msg => msg.delete({timeout: 2000}));
                  return;
                }
                let role = (msg.member.guild.roles.cache.find(role => role.name === data.toString()));
                msg.member.roles.add(role);
              });
            }
          }
        }
      });
    } catch {}
  }, 
  userFromMention: function userFromMention(m, bot) {
    const matches = m.match(/^<@!?(\d+)>$/);
	  if (!matches) return;
	  const id = matches[1];
	  return bot.users.cache.get(id);
  }
};