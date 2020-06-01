const Discord = require('discord.js');
const fs = require('fs');
const needle = require('needle');

module.exports.run = async (bot, msg, args) => {

  users = 0;
  bot.guilds.cache.forEach(async g => {
    users += g.memberCount;
  });


  // MATHEMATIK IST IN DER LUFT
  let totalSeconds = (bot.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

  needle.get('https://raw.githubusercontent.com/wtf6yte/acrysbot/master/json/commands.json', function (error, data) {
    const embed = new Discord.MessageEmbed()
      .setColor(4889423)
      .setTimestamp()
      .setFooter(msg.author.tag, msg.author.avatarURL())
      .setAuthor("📈 | Acrys statistics", bot.user.avatarURL(), "https://acrysbot.xyz/commands")
      .addField("🌆 | Servers", bot.guilds.cache.size, true)
      .addField("🧑🏻‍🤝‍🧑🏻 | Users", users, true)
      .addField("😇 | Emojis", bot.emojis.cache.size, true)
      .addField("🎚️ | Channels ", bot.channels.cache.size, true)
      .addField("🌀 | Commands", JSON.stringify(data.body).split("name").length - 1, true)
      .addField("🈵 | Prefix", "acry$", true)
      .addField("🔺 | Uptime", uptime, true);
    msg.channel.send(embed);
  })
};


module.exports.help = {
  name: "stats",
  arguments: "",
  description: "shows bot statistics",
  category: "misc"
}
