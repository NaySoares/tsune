require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Discord = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs'); 

const path = require('path');
const app = express();
const prefix = '?';

const imageRegister = require('./events/imageRegister.js');
const ping = require('./events/ping.js');
const postImage = require('./events/postImage.js');
const editorMessage = require('./events/editorMessage.js');
const channels = require('./configs/channels')
//---------------------------------------------------//

mongoose.connect(process.env.MONGODB_KEY, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
})

//---------------------------------------------------//

const directory = path.resolve(__dirname,'commands');
const bot = new Discord.Client({ partials: [ "MESSAGE", "CHANNEL", "REACTION"]});
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(directory).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.login(process.env.TOKEN_BOT)

bot.on('ready', () => {
  console.log('Olá mundo, eu sou a Tsune!')


  editorMessage(bot)
  ping(bot, 'ping', 'pong!') 
  imageRegister(bot , channels.listenImgs)
  postImage(bot, channels.postImgs, 'Hello world!', [':heart:'])
  
  
})

bot.on('message', msg => {
  
  if(!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'tsune') {
    bot.commands.get('tsune').execute(msg, args);
  } else if (command === 'pontos') {
    bot.commands.get('pontos').execute(msg, args);
  } else if (command === 'done') {
    bot.commands.get('done').execute(msg, args);
  } else if (command === 'ajuda') {
    bot.commands.get('ajuda').execute(msg, args);
  } else if (command === 'comandos') {
    bot.commands.get('comandos').execute(msg, args);
  } else if (command === 'drop') {
    bot.commands.get('drop').execute(msg, args);
  }
})


//-------------------------------------------------------------//
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./routes'));

app.listen(3333);