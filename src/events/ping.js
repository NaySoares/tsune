module.exports = {
  name: 'ping',
  description: 'Reply when to see "ping" at chats',
  execute(bot) {
    const triggerText = 'ping';
    bot.on('messageCreate', (msg) => {
      if (msg.content.toLowerCase() === triggerText.toLowerCase()) {
        msg.author.send('pong!');
      }
    });
  },
};
