const users = require('../configs/users');
const { MessageAttachment } = require('discord.js');
const errorCommand = require('../errors/errorCommand');

module.exports = {
  name: 'tsune',
  description: 'React message',
  execute(bot, msg) {
    try {
      if (msg.author.id === users.axios) {
        const attachments = new MessageAttachment('src/assets/imgs/tsune.jpg');
        msg.channel.send({
          content: 'A seu dispor, my master.',
          files: [attachments],
        });
      } else {
        const attachments = new MessageAttachment(
          'src/assets/imgs/disgust.jpg',
        );
        msg.channel.send({
          content: 'O que você quer?',
          files: [attachments],
        });
      }
    } catch (e) {
      errorCommand.execute(
        bot,
        'Houve um erro no comando "tsune" consulte os logs detalhados',
        'tsune',
      );
      console.log(e);
    }
  },
};
