module.exports = {
  name: 'reaction',
  description: 'Listening reaction message',
  execute(bot) {
    bot.on('messageReactionAdd', async (reaction, user) => {
      const author = user
      reaction.message.channel.send({ content: `${author} você reagiu em um capítulo para edição, quando terminar upe o capítulo em zip ou o link do Drive na thread deste canal`})
    }
    )
    bot.on('messageReactionRemove', async (reaction, user) => {
      const author = user
      reaction.message.channel.send({ content: `${author.username} removeu a reação na mensagem anterior, que deselegante...` })
    }
    )
  }
}