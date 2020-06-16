const Discord = require("discord.js");
const { config } = require("dotenv");
const version = '1.1.6';
const jt = require("json-toolkit");
const fs = require('fs');
const utils = require('./utils/utils.js');
const embeds = require('./utils/embeds.js')
const botSettings = JSON.parse(fs.readFileSync('./json/settings.json'));
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
var prefix = botSettings.prefix;
var commandsJson = [];
var users = 0;
config({ path: __dirname + "/.env" });


fs.readdir("./cmds/", (err) => {
    if (err) console.error(err);

    const dirs = source =>
        fs.readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    dirs("./cmds/").forEach(dir => {
        fs.readdir("./cmds/" + dir + "/", (err, files) => {
            let jsfiles = files.filter(f => f.split(".").pop() === "js");
            if (jsfiles <= 0) {
                console.log("> Error: No commands to load!");
                return;
            }

            var names = [];
        
            jsfiles.forEach(f => {
                let prop = require(`./cmds/${dir}/${f}`);
                bot.commands.set(f, prop);
                commandsJson.push(prop.help);
                names.push(prop.help.name);
            });
            
            console.log(`> loaded ${jsfiles.length} commands: ${names}`);
        });
    });
});

bot.on('ready', () => {
    console.log("> bot started");
    users = 0;
    bot.guilds.cache.forEach(async g => {
        users += g.memberCount;
    });
    console.log("> v" + version + " | " + bot.guilds.cache.size + " servers | " + users + " users");
    bot.user.setStatus("online");
    setInterval(() => {
        var rand = Math.floor(Math.random() * 3);
        switch(rand) {
            case 0: bot.user.setActivity("acry$ help | v" + version + " | " + bot.guilds.cache.size + " servers", { type: "PLAYING" }); break;
            case 1: bot.user.setActivity("acry$ help | v" + version + " | " + users + " users", { type: "PLAYING" }); break;
            case 2: bot.user.setActivity("acry$ help | v" + version + " | acrysbot.xyz", { type: "PLAYING" }); break;
        }
    }, 10000);
    jt.saveToFile(commandsJson, "./json/commands.json", "\t");

});

bot.on('guildCreate', guild => {
    users = 0;
    bot.guilds.cache.forEach(async g => {
        users += g.memberCount;
    });
});

bot.on('guildDelete', guild => {
    users = 0;
    bot.guilds.cache.forEach(async g => {
        users += g.memberCount;
    });
});

bot.on("guildMemberAdd", async member => {
    users = 0;
    bot.guilds.cache.forEach(async g => {
        users += g.memberCount;
    });
	try {
		jt.parseFile('json/servers/blacklists/' + member.guild.id + '_server.json', (error, data) => {
			if(error) return;
			const index = data.indexOf(String(member.id));
			if (index > -1) {
				member.kick();
			}
		});
    } catch {}
    try {
        jt.parseFile('json/servers/commands/' + bot.guilds.cache.get(member.guild.id) + '_welcome.json', (error, data) => {
			if(error) {
                console.log(error)
                return;
            }
			if(data == "enabled") {
                jt.parseFile('json/servers/welcome/' + bot.guilds.cache.get(member.guild.id) + '.json', (error, data) => {
                    if(error) {
                        console.log(error)
                        return;
                    }
                    const c = member.guild.channels.cache.get(data.toString());
                    const embed = new Discord.MessageEmbed()
                        .setColor(0x38d161)
                        .setTimestamp()
                        .setThumbnail(member.user.avatarURL())
                        .setFooter(member.user.tag, member.user.avatarURL())
                        .setTitle(member.displayName + " joined!")
                        .addField('Joined at: ', member.joinedAt)
                    c.send({embed: embed});
                });
            }
		});
    } catch {}
});

bot.on("guildMemberRemove", async member => {
	users = 0;
    bot.guilds.cache.forEach(async g => {
        users += g.memberCount;
    });
    try {
        jt.parseFile('json/servers/commands/' + bot.guilds.cache.get(member.guild.id) + '_goodbye.json', (error, data) => {
			if(error) {
                console.log(error)
                return;
            }
			if(data == "enabled") {
                jt.parseFile('json/servers/goodbye/' + bot.guilds.cache.get(member.guild.id) + '.json', (error, data) => {
                    if(error) {
                        console.log(error)
                        return;
                    }
                    const c = member.guild.channels.cache.get(data.toString());
                    const embed = new Discord.MessageEmbed()
                        .setColor(0xe34b4b)
                        .setTimestamp()
                        .setThumbnail(member.user.avatarURL())
                        .setFooter(member.user.tag, member.user.avatarURL())
                        .setTitle(member.displayName + " left!")
                        .addField('Joined at: ', member.joinedAt)
                    c.send({embed: embed});
                });
            }
		});
    } catch (err) { console.log(err);}
});

bot.on("voiceStateUpdate", async (oldState, newState) => {
	try {
		jt.parseFile('json/servers/blacklists/' + newState.guild.id + '_voice.json', (error, data) => {
			if(error) return;
			const index = data.indexOf(String(newState.id));
			if (index > -1) {
				newState.kick();
			}
		});
	} catch {}
});

bot.on("message", async msg => {
    utils.validVerify(msg, bot);
    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    let command = bot.commands.get(cmd + ".js");
    if (command) command.run(bot, msg, args);
});

bot.login(process.env.TOKENDEV);
