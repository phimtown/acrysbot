const Discord = require("discord.js");
const { config } = require("dotenv");
const { drops } = require('./json/drops');
const fs = require('fs');
const botSettings = JSON.parse(fs.readFileSync('./json/settings.json'))
var prefix = botSettings.prefix;

const bot = new Discord.Client();

config({
    path: __dirname + "/.env"
});

bot.on('ready', () => {
    console.log("> bot started");
    console.log("> status: acry$ help | online on " + bot.guilds.cache.size + " servers");
    bot.user.setStatus("online");
    bot.user.setActivity("acry$ help | online on " + bot.guilds.cache.size + " servers", { type: "WATCHING" });
});

bot.commands = Client.Collector();

fs.readdir("./cmds/", (err, files) => {
  if (err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles <= 0) {
    console.log("> Error: No commands to load!");
    return;
  }
  console.log(`> loaded ${jsfiles.length} commands.`);

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    bot.commands.set(f, props);
  });
});

bot.on("message", async msg => {
        if (!msg.content.startsWith(prefix)) return;

        const args = msg.content.slice(prefix.length).split(' ');
        const cmd = args.shift().toLowerCase();

        var date = new Date();
        var timestamp = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2) + 'T' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds() + 'Z';

        switch(cmd) {
          case "server":
           if (!args.length) {
              var __mainguild__ = bot.guilds.cache.get(msg.guild.id);
              var sicon = __mainguild__.iconURL();
              const embed = new Discord.MessageEmbed()
              	.setColor(0x53e677)
                 .setTimestamp()
                 .addField('Created on: ', __mainguild__.createdAt)
                 .addField('Members: ', __mainguild__.memberCount)
                 .setThumbnail(sicon)
                 .setDescription(__mainguild__.name);
              msg.channel.send(embed);
              return;
        } else {
            try {
                var __mainguild__ = bot.guilds.cache.get(args.toString());
                var sicon = __mainguild__.iconURL();

                const embed = new Discord.MessageEmbed()
                   .setColor(0x53e677)
                    .setTimestamp()
                    .setThumbnail(sicon)
                    .addField('Created on: ', __mainguild__.createdAt)
                    .addField('Members: ', __mainguild__.memberCount)
                    .setDescription(__mainguild__.name);
                msg.channel.send(embed);
            } catch (TypeError) {
                console.log(TypeError);
                msg.channel.send({embed: errorEmbed('guild not found.', msg.author.avatarURL(), msg.author.tag)});
            }
        }
        break;
        case "user":
          try {
            let __user__ = msg.mentions.users.first();
            let user = msg.guild.member(__user__);

            const embed = new Discord.MessageEmbed()
                .setColor(0x53e677)
                .setTimestamp()
                .setThumbnail(__user__.avatarURL())
                .addField('Joined guild on: ', user.joinedAt)
                .addField('Presence: ', JSON.stringify(__user__.presence.status).toLowerCase())
                .addField('Created account: ', __user__.createdAt)
                .addField('Last message: ', user.lastMessageID)
                .addField('ClientID: ', __user__.id)
                .addField('Discriminator: ', __user__.discriminator)
                .addField('Bot: ', __user__.bot);
            msg.channel.send(embed);
        } catch (TypeError) {
            console.log(TypeError);
            msg.channel.send({embed: errorEmbed('user not found.', msg.author.avatarURL(), msg.author.tag)});
        }
        break;

            case "help":
                var helpEmbed = {
                  "color": 4889423,
                  "timestamp": timestamp,
                  "footer": {
                    "icon_url": msg.author.avatarURL(),
                    "text": msg.author.tag
                  },
                  "author": {
                    "name": "acrys//bot commands" + title,
                    "url": "https://acrysbot.xyz/commands",
                    "icon_url": bot.user.avatarURL()
                  },
                  "fields": [{"name": "link to the commands list.", "value": "https://acrysbot.xyz/commands"}]
                };
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

                msg.channel.send({ embed: {
                    "color": 0x21a2d1,
                    "timestamp": timestamp,
                    "footer": {
                      "icon_url": msg.author.avatarURL(),
                      "text": msg.author.tag
                    },
                    "fields": fieldsArr
                  }});
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
                    case "belizehole": addRole("belizehole", msg, 0x2980b9); break;
                    case "amethyst": addRole("amethyst", msg, 0x9b59b6); break;
                    case "wisteria": addRole("wisteria", msg, 0x8e44ad); break;
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
              if(args.length > 0) {
                switch(args[0]) {
                  case "alizarin": removeRole("alizarin", msg); break;
                  case "pomegranate": removeRole("pomegranate", msg); break;
                  case "carrot": removeRole("carrot", msg); break;
                  case "pumpkin": removeRole("pumpkin", msg); break;
                  case "sunflower": removeRole("sunflower", msg); break;
                  case "orange": removeRole("orange", msg); break;
                  case "turquoise": removeRole("turquoise", msg); break;
                  case "greensea": removeRole("greensea", msg); break;
                  case "emerald": removeRole("emerald", msg); break;
                  case "nephritis": removeRole("nephritis", msg); break;
                  case "peterriver": removeRole("peterriver", msg); break;
                  case "belizehole": removeRole("belizehole", msg); break;
                  case "amethyst": removeRole("amethyst", msg); break;
                  case "wisteria": removeRole("wisteria", msg); break;
                  default:
                    if(args[0].charAt(0) == "#" && isHexColor(args[0].substring(1))){
                      removeRole(args[0], msg);
                    } else {
                      msg.channel.send({embed: errorEmbed('Specified role is not a color role.', msg.author.avatarURL(), msg.author.tag)});
                    }
                    break;
                }
              } else {
                msg.channel.send({embed: errorEmbed('No role to remove provided.', msg.author.avatarURL(), msg.author.tag)});
              }
              break;
        }
});

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
          position: msg.guild.roles.cache.size - 1
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

function removeRole(roleName, msg) {
  var role = msg.guild.roles.cache.find(role => role.name === roleName);
  if(msg.member.roles.cache.find(r => r.name === roleName)) {
    msg.member.roles.remove(role);
    msg.channel.send({embed: notifEmbed('Success!', 'A color role has been removed from you.', msg.author.avatarURL(), msg.author.tag)});
  } else {
    msg.channel.send({embed: errorEmbed('You don\'t have that color role!', msg.author.avatarURL(), msg.author.tag)});
  }
}

function isHexColor (hex) {
  return typeof hex === 'string'
      && hex.length === 6
      && !isNaN(Number('0x' + hex))
}

bot.login(process.env.TOKENDEV);
