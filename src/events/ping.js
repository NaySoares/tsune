module.exports = {
  name: 'ping',
  description: 'Reply when to see "ping" at chats',
  execute(bot, triggerText, replyText) {
    bot.on('message', msg => {
      if(msg.content.toLowerCase() === triggerText.toLowerCase()) {
        msg.author.send(replyText)
      }
    })
  }
}