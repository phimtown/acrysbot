const embeds = require('../utils/embeds');
const { drops } = require('../json/drops');

module.exports.run = async (bot, msg, args) => {
  var fieldsArr = [];
  if (args.length > 0) {
      if (!isNaN(args[0])) {
          if (!(args[0] < 1)) {
              if (args[0] <= 10) {
                  for (var i = 0; i <= args[0] - 1; i++) {
                      var dropI = Math.floor(Math.random() * drops.length + 1);
                      fieldsArr.push({
                          "name": drops[dropI][0],
                          "value": drops[dropI][1]
                      });
                  }
              } else {
                  msg.channel.send({
                      embed: embeds.errorEmbed('Specified arguments cannot be more than 10.', msg.author.avatarURL(), msg.author.tag)
                  });
                  return;
              }
          } else {
              msg.channel.send({
                  embed: embeds.errorEmbed('Specified arguments cannot be less than 1.', msg.author.avatarURL(), msg.author.tag)
              });
              return;
          }
      } else {
          msg.channel.send({
              embed: embeds.errorEmbed('Specified arguments are not a number.', msg.author.avatarURL(), msg.author.tag)
          });
          return;
      }
  } else {
      var dropI = Math.floor(Math.random() * drops.length + 1);
      fieldsArr = [{
          "name": drops[dropI][0],
          "value": drops[dropI][1]
      }];
  }

  msg.channel.send({
      embed: {
          "color": 0x21a2d1,
          "timestamp": timestamp,
          "footer": {
              "icon_url": msg.author.avatarURL(),
              "text": msg.author.tag
          },
          "fields": fieldsArr
      }
  });
};

module.exports.help = {
  name: "drop",
  arguments: "<1-10>",
  description: "drops a random rap line. optional: add argument to send 1-10 lines.",
  category: "misc"
}
