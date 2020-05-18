const Discord = require("discord.js");
module.exports.run = async (bot, msg, args) => {
  const embed = new Discord.MessageEmbed()
      .setColor(0xc9405e)
      .setTimestamp()
      .setFooter(msg.author.tag, msg.author.avatarURL())
      .setAuthor("8ball", msg.author.avatarURL)
      .addField("Hello.", "Please ask your question.");
  msg.channel.send({embed: embed}).then(async msg => msg.delete({ timeout: 10000 }));
  const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
  collector.on('collect', message => {
    var answer = [
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes - definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful."
    ];
    const embed = new Discord.MessageEmbed()
        .setColor(0xc9405e)
        .setTimestamp()
        .setFooter(msg.author.tag, msg.author.avatarURL())
        .setAuthor("8ball", msg.author.avatarURL)
        .addField(message, answer[Math.floor(Math.random() * 20)]);
    msg.channel.send({embed: embed});
    collector.stop();
  });
};

module.exports.help = {
  name: "8ball",
  arguments: "",
  description: "ask 8ball a question.",
  category: "fun"
}
