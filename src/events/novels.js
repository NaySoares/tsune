
module.exports = (bot, channelId, triggerText, replyText) => {
  bot.on('message', msg => {
    if(msg.content.toLowerCase() === triggerText.toLowerCase()) {
      bot.channels.cache.get(channelId).send(replyText)
    }
  })
}
