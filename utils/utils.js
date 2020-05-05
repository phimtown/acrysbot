'use strict'
const fs = require('fs');


module.exports = {
  isHexColor: function isHexColor(hex) {
    return typeof hex === 'string'
        && hex.length === 6
        && !isNaN(Number('0x' + hex));
  },

  antiraid: function antiraid(channel, msg){
      fs.readFile('json/servers/' + msg.guild.id + '_settings.json', (err, data) => {
        console.log(data.toString());
      });
      const filter = m => m.content.includes('') || m.content.includes(' ');
      const collector = channel.createMessageCollector(filter);
      var collected = 0;
      
    collector.on('collect', m => {
        console.log(`Collected ${m.content}`);
        collected++;
        if(collected > 5){
            collected = 0;
            channel.setRateLimitPerUser(30);

           msg.channel.send({
                embed: embeds.errorEmbed('Raid detected! Cooldown for this channel has been set to 30 seconds.')
            });
        }
    });

    collector.on('end', collected => {
	    console.log(`Collected ${collected.size} items`);
    });
}
};
