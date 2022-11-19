const express = require('express');
const routes = new express.Router();

const multer = require('multer');
const upload = multer();

routes.get('/', (req, res) => {
  res.json({Tsune: 'O que você está fazendo aqui? Você não pode invadir o espaço das pessoas desse jeito!'})
})

module.exports = routes;