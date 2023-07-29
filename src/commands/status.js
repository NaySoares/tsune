const Discord = require('discord.js');
const errorCommand = require('../errors/errorCommand');
const lastUpdatedDate = require('../functions/archiveUtils');

module.exports = {
  name: 'status',
  description: 'Verificação do status do último update do bot de notificação',
  async execute(bot, msg) {
    const lastUpdateRegister = await lastUpdatedDate('file.txt');
    try {
      const msgEmbed = new Discord.MessageEmbed()
        .setColor('#f1f3f4')
        .setTitle('Status bot de notificação')
        .addFields(
          { name: 'Container', value: 'indeterminado' },
          { name: 'Bot', value: 'indeterminado' },
          { name: 'Arquivo de registro', value: `${lastUpdateRegister}` },
        );
      msg.channel.send({ embeds: [msgEmbed] });
    } catch (e) {
      errorCommand.execute(bot, `Erro ao executar o comando: ${e}`, this.name);
      console.log(e);
    }
  },
};
