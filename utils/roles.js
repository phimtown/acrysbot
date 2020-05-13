const embeds = require('./embeds.js');

'use strict'
module.exports = {
    addRole: function addRole(roleName, msg, color) {
        var role = msg.guild.roles.cache.find(role => role.name === roleName);
        if (!msg.member.roles.cache.find(r => r.name === roleName)) {
            if (!role) {
                msg.guild.roles.create({
                        data: {
                            name: roleName,
                            color: color,
                            position: msg.guild.roles.cache.size - 1
                        }
                    })
                    .then()
                    .catch(console.error);
                msg.channel.send({
                    embed: embeds.warningEmbed('This color is being used for the first time and has just been created. Please execute the exactly same command again.', msg.author.avatarURL(), msg.author.tag)
                });
            } else {
                msg.member.roles.add(role);
                msg.channel.send({
                    embed: embeds.notifEmbed('Success!', 'A color role has been assigned to you.', msg.author.avatarURL(), msg.author.tag)
                });
            }
        } else {
            msg.channel.send({
                embed: embeds.errorEmbed('You already have that role!', msg.author.avatarURL(), msg.author.tag)
            });
        }
    },
    removeRole: function removeRole(roleName, msg) {
        var role = msg.guild.roles.cache.find(role => role.name === roleName);
        if (msg.member.roles.cache.find(r => r.name === roleName)) {
            msg.member.roles.remove(role);
            msg.channel.send({
                embed: embeds.notifEmbed('Success!', 'A color role has been removed from you.', msg.author.avatarURL(), msg.author.tag)
            });
        } else {
            msg.channel.send({
                embed: embeds.errorEmbed('You don\'t have that color role!', msg.author.avatarURL(), msg.author.tag)
            });
        }
    }
};
