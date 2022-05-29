const Discord = require('discord.js');
const errorCommand = require('../errors/errorCommand');

module.exports = {
  name: 'comandos',
  description: 'comandos disponiveis na Tsune',
  execute(bot, msg) {
    try {
      const msgEmbed = new Discord.MessageEmbed()
        .setColor('#282C34')
        .setTitle('Comandos Tsune')
        .setDescription('Esses são os comandos disponiveis:')
        .setThumbnail('https://i.imgur.com/NXVAQY6.jpg')
        .addFields(
          { name: 'tsune', value: 'Uma mensagem de olá' },
          { name: 'clear', value: 'Apaga um conjunto de mensagens' },
          { name: 'cultura', value: 'Mensagem de cultura' },
        )
      msg.channel.send(msgEmbed)
    } catch (e) {
      errorCommand.execute(bot, 'Erro ao executar o comando', 'Help')
      console.log(e)
    }
  }
}
