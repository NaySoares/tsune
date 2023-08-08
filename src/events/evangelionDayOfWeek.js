const { MessageAttachment } = require('discord.js');
const errorCommand = require('../errors/errorCommand');
const cron = require('node-cron');
const channels = require('../configs/channels');

module.exports = {
  name: 'dayOfWeek',
  description: 'Send image with evangelion title everyday',
  async execute(bot) {

    // Saturday 7:00 AM
    cron.schedule(
      '0 0 * * *',
      async () => {
        try {
          const date = new Date()
          const weekdays = []
            weekdays[0] = "Sunday";
            weekdays[1] = "Monday";
            weekdays[2] = "Tuesday";
            weekdays[3] = "Wednesday";
            weekdays[4] = "Thursday";
            weekdays[5] = "Friday";
            weekdays[6] = "Saturday";
          const nameOfTheDay = weekdays[date.getDay()]
          const channelTarget = await bot.channels.fetch(channels.chat_evangelicos);
          const attachments = new MessageAttachment(
            `src/assets/imgs/evangelion${nameOfTheDay}.png`,
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
  