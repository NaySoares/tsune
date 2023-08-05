require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const process = require('process');

const app = express();
const prefix = process.env.PREFIX_DEV || '!';

const createBot = require('./configs/bot/botDiscord');
const errorCommand = require('./errors/errorCommand');
const mongooseCreateConnection = require('./services/mongoose');

// ---------------------------------------------------//

mongooseCreateConnection();

// ---------------------------------------------------//
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
  errorCommand.execute(bot, err.message, 'API Discord');
});

const bot = createBot();
bot.on('ready', () => {
  console.log(process.env.INTRODUCTION_MYSELF || 'Olá mundo, eu sou a Tsune!');
});

bot.on('ready', () => {
  bot.events.each((event) => {
    event.execute(bot);
  });
});

bot.on('messageCreate', (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  bot.commands.each((commands) => {
    if (command === commands.name) {
      if (commands.active === false) return;
      commands.execute(bot, msg, args);
    }
  });
});

// -------------------------------------------------------------//
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes'));

app.listen(process.env.PORT || 3333);
