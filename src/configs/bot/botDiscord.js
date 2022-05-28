const Discord = require('discord.js');
const fs = require('fs'); 
const path = require('path');

function createBot() {
  const directory = path.resolve(__dirname, '..', '..', 'commands');
  const directoryEvent = path.resolve(__dirname, '..', '..', 'events');
  const bot = new Discord.Client({ partials: [ "MESSAGE", "CHANNEL", "REACTION"]});
  bot.commands = new Discord.Collection();
  bot.events = new Discord.Collection();
  
  const commandFiles = fs.readdirSync(directory).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`../../commands/${file}`);
    bot.commands.set(command.name, command);
  }

  const eventFiles = fs.readdirSync(directoryEvent).filter(file => file.endsWith('.js'));
  for (const file of eventFiles) {
    const event = require(`../../events/${file}`);
    bot.events.set(event.name, event);
  }
  
  bot.login(process.env.TOKEN_BOT_VIV || process.env.TOKEN_BOT)
  return bot;
}

module.exports = createBot;