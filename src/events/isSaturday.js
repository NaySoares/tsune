const { MessageAttachment } = require('discord.js');
const errorCommand = require('../errors/errorCommand');
const cron = require('node-cron');
const channels = require('../configs/channels');

module.exports = {
  name: 'saturday',
  description: 'Send message on saturday',
  async execute(bot) {
    // Saturday 7:00 AM
    cron.schedule(
      '0 7 * * 6',
      async () => {
        try {
          const channelTarget = await bot.channels.fetch(channels.tsunv2);
          const attachments = new MessageAttachment(
            'src/assets/imgs/saturday.jpg',
          );
          channelTarget.send({
            files: [attachments],
          });
        } catch (e) {
          errorCommand.execute(
            bot,
            `Houve um erro no comando consulte os logs detalhados ${this.name}: ${e}`,
            this.name,
          );
          console.log(e);
        }
      },
      {
        timezone: 'America/Sao_Paulo',
      },
    );
  },
};
