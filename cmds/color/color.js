const embeds = require('../../utils/embeds.js');
const roles = require('../../utils/roles.js');
const utils = require('../../utils/utils.js');
const jt = require('json-toolkit');
const fs = require('fs');

module.exports.run = async(bot, msg, args) => {

  if (args[0] == "enable" || args[0] == "disable") {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.channel.send({
        embed: embeds.errorEmbed('No permissions!', msg.author.avatarURL(), msg.author.tag)
      }).then(async msg => msg.delete({
        timeout: 5000
      }));
      return;
    }
    switch (args[0]) {
      case "enable":
        jt.saveToFile("enabled", 'json/servers/commands/' + bot.guilds.cache.get(msg.guild.id) + '_color.json', '\t', (error) => {
          if (error) {
            console.log(error);
            return;
          }
        });
        msg.channel.send({
          embed: embeds.notifEmbed('Success!', 'The color command has been enabled on this server.', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({
          timeout: 5000
        }));
        break;
      case "disable":
        jt.saveToFile("disabled", 'json/servers/commands/' + bot.guilds.cache.get(msg.guild.id) + '_color.json', '\t', (error) => {
          if (error) {
            console.log(error);
            return;
          }
        });
        msg.channel.send({
          embed: embeds.notifEmbed('Success!', 'The color command has been disabled on this server.', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({
          timeout: 5000
        }));
        break;
    }
    return;
  }
  if (!fs.existsSync('json/servers/commands/' + bot.guilds.cache.get(msg.guild.id) + '_color.json')) jt.saveToFile("enabled", 'json/servers/commands/' + bot.guilds.cache.get(msg.guild.id) + '_color.json', "\t");
  jt.parseFile('json/servers/commands/' + bot.guilds.cache.get(msg.guild.id) + '_color.json', (error, data) => {
    if (error) {
      msg.channel.send({
        embed: embeds.errorEmbed('An error occured, try again.', msg.author.avatarURL(), msg.author.tag)
      }).then(async msg => msg.delete({
        timeout: 5000
      }));
      return;
    }
    if (data.toString() == "disabled") {
      msg.channel.send({
        embed: embeds.errorEmbed('The color command is disabled on this server.', msg.author.avatarURL(), msg.author.tag)
      }).then(async msg => msg.delete({
        timeout: 5000
      }));
      return;
    }
  });

  // checks if bots role is the highest on the server
  // msg.guild.member(bot.user.id).roles.cache.map(r => r.rawPosition)) - array of all bot users role's positions
  // Math.max.apply(null, array) - returns highest value in array
  // msg.guild.roles.cache.size - role list size
  if (msg.guild.roles.cache.size - 1 != Math.max.apply(null, msg.guild.member(bot.user.id).roles.cache.map(r => r.rawPosition))) {
    msg.channel.send({
      embed: embeds.errorEmbed('The color command is not set up on this server. Please contact an administrator.\nHow to set up? Move the auto-generated \'Acrys\' **all** the way to the top! (Owner only)', msg.author.avatarURL(), msg.author.tag)
    });
    return;
  }
  if (args.length > 0) {
    try {
      switch (args[0]) {
        case "alizarin":
          roles.addRole("alizarin", msg, 0xe74c3c);
          break;
        case "pomegranate":
          roles.addRole("pomegranate", msg, 0xc0392b);
          break;
        case "carrot":
          roles.addRole("carrot", msg, 0xe67e22);
          break;
        case "pumpkin":
          roles.addRole("pumpkin", msg, 0xd35400);
          break;
        case "sunflower":
          roles.addRole("sunflower", msg, 0xf1c40f);
          break;
        case "orange":
          roles.addRole("orange", msg, 0xf39c12);
          break;
        case "turquoise":
          roles.addRole("turquoise", msg, 0x1abc9c);
          break;
        case "greensea":
          roles.addRole("greensea", msg, 0x16a085);
          break;
        case "emerald":
          roles.addRole("emerald", msg, 0x2ecc71);
          break;
        case "nephritis":
          roles.addRole("nephritis", msg, 0x27ae60);
          break;
        case "peterriver":
          roles.addRole("peterriver", msg, 0x3498db);
          break;
        case "belizehole":
          roles.addRole("belizehole", msg, 0x2980b9);
          break;
        case "amethyst":
          roles.addRole("amethyst", msg, 0x9b59b6);
          break;
        case "wisteria":
          roles.addRole("wisteria", msg, 0x8e44ad);
          break;
        default:
          var colorHex = args[0].substring(1);
          if (utils.isHexColor(colorHex)) {
            roles.addRole(args[0], msg, parseInt(colorHex, 16));
          } else {
            msg.channel.send({
              embed: embeds.errorEmbed('Provided hex color code is invalid. Use \'acry$ help color\'.', msg.author.avatarURL(), msg.author.tag)
            }).then(async msg => msg.delete({
              timeout: 5000
            }));
          }
          break;
      }
    } catch {
      msg.channel.send({
        embed: embeds.errorEmbed('An error occured. For colors to work, the bots default role has to be all the way in the top of the role list. Contact an administrator of this discord server.', msg.author.avatarURL(), msg.author.tag)
      }).then(async msg => msg.delete({
        timeout: 5000
      }));
      return;
    }
  } else {
    msg.channel.send({
      embed: embeds.errorEmbed('No color provided. Use \'acry$ help color\'.', msg.author.avatarURL(), msg.author.tag)
    }).then(async msg => msg.delete({
      timeout: 5000
    }));
  }
};

module.exports.help = {
  name: "color",
  arguments: "<[enable, disable] / color / hex>",
  description: "enable/disable: enables or disables the command.\ncolor: assigns a premade color to you. available colors: alizarin, pomegranate, carrot, pumpkin, sunflower, orange, turquoise, greensea, emerald, nephritis, peterriver, belizehole, amethyst, wisteria.\nhex: assigns a custom color to you. hex color code expected (e.G. #12dce3).",
  category: "color"
}