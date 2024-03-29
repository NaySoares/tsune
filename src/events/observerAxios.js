const Discord = require('discord.js');
const users = require('../configs/users');
// const RandomReplyAxios = require('../assets/reply/axios');

module.exports = {
  name: 'observerAxios',
  description: 'Watch messages with specific words',
  async execute(bot) {
    const userTarget = await bot.users.fetch(users.axios);
    const triggerText = 'axios';

    bot.on('messageCreate', (msg) => {
      if (msg.author.bot) return;

      const msgLower = msg.content.toLowerCase();

      const matchMessage = msgLower.indexOf(triggerText);

      if (matchMessage !== -1) {
        const msgEmbed = new Discord.MessageEmbed()
          .setColor('#ff0000')
          .setTitle('Aviso: Tracked Message')
          .setDescription(
            `Uma nova mensagem contendo a palavra "${triggerText}" foi interceptada!`,
          )
          .addFields(
            { name: 'Servidor', value: `${msg.guild}` },
            { name: 'Canal', value: `${msg.channel}` },
            { name: 'Autor', value: `${msg.author}` },
            { name: 'Mensagem', value: `${msgLower}` },
          );
        userTarget.send({ embeds: [msgEmbed] });
      }

      /*
      if (matchMessage != -1) {
        
        const reply = RandomReplyAxios();
        msg.channel.send({
          content: `${reply.reply + " " + reply.gif}`,
        })
      }
      */
    });
  },
};
