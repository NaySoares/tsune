const Discord = require('discord.js');
const HinowaController = require('../controllers/HinowaController');
const errorCommand = require('../errors/errorCommand');
const covers = require('../services/covers');

module.exports = {
  name: 'hinowa',
  description: 'aviso de lançamento de novos capítulos de Hinowa',
  execute(bot, channelId) {
    async function getChapters() {
      const arrChapter = await HinowaController.index();
      const channelTarget = await bot.channels.fetch(channelId);

      arrChapter.map((chapter) => {
        try {
          const msgEmbed = new Discord.MessageEmbed()
            .setColor('#f1f1f1')
            .setTitle(chapter.title)
            .setURL(chapter.url)
            .setImage(covers.hinowaGaCrush);
          channelTarget.send({ embeds: [msgEmbed] });
        } catch (e) {
          errorCommand.execute(
            bot,
            'Houve um erro no envio da mensagem',
            'Hinowa',
          );
          console.log('[ERROR]', e);
        }
      });
    }
    getChapters();
  },
};
