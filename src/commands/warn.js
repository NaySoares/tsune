const groups = require('../utils/userGroups');
const errorCommand = require('../errors/errorCommand');

module.exports = {
  name: 'warn',
  description: 'Send message for a channel',
  async execute(bot, msg, args) {
    let channelTarget;
    const userAuthorized = Object.values(groups.owner).includes(msg.author.id);
    const contentMsg = args.slice(1).join(' ');

    try {
      channelTarget = await bot.channels.fetch(args[0]);
    } catch (e) {
      return msg.reply('Informe um ID válido');
    }

    try {
      if (userAuthorized) {
        if (!contentMsg) {
          return msg.reply(
            'Não posso enviar uma mensagem vazia! Informe a mensagem após o ID do canal',
          );
        }
        channelTarget.send({
          content: contentMsg,
        });
      } else {
        return msg.reply('Comando restrito!');
      }
    } catch (e) {
      errorCommand.execute(bot, `Houve um erro no comando: ${e}`, this.name);
      console.log(e);
    }
  },
};
