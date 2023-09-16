// const users = require('../configs/users');
const groups = require('../utils/userGroups');
const { MessageAttachment } = require('discord.js');
const errorCommand = require('../errors/errorCommand');

module.exports = {
  name: 'tsune',
  description: 'React message',
  execute(bot, msg) {
    const userAuthorized =
      msg.author.id === groups.special.axios ||
      msg.author.id === groups.special.barao;
    // não tenho ideia de porque isso não funciona
    // Object.values(groups.owner || groups.special).includes(msg.author.id);
    try {
      if (userAuthorized) {
        const attachments = new MessageAttachment(
          'src/assets/elaina/majo15.png',
        );
        msg.channel.send({
          content: 'Olá!',
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
