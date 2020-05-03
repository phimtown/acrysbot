const { Client } = require("discord.js");
const { config } = require("dotenv");
const { drops } = require('./json/drops');
const fs = require('fs');
const botSettings = JSON.parse(fs.readFileSync('./json/settings.json'))
var prefix = botSettings.prefix;

var bot = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
})

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
