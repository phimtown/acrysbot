const { chars } = require('../json/chars');
const { embeds } = require('../utils/embeds');
const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	let charI = Math.floor(Math.random()*chars.length);
	const embed = new Discord.MessageEmbed()
	    .setTitle(chars[charI][1])
	    .setColor(0x53e677)
        .setTimestamp()
        .setDescription(chars[charI][2])
	    .setImage(chars[charI][0])
	msg.channel.send(embed);
  };
  
  module.exports.help = {
    name: "char",
    arguments: "",
    description: "returns a random available character",
    category: "game"
  }