const Discord = require('discord.js');
const channels = require('../configs/channels');

module.exports = errorCommand = {
  async execute(bot, msg, command) {
    const channelTarget = await bot.channels.fetch(channels.logs);
    const msgEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle(`Erro no comando ${command}`)
      .setDescription(`${msg}`);
    channelTarget.send({ embeds: [msgEmbed] });
  },
};
