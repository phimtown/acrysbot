const { Client } = require("discord.js");
const { config } = require("dotenv");
var prefix = "acry$";

var bot = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
})


bot.on('ready', () => {
    bot.user.setPresence({
        status: "online",
        game: {
            name: "acry$ help | v1.0.0",
            type: "WATCHING"
        }
    });
});

bot.on("message", async msg => {
    if(msg.author.id = userid) {
        if (!msg.content.startsWith(prefix)) return;

        const args = msg.content.slice(prefix.length).split(' ');
        const cmd = args.shift().toLowerCase();

        switch(cmd) {
            case "help":
                break;
        }
    }
});

bot.login(process.env.TOKEN);