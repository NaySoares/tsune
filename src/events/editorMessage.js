const api = require('../services/api');

module.exports = async (bot, infoReact) => {

   if(infoReact) {

    let check = 1;
    
    if (check === 1) {
      check = 44;
      setTimeout(async () => {
      
      let dias = "7 dias"

      if (infoReact.level === '1') {
        dias = "5 dias";
      } else if (infoReact.level === '2') {
        dias = "5 dias";
      } else if (infoReact.level === '3') {
        dias = "10 dias";
      } else {
        dias = "1 dia"
      }
      const text = `Você acabou de reagir em uma imagem de nível ${infoReact.level}, você tem ${dias} para entregar a edição, irei te avisar quando seu tempo estiver terminando.\ncaso você termine antes, envie a imagem no canal de coleta, up a .psd no drive e digite o comando "?done" também no canal de coleta, até mais`

      const resp = await api.post('editor', infoReact)

      const user = await bot.users.fetch(infoReact.editorId);
      
      
      if (resp.data.message) {
        const msg = resp.data.message;
        user.send(msg);
      } else {
        user.send(text);
      }
       
    }, 1000)
      
    } else {
      return
    }
  } else {
    return
  }
  
}