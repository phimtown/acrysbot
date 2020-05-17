'use strict'
const fs = require('fs');
const embeds = require('./embeds.js')

module.exports = {
  isHexColor: function isHexColor(hex) {
    return typeof hex === 'string' &&
      hex.length === 6 &&
      !isNaN(Number('0x' + hex));
  },

  antiraid: function antiraid(channel, msg) {
    fs.readFile('json/servers/' + msg.guild.id + '_settings.json', (err, data) => {
      console.log(data.toString());
    });
    const filter = m => m.content.includes('') || m.content.includes(' ');
    const collector = channel.createMessageCollector(filter, {time: 15000});
    var collected = 0;

    collector.on('collect', m => {
      console.log(`Collected ${m.content}`);
      collected++;
      if (collected > 5) {
        collected = 0;
        channel.setRateLimitPerUser(30);

        msg.channel.send({
          embed: embeds.errorEmbed('Raid detected! Cooldown for this channel has been set to 30 seconds.')
        });
      }
    });

    collector.on('end', collected => {
      console.log(`Collected ${collected.size} items`);
    });
  }, validVerify: function validVerify(msg) {
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
  }
};