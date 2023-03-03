const { MessageAttachment } = require('discord.js');
const errorCommand = require('../errors/errorCommand');
const users = require('../configs/users');

module.exports = {
  name: 'avatar',
  description: 'send the avatar of the user',
  execute(bot, msg) {
    try {
      if (msg.author.id === users.axios) {
        const attachments = new MessageAttachment(
          'src/assets/avatar/axiosAvatar.jpg',
        );
        msg.channel.send({ files: [attachments] });
      } else {
        msg.channel.send({
          content: 'Desculpe, este comando ainda está em fase de teste',
        });
      }
    } catch (e) {
      errorCommand.execute(bot, 'Erro ao carregar a imagem', 'avatar');
      console.log(e);
    }
  },
};
