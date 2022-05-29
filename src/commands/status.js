const users = require('../configs/users')
const Discord = require('discord.js');
const errorCommand = require('../errors/errorCommand')
const axios = require('axios')

module.exports = {
  name: 'status',
  description: 'Send status of apis',
  async execute(bot, msg) {

    async function getStatus() {
      let statusJust = {}
      let statusHinowa = {};

      try {
        statusHinowa = await axios.get('http://localhost:3330/').then( resp => {return resp.data})
      } catch(e) {
        errorCommand.execute(bot, 'Não foi possível realizar a chamada para Hinowa/Reddit', 'status')
      }
      try {
        statusJust = await axios.get('http://localhost:3331/').then( resp => {return resp.data})
      } catch(e) {
        errorCommand.execute(bot, 'Não foi possível realizar a chamada para JustLightNovels', 'status')
      }

      try {
        if (msg.author.id === users.axios) {
          const msgEmbed = new Discord.MessageEmbed()
            .setColor('#282C34')
            .setTitle('Status dos Serviços')
            .addFields(
              { name: 'Tsune', value: 'Ativo' },
              { name: 'JustLightNovels', value: `${statusJust.status}` },
              { name: 'Hinowa', value: `${statusHinowa.status}` },
            )
          msg.channel.send(msgEmbed)

        } else {
          msg.channel.send('Esse comando é restrito.')
        }
      } catch (e) {
        errorCommand.execute(bot, 'Não foi possível realizar o comando, consulte os logs', 'status')
        throw new Error(e)
      }
    }
    getStatus()
  }
}
