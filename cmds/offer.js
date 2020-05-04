const { embeds } = require('../utils/embeds');

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

      var offerEmbed = offerEmbed = {
          "color": 0xed8a4c,
          "footer": {
              "icon_url": msg.author.avatarURL(),
              "text": msg.author.tag
          },
          "author": {
              "name": args[0],
              "icon_url": msg.author.avatarURL
          },
          "image": {
              "url": url
          },
          "fields": [{
              "name": args[1],
              "value": args[2] + " " + args[3]
          }]
      };
      msg.channel.send({
          embed: offerEmbed
      });
  } else {
      msg.channel.send('Error');
  }
};

module.exports.help = {
  name: "offer",
  arguments: "<title> <desc> <price> <currency> [image]",
  description: "creates an offer in the current channel\n- currency as text [e.G. EUR]\n- image optional using url or attatchment",
  category: "market"
}
