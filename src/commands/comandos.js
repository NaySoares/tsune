const Discord = require('discord.js');

module.exports = {
  name: 'comandos',
  description: 'comandos disponiveis na Tsune',
  execute(msg, args) {
    const msgEmbed = new Discord.MessageEmbed()
      .setColor('#282C34')
      .setTitle('Comandos Tsune')
      .setDescription('Esses são os comandos disponiveis:')
      .setThumbnail('https://i.imgur.com/NXVAQY6.jpg')
      .addFields(
        { name: 'tsune', value: 'Uma mensagem de olá' },
        { name: 'ajuda', value: 'Informações sobre o meu funcionamento'},
        { name: 'done', value: 'Me notificar que você entregou uma imagem'},
        { name: 'pontos + @', value: 'Concede os pontos pela imagem editada'}
      )
    msg.channel.send(msgEmbed)
  }
}
