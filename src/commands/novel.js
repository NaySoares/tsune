const Discord = require('discord.js');
const NovelController = require('../controllers/NovelController');

module.exports = {
  name: 'novel',
  description: 'sei lá',
  execute(bot, channelId) {
    
    async function getNovels () {
      const arrNovel = await NovelController.index();
      const channelTarget = await bot.channels.fetch(channelId)
      //const guildMsg = await bot.guilds.cache.get('697958499589554217')
      
      arrNovel.map(novel => {
        try {
          const msgEmbed = new Discord.MessageEmbed()
          .setColor('#f1f1f1')
          .setTitle(novel.title)
          .setURL(novel.url)
          .setDescription(novel.description)
          .setImage(novel.img)
          .addFields(
            { name: 'tags', value: `${novel.category}`},
            )
            channelTarget.send(msgEmbed)
        } catch(e) {
          console.log('[ERROR]', e)
        }
      })
    }
    getNovels()
  }
}
