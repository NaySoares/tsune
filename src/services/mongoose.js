const mongoose = require('mongoose');

async function mongooseCreateConnection() {
  try {
    console.log('Tentando conectar com Mongo...');
    await mongoose.connect(process.env.MONGODB_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    return console.log('Mongo Conectado...');
  } catch (e) {
    console.log('Falha ao conectar com Mongo...');
    console.log(e);
  }
}

module.exports = mongooseCreateConnection;
