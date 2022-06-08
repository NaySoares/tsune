const Discord = require('discord.js');
const NovelController = require('../controllers/NovelController');
const users = require('../configs/users')
const lightNovels = require('../configs/lightNovels')

module.exports = {
  name: 'novel',
  description: 'sei lá',
  execute(bot, channelId) {

    async function getNovels() {
      const arrNovel = await NovelController.index();
      const channelTarget = await bot.channels.fetch(channelId)

      arrNovel.map(novel => {
        const msgEmbed = new Discord.MessageEmbed()
          .setColor('#f1f1f1')
          .setTitle(novel.title)
          .setURL(novel.url)
          .setDescription(novel.description)
          .addFields(
            { name: 'tags', value: `${novel.category}` },
          )

        if(lightNovels.includes(novel.title)) {
          channelTarget.send({ content: `<@${users.bravo}> <@${users.roel}> <@${users.jeagles}> <@${users.nero}> alguém tem que ver isso aí.`})
        } 

        channelTarget.send({ embeds: [msgEmbed] })
      })
    }
    getNovels()
  }
}
