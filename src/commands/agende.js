const momentTimezone = require('moment-timezone');
const channels = require('../configs/channels');
const { MessageCollector } = require('discord.JS')

const Schedule = require('../models/Schedule')

module.exports = {
  name: 'agende',
  description: 'comando para agendar uma notificacao',
  expectsArgs: '<MM/DD> <HH:MM> <"AM" or "PM>',
  maxArgs: 3,
  init: (bot) => {
    const checkForPosts = async() => {
      const query = {
        date: {
          $lte: Date.now()
        }
      }
      const results = await Schedule.find(query);

      for( const post of results ) {
        const { guildId, channelId, content } = post
        
        const channel = await bot.channels.cache.get(channelId)
        if(!channel) {
          continue
        }
        channel.send(content)
      }

      //await Schedule.deleteMany(query)

      setTimeout(checkForPosts, 1000 * 10)
    } 
    checkForPosts()
  },

  async execute(msg, args) {
    const {guild, channel} = msg;
    const targetChannel = channels.avisos;
    if(args < 3) {
      msg.reply('O comando exige <MM/DD> <HH:MM> <"AM" ou "PM">')
      return
    }

    const [date, time, clocktype] = args
    const timezone = "America/Sao_Paulo";

    if(clocktype !== 'AM' && clocktype !== 'PM') {
      msg.reply('Informe se é "AM" ou "PM"');
      return
    }

    const targetDate = momentTimezone.tz(
      `2022-${date} ${time} ${clocktype}`,
      'YYYY-MM-DD HH:mm A',
      timezone,
    )

    msg.reply('Qual a mensagem gostaria de agendar?')
    
    const filter = (newMessage) => {
      return newMessage.author.id === msg.author.id
    }
    
    const collector = new MessageCollector(channel, filter, {
      max: 1,
      time: 1000 * 60 * 2
    });
    
    collector.on("end", async (collector) => {
      const collectedMessage = collector.first();

      if(!collectedMessage) {
        msg.reply("Você não informou nada, agendamento cancelado!")
        return
      }

      msg.reply("Lembrete agendado!")

      await new Schedule({
        date: targetDate.valueOf(),
        content: collectedMessage.content,
        channelId: targetChannel,
        guildId: guild
      }).save()
    })
  }
}