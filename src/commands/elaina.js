const groups = require('../utils/userGroups');
const { MessageAttachment } = require('discord.js');
const errorCommand = require('../errors/errorCommand');
const sendLog = require('../errors/sendLog');

const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'elaina',
  description: 'React message',
  execute(bot, msg, args) {
    const directory = path.resolve(__dirname, '..', 'assets', 'elaina');
    const repoImages = fs
      .readdirSync(directory)
      .filter((file) => file.endsWith('.jpg' || '.png'));
    const indexImage = Math.floor(Math.random() * repoImages.length);
    let pitoco = false;
    let modern = false;

    // const userAuthorized = Object.values(
    //   groups.owner || groups.special,
    // ).includes(msg.author.id);

    try {
      // if (userAuthorized) {
      // image elaina pitoco
      // if (indexImage === 0) {
      //   indexImage = 1;
      // }

      if (args[0] === 'pitoco') {
        pitoco = true;
      }

      if (args[0] === 'moderna') {
        modern = true;
      }

      let attachments = new MessageAttachment(
        `src/assets/elaina/${repoImages[indexImage]}`,
      );

      if (pitoco) {
        attachments = new MessageAttachment(`src/assets/elaina/majo0.jpg`);
      }

      if (modern) {
        attachments = new MessageAttachment(`src/assets/elaina/majo17.jpg`);
      }

      msg.channel.send({
        files: [attachments],
      });
      // } else {
      //   const attachments = new MessageAttachment(
      //     'src/assets/elaina/majo0.jpg',
      //   );
      //   msg.channel.send({
      //     files: [attachments],
      //   });

      //   sendLog.execute(
      //     bot,
      //     `User not authorized to use the command ${this.name}: ${msg.author}`,
      //     this.name,
      //   );
      // }
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
