const users = require('../configs/users')

module.exports= {
  name: 'clear',
  description: 'Deleta um conjunto de mensagens',
  async execute(msg, args){
    if(msg.author.id === users.axios){
      if(!args[0]) {
        return msg.reply('Quantas mensagens devo apagar? Use ?clear + quantidade.')
      }
      if(isNaN(args[0])) {
        return msg.reply('Preciso que informe um número após o comando.')
      }
      if(args[0] > 100) {
        return msg.reply('Mestre, informe um número menor que 100.')
      }
      if(args[0] < 1) {
        return msg.reply('Foi uma brincadeira?')
      }

      await msg.channel.messages.fetch({limit: args[0]}).then(messages => {
        msg.channel.bulkDelete(messages);
      })

    } else {
      msg.channel.send('O Axios sabe que você está tentando me dar ordens?')
    }
  }
}
