const Discord = require("discord.js");
const { config } = require("dotenv");
const jt = require("json-toolkit");
const fs = require('fs');
const utils = require('./utils/utils.js');
const embeds = require('./utils/embeds.js')
const botSettings = JSON.parse(fs.readFileSync('./json/settings.json'))
var prefix = botSettings.prefix;

const bot = new Discord.Client();

config({
    path: __dirname + "/.env"
});

bot.on('ready', () => {
    console.log("> bot started");
    console.log("> status: acry$ help | v1.0.10 | " + bot.guilds.cache.size + " servers");
    bot.user.setStatus("online");
    bot.user.setActivity("acry$ help | v1.0.10 | " + bot.guilds.cache.size + " servers", {
        type: "PLAYING"
    });
});

bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles <= 0) {
        console.log("> Error: No commands to load!");
        return;
    }
    console.log(`> loaded ${jsfiles.length} commands.`);

    jsfiles.forEach((f, i) => {
        let prop = require(`./cmds/${f}`);
        bot.commands.set(f, prop);
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
    validVerify(msg);
    //hurensohn code
    //utils.antiraid(msg.channel, msg);
    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    let command = bot.commands.get(cmd + ".js");
    if (command) command.run(bot, msg, args);
});

function validVerify(msg) {
	try {
		jt.parseFile('json/servers/verification/' + bot.guilds.cache.get(msg.guild.id) + '_channel.json', (error, data) => {
			if (error) return;
			if (data.toString().includes(msg.channel.id)) {
				if (msg.author.id != bot.user.id) {
					msg.delete();
					if (msg.content == 'verify') {
						jt.parseFile('json/servers/verification/' + bot.guilds.cache.get(msg.guild.id) + '_role.json', (error, data) => {
							if (error) {
								msg.channel.send({
									embed: embeds.errorEmbed("A role for verification hasn't been set up yet. Please contact an administrator or moderator of this server.", msg.author.avatarURL(), msg.author.tag)
								}).then(async msg => msg.delete({timeout: 2000}));
								return;
							}
							let role = (msg.member.guild.roles.cache.find(role => role.name === data.toString()));
							msg.member.roles.add(role);
						});
					}
				}
			}
		});
	} catch {}
}

bot.login(process.env.TOKEN);
