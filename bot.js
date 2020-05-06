const Discord = require("discord.js");
const { config } = require("dotenv");
const jt = require("json-toolkit");
const fs = require('fs');
const utils = require('./utils/utils.js');
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

bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
  if (err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles <= 0) {
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
  jt.parseFile('json/servers/blacklists/' + newState.guild.id + '_voice.json', (error, data) => {
    const index = data.indexOf(String(newState.id));
    if (index > -1) {
      newState.kick();
    }
  });
});

bot.on("guildMemberAdd", async member => {
  jt.parseFile('json/servers/blacklists/' + member.guild.id + '_server.json', (error, data) => {
    const index = data.indexOf(String(member.id));
    if (index > -1) {
      member.kick();
    }
  });
});

bot.on("message", async msg => {
  validVerify(msg);
  //hurensohn code
  //utils.antiraid(msg.channel, msg);
  if (!msg.content.startsWith(prefix)) return;
  if(msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(' ');
  const cmd = args.shift().toLowerCase();

  let command = bot.commands.get(cmd + ".js");
  if(command) command.run(bot, msg, args);
});

/*
  Meintest ja was von jt, musst selber gucken weiß nich genau ob dir das so passt, ansonten 
  funktioniert alles so wies soll
*/
function validVerify(msg){
  fs.readFile('json/' + bot.guilds.cache.get(msg.guild.id) + 'verify.json', (err, data) => {
    if (err) throw err
        console.log(err);
        if (data.toString().includes(msg.channel.id)) {
            if (msg.author.id != bot.user.id) {
                msg.delete();
                if (msg.content == '$verify') {
                    let role = (msg.member.guild.roles.cache.find(role => role.name === 'member'));
                    msg.member.roles.add(role);
                }
            }
        }
    });
}

bot.login(process.env.TOKENDEV);
