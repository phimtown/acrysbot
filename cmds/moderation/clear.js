const embeds = require('../../utils/embeds.js')

module.exports.run = async (bot, msg, args) => {
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
        msg.channel.send({
          embed: embeds.errorEmbed('No permissions!', msg.author.avatarURL(), msg.author.tag)
      }).then(async msg => msg.delete({timeout: 5000}));
        return;
      }
    if(args[0] == null || isNaN(args[0])) {
        msg.channel.send({
            embed: embeds.errorEmbed('Invalid syntax! Use acry$ clear <amount>', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({timeout: 5000}));
        return;
    }
    if(args[0] > 100) {
        msg.channel.send({
            embed: embeds.errorEmbed('You can only delete up to 100 messages in one request.', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({timeout: 5000}));
        return;
    }
    if(args[0] < 1) {
        msg.channel.send({
            embed: embeds.errorEmbed('You can\'t clear less than 1 message!', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({timeout: 5000}));
        return;
    }
    try{
        msg.channel.bulkDelete(args[0]).then(() => {
            msg.channel.send({
                embed: embeds.notifEmbed('Success!', `Deleted ${args[0]} messages.`, msg.author.avatarURL(), msg.author.tag)
            }).then(async msg => msg.delete({timeout: 5000}));
        });
    } catch (err) {
        console.log(err);
        msg.channel.send({
            embed: embeds.errorEmbed('An error occured while clearing! (The messages you want to clear can be up 14 days old)', msg.author.avatarURL(), msg.author.tag)
        }).then(async msg => msg.delete({timeout: 5000}));
    }
};

module.exports.help = {
  name: "clear",
  arguments: "<amount>",
  description: "clear x amount of messages. requires MANAGE_MESSAGES permission.",
  category: "moderation"
}
