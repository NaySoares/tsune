const channels = require('../configs/channels');
const users = require('../configs/users');

module.exports = {
  name: 'reaction',
  description: 'Listening reaction message',
  execute(bot) {
    bot.on('messageReactionAdd', async (reaction, user) => {
      if(reaction.message.channel.id !== channels.avisosMangas) return
      if(user == users.axios) return
      if(user == users.plon) return
      if(user == users.bravo) return
      
      const channelTarget = await bot.channels.fetch(channels.editores)
      const author = user
      channelTarget.send({ content: `${author} esse é um registro da sua reação em um capítulo de mangá, ao terminar upe o capítulo em zip ou o link do Drive na thread do canal da obra (caso não tenha acesso solicite ao Bravo).`})
    })
    
    bot.on('messageReactionRemove', async (reaction, user) => {
      if(reaction.message.channel.id !== channels.avisosMangas) return
      if(user == users.axios) return
      if(user == users.plon) return
      if(user == users.bravo) return
      
      const channelTarget = await bot.channels.fetch(channels.editores)
      const author = user
      channelTarget.send({ content: `${author} você removeu a reação em um capítulo, caso tenha desistido, não esqueça de avisar um supervisor.`})
    })
  }
}