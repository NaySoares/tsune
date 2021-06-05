const https = require('https');
const fs = require('fs');
const path = require('path');
const api = require('../services/api')
const channels = require('../configs/channels')

const postImage = require('./postImage');

module.exports = async (bot, channelId) => {
  bot.on(`message`, async (msg) => {
    if(msg.channel.id === channelId) {
      const level = msg.content;

      let confirm = ""
      switch (level) {
        case '1':
          confirm = ("essa é uma imagem de nível 1, o Editor terá 5 dias para entregar");
          break;
        case '2':
          confirm = ("essa é uma imagem de nível 2, o Editor terá 5 dias para entregar");
          break;
        case '3':
          confirm = ("essa é uma imagem de nível 3, o Editor terá 10 dias para entregar");
          break;
        case '4':
          confirm = ("essa é uma imagem de nível especial, o Editor terá 1 dia para entregar");
          break;
        case '':
          confirm = ("acho que você esqueceu algo, poderia me enviar de novo e escrever o nível?");
          break;
        default:
          confirm = ("esse nível não existe, me envie de novo com o nível certo!")
      }


       if(msg.attachments.first()) {
        if(msg.attachments.first().filename === `png` || `jpeg`){
          if(level > 0 && level <= 4)  {
            const url = msg.attachments.first().url;
            const fileName = msg.attachments.first().name;
            const register = {
              nick: msg.author.username,
              nickId: msg.author.id,
              urlImg: msg.attachments.first().url,
              level: msg.content
            }

            const resp = await api.post('image', register).then(resp => {
              return (resp.data)
            }).catch(err => {
                console.log(err);
            });

            switch (level) {
              case '1':
                postImage(bot, channels.postImgs, msg.attachments.first().url, ['1️⃣']);
                break;
              case '2':
                postImage(bot, channels.postImgs, msg.attachments.first().url, ['2️⃣']);
                break;
              case '3':
                postImage(bot, channels.postImgs, msg.attachments.first().url, ['3️⃣']);
                break;
              case '4':
                postImage(bot, channels.postImgs, msg.attachments.first().url, ['4️⃣']);
                break;
            }

            msg.reply(confirm)
          } else {
            msg.reply(confirm)
          }
        } 
      }  
    }
  });
}