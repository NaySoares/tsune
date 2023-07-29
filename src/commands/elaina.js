const groups = require('../utils/userGroups');
const { MessageAttachment } = require('discord.js');
const errorCommand = require('../errors/errorCommand');
const sendLog = require('../errors/sendLog');

const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'elaina',
  description: 'React message',
  execute(bot, msg) {
    const directory = path.resolve(__dirname, '..', 'assets', 'elaina');
    const repoImages = fs
      .readdirSync(directory)
      .filter((file) => file.endsWith('.jpg' || '.png'));
    let indexImage = Math.floor(Math.random() * repoImages.length);

    const userAuthorized = Object.values(
      groups.owner || groups.special,
    ).includes(msg.author.id);

    try {
      if (userAuthorized) {
        if (indexImage === 0) {
          indexImage = 1;
        }

        const attachments = new MessageAttachment(
          `src/assets/elaina/${repoImages[indexImage]}`,
        );

        msg.channel.send({
          files: [attachments],
        });
      } else {
        const attachments = new MessageAttachment(
          'src/assets/elaina/majo0.jpg',
        );
        msg.channel.send({
          files: [attachments],
        });

        sendLog.execute(
          bot,
          `User not authorized to use the command ${this.name}: ${msg.author}`,
          this.name,
        );
      }
    } catch (e) {
      errorCommand.execute(
        bot,
        `Houve um erro no comando consulte os logs detalhados ${this.name}: ${e}`,
        this.name,
      );
      console.log(e);
    }
  },
};
