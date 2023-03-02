const { MessageAttachment } = require('discord.js');
const errorCommand = require('../errors/errorCommand');

module.exports = {
  name: 'cultura',
  description: 'Obviously a command of culture.',
  execute(bot, msg) {
    try {
      const attachments = new MessageAttachment('src/assets/imgs/culture.jpg');
      msg.channel.send({ files: [attachments] });
    } catch (e) {
      errorCommand.execute(bot, 'Erro ao carregar a imagem', 'cultura');
      console.log(e);
    }
  },
};
