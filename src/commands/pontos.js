const api = require('../services/api')


module.exports = {
  name: 'pontos',
  description: 'Comando para dar pontos aos editores',
  async execute(msg, args) {
    const member = msg.mentions.users.first()
    const permission = msg.member;

    if (permission.roles.cache.some(role => role.name === 'tsune')) {
      if (member) {
        const memberTarger = msg.guild.members.cache.get(member.id)
        
        const resp = await api.get(`/editor/${memberTarger.id}`).then(resp => {
          return (resp.data)
        }).catch(err => {
          console.log(err);
        });


        if(resp !== null) {
          if(resp.urlImg === '') {
            if (resp.level !== '') {
              if(resp.level === '4') {
                const points = parseInt(resp.level) + parseInt(resp.points) + 1
                
                const editorId = member.id,

                url = `/editor/${editorId}/${points}`
                
                const resp2 = await api.put(url).then(resp => {
                  return (resp.data)
                }).catch(err => {
                  console.log(err);
                });

                if (resp2.points !== resp.points) {
                  msg.channel.send(`Já adicionei os pontos, agora ele(a) tem ${resp2.points} pontos`)
                } else {
                  msg.channel.send('não consegui adicionar os pontos do editor, por favor, fale como o Axios')
                }
              } else {
                const points = parseInt(resp.level) + parseInt(resp.points);
                const editorId = member.id,

                url = `/editor/${editorId}/${points}`
                
                const resp2 = await api.put(url).then(resp => {
                  return (resp.data)
                }).catch(err => {
                  console.log(err);
                });

                if (resp2.points !== resp.points) {
                  msg.channel.send(`Já adicionei os pontos, agora ele(a) tem ${resp2.points} pontos`)
                } else {
                  msg.channel.send('não consegui adicionar os pontos do editor, por favor, fale como o Axios')
                }
              }
            } else {
              msg.channel.send(`essa pessoa não tem pontos para serem adicionados`)
            }
          } else {
            msg.channel.send(`Esse editor ainda tem uma imagem para entregar, se ele desistiu use o comando "?drop @"`)
          }
            
        } else { 
          msg.channel.send(`essa pessoa não é um(a) editor(a)`)
        }
      } else {
        msg.channel.send(`essa pessoa não é um(a) editor(a)`)
      }
    } else { 
      msg.reply('você não tem permissão para esse comando')
    }     
  }
}


