module.exports.run = async (bot, msg, args) => {
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
        return;
    }
    //msg.channel.send({
        //embed: embeds.errorEmbed('An error occured while clearing! (The messages you want to clear can be 14 days old at max)', msg.author.avatarURL(), msg.author.tag)
    //});
};

module.exports.help = {
  name: "clear",
  arguments: "<amount>",
  description: "clear x amount of messages.",
  category: "moderation"
}
