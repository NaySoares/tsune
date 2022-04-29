const users = require('../configs/users')
const {MessageAttachment} = require('discord.js');

module.exports= {
  name: 'tsune',
  description: 'Uma msg de olá',
  execute(bot, msg, args){
    if(msg.author.id === users.axios){
      const attachments = new MessageAttachment('src/assets/imgs/tsune.jpg')
      msg.channel.send('A seu dispor, my master.', {files: [attachments]})
    } else {
      msg.channel.send('Saiba que sou muita areia pro seu caminhãzinho.')
    }
  }
}
