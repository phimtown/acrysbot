const Discord = require("discord.js");
const jt = require("json-toolkit");
const fs = require('fs');
const embeds = require('../../utils/embeds.js');

module.exports.run = async (bot, msg, args) => {
  if (!msg.member.hasPermission("KICK_MEMBERS")) {
    msg.channel.send({
      embed: embeds.errorEmbed('No permissions!', msg.author.avatarURL(), msg.author.tag)
  });
    return;
  }
  if(args.length > 0) {
    if(args.length > 1) {
      if(args.length > 2) {
        if(args[0] == "voicejoin" || args[0] == "serverjoin") {
          if(args[1] == "add" || args[1] == "remove") {
            if(!isNaN(args[2])) {
              switch(args[0]) {
                case "voicejoin":
                  switch(args[1]) {
                    case "add":
                      if (!fs.existsSync('json/servers/blacklists/' + msg.guild.id + '_voice.json')) {
                        jt.saveToFile([args[2]], "json/servers/blacklists/" + msg.guild.id + "_voice.json", "\t", error => {
                          if(error) {
                            msg.channel.send({
                                embed: embeds.errorEmbed('An error occured while blacklisting ' + args[2] + ' from voice channels.', msg.author.avatarURL(), msg.author.tag)
                            });
                            return;
                          }
                          msg.channel.send({
                            embed: embeds.notifEmbed('Success!', args[2] + ' has been blacklisted from voice channels.', msg.author.avatarURL(), msg.author.tag)
                          });
                        });
                        return;
                      }
                      jt.parseFile("json/servers/blacklists/" + msg.guild.id + "_voice.json", (error, data) => {
                        if(error) {
                          msg.channel.send({
                              embed: embeds.errorEmbed('An error occured while blacklisting ' + args[2] + ' from voice channels.', msg.author.avatarURL(), msg.author.tag)
                          });
                          return;
                        }
                        var json = data;
                        if(json.indexOf(args[2]) == -1) {
                          json.push(args[2]);
                          jt.saveToFile(json, "json/servers/blacklists/" + msg.guild.id + "_voice.json", "\t", error => {
                            if(error) {
                              msg.channel.send({
                                  embed: embeds.errorEmbed('An error occured while blacklisting ' + args[2] + ' from voice channels.', msg.author.avatarURL(), msg.author.tag)
                              });
                              return;
                            }
                            msg.channel.send({
                              embed: embeds.notifEmbed('Success!', args[2] + ' has been blacklisted from voice channels.', msg.author.avatarURL(), msg.author.tag)
                            });
                          });
                        } else {
                          msg.channel.send({
                            embed: embeds.errorEmbed(args[2] + ' is already blacklisted from voice channels.', msg.author.avatarURL(), msg.author.tag)
                          });
                        }
                      });
                      break;
                    case "remove":
                      fs.readFile("json/servers/blacklists/" + msg.guild.id + "_voice.json", err => {
                        if (err) {
                            msg.channel.send({
                                embed: embeds.errorEmbed('No one is blacklisted from voice channels yet!', msg.author.avatarURL(), msg.author.tag)
                            });
                            return;
                        }
                        jt.parseFile("json/servers/blacklists/" + msg.guild.id + "_voice.json", (error, data) => {
                          if (err) {
                            msg.channel.send({
                                embed: embeds.errorEmbed('An error occured while unblacklisting ' + args[2] + ' from voice channels.', msg.author.avatarURL(), msg.author.tag)
                            });
                            return;
                          }
                          var json = data;
                          const index = json.indexOf(args[2]);
                          if (index > -1) {
                            json.splice(index, 1);
                            jt.saveToFile(json, "json/servers/blacklists/" + msg.guild.id + "_voice.json", "\t", error => {
                              if(error) {
                                msg.channel.send({
                                    embed: embeds.errorEmbed('An error occured while unblacklisting ' + args[2] + ' from voice channels.', msg.author.avatarURL(), msg.author.tag)
                                });
                                return;
                              }
                              msg.channel.send({
                                embed: embeds.notifEmbed('Success!', args[2] + ' has been unblacklisted from voice channels.', msg.author.avatarURL(), msg.author.tag)
                              });
                            });
                          } else {
                            msg.channel.send({
                              embed: embeds.errorEmbed(args[2] + ' is not blacklisted from voice channels.', msg.author.avatarURL(), msg.author.tag)
                          });
                          }
                        });
                      });
                      break;
                  }
                break;
                case "serverjoin":
                  switch(args[1]) {
                    case "add":
                      if (!fs.existsSync('json/servers/blacklists/' + msg.guild.id + '_server.json')) {
                        jt.saveToFile([args[2]], "json/servers/blacklists/" + msg.guild.id + "_server.json", "\t", error => {
                          if(error) {
                            msg.channel.send({
                                embed: embeds.errorEmbed('An error occured while blacklisting ' + args[2] + ' from joining the server.', msg.author.avatarURL(), msg.author.tag)
                            });
                            return;
                          }
                          msg.channel.send({
                            embed: embeds.notifEmbed('Success!', args[2] + ' has been blacklisted from joining the server.', msg.author.avatarURL(), msg.author.tag)
                          });
                        });
                        return;
                      }
                      jt.parseFile("json/servers/blacklists/" + msg.guild.id + "_server.json", (error, data) => {
                        if(error) {
                          msg.channel.send({
                              embed: embeds.errorEmbed('An error occured while blacklisting ' + args[2] + ' from joining the server.', msg.author.avatarURL(), msg.author.tag)
                          });
                          return;
                        }
                        var json = data;
                        if(json.indexOf(args[2]) == -1) {
                          json.push(args[2]);
                          jt.saveToFile(json, "json/servers/blacklists/" + msg.guild.id + "_server.json", "\t", error => {
                            if(error) {
                              msg.channel.send({
                                  embed: embeds.errorEmbed('An error occured while blacklisting ' + args[2] + ' from joining the server.', msg.author.avatarURL(), msg.author.tag)
                              });
                              return;
                            }
                            msg.channel.send({
                              embed: embeds.notifEmbed('Success!', args[2] + ' has been blacklisted from joining the server.', msg.author.avatarURL(), msg.author.tag)
                            });
                          });
                        } else {
                          msg.channel.send({
                            embed: embeds.errorEmbed(args[2] + ' is already blacklisted from joining the server.', msg.author.avatarURL(), msg.author.tag)
                          });
                        }
                      });
                      break;
                    case "remove":
                      fs.readFile("json/servers/blacklists/" + msg.guild.id + "_server.json", err => {
                        if (err) {
                            msg.channel.send({
                                embed: embeds.errorEmbed('No one is blacklisted from joining this server yet!', msg.author.avatarURL(), msg.author.tag)
                            });
                            return;
                        }
                        jt.parseFile("json/servers/blacklists/" + msg.guild.id + "_server.json", (error, data) => {
                          if (err) {
                            msg.channel.send({
                                embed: embeds.errorEmbed('An error occured while unblacklisting ' + args[2] + ' from joining the server.', msg.author.avatarURL(), msg.author.tag)
                            });
                            return;
                          }
                          var json = data;
                          const index = json.indexOf(args[2]);
                          if (index > -1) {
                            json.splice(index, 1);
                            jt.saveToFile(json, "json/servers/blacklists/" + msg.guild.id + "_server.json", "\t", error => {
                              if(error) {
                                msg.channel.send({
                                    embed: embeds.errorEmbed('An error occured while unblacklisting ' + args[2] + ' from joining the server.', msg.author.avatarURL(), msg.author.tag)
                                });
                                return;
                              }
                              msg.channel.send({
                                embed: embeds.notifEmbed('Success!', args[2] + ' has been unblacklisted from joining the server.', msg.author.avatarURL(), msg.author.tag)
                              });
                            });
                          } else {
                            msg.channel.send({
                              embed: embeds.errorEmbed(args[2] + ' is not blacklisted from joining the server.', msg.author.avatarURL(), msg.author.tag)
                          });
                          }
                        });
                      });
                      break;
                  }
                break;
              }
            } else {
              msg.channel.send({embed: embeds.errorEmbed('Please specify a proper user id!. Syntax: acry$ blacklist <voicejoin/serverjoin> <add/remove> <userid>', msg.author.avatarURL(), msg.author.tag)});
            }
          } else {
            msg.channel.send({embed: embeds.errorEmbed('Please specify if you are adding or removing a blacklist. Syntax: acry$ blacklist <voicejoin/serverjoin> <add/remove> <userid>', msg.author.avatarURL(), msg.author.tag)});
          }
        } else {
          msg.channel.send({embed: embeds.errorEmbed('Please specify if you are blacklisting a server or voice join. Syntax: acry$ blacklist <voicejoin/serverjoin> <add/remove> <userid>', msg.author.avatarURL(), msg.author.tag)});
        }
      } else {
        msg.channel.send({embed: embeds.errorEmbed('Not enough arguments specified! Missing <userid>', msg.author.avatarURL(), msg.author.tag)});
      }
    } else {
      msg.channel.send({embed: embeds.errorEmbed('Not enough arguments specified! Missing <add/remove> <userid>', msg.author.avatarURL(), msg.author.tag)});
    }
  } else {
    msg.channel.send({embed: embeds.errorEmbed('No arguments specified! Missing <voicejoin/serverjoin> <add/remove> <userid>', msg.author.avatarURL(), msg.author.tag)});
  }
};


module.exports.help = {
  name: "blacklist",
  arguments: "<voicejoin/serverjoin> <add/remove> <userid>",
  description: "blacklist or unblacklist someone from joining voicechat or a server. requires KICK_MEMBERS permission.",
  category: "moderation"
}
