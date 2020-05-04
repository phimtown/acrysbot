const embeds = require('../utils/embeds');
const Discord = require('discord.js');

//todo: server cached market channels

module.exports.run = async (bot, msg, args) => {
  if (args.length > 3) {
      var url;
      if (args.length > 4) {
          url = args[4];
      } else {
          var Attachment = (msg.attachments).array();
          if (typeof Attachment[0] != 'undefined') {
              if (Attachment[0] != null) {
                  url = Attachment[0].url;
              }
          } else {
              url = "https://via.placeholder.com/450";
          }
      }

      const embed = new Discord.MessageEmbed()
          .setColor(0xed8a4c)
          .setTimestamp()
          .setFooter(msg.author.tag, msg.author.avatarURL())
          .setAuthor(args[0], msg.author.avatarURL)
          .setImage(url)
          .addField(args[1], args[2] + " " + args[3]);
      msg.channel.send({embed: embed});
  } else {
    msg.channel.send({
        embed: embeds.errorEmbed("You didn't specify enough arguments.", msg.author.avatarURL, msg.author.tag)
    });
  }
};

module.exports.help = {
  name: "offer",
  arguments: "<title> <desc> <price> <currency> [image]",
  description: "creates an offer in the current channel\n- currency as text [e.G. EUR]\n- image optional using url or attatchment",
  category: "market"
}
