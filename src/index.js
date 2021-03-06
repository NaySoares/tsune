require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const process = require('process');

const app = express();
const prefix = process.env.PREFIX_DEV || '?';

const channels = require('./configs/channels');
const novel = require('./commands/novel.js');
const hinowa = require('./commands/hinowa.js');
const createBot = require ('./configs/bot/botDiscord');
const errorCommand = require('./errors/errorCommand');
const mongooseCreateConnection = require('./services/mongoose')

//---------------------------------------------------//

mongooseCreateConnection();

//---------------------------------------------------//
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
  errorCommand.execute(bot, err.message, 'API Discord')
});

const bot = createBot();
bot.on('ready', () => {
  console.log('Olá mundo, eu sou a Tsune!')
})

bot.on('ready', () => {
  bot.events.get('observer').execute(bot, 'axios'),
  bot.events.get('ping').execute(bot, 'ping', 'pong!')
  bot.events.get('reaction').execute(bot)
})

bot.on('messageCreate', msg => {
  if(!msg.content.startsWith(prefix) || msg.author.bot) return;
  
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  
  if (command === 'tsune') {
    bot.commands.get('tsune').execute(bot, msg);
  } else if (command === 'help') {
    bot.commands.get('help').execute(bot, msg);
  } else if (command === 'clear') {
    bot.commands.get('clear').execute(bot, msg, args);
  } else if (command === 'cultura') {
    bot.commands.get('cultura').execute(bot, msg);
  } else if (command === 'status') {
    bot.commands.get('status').execute(bot, msg);
  }
})

function updateNovels() {
  console.log('Verificando atualizações Novels e Mangás!')
  novel.execute(bot, channels.menu)
  hinowa.execute(bot, channels.hinowaGaCrush)
}

setInterval(updateNovels, 1000 * 60 * 60); //1hr

//-------------------------------------------------------------//
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./routes'));

app.listen(process.env.PORT || 3333);