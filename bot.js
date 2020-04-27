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
                  const helpEmbed = {
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
                      }
                    ]
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
                const dropEmbed = {
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
        }
});

bot.login(process.env.TOKEN);