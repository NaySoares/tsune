const Discord = require('discord.js');
const NovelController = require('../controllers/NovelController');
const users = require('../configs/users');
const lightNovels = require('../configs/lightNovels');
const { MessageAttachment } = require('discord.js');

module.exports = {
  name: 'novel',
  description: 'Posta as novas atualizações de novels quando disponíveis',
  execute(bot, channelId, msg) {
    if (msg.author.id === users.axios) {
      async function getNovels() {
        const arrNovel = await NovelController.index();
        const channelTarget = await bot.channels.fetch(channelId);

        arrNovel.map((novel) => {
          const msgEmbed = new Discord.MessageEmbed()
            .setColor('#f1f1f1')
            .setTitle(novel.title)
            .setURL(novel.url)
            .setDescription(novel.description)
            .addFields({ name: 'tags', value: `${novel.category}` });

          if (lightNovels.includes(novel.title)) {
            channelTarget.send({
              content: `<@${users.bravo}> <@${users.roel}> <@${users.jeagles}> <@${users.nero}> alguém tem que ver isso aí.`,
            });
          }

          channelTarget.send({ embeds: [msgEmbed] });
        });

        if (arrNovel.length === 0) {
          msg.channel.send('Lista de novels em dia');
        }
      }

      getNovels();
    } else {
      const attachments = new MessageAttachment('src/assets/imgs/disgust.jpg');
      msg.channel.send({
        content: 'O que você quer?',
        files: [attachments],
      });
    }
  },
};
