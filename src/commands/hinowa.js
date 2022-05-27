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
      const channelTarget = await bot.channels.fetch(channelId)
      
      arrChapter.map(chapter => {
        try{
          const msgEmbed = new Discord.MessageEmbed()
          .setColor('#f1f1f1')
          .setTitle(chapter.title)
          .setURL(chapter.url)
          .setImage(covers.hinowaGaCrush)
          channelTarget.send(msgEmbed)
        } catch(e) {
          console.log('[ERROR]', e)
        }
      })
    }
    getChapters()
  }
}
