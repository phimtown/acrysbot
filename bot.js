const { Client } = require("discord.js");
const { config } = require("dotenv");
const { drops } = require('./drops');
var prefix = "acry$ ";

var bot = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
})

function errorEmbed(message, avatarURL, tag) {
    return {
        "color": 0xf54242,
        "footer": {
          "icon_url": avatarURL,
          "text": tag
        },
        "fields": [
            {
                "name": "Error!",
                "value": message
            }
        ]
      };
}

function warningEmbed(message, avatarURL, tag) {
  return {
      "color": 0xecf542,
      "footer": {
        "icon_url": avatarURL,
        "text": tag
      },
      "fields": [
          {
              "name": "Warning!",
              "value": message
          }
      ]
    };
}

function notifEmbed(title, message, avatarURL, tag) {
  return {
      "color": 0x53e677,
      "footer": {
        "icon_url": avatarURL,
        "text": tag
      },
      "fields": [
          {
              "name": title,
              "value": message
          }
      ]
    };
}

function addRole(roleName, msg, color) {
  var role = msg.guild.roles.cache.find(role => role.name === roleName);
  if(!msg.member.roles.cache.find(r => r.name === roleName)) {
    if(!role) {
      msg.guild.roles.create({
        data: {
          name: roleName,
          color: color,
        }
      })
      .then()
      .catch(console.error);
      msg.channel.send({embed: warningEmbed('This color is being used for the first time and has just been created. Please execute the exactly same command again.', msg.author.avatarURL(), msg.author.tag)});
    } else {
      msg.member.roles.add(role);
      msg.channel.send({embed: notifEmbed('Success!', 'A color role has been assigned to you.', msg.author.avatarURL(), msg.author.tag)});
    }
  } else {
    msg.channel.send({embed: errorEmbed('You already have that role!', msg.author.avatarURL(), msg.author.tag)});
  }
}

function isHexColor (hex) {
  return typeof hex === 'string'
      && hex.length === 6
      && !isNaN(Number('0x' + hex))
}

bot.on('ready', () => {
    bot.user.setStatus("online");
    bot.user.setActivity("acry$ help | v1.0.0", { type: "WATCHING" });
});

