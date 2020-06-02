const embeds = require('../../utils/embeds');
const roles = require('../../utils/roles');
const utils = require('../../utils/utils');
const jt = require('json-toolkit');
const fs = require('fs');

module.exports.run = async(bot, msg, args) => {

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


  if (args.length > 0) {
    switch (args[0]) {
      case "alizarin":
        roles.removeRole("alizarin", msg);
        break;
      case "pomegranate":
        roles.removeRole("pomegranate", msg);
        break;
      case "carrot":
        roles.removeRole("carrot", msg);
        break;
      case "pumpkin":
        roles.removeRole("pumpkin", msg);
        break;
      case "sunflower":
        roles.removeRole("sunflower", msg);
        break;
      case "orange":
        roles.removeRole("orange", msg);
        break;
      case "turquoise":
        roles.removeRole("turquoise", msg);
        break;
      case "greensea":
        roles.removeRole("greensea", msg);
        break;
      case "emerald":
        roles.removeRole("emerald", msg);
        break;
      case "nephritis":
        roles.removeRole("nephritis", msg);
        break;
      case "peterriver":
        roles.removeRole("peterriver", msg);
        break;
      case "belizehole":
        roles.removeRole("belizehole", msg);
        break;
      case "amethyst":
        roles.removeRole("amethyst", msg);
        break;
      case "wisteria":
        roles.removeRole("wisteria", msg);
        break;
      default:
        if (args[0].charAt(0) == "#" && utils.isHexColor(args[0].substring(1))) {
          roles.removeRole(args[0], msg);
        } else {
          msg.channel.send({
            embed: embeds.errorEmbed('Specified role is not a color role.', msg.author.avatarURL(), msg.author.tag)
          });
        }
        break;
    }
  } else {
    msg.channel.send({
      embed: embeds.errorEmbed('No role to remove provided.', msg.author.avatarURL(), msg.author.tag)
    });
  }
};

module.exports.help = {
  name: "removecolor",
  arguments: "<color/hex>",
  description: "remove a color role from yourself.",
  category: "color"
}