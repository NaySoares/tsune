const RandomReplyBravo = require('../assets/reply/bravo');

module.exports = {
  name: 'observerBravo',
  description: 'Watch messages with specific words',
  async execute(bot, triggerText) {
    bot.on('messageCreate', (msg) => {
      if (msg.author.bot) return;

      const msgLower = msg.content.toLowerCase();

      const matchMessage = msgLower.indexOf(triggerText);

      if (matchMessage !== -1) {
        const reply = RandomReplyBravo();
        msg.channel.send({
          content: reply.reply,
        });
      }
    });
  },
};
