function RandomReplyBravo() {
  const replyBravo = [
    {
      id: 1,
      reply: 'Se todos os fios de cabelo dele não caírem, deve sair segunda.',
    },
    {
      id: 2,
      reply:
        'Deve sair segunda-feira, isso se o Bravo não estiver no cabeleireiro.',
    },
    {
      id: 3,
      reply:
        'Deve sair segunda-feira, isso se o Bravo não estiver cuidando da sua fortuna de 99% do PIB do Brasil.',
    },
    {
      id: 4,
      reply:
        'Deve sair segunda-feira, isso se o Bravo não inventar de lustrar a careca.',
    },
  ];
  const reply = Math.floor(Math.random() * replyBravo.length);

  return replyBravo[reply];
}

module.exports = RandomReplyBravo;
