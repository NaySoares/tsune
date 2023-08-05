const groups = require('../utils/userGroups');
const errorCommand = require('../errors/errorCommand');
const downloadImage = require('../functions/downloadImage');

module.exports = {
  name: 'save',
  active: false,
  description: 'save images for use posteriorly',
  async execute(bot, msg, args) {
    const userAuthorized = Object.values(groups.owner).includes(msg.author.id);

    try {
      if (userAuthorized) {
        // if (!imgAttachment) {
        //   return msg.reply('Esse comando exige uma imagem!');
        // }

        msg.channel.send({
          content: 'entendido',
        });

        const filter = (m) => m.author.id === msg.author.id;
        const collector = msg.channel.createMessageCollector({
          filter,
          max: 1,
          time: 10000,
        });

        msg.channel.send({
          content: 'Qual o nome do arquivo?',
        });

        collector.on('collect', (m) => {
          const name = m.content;
          let imgAttachment = null;
          const destination = name;

          msg.channel.send({
            content: `nome: ${name}. Envie a imagem!`,
          });

          if (m.attachments.first()) {
            imgAttachment = m.attachments.first();
            downloadImage(imgAttachment.url, destination);
            msg.channel.send({
              content: `imagem salva com sucesso!`,
            });
          }
        });

        collector.on('end', (collected) => {
          if (collected.size === 0) {
            msg.channel.send({
              content: 'Tempo esgotado!',
            });
          }
        });
        return;
      } else {
        return msg.reply('Comando restrito!');
      }
    } catch (e) {
      errorCommand.execute(bot, `Houve um erro no comando: ${e}`, this.name);
      console.log(e);
    }
  },
};
