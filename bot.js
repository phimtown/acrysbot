const Discord = require("discord.js");
const { config } = require("dotenv");
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

bot.on("message", async msg => {
  if (!msg.content.startsWith(prefix)) return;
  if(msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(' ');
  const cmd = args.shift().toLowerCase();

  let command = bot.commands.get(cmd + ".js");
  if(command) command.run(bot, msg, args);
});

bot.login(process.env.TOKENDEV);
