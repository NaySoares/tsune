require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');

const app = express();
const prefix = '!';

const ping = require('./events/ping.js');
const novels = require('./events/novels.js');
const channels = require('./configs/channels');
const novel = require('./commands/novel.js');
const createBot = require ('./configs/bot/botDiscord');
const hinowa = require('./commands/hinowa.js');
//---------------------------------------------------//

mongoose.connect(process.env.MONGODB_KEY, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
})

//---------------------------------------------------//
const bot = createBot();
bot.on('ready', () => {
  console.log('Olá mundo, eu sou a Tsune!')

  ping(bot, 'ping', 'pong!') 
  //novels(bot, channels.justLightNovels, 'novels', 'novels aqui!')
})

bot.on('message', msg => {
  
  if(!msg.content.startsWith(prefix) || msg.author.bot) return;
  
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  
  if (command === 'tsune') {
    bot.commands.get('tsune').execute(bot, msg, args);
  } else if (command === 'comandos') {
    bot.commands.get('comandos').execute(msg, args);
  }
})

function updateNovels() {
  console.log('tá atualizando!')
  novel.execute(bot, channels.justLightNovels)
  hinowa.execute(bot, channels.hinowaGaCrush)
}

setInterval(updateNovels, 1000 * 30); //1hr e 5 min ( eu acho :D )


//-------------------------------------------------------------//
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./routes'));

app.listen(process.env.PORT || 3333);