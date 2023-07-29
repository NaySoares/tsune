const groups = require('../utils/userGroups');
const errorCommand = require('../errors/errorCommand');

module.exports = {
  name: 'clear',
  description: 'Deleta um conjunto de mensagens',
  async execute(bot, msg, args) {
    try {
      if (Object.values(groups.owner).includes(msg.author.id)) {
        if (!args[0]) {
          return msg.reply(
            'Quantas mensagens devo apagar? Use clear + quantidade.',
          );
        }
        if (isNaN(args[0])) {
          return msg.reply('Preciso que informe um número após o comando.');
        }
        if (args[0] > 100) {
          return msg.reply('Informe um número menor que 100.');
        }
        if (args[0] < 1) {
          return msg.reply('Foi uma brincadeira?');
        }
        await msg.channel.messages
          .fetch({ limit: parseInt(args[0]) })
          .then((messages) => {
            msg.channel.bulkDelete(messages);
          });
      } else {
        msg.channel.send('O Axios sabe que você está tentando me dar ordens?');
      }
    } catch (e) {
      errorCommand.execute(
        bot,
        'Não foi possível apagar as mensagens, consulte os logs detalhados',
        'clear',
      );
      throw new Error(e);
    }
  },
};
