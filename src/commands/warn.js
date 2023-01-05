const users = require('../configs/users')
const {MessageAttachment} = require('discord.js');
const errorCommand = require('../errors/errorCommand');

module.exports= {
  name: 'warn',
  description: 'Default Message',
  async execute(bot, msg, args) {
    const channelTarget = await bot.channels.fetch(args)

    try {
      if(msg.author.id === users.axios){
        channelTarget.send({
          content: 'Axios entrou em processo de aposentadoria, não se preocupe, ele será avisado do seu interesse.'
        })
      } else {
        return
      }
    }
    catch(e) {
      errorCommand.execute(bot, 'Houve um erro no comando "warn" consulte os logs detalhados', 'warn')
      console.log(e)
    }
  }
}
