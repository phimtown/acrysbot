const Discord = require("discord.js");
const { config } = require("dotenv");
const jt = require("json-toolkit");
const fs = require('fs');
const utils = require('./utils/utils.js');
const embeds = require('./utils/embeds.js')
const botSettings = JSON.parse(fs.readFileSync('./json/settings.json'))
var prefix = botSettings.prefix;
var commandsJson = [];

const bot = new Discord.Client();

config({
    path: __dirname + "/.env"
});

bot.on('ready', () => {
    console.log("> bot started");
    console.log("> status: acry$ help | v1.0.11 | " + bot.guilds.cache.size + " servers");
    bot.user.setStatus("online");
    bot.user.setActivity("acry$ help | v1.0.11 | " + bot.guilds.cache.size + " servers", { type: "PLAYING" });
    jt.saveToFile(commandsJson, "./json/commands.json", "\t");
});

bot.on('guildCreate', guild => {
    bot.user.setActivity("acry$ help | v1.0.11 | " + bot.guilds.cache.size + " servers", { type: "PLAYING" });
});

bot.on('guildDelete', guild => {
    bot.user.setActivity("acry$ help | v1.0.11 | " + bot.guilds.cache.size + " servers", { type: "PLAYING" });
});

bot.commands = new Discord.Collection();

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
            console.log(`> loaded ${jsfiles.length} commands.`);
        
            jsfiles.forEach(f => {
                let prop = require(`./cmds/${dir}/${f}`);
                bot.commands.set(f, prop);
                commandsJson.push(prop.help);
            });
        });
    });
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

bot.on("guildMemberAdd", async member => {
	try {
		jt.parseFile('json/servers/blacklists/' + member.guild.id + '_server.json', (error, data) => {
			if(error) return;
			const index = data.indexOf(String(member.id));
			if (index > -1) {
				member.kick();
			}
		});
	} catch {}
});

bot.on("message", async msg => {
    utils.validVerify(msg);
    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    let command = bot.commands.get(cmd + ".js");
    if (command) command.run(bot, msg, args);
});

bot.login(process.env.TOKENDEV);
