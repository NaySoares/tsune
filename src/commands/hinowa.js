const Discord = require('discord.js');
const { MessageAttachment } = require('discord.js');
const HinowaController = require('../controllers/HinowaController');
const covers = require('../services/covers')

module.exports = {
  name: 'hinowa',
  description: 'sei lá',
  execute(bot, channelId) {
    
    async function getChapters () {
      const arrChapter = await HinowaController.index();
      
      arrChapter.map(chapter => {
        const msgEmbed = new Discord.MessageEmbed()
          .setColor('#f1f1f1')
          .setTitle(chapter.title)
          .setURL(chapter.url)
          .setImage(covers.hinowaGaCrush)
        bot.channels.cache.get(channelId).send(msgEmbed)
      })
    }
    getChapters()
  }
}
