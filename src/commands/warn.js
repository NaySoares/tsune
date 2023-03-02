const users = require('../configs/users');
const errorCommand = require('../errors/errorCommand');

module.exports = {
  name: 'warn',
  description: 'Send message for a channel',
  async execute(bot, msg, args) {
    let channelTarget;

    try {
      channelTarget = await bot.channels.fetch(args[0]);
    } catch (e) {
      return msg.reply('Informe um ID válido');
    }

    try {
      if (msg.author.id === users.axios) {
        if (!args[1]) {
          return msg.reply(
            'Não posso enviar uma mensagem vazia! Informe a mensagem após o ID do canal',
          );
        }
        channelTarget.send({
          content: args[1],
        });
      } else {
        return msg.reply('Comando restrito!');
      }
    } catch (e) {
      errorCommand.execute(
        bot,
        'Houve um erro no comando "warn" consulte os logs detalhados',
        'warn',
      );
      console.log(e);
    }
  },
};
