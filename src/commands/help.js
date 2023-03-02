const Discord = require('discord.js');
const errorCommand = require('../errors/errorCommand');

module.exports = {
  name: 'help',
  description: 'comandos disponiveis na Tsune',
  execute(bot, msg) {
    try {
      const msgEmbed = new Discord.MessageEmbed()
        .setColor('#282C34')
        .setTitle('Comandos Tsune')
        .setDescription('Esses são os comandos disponiveis:')
        .addFields(
          { name: 'tsune', value: 'Uma mensagem de olá' },
          { name: 'clear <quant>', value: 'Apaga um conjunto de mensagens' },
          { name: 'cultura', value: 'Mensagem de cultura' },
          {
            name: 'elaina',
            value: 'Imagem aleatória da Elaina (Majo no tabitabi)',
          },
        );
      msg.channel.send({ embeds: [msgEmbed] });
    } catch (e) {
      errorCommand.execute(bot, 'Erro ao executar o comando', 'Help');
      console.log(e);
    }
  },
};
