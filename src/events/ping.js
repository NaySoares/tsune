module.exports = (bot, triggerText, replyText) => {
    bot.on('message', msg => {
      if(msg.content.toLowerCase() === triggerText.toLowerCase()) {
        msg.author.send(replyText)
      }
    })
}