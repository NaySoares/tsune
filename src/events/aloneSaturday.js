const { MessageAttachment } = require('discord.js');
const errorCommand = require('../errors/errorCommand');
const cron = require('node-cron');
const channels = require('../configs/channels');

module.exports = {
  name: 'aloneSaturday',
  description: 'Send message on saturday',
  async execute(bot) {
    // Saturday 20:00 PM
    cron.schedule(
      '0 20 * * 6',
      async () => {
        try {
          const channelTarget = await bot.channels.fetch(channels.geral);
          const attachments = new MessageAttachment(
            'src/assets/imgs/aloneSaturday.jpg',
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
