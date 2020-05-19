const embeds = require('../../utils/embeds.js');
const roles = require('../../utils/roles.js');
const utils = require('../../utils/utils.js');

module.exports.run = async (bot, msg, args) => {
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
                  }).then(async msg => msg.delete({timeout: 5000}));
              }
              break;
      }
    } catch {
        msg.channel.send({
            embed: embeds.errorEmbed('An error occured. For colors to work, the bots default role has to be all the way in the top of the role list. Contact an administrator of this discord server.', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({timeout: 5000}));
        return;
    }
  } else {
      msg.channel.send({
          embed: embeds.errorEmbed('No color provided. Use \'acry$ help color\'.', msg.author.avatarURL(), msg.author.tag)
      }).then(async msg => msg.delete({timeout: 5000}));
  }
};

module.exports.help = {
  name: "color",
  arguments: "<color / hex>",
  description: "color: assigns a premade color to you. available colors: alizarin, pomegranate, carrot, pumpkin, sunflower, orange, turquoise, greensea, emerald, nephritis, peterriver, belizehole, amethyst, wisteria.\nhex: assigns a custom color to you. hex color code expected (e.G. #12dce3).",
  category: "color"
}