bot.on("message", async msg => {
        if (!msg.content.startsWith(prefix)) return;

        const args = msg.content.slice(prefix.length).split(' ');
        const cmd = args.shift().toLowerCase();

        var date = new Date();
        var timestamp = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2) + 'T' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds() + 'Z';

        switch(cmd) {
            case "help":
                var helpEmbed;
                if(args.length > 0) {
                    switch(args[0]) {
                      case "color":
                        helpEmbed = {
                          "color": 4889423,
                          "timestamp": timestamp,
                          "footer": {
                            "icon_url": msg.author.avatarURL(),
                            "text": msg.author.tag
                          },
                          "author": {
                            "name": "acrys//bot commands | color",
                            "url": "https://6yte.wtf/spacecord",
                            "icon_url": bot.user.avatarURL()
                          },
                          "fields": [
                            {
                              "name": "acry$ color <color>",
                              "value": "assigns a premade color to you. available colors: alizarin, pomegranate, carrot, pumpkin, sunflower, orange, turquoise, greensea, emerald, nephritis, peterriver, belizehole, amethyst, wisteria."
                            },
                            {
                              "name": "acry$ color <hex>",
                              "value": "assigns a custom color to you. hex color code expected (e.G. #12dce3)."
                            }
                          ]
                        };
                        break;
                      default:
                        msg.channel.send({embed: errorEmbed('Command not found.', msg.author.avatarURL(), msg.author.tag)});
                        break;
                    }
                } else {
                  helpEmbed = {
                    "color": 4889423,
                    "timestamp": timestamp,
                    "footer": {
                      "icon_url": msg.author.avatarURL(),
                      "text": msg.author.tag
                    },
                    "author": {
                      "name": "acrys//bot commands",
                      "url": "https://6yte.wtf/spacecord",
                      "icon_url": bot.user.avatarURL()
                    },
                    "fields": [
                      {
                        "name": "acry$ help",
                        "value": "lists all commands."
                      },
                      {
                        "name": "acry$ drop <1-10>",
                        "value": "drops a random rap line. optional: add argument to send 1-10 lines. default: 1"
                      },
                      {
                        "name": "acry$ color <color>",
                        "value": "assigns a premade color to you. for more info, use \'acry$ help color\'."
                      },
                      {
                        "name": "acry$ color <hex>",
                        "value": "assigns a custom color to you. hex color code expected (e.G. #12dce3)."
                      }
                    ]
                  };
                }
                msg.channel.send({ embed: helpEmbed });
                break;
            case "drop":
                var fieldsArr = [];
                if(args.length > 0) {
                    if(!isNaN(args[0])) {
                        if(!(args[0] < 1)) {
                            if(args[0] <= 10) {
                                for(var i = 0; i <= args[0] - 1; i++) {
                                    var dropI = Math.floor(Math.random() * drops.length + 1);
                                    fieldsArr.push({"name": drops[dropI][0], "value": drops[dropI][1]});
                                }
                            } else {
                                msg.channel.send({embed: errorEmbed('Specified arguments cannot be more than 10.', msg.author.avatarURL(), msg.author.tag)});
                                break;
                            }
                        } else {
                            msg.channel.send({embed: errorEmbed('Specified arguments cannot be less than 1.', msg.author.avatarURL(), msg.author.tag)});
                            break;
                        }
                    } else {
                        msg.channel.send({embed: errorEmbed('Specified arguments are not a number.', msg.author.avatarURL(), msg.author.tag)});
                        break;
                    }
                } else {
                    var dropI = Math.floor(Math.random() * drops.length + 1);
                    fieldsArr = [{"name": drops[dropI][0], "value": drops[dropI][1]}];
                }
                var dropEmbed = {
                    "color": 0x21a2d1,
                    "timestamp": timestamp,
                    "footer": {
                      "icon_url": msg.author.avatarURL(),
                      "text": msg.author.tag
                    },
                    "fields": fieldsArr
                  };
                  msg.channel.send({ embed: dropEmbed });
                break;
            case "color":
                if(args.length > 0) {
                  switch(args[0]) {
                    case "alizarin": addRole("alizarin", msg, 0xe74c3c); break;
                    case "pomegranate": addRole("pomegranate", msg, 0xc0392b); break;
                    case "carrot": addRole("carrot", msg, 0xe67e22); break;
                    case "pumpkin": addRole("pumpkin", msg, 0xd35400); break;
                    case "sunflower": addRole("sunflower", msg, 0xf1c40f); break;
                    case "orange": addRole("orange", msg, 0xf39c12); break;
                    case "turquoise": addRole("turquoise", msg, 0x1abc9c); break;
                    case "greensea": addRole("greensea", msg, 0x16a085); break;
                    case "emerald": addRole("emerald", msg, 0x2ecc71); break;
                    case "nephritis": addRole("nephritis", msg, 0x27ae60); break;
                    case "peterriver": addRole("peterriver", msg, 0x3498db); break;
                    case "belizehole": addRole("belizehole", msg, 0xe74c3c); break;
                    case "amethyst": addRole("amethyst", msg, 0xe74c3c); break;
                    case "wisteria": addRole("wisteria", msg, 0xe74c3c); break;
                    default: 
                      var colorHex = args[0].substring(1);
                      if(isHexColor(colorHex)) {
                        addRole(args[0], msg, parseInt(colorHex, 16));
                      } else {
                        msg.channel.send({embed: errorEmbed('Provided hex color code is invalid. Use \'acry$ help color\'.', msg.author.avatarURL(), msg.author.tag)});
                      }
                      break;
                  }
                } else {
                    msg.channel.send({embed: errorEmbed('No color provided. Use \'acry$ help color\'.', msg.author.avatarURL(), msg.author.tag)});
                }
                break;
            case "removecolor":
              //TODO: Command for removing color roles only from oneself (roles which are hex codes or the preset color roles)
              break;
        }
});

bot.login(process.env.TOKEN);