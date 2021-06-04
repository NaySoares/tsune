const api = require('../services/api')

module.exports = {
  name: 'done',
  description: 'comando para notificar a entrega de uma imagem',
  async execute(msg, args) {
    if (msg.content === '?done') {

      const ID = msg.author.id
      const url = `/editor/${ID}`
      const resp = await api.put(url).then(resp => {
        return (resp.data)
      }).catch(err => {
        console.log(err);
      });
      
      const newEditor = resp[0]
      const oldEditor = resp[1]
      
      const newUrl = encodeURIComponent(oldEditor.urlImg)
      const url2 = `/image/${newUrl}`
      const resp2 = await api.get(url2).then(resp => {
        return (resp.data)
      }).catch(err => {
        console.log(err);
      });
      
      const admId = resp2.nickId
      const adm = await msg.guild.members.cache.get(admId);
      const text = `${resp2.nick}, o editor(a) ${newEditor.editor} acabou de entregar uma edição, após avaliar use um comando para registrar os pontos merecidos`
      
      if (oldEditor == null) {
        msg.reply(
       `você não tem nenhuma imagem, está querendo me enganar?`
        )
      } else if (oldEditor.urlImg == '') {
        msg.reply(
          `você não tem nenhuma imagem, está querendo me enganar?`
        )
      } else {
        adm.send(text)
        msg.reply(
          `obrigado por essa imagem, você tem ${newEditor.points} pontos, seus pontos serão adicionados assim que um adm revisar a imagem!`
        )
      }
    }
  }
}


