const Discord = require('discord.js');
const fs = require('fs'); 
const path = require('path');

function createBot() {
  const directory = path.resolve(__dirname, '..', '..', 'commands');
  const directoryEvent = path.resolve(__dirname, '..', '..', 'events');
  
  const token = process.env.TOKEN_BOT_VIV || process.env.TOKEN_BOT
  
  const bot = new Discord.Client({
    partials: [ "MESSAGE", "CHANNEL", "REACTION"],
    intents: [ "GUILDS", "GUILD_VOICE_STATES", 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS' ]
  });

  bot.commands = new Discord.Collection();
  bot.events = new Discord.Collection();
  bot.musics = new Discord.Collection();
  
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

  bot.login(token)
  return bot;
}

module.exports = createBot;