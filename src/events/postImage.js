const editorMessage = require("./editorMessage");
const users = require("../configs/users");


const addReactions = (message, reactions) => {
  message.react(reactions[0])
  reactions.shift()
    if (reactions.length > 0) {
      setTimeout(() => addReactions(message, reactions), 750)
    }
}

module.exports = async (bot, id, text, reactions = []) => {
  const channel = await bot.channels.fetch(id);
  if ( reactions[0] !== ':heart:') {
    channel.send(text).then(message => {
      addReactions(message, reactions)
    })
  }

  const handleReaction = async (reaction, user, add) => {
    if (user.id === users.tsune) {
      return
    } else { 
    

    // const filter = (reaction, user) => (reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣');
    // const filter2 = (reaction, user) => (reaction.emoji.name === '3️⃣' || reaction.emoji.name === '4️⃣');
    
    // reaction.message.awaitReactions(filter, { time: 1000 })
    // .then(collected => console.log(`Collected ${collected.size} reactions`))
    // .catch(console.error);


    const { guild } = reaction.message
    const member = guild.members.cache.find((member) => member.id === user.id)
    const emoji = reaction._emoji.name;

    let nivel = '';
    switch (emoji) {
      case '1️⃣':
        nivel = '1';
        break;
      case '2️⃣':
        nivel = '2';
        break;
      case '3️⃣':
        nivel = '3';
        break;
      case '4️⃣':
        nivel = '4';
        break; 
    }

    const infoReact = {
      editor: member.user.username,
      editorId: member.id,
      urlImg: reaction.message.content,
      level: nivel
    }

    if (add) {
      editorMessage(bot, infoReact);
    } else {
      return
    } 
  }
}

  bot.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    
    if (reaction.message.channel.id === id) {
      await handleReaction(reaction, user, true)
    }
  })
  
  bot.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    
    if (reaction.message.channel.id === id) {
      await handleReaction(reaction, user, false)
    }
  })
}