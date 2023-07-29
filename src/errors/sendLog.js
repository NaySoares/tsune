const Discord = require('discord.js');
const channels = require('../configs/channels');

module.exports = {
  async execute(bot, msg, command) {
    const channelTarget = await bot.channels.fetch(channels.logs);
    const msgEmbed = new Discord.MessageEmbed()
      .setColor('#f1c40f')
      .setTitle(`Log comando ${command}`)
      .setDescription(`${msg}`);
    channelTarget.send({ embeds: [msgEmbed] });
  },
};
