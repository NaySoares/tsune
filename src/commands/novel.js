const Discord = require('discord.js');
const NovelController = require('../controllers/NovelController');

module.exports = {
  name: 'novel',
  description: 'sei lá',
  execute(bot, channelId) {
    
    async function getNovels () {
      const arrNovel = await NovelController.index();
      
      arrNovel.map(novel => {
        const msgEmbed = new Discord.MessageEmbed()
          .setColor('#f1f1f1')
          .setTitle(novel.title)
          .setURL(novel.url)
          .setDescription(novel.description)
          .setImage(novel.img)
          .addFields(
            { name: 'tags', value: `${novel.category}`},
          )
        bot.channels.cache.get(channelId).send(msgEmbed)
      })
    }
    getNovels()
  }
}
