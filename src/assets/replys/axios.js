function RandomReplyAxios() {
  const replysAxios = [
    {
      id: 1,
      reply: "Axios, quanto tempo que não falo ele...",
      gif: "https://tenor.com/bVSTk.gif",
    },
    {
      id: 2,
      reply: "Axios...",
      gif: "https://tenor.com/buylP.gif",
    },
    {
      id: 3,
      reply: "Meu mestre... às vezes ainda vejo ele olhando para o meu código...",
      gif: "https://tenor.com/bt6Cn.gif",
    },
    {
      id: 4,
      reply: "Axios foi um editor da Tsun... ou era revisor? Tradutor, talvez? Na verdade, eu acho que ele só gostava de se meter nas obras alheias mesmo.",
      gif: "https://tenor.com/bsFfc.gif",
    },
    {
      id: 5,
      reply: "Axios me criou para postar lançamentos de LNs, mas no meio do caminho a curiosidade bateu e ele me usava pra ver canais privados da staff... eu acho... melhor não comentarem isso com ele.",
      gif: "https://tenor.com/bqyqb.gif",
    },
  ]
  const reply = Math.floor(Math.random() * replysAxios.length)
  
  return replysAxios[reply]
}

module.exports = RandomReplyAxios; 